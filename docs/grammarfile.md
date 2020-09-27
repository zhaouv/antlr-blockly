# 语法文件规则

## 语法文件

由于blockly的块是确定的, 因此把antlr的规则做一些限制后, 把语法规则转换成块, 把词法规则转化成域.  
把 [antlr4语法简介](antlr4.md) 中的例子转成antlr-blockly能识别的形式如下, [AddSubMulDiv.g4](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv.g4)  

<pre>
grammar AddSubMulDiv;

prog:   stat+ ; 

<span style="font-weight: bold;color:navy">stat</span>:   <span style="font-weight: bold;color:teal">printExpr</span>
    |   <span style="font-weight: bold;color:teal">assign</span>
    |   <span style="font-weight: bold;color:teal">blank</span>
    ;

<span style="font-weight: bold;color:teal">printExpr</span> : expression NEWLINE ;
<span style="font-weight: bold;color:teal">assign</span> : ID '=' expression NEWLINE ;
<span style="font-weight: bold;color:teal">blank</span> : NEWLINE ;

<span style="font-weight: bold;color:teal">statExprSplit : '=== statement ^ === expression v ===' ;</span>

<span style="font-weight: bold;color:navy">expression</span>
    :   expression <span style="font-weight: bold;color:teal">MulDivAddSub_List</span> expression
<span style="font-weight: bold;color:navy">//  |   parens</span>
    |   <span style="font-weight: bold;color:teal">idExpr</span>
    |   <span style="font-weight: bold;color:teal">intExpr</span>
    ;

<span style="font-weight: bold;color:navy">// parens : '(' expression ')' ;</span>
<span style="font-weight: bold;color:teal">intExpr</span> : Int ;
<span style="font-weight: bold;color:teal">idExpr</span> : ID ;

<span style="font-weight: bold;color:teal">MulDivAddSub_List</span> : '*'|'/'<span style="font-weight: bold;color:navy">|</span>'+'|'-' ;

ID  :   [a-zA-Z_][a-zA-Z_0-9]+ ; // match identifiers
Int :   [0-9]+ ;                 // match integers

<span style="font-weight: bold;color:teal">MeaningfulSplit : '=== meaningful ^ ===' ;</span>

NEWLINE:'\r'? '\n' ; 
        // return newlines to parser (is end-statement signal)
WS  :   [ \t]+ -> skip ;         // toss out whitespace
</pre>

首先是添加两个记号:
+ `statExprSplit : '=== statement ^ === expression v ===' ;`  
用来分隔blockly的语句块和值块  
+ `MeaningfulSplit : '=== meaningful ^ ===' ;`  
用来分隔有意义的词法规则和不显示的词法规则  
`NEWLINE`不需要显示或是让用户输入, 放到分隔符下面

`stat`作为语句集合的概念, 本身不是方块, 把它的三个选项独立命名作为语句块.  

`expr`改名为`expression`, `expression`作为 antlr-blockly 的关键字, 是唯一允许调用自身的语法规则, 用来作为表达式集合的概念, 其下的规则除了`expression`开头的全部独立命名作为值块. 而`expression`开头的算数式会被依次自动命名为`expression_arithmetic_0`,`..._1`,`..._2`.

由于优先级处理方式不一样, `MulDivAddSub_List`把四则运算合并成一个下拉菜单, 同时移除`parens`括号组.

至此, 图块间拼接的描述已经完成了. 可以在antlr-blockly主页中[[运行此文件]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv.g4) 查看效果或者下载生成的网页文件.

## 方块的配置

之后是每个方块的帮助信息,颜色,执行的代码的配置, 可以在`.g4`中嵌入的编辑, 也可以直接在下载的网页文件里编辑.

[demo:AddSubMulDiv](demo.md#AddSubMulDiv) 中分别给出了 [生成code](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_generCode.g4) 和 [直接执行](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_exec.g4) 的两个版本的实现, 要注意直接执行的版本, 需要关闭实时检查(实时生成). (运行: [[生成code]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_generCode.g4), [[直接执行]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_exec.g4) )

这里给出其中几个方块的配置以做说明.  
可以在.g4中通过`/* 方块名\n ... */`的形式嵌入代码, antlr-blockly会识别第一个同名的嵌入的注释, 将其内容置入方块的函数中.  
涉及到的域或者方块或者集合会以`名字`+`_0`,`_1`.. 的形式依次命名(可更改).  

<pre style="float:left;width:380px;white-space:pre-wrap;margin-right:5px">
prog:   stat+ ;
/&#42; prog
var code = '!function(printf){\n'+stat_0+'}(console.log);';
return code;
&#42;/
</pre>
<pre style="float:left;width:380px;white-space:pre-wrap;">
prog:   stat+ ;
/&#42; prog
<span style="font-weight: bold;color:navy">override : true
vars={};
printf=console.log;
blocks={};</span>
Blockly.JavaScript.statementToCode(block, 'stat_0');
<span style="font-weight: bold;color:navy">delete(printf);
//delete(vars);
//delete(blocks);</span>
return <span style="font-weight: bold;color:teal">block.id</span>;
&#42;/
</pre>
<br style="clear:both">

`prog` 是程序的入口方块,  
生成code是blockly的原始的思路, 只需要像常规方块一样, 获取子结构的代码, 组装出代码返回.  
直接执行的话, 就需要通过这个方块的函数来初始化.  
第一行`override : true`是嵌入代码时的约定, 代表不自动生成获取子结构的代码.  
此处使用是为了在遍历子结构前声明变量. 由于不在一个作用域内, 需要使用全局量. 推荐使用`MulDivAddSub = {vars : {}, blocks : {}, printf : console.log};`的形式.  
类似的约定还有`colour : 300`, 把方块指定为hue颜色.  
`tooltip : 鼠标悬浮在方块上时显示的帮助提示`.  
`helpUrl : https://zhaouv.github.io/antlr-blockly/docs/#/grammarfile`右键点击帮助会弹出该页面.  
`default : [null,"hello",1,true,null]`设置方块中域的默认值, `null`代表不改变.  
`name : ['name1','name2']`更改域和方块的变量的名字,不再使用默认的`ID_0`的形式.  
`menu: [['菜单项1','alert(1)'],['function(block){return "菜单项2"}','console.log(block);alert(2)']]` 方块的右键菜单中的增项.  
`['type','json','generFunc','args','argsType','argsGrammarName','fieldDefault','menu','xmlText','colour','tooltip','helpUrl','default','override','name']`之外的键会出现在XxxBlocks中  
> 建议使用支持antlr语法高亮的IDE来进行`.g4`文件的编辑, 如`vscode`安装`ANTLR4 grammar syntax support` 

<pre style="float:left;width:380px;white-space:pre-wrap;margin-right:5px">
assign : ID '=' expression NEWLINE ;
/&#42; assign
<span style="font-weight: bold;color:navy">default : ["x"]</span>
var code = 'var '+ID_0+' = '+expression_0+';\n';
return code;
&#42;/
</pre>
<pre style="float:left;width:380px;white-space:pre-wrap;">
assign : ID '=' expression NEWLINE ;
/&#42; assign
<span style="font-weight: bold;color:navy">default : ["x"]</span>
<span style="font-weight: bold;color:teal">vars[ID_0]=blocks[expression_0];</span>
return <span style="font-weight: bold;color:teal">block.id</span>;
&#42;/
</pre>
<br style="clear:both">

直接执行的思路, 用`blocks`储存每个值块返回的值, 用`vars`储存每个变量的值. 语句块始终返回id, 直接执行对应内容. 值块始终以`Blockly.JavaScript.ORDER_ATOMIC`强度返回id, 把计算的值用id做key存到`blocks`中.

<pre style="/*float:left;width:380px;white-space:pre-wrap;margin-right:5px*/">
expression
    :   expression MulDivAddSub_List expression
...
/&#42; expression_arithmetic_0
<span style="font-weight: bold;color:navy">override : true</span>

var MulDivAddSub_List_0 = block.getFieldValue('MulDivAddSub_List_0');
MulDivAddSub_List_0 = AddSubMulDiv_generCodeFunctions.pre('MulDivAddSub_List')(MulDivAddSub_List_0);
<span style="font-weight: bold;color:navy">var orders = {
  '+': Blockly.JavaScript.ORDER_ADDITION,
  '-': Blockly.JavaScript.ORDER_SUBTRACTION,
  '&#42;': Blockly.JavaScript.ORDER_MULTIPLICATION,
  '/': Blockly.JavaScript.ORDER_DIVISION,
};
var order = orders[MulDivAddSub_List_0];</span>
var expression_0 = Blockly.JavaScript.valueToCode(block, 'expression_0', 
  <span style="font-weight: bold;color:navy">order</span>);
if (expression_0==='') {
  throw new OmitedError(block,'expression_0','expression_arithmetic_0');
}
var expression_1 = Blockly.JavaScript.valueToCode(block, 'expression_1', 
  <span style="font-weight: bold;color:navy">order</span>);
if (expression_1==='') {
  throw new OmitedError(block,'expression_1','expression_arithmetic_0');
}
var code = expression_0 + MulDivAddSub_List_0 + expression_1;
return [code, <span style="font-weight: bold;color:navy">order</span>];
&#42;/
</pre>
<pre style="/*float:left;width:380px;white-space:pre-wrap;*/">
expression
    :   expression MulDivAddSub_List expression
...
/&#42; expression_arithmetic_0
<span style="font-weight: bold;color:teal">var a = blocks[expression_0], b = blocks[expression_1];
var function&#95; = {
  '+': function(a,b){return a+b},
  '-': function(a,b){return a-b},
  '&#42;': function(a,b){return a&#42;b},
  '/': function(a,b){return a/b},
}[MulDivAddSub_List&#95;0];
blocks[block.id]=function&#95;(a,b);</span>
return [<span style="font-weight: bold;color:teal">block.id</span>, <span style="font-weight: bold;color:teal">Blockly.JavaScript.ORDER_ATOMIC</span>];
&#42;/
</pre>
<br style="clear:both">

四则运算的方块是生成code的思路中最复杂的方块, 由于需要根据运算符来决定取方块的优先级, 需要`override : true`来手动写取方块的代码.  
建议先Parse生成出代码, 再粘贴出来改成`override : true`.  
首先把获取符号`MulDivAddSub_List_0`的部分调整到最前面, 然后根据符号来获取优先级, 把`valueToCode`中的默认的优先级改成作用在接受的值块上的优先级, 在最后一行中把返回的优先级改成值块自身的优先级.  
大多数情况这两个优先级相等, 但是例如javascript的指数运算`Math.pow(a,b)`, 作用在接受值块上的优先级是`Blockly.JavaScript.ORDER_COMMA`, 其自身的优先级是`Blockly.JavaScript.ORDER_FUNCTION_CALL`.  
返回的code的产生非常容易, 把三个字符串直接加起来`var code = expression_0 + MulDivAddSub_List_0 + expression_1;`.  

而直接执行的思路不需要考虑优先级, 根据符号直接运算出结果即可.

## 完整的 .g4 规则的描述

用语法规则来描述语句块和值块以及语句集合和表达式集合, 用词法规则来描述域

### 域的转化规则

域的定义形如`Xxx : .... ;`大写开头域名加冒号开头分号结尾, antlr-blockly会检查其是否满足特殊域的要求:
+ `BGNL?`可以使得blockly块在该处换行
+ `Int`对应非负整数
+ `Number`对应数(科学计数法会被直接计算后替代原字符)
+ `Bool`对应checkbox(有对勾或无对勾的布尔值)
+ `Colour`对应颜色(CSS值)
+ `Angle`对应角度(0~360)
+ 以`_List`结尾, 且只由字符串和`|`组成的field对应下拉菜单,  
可以通过嵌入的方式修改对应的code中的字符串,如  
`AddSub_List : '+'|'-' /*AddSub_List ['add','sub']*/;`  
也可以通过如下形式来使用动态计算的下拉菜单  
`AddSub_List : 'dynamic'|'<put default value here>' /*AddSub_List function(){return [['text1','value1'],['2','2']]}*/;`
+ 以`_Img`结尾, 且只由字符串和`|`组成的field对应图片, 三个字符串分别是`src width height`, 形如`'./a.jpg'|'800'|'600'`
+ 字符串或字符串`?`, 或由纯字符串和`?`构成的词法规则会被直接置入方块中显示

其他的域会被转化成文本输入, 规则名`Xxx`的默认值为`Xxx_default`, 如果是`Xxx_Multi`的形式, 则会使用多行文本域

### 语句集合和表达式集合

语句集合形如`xxx : xxx | xxx | xxx ;`每个`xxx`都是不同的小写开头的语句块的名, 不允许有多余的符号.  

> 在 [BlocklyGrammar.g4](https://github.com/zhaouv/antlr-blockly/blob/master/src/BlocklyGrammar.g4) 中定义如下  
> `ParserIdentifier ':' ParserIdentifier ('|' ParserIdentifier)+ ';'`  

用来在拼接时指代一类语句, 本身不作为方块.  
一个语句只能最多属于一个语句集合, 语句集合不能包含语句集合, 语句集合和其元素不视为[入口方块](#入口方块)

`expression`是antlr-blockly中的关键字用来定义唯一的表达式集合.

> `'expression' ':' (arithmeticRuleCollection|ParserIdentifier) ('|' (arithmeticRuleCollection|ParserIdentifier))* ';'`

是由`|`分隔的若干个小写开头的值块的名或者是算术式, 用来指代表达式这个概念, 本身不是方块.  
其中的算数式会按照出现顺序, 依次自动命名为`expression_arithmetic_0`,`..._1`,`..._2`.

### 语句块值块和算数式

语句块和值块的定义均是如下的形式
> `ParserIdentifier ':' parserRuleAtom* ';'`

算数式的定义如下
> `'expression' parserRuleAtom*`

等效于第一个`parserRuleAtom`一定是`expression`的值块

而`parserRuleAtom`的定义如下
> 
```
parserRuleAtom
    :   'expression' ('?' '?'?)? # ParserAtomExpr
    |   ParserIdentifier (('+' | '*' | '?') '?'?)? # ParserAtomParserId
    |   LexerIdentifier ('?' '?'?)? # ParserAtomLexerId
    |   String ('?' '?'?)? # ParserAtomStr
    ;
```

对应着每个方块由字符串,域,嵌入语句块或语句集合的针脚,嵌入值块或表达式集合的针脚组合而成.

定义方块的规则中不能使用`( ) |`.

使用字符串或域或表达式集合或值块时用`?`或者`??`表示可以缺省. 不能使用`+ *`.

> 值块与语句块没有本质区别, 语句块的`previousStatement`相当于值块的`output`, 语句块的`nextStatement`相当于值块提供了一个`check`为`nextStatement`的`input_statement`, 两者可以这样转换.(进而可以使得一个blockly转化为只含值块的同构)

方块可以通过约定形式的注释来嵌入其执行的函数, [方块的配置](#方块的配置) 中已有说明, 不再重复.

### 入口方块

一个语句块没被任何语法规则使用过时, 会被识别为入口方块, 其上下会封闭起来, 无法连接任何方块.

> 在antlr-blockly的默认设置下, 悬空的图块不会被执行.

### 语法文件

一个完整的antlr-blockly识别的语法文件, 由`语法声明,语句块集合,语句块和值块分隔符,值块集合,词法集合,有意义词法分隔符,词法集合`构成.  
> `grammarDecl statementRule*? statExprSplit expressionRule*? lexerRuleCollection meaningfulSplit lexerRuleCollection`

语法声明是第一句, 具有`grammar Xxx ;`的形式, 表明这个语法的名字是`Xxx`

语句块和值块分隔符是固定的形式  
`statExprSplit : '=== statement ^ === expression v ===' ;`  
之上的是blockly的语句集合或是语句块.  
之下的是表达式集合`expression`或者是值块.

有意义词法分隔符是固定的形式`MeaningfulSplit : '=== meaningful ^ ===' ;`  
antlr-blockly只识别其之上的词法规则作为域, 之下的词法规则会被直接丢弃.

语法文件中还可以以`/* 函数名\n ... */`的形式在特定的区域嵌入代码  

> `Call_BeforeType,Call_BeforeBlock,Call_AfterAllContent` 会被`Converter`直接执行,`Insert_FunctionStart,Insert_BeforeCallIniter`会被置入生成的代码中.

+ `Call_BeforeType` 能够以如下的形式修改以下变量  
```js
  this.evisitor.valueColor=330;  
  this.evisitor.statementColor=160;  
  this.evisitor.entryColor=230;  

  this.evisitor.generLanguage='JavaScript';  
  this.evisitor.recieveOrder='ORDER_ATOMIC';  
  this.evisitor.sendOrder='ORDER_NONE';  
  this.evisitor.varPrefix='';  

  this.toolboxGap=5;  
  this.toolboxId='toolbox';  
  this.blocklyDivId='blocklyDiv';  
  this.workSpaceName='workspace';  
  this.codeAreaId='codeArea';  
```  
最常用到的是`this.evisitor.recieveOrder='ORDER_NONE';`来使得语句接受值时不加括号.

+ `Call_BeforeBlock` 修改某个具体方块  
例如 [MotaAction.g4](https://github.com/zhaouv/antlr-blockly/blob/master/demos/motaAction/MotaAction.g4) 中修改布尔非的`inputsInline`, 以及把方块`idString_1_e`和`idString_2_e`的类型设定为`idString_e`  
```js
delete(this.block('negate_e').inputsInline);
this.block('idString_1_e').output='idString_e';
this.block('idString_2_e').output='idString_e';
```

+ `Insert_FunctionStart` 此处的代码会置入生成的网页的`语法名Functions={};`之后. 用来嵌入词法规格的转义函数,例如  
``` js
  XxxFunctions.IdString_pre = function(IdString){
    if (IdString.indexOf('__temp_name__')!==-1) throw new Error('请修改__temp_name__');
    if (IdString && !(/^[a-zA-Z_][0-9a-zA-Z_\-]*$/.test(IdString)))throw new Error('id: '+IdString+'中包含了0-9 a-z A-Z _ - 之外的字符');
    return IdString;
  }
```
[MotaAction.g4](https://github.com/zhaouv/antlr-blockly/blob/master/demos/motaAction/MotaAction.g4) 中在此处嵌入了代码转图块的Parser.

- - -

- [Start Page](README.md)  
- [antlr4语法简介](antlr4.md)  
- [blockly运行机制简介](blockly.md)  
- **语法文件规则**  
- [demo](demo.md)  