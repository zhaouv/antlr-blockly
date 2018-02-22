# blockly运行机制简介

先前的代码段转化成blockly图块后如图
```js
193
a = 5
b = 6
a+b*2
(1+2)*3
```
<p><img src="./img/asmd.png" alt="asmd" width="300" style="float:left"><img src="./img/expr_parse_tree.png" alt="parse_tree" width="450" style="float:left"></p><br style="clear:both">

从中可以对比看出,直接拖拽图块,拼接构成的结构就是语法树.色块对应树的结构,有白色背景的字符对应树的叶节点.  
由于树的结构已经能反应次序,`(1+2)*3`在图块中不再需要用`( )`来保证优先级.  
同时blockly也不需要换行符来作为语句结束的标记.  

接下来看每个具体的方块是如何运行的,这是其中赋值方块`assign`的和表达式方块`intExpr`的配置代码  
```js
[
  {
    "type": "assign",
    "message0": "%1 = %2",
    "args0": [
      {
        "type": "field_input",
        "text": "ID_default",
        "name": "ID_0"
      },
      {
        "type": "input_value",
        "name": "expression_0",
        "check": [
          "expression_arithmetic_0",
          "idExpr",
          "intExpr"
        ]
      }
    ],
    "inputsInline": true,
    "tooltip": "",
    "helpUrl": "",
    "colour": 160,
    "previousStatement": "assign",
    "nextStatement": [
      "printExpr",
      "assign",
      "blank"
    ]
  },
  {
    "type": "intExpr",
    "message0": "%1",
    "args0": [
      {
        "type": "field_number",
        "value": 0,
        "min": 0,
        "precision": 1,
        "name": "Int_0"
      }
    ],
    "inputsInline": true,
    "tooltip": "",
    "helpUrl": "",
    "colour": 330,
    "output": "intExpr"
  }
]
```
> 这个json是模仿官方提供的[blockfactory](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html) 产生的`Block Definition: JSON`,在antlr-blockly实际产生的代码中,会把重复出现的`["printExpr","assign","blank"]`替换为`AddSubMulDivBlocks.stat`,以及`["expression_arithmetic_0","idExpr","intExpr"]`替换为`AddSubMulDivBlocks.expression`  

blockly方块有`value`和`statement`两种,通过是否包含`output`项来区分,  
`statement`块是否包含`previousStatement`和`nextStatement`,决定了其是否能在上下方向和其他语句块拼接,  
也意味着没有`previousStatement`的语句块,就是程序的入口  

图块的内容由`message0`决定,其中的`1`开始的` %n `形式的内容由`args0`的第`n-1`项决定:  
+ `field_`开头的代表用户的直接输入,也就是语法树的叶节点,随后会详细说明  
+ `input_dummy`代表换行,  
+ `input_statement`代表嵌入的是`statement`块,通过`check`检查第一个块的类型,  
+ `input_value`代表嵌入的是`value`块,通过`check`检查类型,  

图块的拼接检查,逻辑如下:  
+ value块的`output`提供其块的类型数组  
  接受value的针脚的`check`提供能接收的类型数组  
  两者含共同元素或者其中一个是`null`便能拼接
+ statement块的`previousStatement`提供其块的类型数组  
  接受statement的针脚的`check`提供能接收的类型数组  
  两者含共同元素或者其中一个是`null`便能拼接
+ 下方statement块的`previousStatement`提供其块的类型数组  
  上方statement块的`nextStatement`提供能接收的类型数组  
  两者含共同元素或者其中一个是`null`便能拼接

`field_`开头的有以下几种:  
+ `field_input` 文本输入 <img src="./img/field_input_demo.png" alt="field_input" style="position:relative;top:8px;"> ,通过`text`设置默认值
+ `field_number` 数字 <img src="./img/field_number_demo.png" alt="field_number" style="position:relative;top:8px;"> ,通过`value`设置默认值,可通过`max`设最大值,可通过`min`设最小值,可通过`precision`设精度,越界或非法输入会自动归为最接近的合法值或者上一个值
+ `field_checkbox` 布尔值 <img src="./img/field_checkbox_demo.png" alt="field_checkbox" style="position:relative;top:8px;"> ,通过`checked`设置默认值
+ `field_dropdown` 下拉菜单 <img src="./img/field_dropdown_demo.png" alt="field_dropdown" style="position:relative;top:8px;"> ,通过`options`设置形如`[["option1","a"],["option2","b"],["option_3","c"]]`的选项,每一组显示第一个作为字符串,值为第二个,默认选中第一组  
+ > blockly中还支持角度,颜色作为输入,常规dsl中这两个输入意义不是很大,需要生成blockly程序后修改,或者在`.g4`中用嵌入的函数修改
- - -

- [Home](README.md)  
- [antlr4语法简介](antlr4.md)  
- **blockly运行机制简介**  
- [Get Start](getStart.md)  
- [demo](demo.md)  