# Introduction to blockly running mechanism

## syntax tree

The previous code into block block after the block diagram
``` js
193
a = 5
b = 6
a+b*2
(1+2)*3
```
<p><img src="./img/asmd.png" alt="Please read docsify version. asmd" width="300" style="float:left"><img src="./img/expr_parse_tree.png" alt="Please read docsify version. parse_tree" width="450" style="float:left"></p><br style="clear:both">

It can be seen from the comparison, the direct drag and drop tiles, the structure of the splicing is the syntax tree color blocks corresponding to the structure of the tree, the white background of the characters corresponding to the leaf node of the tree (hereinafter referred to as **`field`**).  
Since the structure of the tree already reflects the order, `(1+2)*3` does not need to be `( )` in the block to guarantee its priority.  
At the same time blockly does not require line breaks as the end of the statement tag.

## block configuration

Let's see how each concrete block works, which is the configuration code for the `assign` block and expression block `intExpr`
``` js
{
  "type": "assign",
  "message0": "%1 = %2",
  "args0": [
    {
      "type": "field_input",
      "text": "ID_default",
      "name": "ID_0"
    },
    {
      "type": "input_value",
      "name": "expression_0",
      "check": [
        "expression_arithmetic_0",
        "idExpr",
        "intExpr"
      ]
    }
  ],
  "inputsInline": true,
  "tooltip": "",
  "helpUrl": "",
  "colour": 160,
  "previousStatement": "assign",
  "nextStatement": [
    "printExpr",
    "assign",
    "blank"
  ]
}
```
``` js
{
  "type": "intExpr",
  "message0": "%1",
  "args0": [
    {
      "type": "field_number",
      "value": 0,
      "min": 0,
      "precision": 1,
      "name": "Int_0"
    }
  ],
  "inputsInline": true,
  "tooltip": "",
  "helpUrl": "",
  "colour": 330,
  "output": "intExpr"
}
```
> This json mimics the `Block Definition: JSON` produced by the official [blockfactory](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html), actually produced in antlr-blockly In the code, `["printExpr","assign","blank"]` is replaced with`AddSubMulDivBlocks.stat` and `["expression_arithmetic_0","idExpr","intExpr"]` is replaced with `AddSubMulDivBlocks.expression`.

Blockly block has two kinds of `value` and` statement`, by whether to include `output` items to distinguish, here are respectively called **`value block`** and **`statement block`**  
Whether the statement block contains `previousStatement` and` nextStatement` determines whether it can be spliced ​​up and down with other statement blocks,  
Also means that there is no statement of `previousStatement`, which is the entry to the program.

The content of the block is determined by `message0`. The content of `%n` in `1` is determined by the `n-1` entry of `args0`:
+ `field_` at the beginning of the representative of the user's direct input, that is, the leaf node of the syntax tree, and then will be described in detail
+ `input_dummy` represents a newline,
+ `input_statement` is embedded in the statement block, check the type of the first block by `check`,
+ `input_value` represents the embedded value block, check the type by `check`,

Tile mosaic check, the logic is as follows:
+ The `output` of value block provides an array of the type of its block,  
  Checks that accept the value of the pin provide an array of types to receive,  
  Both contain the same element or one of them is `null` to splicing.  
+ The `previousStatement` of statement block provides its type array of blocks,  
  The `check` that takes the stub of the statement block provides an array of types that it can receive,  
  Both contain the same element or one of them is `null` to splicing.  
+ The `previousStatement` of the below statement block provides an array of the type of its block,
  The `nextStatement` of the top statement block provides an array of types to receive,
  Both contain the same element or one of them is `null` to splicing.
+ > Means to provide pins to accept the statement of the block, can not directly control the type of statement outside the first statement it accepts

There are several fields at the beginning of `field_`:
+ `field_input` text input <img src="./img/field_input_demo.png" alt="Please read docsify version. field_input" style="position:relative;top:8px;">, set the default value with `text`.
+ `field_number` number <img src="./img/field_number_demo.png" alt="Please read docsify version. field_number" style="position:relative;top:8px;">, set the default value via `value`, Set the maximum value, you can set the minimum value by `min`, precision can be set by ` precision`, and the input value that is out of bounds or illegitimate is automatically classified as the closest legal value or the last value.
+ `field_checkbox` boolean <img src="./img/field_checkbox_demo.png" alt="Please read docsify version. field_checkbox" style="position:relative;top:8px;">, set the default value with `checked`.
+ `field_dropdown` drop down menu <img src="./img/field_dropdown_demo.png" alt="Please read docsify version. field_dropdown" style="position:relative;top:8px;">, set options like `[["option1","a"],["option2","b"],["option_3","c"]]` are set via `options` and each group displays the first As a string, the second value, the first selected by the first group.  
+ `field_colour` color, set its CSS value by `colour`
+ `field_angle` angle, set value between 0~360 by `angle`
+ `field_image` image, set the source by`src`, set width and height by `width,height` (can not be omitted)

## function executed by the block

The next step is to write the code for each tile to be executed (these three examples are automatically generated and need to be modified to produce a `code`)
<pre>
Blockly.JavaScript['prog'] = function(block) {
  var stat_0 = Blockly.JavaScript.<span style="font-weight: bold;color:navy">statementToCode</span>(block, 'stat_0');
  if (stat_0==='') {
    throw new OmitedError(block,'stat_0','prog');
  }
  var code = '1111111111;\n';
  return code;
}
</pre>
<pre>
Blockly.JavaScript['assign'] = function(block) {
  var ID_0 = block.<span style="font-weight: bold;color:navy">getFieldValue</span>('ID_0');
  if (ID_0==='') {
    throw new OmitedError(block,'ID_0','assign');
  }
  ID_0 = AddSubMulDivFunctions.pre('ID')(ID_0);
  var expression_0 = Blockly.JavaScript.<span style="font-weight: bold;color:navy">valueToCode</span>(block, 'expression_0', 
    <span style="font-weight: bold;color:teal">Blockly.JavaScript.ORDER_ATOMIC</span>);
  if (expression_0==='') {
    throw new OmitedError(block,'expression_0','assign');
  }
  var code = '1111111111;\n';
  return code;
}
</pre>
<pre>
Blockly.JavaScript['intExpr'] = function(block) {
  var Int_0 = block.<span style="font-weight: bold;color:navy">getFieldValue</span>('Int_0');
  Int_0 = AddSubMulDivFunctions.pre('Int')(Int_0);
  var code = 0000000000;
  return [code, <span style="font-weight: bold;color:teal">Blockly.JavaScript.ORDER_NONE</span>];
}
</pre>

By using `getFieldValue, statementToCode, valueToCode`, respectively, and taking results from `field_, input_statement, input_value`, we can iterate over the entire syntax tree.

Need to pay attention to two points:
+ `valueToCode` needs to give priority to the value block accepted. The value block needs to be given its own priority when returned, where priority means the strength of the union of an expression string.  
For example, `(1+2)*3`, the strength of the block `1+2` is the addition, and the strength of the `?*3` press on `?` Is multiplication  
Multiplication is stronger than addition, so `valueToCode` automatically braces `1+2` into `(1+2)*3`,  
It is important to understand here that priority does not belong to the math concept of arithmetic, but belongs to the notation (form) describing the operation.  
`Blockly.JavaScript.ORDER_OVERRIDES` can eliminate some extra parentheses, such as `(1+2)+3 -> 1+2+3`,  
**blockly No support for left associative or right associative**, can not describe a left associative symbol `?`, `(a?b)?c` can not remove parentheses but `a?(b?c)` can not Remove the brackets.
  > If you do not generate the code from the syntax tree and execute it directly, you do not need to consider the priority.
+ The `statementToCode` does not provide an interface to change the calling order. Multiple blocks received can only be traversed by their internal mechanism in the order from top to bottom.

## Deploy to the web page

Take the [page generated by the home page](https://zhaouv.github.io/antlr-blockly/) as an example, (after opening the home page will resolve the default demo into HTML displaying below textarea)  
Firstly import the relevant script  
``` html
<script src="blockly_compressed.js"></script>
<script src="blocks_compressed.js"></script>
<script src="javascript_compressed.js"></script>
<script src="zh-hans.js"></script>
<!-- <script src="en.js"></script> -->
```
By injecting the div layout, blockly will also get a XML as a toolbox on the left side through id  
``` html
<div id="blocklyDiv" style="height: 480px; width: 940px;"></div>
<xml id="toolbox" style="display:none">
  <category name="statement">
    <block type="prog">
      <statement name="stat_0">
        <shadow type="blank"></shadow>
      </statement>
    </block>
    <sep gap="5"></sep>
    <block type="printExpr">
      <value name="expression_0">
        <shadow type="intExpr"></shadow>
      </value>
    </block>
    ...
  </category>
  <sep gap="15"></sep>
  <category name="value">
    <block type="expression_arithmetic_0">
      <value name="expression_0">
        <shadow type="intExpr"></shadow>
      </value>
      <value name="expression_1">
        <shadow type="intExpr"></shadow>
      </value>
    </block>
    ...
  </category>
</xml>
```
Registered json and functions for each block
``` js
Blockly.Blocks[blockName] = {
  init: function() {this.jsonInit(blockJson);}
};
Blockly.JavaScript[blockName] = blockGenerFunc;
```
Finally, Call `inject` to generate the workspace to complete the deployment
``` js
var workspace = Blockly.inject('blocklyDiv',{
  media: 'media/',
  toolbox: document.getElementById('toolbox'),
  zoom:{
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.08
  },
  trashcan: false,
});
```
If it needs to be able to **adjust the size following the page** ( Copyed from [Blockly Documentation](https://developers.google.com/blockly/guides/configure/web/resizable))  
Modify `blocklyDiv` such as the first paragraph (`parent` of `blocklyDiv` is `body`), and insert second segments after `workspace` definition, which enables blockly workspace to follow `blocklyArea` to adjust the location and size.
``` html
<div id="blocklyArea"></div>

...
<div id="blocklyDiv" style="position: absolute"></div>
```
``` js
var blocklyArea = document.getElementById('blocklyArea');
var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);
```

**change the behavior of mouse wheel**, change it into move blocks
``` js
Blockly.bindEventWithChecks_(workspace.svgGroup_,"wheel",workspace,function(e){
  e.preventDefault();
  var hvScroll = e.shiftKey?'hScroll':'vScroll';
  workspace.scrollbar[hvScroll].handlePosition_+=( ((e.deltaY||0)+(e.detail||0)) >0?20:-20);
  workspace.scrollbar[hvScroll].onScroll_();
  workspace.setScale(workspace.scale);
});
```

**change the editor of the colour field**, you can change other field with similar ways
```js
Blockly.FieldColour.prototype.createWidget_ = function() {
  // Create the palette using Closure.
  var picker = new goog.ui.ColorPicker();
  picker.setSize(this.columns_ || Blockly.FieldColour.COLUMNS);
  picker.setColors(this.colours_ || Blockly.FieldColour.COLOURS);
  var div = Blockly.WidgetDiv.DIV;
  picker.render(div);
  picker.setSelectedColor(this.getValue());
  Blockly.WidgetDiv.hide();

  var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
  });

  var self=this;
  var a = document.createElement('input');
  a.setAttribute('type','color')
  a.setAttribute('value',self.getValue())
  a.oninput=function(){self.setValue(a.value)}
  a.dispatchEvent(clickEvent);

  return picker;
};
```
- - -

- [Start Page](en/README.md)  
- [antlr4 syntax introduction](en/antlr4.md)
- **blockly running mechanism**
- [grammar file rules](en/grammerfile.md)
- [demo](en/demo.md)