# 语法文件规则

由于blockly的块是确定的,因此把antlr的规则做一些限制后,把语法规则转换成块,把词法规则转化成域.  
把 [antlr4语法简介](antlr4.md) 中的例子转成antlr-blockly能识别的形式如下  

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
`NEWLINE`不需要显示或是让用户输入,放到分隔符下面

`stat`作为语句集合的概念,本身不是方块,把它的三个选项独立命名作为语句块.  

`expr`改名为`expression`,`expression`作为 antlr-blockly 的关键字,是唯一允许调用自身的语法规则,用来作为表达式集合的概念,其下的规则除了`expression`开头的全部独立命名作为值块.而`expression`开头的算数式会被依次自动命名为`expression_arithmetic_0`,`..._1`,`..._2`.

由于优先级处理方式不一样,`MulDivAddSub_List`把四则运算合并成一个下拉菜单,同时移除`parens`括号组.

至此,图块间拼接的描述已经完成了.可以将此文件内容粘贴至 [antlr-blockly主页](https://zhaouv.github.io/antlr-blockly/) `Parse`并查看效果或者下载生成的网页文件了.

之后是每个方块的帮助信息,颜色,执行的代码的配置,可以在`.g4`中嵌入的编辑,也可以直接在下载的网页文件里编辑.

demos中分别给出了直接执行和生成dsl的两个版本的实现,要注意直接执行的版本,需要关闭实时检查.

这里给出其中几个方块的实现.

```

```

## 完整的 .g4 规则的描述

用语法规则来描述语句块和值块以及语句集合和表达式集合,用词法规则来描述域

### 域的转化规则

域的定义形如`Xxx : .... ;`大写开头域名加冒号开头分号结尾,antlr-blockly会检查其是否满足特殊域的要求:
+ `BGNL?`可以使得blockly块在该处换行
+ `Int`对应正整数
+ `Number`对应数(科学计数法会被直接计算后替代原字符)
+ `Bool`对应checkbox(有对勾或无对勾的布尔值)
+ 以`_List`结尾,且只由字符串和`|`组成的field对应下拉菜单
+ 字符串或字符串`?`,或由纯字符串和`?`构成的词法规则会被直接置入方块中显示

其他的域会被转化成文本输入,规则名`Xxx`的默认值为`Xxx_default`

### 语句集合和表达式集合

语句集合形如`xxx : xxx | xxx | xxx ;`每个`xxx`都是不同的小写开头的语句块的名,不允许有多余的符号.  

> 在 [BlocklyGrammer.g4](https://github.com/zhaouv/antlr-blockly/blob/master/src/BlocklyGrammer.g4) 中定义如下  
> `ParserIdentifier ':' ParserIdentifier ('|' ParserIdentifier)+ ';'`  

用来在拼接时指代一类语句,本身不作为方块.  
一个语句只能最多属于一个语句集合,语句集合不能包含语句集合,语句集合和其元素不视为[入口方块](#入口方块)

`expression`是antlr-blockly中的关键字用来定义唯一的表达式集合.

> `'expression' ':' (arithmeticRuleCollection|ParserIdentifier) ('|' (arithmeticRuleCollection|ParserIdentifier))* ';'`

是由`|`分隔的若干个小写开头的值块的名或者是算术式,用来指代表达式这个概念,本身不是方块.  
其中的算数式会按照出现顺序,依次自动命名为`expression_arithmetic_0`,`..._1`,`..._2`.

### 语句块值块和算数式

语句块和值块的定义均是如下的形式
> `ParserIdentifier ':' parserRuleAtom* ';'`

算数式的定义如下
> `'expression' parserRuleAtom*`

等效于第一个`parserRuleAtom`一定是`expression`的值块

而`parserRuleAtom`的定义如下
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

使用字符串或域或表达式集合或值块时用`?`或者`??`表示可以缺省.不能使用`+ *`.

> 值块与语句块没有本质区别,语句块的`previousStatement`相当于值块的`output`,语句块的`nextStatement`相当于值块提供了一个`check`为`nextStatement`的`input_statement`,两者可以这样转换.(进而可以使得一个blockly转化为只含值块的同构)

### 入口方块

一个语句块没被任何语法规则使用过时,会被识别为入口方块,其上下会封闭起来,无法连接任何方块.

> 在antlr-blockly的默认设置下,悬空的图块不会被加载.

### 语法文件

一个完整的antlr-blockly识别的语法文件,由`语法声明,语句块集合,语句块和值块分隔符,值块集合,词法集合,有意义词法分隔符,词法集合`构成.  
> `grammerDecl statementRule*? statExprSplit expressionRule*? lexerRuleCollection meaningfulSplit lexerRuleCollection`

语法声明是第一句,具有`grammar Xxx ;`的形式,表明这个语法的名字是`Xxx`

语句块和值块分隔符是固定的形式`statExprSplit : '=== statement ^ === expression v ===' ;`  
之上的是blockly的语句集合或是语句块.  
之下的是表达式集合`expression`或者是值块.

有意义词法分隔符是固定的形式`MeaningfulSplit : '=== meaningful ^ ===' ;`  
antlr-blockly只识别其之上的词法规则作为域,之下的词法规则会被直接丢弃.

- - -

- [Home](README.md)  
- [antlr4语法简介](antlr4.md)  
- [blockly运行机制简介](blockly.md)  
- **语法文件规则**  
- [demo](demo.md)  