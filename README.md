# antlr-blockly

用 [antlr](https://github.com/antlr/antlr4) 来完成自动的.g4转 [blockly](https://github.com/google/blockly)

转化思路 [convert.md](./convert.md)

作为示例MotaAction.g4给项目 [mota-js](https://github.com/ckcz123/mota-js) 提供事件编辑器子模块

motaAction以及blockly运行机制的简单介绍 [talk.md](./talk.md)

[LICENSE](./NOTICE.md)

## v 0.1.0 (Alpha)
+ 能够用 [BlocklyGrammer.g4](./BlocklyGrammer.g4) 解析 [MotaAction.g4](./MotaAction.g4)
+ SymbolVisitor能够解析所有符号
+ 不考虑拼接检查的情况下,能产生所有图块的json
+ 产生正确拼接的所有图块的json
+ 产生statement块的visitor代码
+ 产生blockfactory格式的所有块的json和js代码
+ 生成一个完整的能运行生成的blockly的代码的网页  
  index.html点`download`后生成的文件放在此目录下即可运行
+ 有手动的换行时不添加inputsInline

## Todo

+ 表达式支持expression之外的集合,只有expression允许左递归

+ 把主页做成点`parse`就可以演示blockly的效果

+ 文档  
  如何使用这个工具  
  需要对antlr和blockly了解到什么程度  
  目标是只看这个项目就能高效的搭一个的blockly  

+ 优化一些默认值,缺省之类的细节

+ 多语言的支持

+ colour,tooltip,helpUrl以及  
  generFunc的代码  
  嵌入到.g4里

- - -

blockly中mutators太过麻烦不适宜自动化,放弃

> blockly中`numeric imput`的机制待研究.

可以借助ChangeListener实现
```
b.getFieldValue()
b.setFieldValue(123,'NUM')
b.getInputTargetBlock('statements')


b=demoWorkspace.getBlockById(event.blockId)
event.type == Blockly.Events.CHANGE && b.type == 'xxxx'
```
blockly.xml需要仔细研究一下
```
b = demoWorkspace.newBlock('event_m');
bx = Blockly.Xml.blockToDom(b,true);
bt = Blockly.Xml.domToText(bx);
b.dispose();
```
函数声明和变量声明也要再看一看