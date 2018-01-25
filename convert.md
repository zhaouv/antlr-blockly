# .g4转blockly思路

## parser

### statement

statement下的子规则是blockly的statment,其blockly类型是各自的名字  
建立一个名为statement的数组存放这些字符串

### expression

expression下的规则转化为blockly的value块  
expression中不以expression开头的全部要求是新的规则  
建立一个名为expression的数组存放  
剩下的需要避免左递归的生成为类似四则运算的块  
expression按照次序生成优先级

> 剩下的子规则全部视为blockly的statement

### 可变形状`? * + |`的处理

> 一个规则`ruleA`若存在一个父规则中包含`ruleA+`,则把`ruleA`视为statement  

> 问题,形如`expression+`如何处理

## lexer

约定几个特殊的LexerRule,这几个规则使用field嵌入到块
+ INT
+ Number
+ 以`String`结尾的LexerRule


常规的形如`'function'`的固定字符串直接置入块内的messege中

`.. | + * ?`以及正则表达式的处理