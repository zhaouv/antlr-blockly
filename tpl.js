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
OmitedError.prototype.constructor = OmitedError;`;
}

var Functions_pre = function(grammerName) {
  return `${grammerName}Functions.pre = function(LexerId) {
  if (${grammerName}Functions.hasOwnProperty(LexerId+'_pre')) {
    return ${grammerName}Functions[LexerId+'_pre'];
  }
  return function(obj){return obj}
}`;
}

var Functions_xmlText = function(grammerName) {
  return `${grammerName}Functions.xmlText = function (ruleName,inputs,isShadow) {
  var rule = ${grammerName}Blocks[ruleName];
  var blocktext = isShadow?'shadow':'block';
  var xmlText = [];
  xmlText.push('<'+blocktext+' type="'+ruleName+'">');
  if(!inputs)inputs=[];
  for (var ii=0,inputType;inputType=rule.argsType[ii];ii++) {
    var input = inputs[ii];
    if(input===null || input===undefined){
      if (inputType!=='field') {
        var subShadow = false;
        //var subShadow = true;
        var subrulename = rule.args[ii];
        subrulename=subrulename.split('_').slice(0,-1).join('_');
        var subrule = ${grammerName}Blocks[subrulename];
        if (subrule instanceof Array) {
          subrulename=subrule[subrule.length-1];
          subrule = ${grammerName}Blocks[subrulename];
          subShadow = true;
          //continue;
        }
        input = subrule.xmlText([],subShadow);
      } else { //field
        continue;
      }
    }
    xmlText.push('<'+inputType+' name="'+rule.args[ii]+'">');
    xmlText.push(input);
    xmlText.push('</'+inputType+'>');
  }
  if (inputs.length>rule.args.length) {//next
    xmlText.push('<next>');
    xmlText.push(inputs[rule.args.length]);
    xmlText.push('</next>');
  }
  xmlText.push('</'+blocktext+'>');
  return xmlText.join('');
}`;
}

var Functions_blocksIniter = function(grammerName,language) {
  return `${grammerName}Functions.blocksIniter = function(){
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
  return `<!doctype html>
<head>
<meta charset="utf-8">
<title>${grammerName} --antlr-blockly</title>
<script src="blockly_compressed.js"></script>
<script src="blocks_compressed.js"></script>
<script src="javascript_compressed.js"></script>
<script src="zh-hans.js"></script>
</head>
<body>

<p>
<button onclick="showXML()">Show XML</button>
<button onclick="runCode()">console.log(obj=code)</button>
</p>
<div id="${blocklyDivId}" style="height: 480px; width: 940px;"></div>
<pre id="${codeAreaId}"></pre>
${toolboxArea}

<script>

${blocklyScripts}

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

</script>
<script>
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
    eval('obj=' + code.split('\\n').join(''));
    console.log(obj);
  } catch (e) {
    alert(e);
  }
}
</script>

</body>
</html>
`
}

exports.OmitedError = OmitedError;
exports.Functions_pre = Functions_pre;
exports.Functions_xmlText = Functions_xmlText;
exports.Functions_blocksIniter = Functions_blocksIniter;

exports.mainFileTPL = mainFileTPL;