# Grammar file rules

## grammar file

Since blockly blocks are deterministic, after restricting antlr's rules, the syntax rules are converted into blocks and the lexical rules into fields.
Converting the example from [antlr4 syntax introduction](en/antlr4.md) to antlr-blockly recognizes the following form, [AddSubMulDiv.g4](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv.g4)  

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

The first is to add two tokens:
+ `statExprSplit: '=== statement ^ === expression v ===';`
Used to separate blockly statement blocks and value blocks
+ `MeaningfulSplit: '=== meaningful ^ ===';`
Used to separate meaningful lexical rules and non-displayed lexical rules  
`NEWLINE` does not need to be displayed or allowed to type by the user and placed below the delimiter

The concept of `stat` as a collection of statements is not itself a block, but its three options are named independently as statement blocks.

`expr` is renamed to `expression`. `expression` is a keyword  of antlr-blockly that is the only grammar rule that allows itself to be invoked as a concept of a collection of expressions, with the following rules in addition to the full independence of the `expression` The name is given as a value block, and the arithmetical expressions at the beginning of expression are automatically named as `expression_arithmetic_0`,`..._1`,`..._2`.

Because the priority is handled differently, `MulDivAddSub_List` merges the four operations into one pull-down menu, removing the `parens` brackets group.

At this point, the description of the splicing between tiles has been completed. Can be in the antlr-blockly home page [[run this file]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv.g4) View the effect or download the generated web page file.

## block configuration

Following is the help information for each block, the color, the configuration of the executed code, the edits that can be embedded in the `.g4`, or you can edit directly in the downloaded web page file.

[demo:AddSubMulDiv](demo.md#AddSubMulDiv) gives two versions of [Generate code](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_generCode.g4) and [Direct execution](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_exec.g4) respectively, pay attention to the Direct execution version, you need to turn off real-time checking (real-time running). (Run: [[Generate code]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_generCode.g4), [[Direct execution]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_exec.g4))

Here are some of the configuration of several blocks to illustrate.  
You can embed code in .g4 as `/* blockName\n ... */`, and antlr-blockly will recognize the first embedded comment of the same name and place its contents in a square function.
The fields or squares or blocks involved are named in the order of `name`+`_0`,`_1`..

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

`prog` is the entry block of the program,  
Generate code is the original idea of ​​blockly, just need to get the substructure code like the regular block, assemble the code back.  
Direct execution, you need to initialize this function through the block.  
The first line, `override: true`, is the convention at embed code that does not automatically generate the code to get the substructure.  
This is used here to declare variables before traversing substructures. Since globals are not in scope, it is recommended to use the form `MulDivAddSub = {vars: {}, blocks: {}, printf: console.log};` .  
A similar convention is `color: 300`, which specifies the block as a hue color.  
`tooltip: Help hint when the mouse is over the block`.  
`helpUrl: https://zhaouv.github.io/antlr-blockly/docs/#/grammerFile` right click on the help will pop up the page.  
`default:[null,"hello",1,true,[["yes","true"],["no","false"],["cancel","null"]]` The default value of the field, `null` represents does not change. Domain is the drop-down menu, through the two-dimensional array to set the form, each group is displayed text and the corresponding value.  
> It is recommended that using an IDE that supports antlr syntax highlighting to edit `.g4` files such as `vscode` installed `ANTLR4 grammar syntax support`  

<pre style="float:left;width:380px;white-space:pre-wrap;margin-right:5px">
assign : ID '=' expression NEWLINE ;
/&#42; assign
<span style="font-weight: bold;color:navy">default : ["x",null]</span>
var code = 'var '+ID_0+' = '+expression_0+';\n';
return code;
&#42;/
</pre>
<pre style="float:left;width:380px;white-space:pre-wrap;">
assign : ID '=' expression NEWLINE ;
/&#42; assign
<span style="font-weight: bold;color:navy">default : ["x",null]</span>
<span style="font-weight: bold;color:teal">vars[ID_0]=blocks[expression_0];</span>
return <span style="font-weight: bold;color:teal">block.id</span>;
&#42;/
</pre>
<br style="clear:both">

The idea of Direct execution using `blocks` to store the value returned by each value block, `vars` to store the value of each variable. The statement block always returns the id, direct implementation of the corresponding. The value block is always `Blockly.JavaScript.ORDER_ATOMIC` Strength return id, the calculated value id key stored in the `blocks`.

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

The arithmetic block is the most complicated block in the idea of ​​Generating code. Because operators need to determine the priority of a block, you need to `override: true` to manually write the block's code.  
It is recommended that `Parse` generate the code and paste it out, then add `override: true`.  
First of all, the part of the symbol `MulDivAddSub_List_0` is adjusted to be the first one, then the symbol is used to get the priority, the default priority of `valueToCode` is changed to the priority of the value block accepted, the last line The returned priority is changed to the value block's own priority.  
In most cases, these two priorities are equal, but for example, `Math.pow (a, b)`, which is an exponential operation of javascript, takes precedence over `Blockly.JavaScript.ORDER_COMMA`, which has its own priority is `Blockly.JavaScript.ORDER_FUNCTION_CALL`.  
The return of the code is very easy to generate, the three strings directly add `var code = expression_0 + MulDivAddSub_List_0 + expression_1;`.

The idea of ​​Direct execution does not need to consider the priority, the direct calculation of the results based on symbols.

## Description of the complete .g4 rules

Grammar rules to describe the statement block and value block and the statement set and expression set, using the lexical rules to describe the field

### 域的转化规则

域的定义形如`Xxx : .... ;`大写开头域名加冒号开头分号结尾, antlr-blockly会检查其是否满足特殊域的要求:
+ `BGNL?`可以使得blockly块在该处换行
+ `Int`对应正整数
+ `Number`对应数(科学计数法会被直接计算后替代原字符)
+ `Bool`对应checkbox(有对勾或无对勾的布尔值)
+ 以`_List`结尾, 且只由字符串和`|`组成的field对应下拉菜单
+ 字符串或字符串`?`, 或由纯字符串和`?`构成的词法规则会被直接置入方块中显示

其他的域会被转化成文本输入, 规则名`Xxx`的默认值为`Xxx_default`

### 语句集合和表达式集合

语句集合形如`xxx : xxx | xxx | xxx ;`每个`xxx`都是不同的小写开头的语句块的名, 不允许有多余的符号.  

> 在 [BlocklyGrammer.g4](https://github.com/zhaouv/antlr-blockly/blob/master/src/BlocklyGrammer.g4) 中定义如下  
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

对应着每个方块由字符,域,嵌入语句块或语句集合的针脚,嵌入值块或表达式集合的针脚组合而成.

定义方块的规则中不能使用`( ) |`.

使用字符串或域或表达式集合或值块时用`?`或者`??`表示可以缺省. 不能使用`+ *`.

> 值块与语句块没有本质区别, 语句块的`previousStatement`相当于值块的`output`, 语句块的`nextStatement`相当于值块提供了一个`check`为`nextStatement`的`input_statement`, 两者可以这样转换.(进而可以使得一个blockly转化为只含值块的同构)

方块可以通过约定形式的注释来嵌入其执行的函数, [方块的配置](#方块的配置) 中已有说明, 不再重复.

### 入口方块

一个语句块没被任何语法规则使用过时, 会被识别为入口方块, 其上下会封闭起来, 无法连接任何方块.

> 在antlr-blockly的默认设置下, 悬空的图块不会被执行.

### 语法文件

一个完整的antlr-blockly识别的语法文件, 由`语法声明,语句块集合,语句块和值块分隔符,值块集合,词法集合,有意义词法分隔符,词法集合`构成.  
> `grammerDecl statementRule*? statExprSplit expressionRule*? lexerRuleCollection meaningfulSplit lexerRuleCollection`

语法声明是第一句, 具有`grammar Xxx ;`的形式, 表明这个语法的名字是`Xxx`

语句块和值块分隔符是固定的形式  
`statExprSplit : '=== statement ^ === expression v ===' ;`  
之上的是blockly的语句集合或是语句块.  
之下的是表达式集合`expression`或者是值块.

有意义词法分隔符是固定的形式`MeaningfulSplit : '=== meaningful ^ ===' ;`  
antlr-blockly只识别其之上的词法规则作为域, 之下的词法规则会被直接丢弃.

语法文件中还可以以`/* 函数名\n ... */`的形式在特定的区域嵌入代码  

> `Function_0,Function_1,Function_2` 会被`Converter`直接执行,`Functions`会被置入生成的代码中.

+ `Function_0` 能够以如下的形式修改以下变量  
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

+ `Function_1` 修改某个具体方块  
例如 [MotaAction.g4](https://github.com/zhaouv/antlr-blockly/blob/master/demos/motaAction/MotaAction.g4) 中修改布尔非的`inputsInline`, 以及把方块`idString_1_e`和`idString_2_e`的类型设定为`idString_e`  
```js
delete(converter.evisitor.expressionRules.negate_e.blockjs.inputsInline);
converter.evisitor.expressionRules.idString_1_e.blockjs.output='idString_e';
converter.evisitor.expressionRules.idString_2_e.blockjs.output='idString_e';
```

+ `Function_2` 此处方块的定义已经转化为字符串, 可以通过对字符串`this.blocks`进行`replace`替换, 修改各复杂词法规则的默认值等等.

+ `Functions` 此处的代码会置入生成的网页的`语法名Functions={};`之后. 用来嵌入词法规格的转义函数,例如  
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