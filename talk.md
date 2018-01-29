看完了 [blockly](https://github.com/google/blockly) 文档,把 [MotaAction.g4](http://pppl.pw:23456/blockly/MotaAction.g4) 转成了blockly http://pppl.pw:23456/blockly/motaActionBlockyDemo.html

这个dsl目的是生成这个规则下的json [event文档](https://ckcz123.github.io/mota-js/#/event) 

来提供给 [events.js#L278](https://github.com/ckcz123/mota-js/blob/master/libs/events.js#L278) 来调用


blockly主要是写配置文件 [motaActionBlocks](http://pppl.pw:23456/blockly/motaActionBlocks.js) 

过程是两部分,对每个块

1. 描述规则,用`message`和`args`描述语法树,这个例子描述了`if_s`包含一个`EvalString`的值和两个`actionList`的子规则  
```json
  {
    "type": "if_s",
    "message0": "如果 %1 %2 否则 %3 %4",
    "args0": [
      {
        "type": "input_value",
        "name": "EvalString"
      },
      {
        "type": "input_statement",
        "name": "actionList",
        "check": "actionList"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "actionList_1",
        "check": "actionList"
      }
    ],
    "inputsInline": true,
    "previousStatement": "statement",
    "nextStatement": "statement",
```

2. 写visitor  
例如此函数前三行获取所有子节点生成的字符串,到目前都是可以借助 [blockfactory](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html) 来拖拽生成的  
之后有了子代生成的字符串,就和写antlr4的visitor的过程几乎一样了,生成字符串返回给父代
```javascript
    function(block) {
      var value_evalstring = Blockly.JavaScript.valueToCode(block, 'EvalString', Blockly.JavaScript.ORDER_NONE)||EvalString_CHECK;
      var statements_actionlist = Blockly.JavaScript.statementToCode(block, 'actionList')||'[]';
      var statements_actionlist_1 = Blockly.JavaScript.statementToCode(block, 'actionList_1')||'[]';
      var code = ['{"type": "if", "condition": "',value_evalstring,'",\n',
        '"true": \n',statements_actionlist,',\n',
        '"false": \n',statements_actionlist_1,'\n',
      '},\n'].join('');
      return code;
    }
```

相当于,为了能够通过写visitor来运行, blockly是编辑每个块的json, antlr只需要写一个.g4就够了,相比之下antlr优雅了无数倍  
就这个 [motaActionBlocks.js](http://pppl.pw:23456/blockly/motaActionBlocks.js) 而言,应该能够直接用 [MotaAction.g4](http://pppl.pw:23456/blockly/MotaAction.g4) 来生成那些繁琐的部分,从而能够像antlr一样专心写visitor
