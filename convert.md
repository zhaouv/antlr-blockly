# .g4转blockly思路
限制.g4的规则,约定作为其子规则的blockly grammer : .bg

## parser

不允许嵌入,如`@member{}`之类的

parserRule中不允许出现`(`和`)`  
parserRule中的词法,包含`.. | + * ?`以及正则表达式的必须单独作为LexerRule  
parserRule中词法只允许`LexerRuleA?`,不允许`LexerRuleA* LexerRuleA+`,需要的场合打包成新的新的LexerRule

引入分隔符`statExprSplit : '=== statment ^ === expression v ===' ;`强制要求blockly的statsment和value分别置于其上下

常规的形如`'function'`的固定字符串直接置入块内的message中

### statement

如果一个statementRule包含`|`,那么其子规则必须全部是`|`隔开的单独的statementRule

其他情况下statementRule不允许包含`|`

```
入口,以及函数声明和变量声明有待仔细考察
```

### expression

expressionRule中只有`expression`能包含`|`  

`expression`中不以`expression`开头的全部要求是新的expressionRule  
建立一个名为`expression`的数组存放  
以`expression`开头的生成为类似四则运算的块  

### 可变形状`? * + |`的处理

目前的blockly的语句拼接的方式,一个blockly的statsment,`statment`或`statment?`大多数情况下是无效的,除非是作为某个statementRule的第一个或最后一个子规则

形如`expressionRule+`或`expressionRule*`的处理  
借助mutators处理实现上太麻烦  
不允许`expressionRule+`  
把`expressionRule+`换成`expressionRule_statementRule+`  
`expressionRule_statementRule`是blockly的statsment,形式为`expressionRule_statementRule : expressionRule ;`

## lexer

引入分隔符`MeaningfulSplit : '=== meaningful ^ ===' ;`,有意义的LexerRule都放置在其上面

只包含形如`'function'`的固定字符串的有意义的LexerRule,直接置入message中  
也意味着在dsl中需要但是blockly中不需要的文本写成LexerRule放置在分隔符下面

fragment不会被显示

约定几个特殊的LexerRule,按照blockly中已有的特殊field处理,其他视为`text input`
+ Bool => `checkbox`
+ Int => `precision`为1`min`为0的`numeric imput`
+ Number => `numeric imput`
+ 以`_List`结尾的LexerRule => `dropdown`



