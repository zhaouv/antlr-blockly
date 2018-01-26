# .g4转blockly思路
限制.g4的规则,约定作为其子规则的blockly grammer .bg4

> 引用格式的部分是思路上还没有想清楚的问题

## parser

不允许嵌入,如`@member{}`之类的

ParserRule中不允许出现`(`和`)`
ParserRule中的词法,包含`.. | + * ?`以及正则表达式的必须单独作为LexerRule  
ParserRule中词法只允许`LexerRuleA?`,不允许`LexerRuleA* LexerRuleA+`,需要的场合打包成新的新的LexerRule

引入分隔符`statExprSplit : '=== statment ^ === expression v ===' ;`强制要求blockly的statsment和value分别置于其上下

### statement

statement下的子规则是blockly的statment块,其blockly类型是各自的名字  
建立一个名为statement的数组存放这些字符串

### expression

expression下的规则转化为blockly的value块  
expression中不以expression开头的全部要求是新的规则  
建立一个名为expression的数组存放  
剩下的需要避免左递归的生成为类似四则运算的块  
expression按照次序生成优先级

### 可变形状`? * + |`的处理

目前的blockly的语句拼接的方式,一个blockly的statsment,这两种只能2选1,而且全部规则中只能出现一种
+ `statment`或`statment+`
+ `statment`或`statment?`

> 形如`expression+`的处理

## lexer

引入分隔符`MeaningfulSplit : '=== meaningful ^ ===' ;`,有意义的LexerRule都放置在其上面

约定几个特殊的LexerRule,按照blockly中已有的特殊field处理,其他视为`text input`
+ Bool => `checkbox`
+ INT => `precision`为1`min`为0的`numeric imput`
+ Number => `numeric imput`
+ 以`_List`结尾的LexerRule => `dropdown`

常规的形如`'function'`的固定字符串直接置入块内的messege中


