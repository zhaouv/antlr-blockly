# antlr-blockly

用 [antlr](https://github.com/antlr/antlr4) 来完成自动的.g4转 [blockly](https://github.com/google/blockly)

转化思路 [convert.md](./convert.md)

作为示例MotaAction.g4给项目 [mota-js](https://github.com/ckcz123/mota-js) 提供事件编辑器子模块

motaAction以及blockly运行机制的简单介绍 [talk.md](./talk.md)

[LICENSE](./NOTICE.md)

## v 0.1.0 (Alpha)
+ 生成一个完整的能运行生成的blockly的代码的网页  
  主页点`Download`后生成的文件放在此目录下即可运行
+ 主页点`Run`就可以运行生成的blockly

## Todo

+ 表达式支持expression之外的集合,只有expression允许左递归

+ 文档  
  如何使用这个工具  
  需要对antlr和blockly了解到什么程度  
  目标是只看这个项目就能高效的搭一个的blockly  

+ 优化一些默认值,缺省之类的细节

+ 多语言的支持

+ colour,tooltip,helpUrl  
  默认值default的设置
  优先级order
  generFunc的代码  
  嵌入到.g4里

