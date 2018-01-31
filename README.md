# MotaAction
项目 [mota-js](https://github.com/ckcz123/mota-js) 的事件编辑器子模块

同时用来尝试用 [antlr](https://github.com/antlr/antlr4) 来完成自动的.g4转 [blockly](https://github.com/google/blockly) 的过程

转化思路 [convert.md](./convert.md)

motaAction和blockly运行机制的简单介绍 [talk.md](./talk.md)

[LICENSE](./NOTICE.md)

## Update
+ 能够用 [BlocklyGrammer.g4](./BlocklyGrammer.g4) 解析 [MotaAction.g4](./MotaAction.g4)
+ SymbolVisitor能够解析所有符号
+ 不考虑拼接检查的情况下,能产生所有图块的json
+ 产生正确拼接的所有图块的json
+ 产生statement块的visitor代码
+ 产生blockfactory格式的所有块的json和js代码


- - -

blockly中mutators太过麻烦不适宜自动化,放弃

> blockly中`numeric imput`的机制待研究.

可以借助ChangeListener实现
```
b.getFieldValue()
b.setFieldValue('NUM',123)
b.getInputTargetBlock('statements')

b=demoWorkspace.getBlockById(event.blockId)
event.type == Blockly.Events.CHANGE && b.type == 'xxxx'
```
blockly.xml需要仔细研究一下

函数声明和变量声明也要再看一看