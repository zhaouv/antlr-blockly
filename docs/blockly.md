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

- - -

- [Home](README.md)  
- [antlr4语法简介](antlr4.md)  
- **blockly运行机制简介**  
- [Get Start](getStart.md)  
- [demo](demo.md)  