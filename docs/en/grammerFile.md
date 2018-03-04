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

The concept of `stat` as a set of statements is not itself a block, but its three options are named independently as statement blocks.

`expr` is renamed to `expression`. `expression` is a keyword  of antlr-blockly that is the only grammar rule that allows itself to be invoked as a concept of a set of expressions, with the following rules in addition to the full independence of the `expression` The name is given as a value block, and the arithmetical expressions at the beginning of expression are automatically named as `expression_arithmetic_0`,`..._1`,`..._2`.

Because the priority is handled differently, `MulDivAddSub_List` merges the four operations into one pull-down menu, removing the `parens` brackets group.

At this point, the description of the splicing between tiles has been completed. Can be in the antlr-blockly home page [[run this file]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv.g4) View the effect or download the generated web page file.

## block configuration

Following is the help information for each block, the color, the configuration of the executed code, the edits that can be embedded in the `.g4`, or you can edit directly in the downloaded web page file.

[demo:AddSubMulDiv](demo.md#AddSubMulDiv) gives two versions of [Generate code](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_generCode.g4) and [Direct execution](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_exec.g4) respectively, pay attention to the Direct execution version, you need to turn off real-time checking (real-time running). (Run: [[Generate code]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_generCode.g4), [[Direct execution]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_exec.g4))

Here are some of the configuration of several blocks to illustrate.  
You can embed code in .g4 as `/* blockName\n ... */`, and antlr-blockly will recognize the first embedded comment of the same name and place its contents in a block's function.
The fields or blocks or sets involved are named in the order of `name`+`_0`,`_1`..

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

### field conversion rules

The definition of the domain such as `Xxx: ....;` capitalized at the beginning of the domain name with a semicolon at the end, antlr-blockly will check whether it meets the requirements of special fields:  
+ `BGNL?` Can cause the blockly block to wrap around there
+ `Int` corresponds to a non-negative integer
+ `Number` correspondence (scientific counting method will be calculated directly to replace the original character)
+ `Bool` corresponds to the checkbox (boolean with or without checkmark)
+ The field that ends with `_List` and that consists of only the string and `|` corresponds to the pull-down menu
+ String or string `?`, Or lexical rules consisting of pure strings and `?` Will be displayed directly in the block

Other fields will be converted to text input. The default for the rule name `Xxx` is` Xxx_default`

### statement set and expression set

The statement set such as `xxx: xxx | xxx | xxx;` Each `xxx` is the name of the statement block at the beginning of a different lowercase, do not allow extra symbols.

> Definition in [BlocklyGrammer.g4](https://github.com/zhaouv/antlr-blockly/blob/master/src/BlocklyGrammer.g4)
> `ParserIdentifier ':' ParserIdentifier ('|' ParserIdentifier) ​​+ ';'`

Used to refer to a type of statement in the stitching, itself not as a block.  
A statement can only belong to a set of statements at most, a statement set can not contain a statement set, a statement set and its elements are not considered [entry block](#entry-block)

`expression` is a keyword in antlr-blockly used to define a unique set of expressions.

> `'expression' ':' (arithmeticRuleCollection|ParserIdentifier) ('|' (arithmeticRuleCollection|ParserIdentifier))* ';'`

Is the number of lowercase first-entered value blocks separated by `|`, or arithmetical expressions used to refer to the notion of an expression, which is not itself a block.  
The arithmetic expressions are automatically named as `expression_arithmetic_0`,`..._1`,`..._2` in order of appearance.

### Value block statement block and arithmetic expression

The definition of the statement block and the value block are as follows
> `ParserIdentifier ':' parserRuleAtom * ';'`

The definition of arithmetic is as follows
> `'expression' parserRuleAtom*`

Equivalent to the first `parserRuleAtom` must be a `expression` value block

The definition of `parserRuleAtom` is as follows
> 
```
parserRuleAtom
    :   'expression' ('?' '?'?)? # ParserAtomExpr
    |   ParserIdentifier (('+' | '*' | '?') '?'?)? # ParserAtomParserId
    |   LexerIdentifier ('?' '?'?)? # ParserAtomLexerId
    |   String ('?' '?'?)? # ParserAtomStr
    ;
```

Corresponding to each block combined by the string, field, pins of embedded statement blocks or statement sets, pins of embedded value block or expression set.

You can not use `() |` in a rule that defines a block.

Using a string or field or expression set or value block with `?` or `??` to represent a default. Can not use `+ *`.

> There is no essential difference between a value block and a statement block. The `previousStatement` of the block is equivalent to the `output` of the value block. The `nextStatement` of the block is equivalent to the value block providing an `input_statement` of `nextStatement`, The two can be transformed in this way (which in turn allows a blockly transformation to a isomorphism involving only value blocks)

Blocks can be embedded into the functions they execute using the conventions of the comments, which are explained in [block configuration](#block-configuration) and will not be repeated.

### entry block

A statement block is not used by any grammar rules outdated, will be identified as the entry block, the upper and lower will be closed up, can not connect to any block.

> In the antlr-blockly default setting, dangling blocks are not executed.

### grammar file

A complete antlr-blockly recognized grammar file consists of `grammar declaration, statement blocks collection, statement block and value block delimiter, value block collection, lexer rule collection, meaningful lexer rule delimiter, lexer rule collection`.  
> `grammerDecl statementRule *? statExprSplit expressionRule *? lexerRuleCollection meaningfulSplit lexerRuleCollection`

The grammar declaration is the first statement, in the form `grammar Xxx;`, indicating that the name of this grammar is `Xxx`

The statement block and value block delimiter is fixed form
`statExprSplit: '=== statement ^ === expression v ===';`  
Above is the blocky statement set or statement block.  
Under the expression set is the expression or value block.  

Meaningful lexer rule delimiter is fixed form  `MeaningfulSplit: '=== meaningful ^ ===';`  
antlr-blockly recognizes only the lexer rules above it as a field, the lexer rules under it are discarded directly.

Grammar files can also be embedded in a specific area as `/* functionName\n ... */`

> `Function_0,Function_1,Function_2` will be directly executed by `Converter`, and `Functions` will be put into the generated code.

+ `Function_0` can modify the following variables in the following way  
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
The most commonly used is `this.evisitor.recieveOrder = 'ORDER_NONE';` to make statements accept values without parentheses.

+ `Function_1` to modify a specific block  
For example, in [MotaAction.g4](https://github.com/zhaouv/antlr-blockly/blob/master/demos/motaAction/MotaAction.g4), modify Boolean Not's `inputsInline` and set the type of block `idString_1_e` and block `idString_2_e` to `idString_e`  
```js
delete(converter.evisitor.expressionRules.negate_e.blockjs.inputsInline);
converter.evisitor.expressionRules.idString_1_e.blockjs.output='idString_e';
converter.evisitor.expressionRules.idString_2_e.blockjs.output='idString_e';
```

+ `Function_2` The definition of the blocks here has been converted to a string. You can replace the string `this.blocks` by `replace`, change the default values for each of the complex lexer rules, and so on.

+ `Functions` The code here will be placed after the `'GrammarName'Functions = {};` of the generated web page. The escape function used to embed the lexical specification, for example  
``` js
  XxxFunctions.IdString_pre = function(IdString){
    if (IdString.indexOf('__temp_name__')!==-1) throw new Error('Please change __temp_name__');
    if (IdString && !(/^[a-zA-Z_][0-9a-zA-Z_\-]*$/.test(IdString)))throw new Error('id: '+IdString+' contains characters other than 0-9 a-z A-Z _ -');
    return IdString;
  }
```
[MotaAction.g4](https://github.com/zhaouv/antlr-blockly/blob/master/demos/motaAction/MotaAction.g4) here embedded Parser transforms the code into blocks.

- - -

- [Start Page](en/README.md)  
- [antlr4 syntax introduction](en/antlr4.md)
- [blockly running mechanism](en/blockly.md)
- **grammar file rules**
- [demo](en/demo.md)