# antlr-blockly

用 [antlr](https://github.com/antlr/antlr4) 来完成自动的.g4转 [blockly](https://github.com/google/blockly)

[文档(docsify)](https://zhaouv.github.io/antlr-blockly/docs/#/README)

转化思路 [convert.md](./convert.md)

作为示例MotaAction.g4给项目 [mota-js](https://github.com/ckcz123/mota-js) 提供事件编辑器子模块

[LICENSE](./NOTICE.md)

## v 0.1.0 (Alpha)
+ 主页点`Run`就可以运行生成的blockly
+ 主页点`Download`后产生一个能运行生成的blockly的代码的网页(放在此目录下)

## Todo

+ [x] 形如`xxx ??`,`xxx +?`,`xxx *?`的支持 (更像是fix bug)  
strings 中要支持`??`,parserRule中要支持非贪婪匹配的形式

+ [x] `lexerRuleAtom`的命名不合理,应改成`lexerRuleExpr`  
`grammerDecl`中不应包含`ParserIdentifier`

+ [x] 支持colour,tooltip,helpUrl  
  默认值default的设置  
  generFunc的代码  
  嵌入到.g4里

+ [x] override,嵌入`override : true`则用嵌入的函数整个覆盖generFunc,不保留原有的变量获取部分的代码,  
  可以用来改变valueToCode的优先级recieveOrder或者遍历   

+ 表达式支持expression之外的集合,(只有expression允许左递归)

+ [x] 文档  
  如何使用这个工具  
  需要对antlr和blockly了解到什么程度  
  目标是只看antlr-blockly就能高效的搭一个的blockly  

+ 文档:blockly在网页上如何配置,如何设置侧边栏  

+ [x] 主页支持search参数直接加载和运行demos中的.g4文件

+ [x] 优化一些默认值,缺省之类的细节

+ 多语言的支持

+ 注释,每处做了什么的说明



