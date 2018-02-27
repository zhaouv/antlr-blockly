# 语法文件规则

由于blockly的块是确定的,因此把antlr的规则做一些限制后,把语法规则转换成块,把词法规则转化成域.  
把 [antlr4语法简介](antlr4.md) 中的例子转成此项目能识别的形式如下  

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

`expr`改名为`expression`,`expression`作为 antlr-blockly 的关键字,是唯一允许调用自身的语法规则,用来作为表达式集合的概念,其下的规则除了`expression`开头的全部独立命名作为值块.而`expression`开头的规则会被依次自动命名为`expression_arithmetic_0`,`..._1`,`..._2`.

由于优先级处理方式不一样,`MulDivAddSub_List`把四则运算合并成一个下拉菜单,同时移除`parens`括号组.

至此,图块间拼接的描述已经完成了.可以将此文件内容粘贴至 [项目主页](https://zhaouv.github.io/antlr-blockly/) `Parse`并查看效果或者下载生成的网页文件了.

之后是每个方块的帮助信息,颜色,执行的代码的配置,可以在`.g4`中嵌入的编辑,也可以直接在下载的网页文件里编辑.

demos中分别给出了直接执行和生成dsl的两个版本的实现,要注意直接执行的版本,需要关闭实时检查.

这里给出其中几个方块的实现.

```

```

## 完整的 .g4 规则的描述

用语法规则来描述语句块和值块以及语句集合和表达式集合,用词法规则来描述域

### 域的转化规则

约定了几个特殊的域 [EvalVisitor.prototype.SpeicalLexerRule](https://github.com/zhaouv/antlr-blockly/search?utf8=%E2%9C%93&q=SpeicalLexerRule&type=) [EvalVisitor.prototype.visitLexerRuleList](https://github.com/zhaouv/antlr-blockly/search?utf8=%E2%9C%93&q=EvalVisitor.prototype.visitLexerRuleList&type=)
+ `BGNL?`可以使得blockly块在该处换行
+ `Int`对应正整数
+ `Number`对应数(科学计数法会被直接计算后替代原字符)
+ `Bool`对应checkbox(有对勾或无对勾的布尔值)
+ 以`_List`结尾的只由字符串和`|`组成的field对应下拉菜单

字符串或字符串`?`,或由纯字符串和`?`构成的词法规则会被直接置入方块中显示

其他的域会被转化成文本输入,规则名`Xxx`的默认值为`Xxx_default`

> antlr-blockly使用antlr4来解析antlr4的`.g4`文件,并解析符合条件的注释来获取嵌入,因此接下来的内容实质是 [BlocklyGrammer.g4](https://github.com/zhaouv/antlr-blockly/blob/master/src/BlocklyGrammer.g4) 加上 [EvalVisitor.prototype.loadInject](https://github.com/zhaouv/antlr-blockly/search?utf8=%E2%9C%93&q=%22EvalVisitor.prototype.loadInject+%3D+function%22&type=) 的解释.  
> `.g4`语法非常自然易懂,接下来的内容建议对照 [BlocklyGrammer.g4](https://github.com/zhaouv/antlr-blockly/blob/master/src/BlocklyGrammer.g4) 来看  

一个完整的antlr-blockly识别的语法文件,由`语法声明,语句块集合,语句和值分隔符,值块集合,词法集合,有意义词法分隔符,词法集合`构成.

语法声明是第一句,具有`grammar Xxx ;`的形式,表明这个语法的名字是`Xxx`

固定的形式`statExprSplit : '=== statement ^ === expression v ===' ;`之上的是blockly的语句块或是语句集合.

语句集合形如`xxx : xxx | xxx | xxx ;`每个`xxx`都是不同的小写开头的语句块的名或值块的名.

语句块和值块的规则是一样的,能够用`+*?`自由的组合语句块值块和field,但是不能使用`|`,需要使用`|`表示选则的场合必须借助语句集合或是域的下拉菜单  



值块与语句块没有本质区别,语句块的`previousStatement`相当于值块的`output`,语句块的`nextStatement`相当于值块提供了一个`check`为`nextStatement`的`input_statement`,两者可以这样转换.(进而可以使得一个blockly转化为只含值块的同构)

- - -

- [Home](README.md)  
- [antlr4语法简介](antlr4.md)  
- [blockly运行机制简介](blockly.md)  
- **语法文件规则**  
- [demo](demo.md)  