var OmitedError = function(){ 
return `//生成代码中,当一个不允许省略的值或块省略时,会抛出这个错误
function OmitedError(block, var_, rule, fileName, lineNumber) {
  var message = 'no omitted '+var_+' at '+rule;
  var instance = new Error(message, fileName, lineNumber);
  instance.block = block;
  instance.varName = var_;
  instance.blockName = rule;
  instance.name = 'OmitedError';
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, OmitedError);
  }
  return instance;
}

OmitedError.prototype = Object.create(Error.prototype);
OmitedError.prototype.constructor = OmitedError;
//处理此错误的omitedcheckUpdateFunction定义在下面`;
}

var Functions_pre = function(grammerName) {
return `${grammerName}Functions.Int_pre = function(intstr) {
  return parseInt(intstr);
}

${grammerName}Functions.Number_pre = function(intstr) {
  return parseFloat(intstr);
}

//返回各LexerRule文本域的预处理函数,方便用来统一转义等等
${grammerName}Functions.pre = function(LexerId) {
  if (${grammerName}Functions.hasOwnProperty(LexerId+'_pre')) {
    return ${grammerName}Functions[LexerId+'_pre'];
  }
  return function(obj){return obj}
}`;
}

var Functions_xmlText = function(grammerName) {
return `//构造这个方法是为了能够不借助workspace,从语法树直接构造图块结构
//inputs的第i个元素是第i个args的xmlText,null或undefined表示空
//inputs的第rule.args.length个元素是其下一个语句的xmlText
${grammerName}Functions.xmlText = function (ruleName,inputs,isShadow) {
  var rule = ${grammerName}Blocks[ruleName];
  var blocktext = isShadow?'shadow':'block';
  var xmlText = [];
  xmlText.push('<'+blocktext+' type="'+ruleName+'">');
  if(!inputs)inputs=[];
  for (var ii=0,inputType;inputType=rule.argsType[ii];ii++) {
    var input = inputs[ii];
    var _input = '';
    var noinput = (input===null || input===undefined);
    if(noinput && inputType==='field') continue;
    if(noinput) input = '';
    if(inputType!=='field') {
      var subList = false;
      var subrulename = rule.args[ii];
      subrulename=subrulename.split('_').slice(0,-1).join('_');
      var subrule = ${grammerName}Blocks[subrulename];
      if (subrule instanceof Array) {
        subrulename=subrule[subrule.length-1];
        subrule = ${grammerName}Blocks[subrulename];
        subList = true;
      }
      _input = subrule.xmlText([],true);
      if(noinput && !subList && !isShadow) {
        //无输入的默认行为是: 如果语句块的备选方块只有一个,直接代入方块
        input = subrule.xmlText();
      }
    }
    xmlText.push('<'+inputType+' name="'+rule.args[ii]+'">');
    xmlText.push(_input+input);
    xmlText.push('</'+inputType+'>');
  }
  var next = inputs[rule.args.length];
  if (next) {//next
    xmlText.push('<next>');
    xmlText.push(next);
    xmlText.push('</next>');
  }
  xmlText.push('</'+blocktext+'>');
  return xmlText.join('');
}`;
}

var Functions_blocksIniter = function(grammerName,language) {
return `//把各方块的信息注册到Blockly中
${grammerName}Functions.blocksIniter = function(){
  var blocksobj = ${grammerName}Blocks;
  for(var key in blocksobj) {
    var value = blocksobj[key];
    if(value instanceof Array)continue;
    (function(key,value){
      Blockly.Blocks[key] = {
        init: function() {this.jsonInit(value.json);}
      }
    })(key,value);
    Blockly.${language}[key] = value.generFunc;
  }
}`
}

var mainFileTPL = function(
  grammerName,language,
  blocklyDivId,codeAreaId,
  toolboxArea,workspaceName,toolboxId,
  blocklyScripts
){
return [/*0*/`<!doctype html>
<head>
<meta charset="utf-8">
<title>${grammerName} --antlr-blockly</title>`,/*1*/`
<script src="blockly_compressed.js"></script>
<script src="blocks_compressed.js"></script>
<script src="javascript_compressed.js"></script>
<script src="zh-hans.js"></script>`,/*2*/`
</head>
<body>`,/*3*/`

<p>
<button onclick="showXML()">Show XML</button>
<button onclick="runCode()">console.log(obj=code)</button>
</p>
<div id="${blocklyDivId}" style="height: 480px; width: 940px;"></div>
<pre id="${codeAreaId}"></pre>
${toolboxArea}
`,/*4*/`
<script>
`,/*5*/`
${blocklyScripts}
`,/*6*/`
var ${workspaceName} = Blockly.inject('${blocklyDivId}',{
  media: 'media/',
  toolbox: document.getElementById('${toolboxId}'),
  zoom:{
    controls: true,
    wheel: true,//false
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.08
  },
  trashcan: false,
});

function omitedcheckUpdateFunction(event) {
  console.log(event);
  try {
    var code = Blockly.${language}.workspaceToCode(${workspaceName});
    document.getElementById('${codeAreaId}').innerText = code;
  } catch (error) {
    document.getElementById('${codeAreaId}').innerText = String(error);
    if (error instanceof OmitedError){
      var blockName = error.blockName;
      var varName = error.varName;
      var block = error.block;
    }
    console.log(error);
  }
}

${workspaceName}.addChangeListener(omitedcheckUpdateFunction);

${workspaceName}.addChangeListener(Blockly.Events.disableOrphans);
//自动禁用任何未连接到根块的块
`,/*7*/`

function showXML() {
  xml = Blockly.Xml.workspaceToDom(${workspaceName});
  xml_text = Blockly.Xml.domToPrettyText(xml);
  console.log(xml_text);
  xml_text = Blockly.Xml.domToText(xml);
  console.log(xml_text);
  console.log(xml);
}

function runCode() {
  // Generate ${language} code and run it.
  window.LoopTrap = 1000;
  Blockly.${language}.INFINITE_LOOP_TRAP =
    'if (--window.LoopTrap == 0) throw "Infinite loop.";\\n';
  code = Blockly.${language}.workspaceToCode(${workspaceName});
  Blockly.${language}.INFINITE_LOOP_TRAP = null;
  try {
    eval('obj=' + code);
    console.log(obj);
  } catch (e) {
    alert(e);
  }
}
`,/*8*/`
</script>

`,/*9*/`</body>
</html>
`]
}

exports.OmitedError = OmitedError;
exports.Functions_pre = Functions_pre;
exports.Functions_xmlText = Functions_xmlText;
exports.Functions_blocksIniter = Functions_blocksIniter;

exports.mainFileTPL = mainFileTPL;