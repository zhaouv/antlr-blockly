# MotaAction
项目[mota-js](https://github.com/ckcz123/mota-js)的事件编辑器子模块

同时用来尝试用[antlr](https://github.com/antlr/antlr4)来完成自动的.g4转blockly的过程

blockly中mutators太过麻烦不适宜自动化,放弃

> blockly中`numeric imput`的机制待研究.

可以借助ChangeListener实现

b.setFieldValue('NUM',123)
b.getInputTargetBlock('statements')

b=workspace.getBlockById(event.blockId)
event.type == Blockly.Events.CHANGE && b.type == 'xxxx'

blockly.xml需要仔细研究一下