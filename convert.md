# .g4转blockly思路
限制.g4的规则,约定作为其子规则的blockly grammer

## parser

不允许嵌入,如`@member{}`之类的

parserRule中不允许出现`(`和`)`  
parserRule中的词法,包含`.. | + * ?`以及正则表达式的必须单独作为LexerRule  
parserRule中词法只允许`LexerRuleA?`,不允许`LexerRuleA* LexerRuleA+`,需要的场合打包成新的新的LexerRule

引入分隔符`statExprSplit : '=== statement ^ === expression v ===' ;`强制要求blockly的statsment和value分别置于其上下

常规的形如`'function'`的固定字符串直接置入块内的message中

### statement

如果一个statementRule包含`|`,那么其子规则必须全部是`|`隔开的单独的statementRule,代表一类语句的集合的概念,此时其子规则不能再是语句集合,由于blockly是以语句块为单位,一个语句只能属于一个语句集合 

其他情况下statementRule不允许包含`|`

没有被引用过的statementRule将被处理为上下没有连接的语句块

```
函数声明和变量声明有待仔细考察
```

### expression

expressionRule中只有`expression`能包含`|`  

`expression`中不以`expression`开头的全部要求是新的expressionRule  
建立一个名为`expression`的数组存放  
以`expression`开头的生成为类似四则运算的块  
```
实现上,没有做多层的expressionRule导致的左递归的检查,形如
expression : expression '+' expression | a_e ;
a_e : expression 'a' ;
antlr中左递归必须直接写在expression里
如果语法只用来生成blockly不再用antlr解析,不需要考虑这一点
```

### 可变形状`? * + |`的处理

目前的blockly的语句拼接的方式,一个blockly的statsment,`statement`或`statement?`大多数情况下是无效的,除非是始终作为某个statementRule的第一个或最后一个子规则(类似`else语句`),并且需要该语句在整个语法中都不能有形式`statement+`或`statement*`出现
```
这种情况暂不提供自动改变blockly形状的拼接支持,通过运行时的检查来实现
```

(程序入口不包含在上一段的讨论中)

形如`expressionRule+`或`expressionRule*`的处理  
借助mutators处理实现上太麻烦  
不允许`expressionRule+`  
把`expressionRule+`换成`expressionRule_statementRule+`  
`expressionRule_statementRule`是blockly的statsment,形式为`expressionRule_statementRule : expressionRule ;`

## lexer

引入分隔符`MeaningfulSplit : '=== meaningful ^ ===' ;`,有意义的LexerRule都放置在其上面

只包含形如`'function'`的固定字符串的有意义的LexerRule,直接置入message中  
也意味着在dsl中需要但是blockly中不需要显示的文本写成LexerRule放置在分隔符下方

在dsl中不需要但是blockly中需要显示的文本转换成`LexerRule?`,把LexerRule放置在分隔符上方

fragment不会被显示

约定几个特殊的LexerRule,按照blockly中已有的特殊field处理,其他视为`text input`
+ Bool => `checkbox`
+ Int => `precision`为1`min`为0的`numeric imput`
+ Number => `numeric imput`
+ BGNL => 块中使文本换行,使用时在规则中填`BGNL?`(Lexer中设定成一个长字符串,如`BGNL : 'aiyuviaurgfuabvar' ;`)
+ 以`_List`结尾的LexerRule => `dropdown`

```
目前的Int和Number对于antlr有bug,满足Int筛选的值无法被标记为Number,需要手动在antlr实现里改tokens类别,但是这样便于blockly中的使用
```

## 注:blockly的拼接逻辑
value块的`output`提供其块的类型数组  
接受value的针脚的`check`提供能接收的类型数组  
两者含共同元素便能拼接

statement块的`previousStatement`提供其块的类型数组  
接受statement的针脚的`check`提供能接收的类型数组  
两者含共同元素便能拼接

下方statement块的`previousStatement`提供其块的类型数组  
上方statement块的`nextStatement`提供能接收的类型数组  
两者含共同元素便能拼接

