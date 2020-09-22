var OmitedError = function(){ 
return /* js */`//生成代码中,当一个不允许省略的值或块省略时,会抛出这个错误
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
//处理此错误的omitedcheckUpdateFunction定义在下面

//生成代码中,当一个不允许多个语句输入的块放入多语句时,会抛出这个错误
function MultiStatementError(block, var_, rule, fileName, lineNumber) {
    var message = 'no multi-Statement '+var_+' at '+rule;
    var instance = new Error(message, fileName, lineNumber);
    instance.block = block;
    instance.varName = var_;
    instance.blockName = rule;
    instance.name = 'MultiStatementError';
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, MultiStatementError);
    }
    return instance;
}

MultiStatementError.prototype = Object.create(Error.prototype);
MultiStatementError.prototype.constructor = MultiStatementError;
//处理此错误的omitedcheckUpdateFunction定义在下面
`;
}

var Functions_pre = function(grammerName) {
return /* js */`${grammerName}Functions.Int_pre = function(intstr) {
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
    return function(obj,block,fieldName,blockType){return obj}
}
`;
}

var Functions_fieldDefault = function(grammerName) {
return /* js */`// ${grammerName}Functions.fieldDefault
// 根据输入是整数字符串或null
// 第index个或者名字为key的域的默认值, null时返回所有field默认值的数组
${grammerName}Functions.fieldDefault = function (ruleName,keyOrIndex) {
    var rule = ${grammerName}Blocks[ruleName];
    var iskey=typeof keyOrIndex==typeof '';
    var isindex=typeof keyOrIndex==typeof 0;
    function args0_content_to_default(cnt) {
        var key = ({
            'field_input':'text',
            'field_multilinetext':'text',
            'field_number':'value',
            'field_dropdown':'default',
            'field_checkbox':'checked',
            'field_colour':'colour',
            'field_angle':'angle',
            // 'field_image':'src'
        })[cnt.type];
        return cnt[key];
    }
    var allDefault=[];
    for(var ii=0,index=-1,cnt;cnt=rule.json.args0[ii];ii++){
        if (!cnt.name || cnt.type.slice(0,5)!='field' || cnt.type=='field_image') continue;
        index++;
        if (iskey && cnt.name==keyOrIndex)return args0_content_to_default(cnt);
        if (isindex && index==keyOrIndex)return args0_content_to_default(cnt);
        allDefault.push(args0_content_to_default(cnt))
    }
    if (iskey || isindex) return undefined;
    return allDefault;
}
`;
}

var Functions_defaultCode = function(grammerName,defaultGenerating) {
return /* js */`// ${grammerName}Functions.defaultCode_TEXT
${grammerName}Functions.defaultCode_TEXT = function (ruleName,args,block) {
    var rule = ${grammerName}Blocks[ruleName];
    var message=rule.json.message0;
    var args0=rule.json.args0;
    for(var ii=0,jj=0;ii<args0.length;ii++){
        message=message.split(new RegExp('%'+(ii+1)+'\\\\b'));
        var content='\\n';
        if (args0[ii].type==='input_dummy') {
            message[1]=message[1].slice(1);
        } else if(args0[ii].type==='field_image') {
            content=args0[ii].alt;
        } else {
            content=args[jj++];
        }
        if (args0[ii].type=="input_statement") {
            message[0]=message[0]+'\\n';
            message[1]=message[1].slice(1);
        }
        message=message.join(content);
    }
    if (rule.type=='statement') {
        message=message+'\\n';
    }
    return message;
}

${grammerName}Functions.defaultCode_JSON_TYPE='type'

/**
 * @class
 */
${grammerName}Functions.parserClass = function (params) {
}
${grammerName}Functions.parserClass.prototype.parse = function (obj,next) {
    var rule = ${grammerName}Blocks[obj[${grammerName}Functions.defaultCode_JSON_TYPE]]
    var input = []
    for (var index = 0; index < rule.args.length; index++) {
        var dobj = obj[rule.args[index]];
        if (rule.argsType[index]==='statement') {
            if (!rule.multi[index])dobj=[dobj];
            var snext=null
            while (dobj.length) {
                var ds=dobj.pop()
                snext=this.parse(ds,snext)
            }
            input.push(snext)
        } else if (rule.argsType[index]==='value') {
            input.push(this.parse(dobj))
        } else {
            input.push(dobj)
        }
    }
    return rule.xmlText(input,next)
}
${grammerName}Functions.parser=new ${grammerName}Functions.parserClass()
${grammerName}Functions.parse=function(obj){
    var xml_text = ${grammerName}Functions.parser.parse(obj);
    var xml = Blockly.Xml.textToDom('<xml>'+xml_text+'</xml>');
    ${grammerName}Functions.workspace().clear();
    Blockly.Xml.domToWorkspace(xml, ${grammerName}Functions.workspace());
}

// ${grammerName}Functions.defaultCode_JSON
${grammerName}Functions.defaultCode_JSON = function (ruleName,args,block) {
    var rule = ${grammerName}Blocks[ruleName];
    var values=args
    var output={}
    var ret=''
    if (rule.type==='statement'||rule.type==='value') {
        output[${grammerName}Functions.defaultCode_JSON_TYPE]=rule.json.type
        ret=block.getNextBlock()==null?'':','
    }
    for (var index = 0; index < values.length; index++) {
        var value = values[index];
        if (rule.argsType[index]==='statement') {
            output[rule.args[index]]=eval('['+value+']')
            if (!rule.multi[index]) output[rule.args[index]]=output[rule.args[index]][0];
        } else if (rule.argsType[index]==='value') {
            output[rule.args[index]]=eval('('+value+')')
        } else {
            output[rule.args[index]]=value
        }
    }
    ret=JSON.stringify(output,null,4)+ret
    return ret
}

// ${grammerName}Functions.defaultCode
${grammerName}Functions.defaultCode=${grammerName}Functions.defaultCode_${defaultGenerating}
`;
}

var Functions_xmlText = function(grammerName) {
return /* js */`// ${grammerName}Functions.xmlText
// 构造这个方法是为了能够不借助workspace,从语法树直接构造图块结构
// inputs的第i个元素是第i个args的xmlText,null或undefined表示空
// next是其下一个语句的xmlText
${grammerName}Functions.xmlText = function (ruleName,inputs,next,isShadow,comment,attribute) {
    var rule = ${grammerName}Blocks[ruleName];
    var blocktext = isShadow?'shadow':'block';
    var xmlText = [];
    xmlText.push('<'+blocktext+' type="'+ruleName+'"');
    for (var attr in attribute) {
        xmlText.push(' '+attr+'="'+attribute[attr]+'"');
    }
    xmlText.push('>');
    if(!inputs)inputs=[];
    var inputIsArray = inputs instanceof Array;
    for (var ii=0,inputType;inputType=rule.argsType[ii];ii++) {
        var input = inputIsArray?inputs[ii]:inputs[rule.args[ii]];
        var _input = '';
        var noinput = input==null;
        if(noinput && inputType==='field' && ${grammerName}Blocks[rule.argsGrammarName[ii]].type!=='field_dropdown') continue;
        if(noinput && inputType==='field') {
            noinput = false;
            input = rule.fieldDefault(rule.args[ii])
        }
        if(noinput) input = '';
        if(inputType==='field' && ${grammerName}Blocks[rule.argsGrammarName[ii]].type==='field_checkbox')input=input?'TRUE':'FALSE';
        if(inputType!=='field') {
            var subList = false;
            var subrulename = rule.argsGrammarName[ii];
            var subrule = ${grammerName}Blocks[subrulename];
            if (subrule instanceof Array) {
                subrulename=subrule[subrule.length-1];
                subrule = ${grammerName}Blocks[subrulename];
                subList = true;
            }
            _input = subrule.xmlText([],null,true);
            if(noinput && !subList && !isShadow) {
                //无输入的默认行为是: 如果语句块的备选方块只有一个,直接代入方块
                input = subrule.xmlText();
            }
        }
        xmlText.push('<'+inputType+' name="'+rule.args[ii]+'">');
        xmlText.push(_input+input);
        xmlText.push('</'+inputType+'>');
    }
    if(comment){
        xmlText.push('<comment><![CDATA[');
        xmlText.push(comment.replace(/\]\]>/g,'] ] >'));
        xmlText.push(']]></comment>');
    }
    if (next) {
        xmlText.push('<next>');
        xmlText.push(next);
        xmlText.push('</next>');
    }
    xmlText.push('</'+blocktext+'>');
    return xmlText.join('');
}
`;
}

var Functions_blocksIniter = function(grammerName,language) {
return /* js */`// ${grammerName}Functions.blocksIniter
// 把各方块的信息注册到Blockly中
${grammerName}Functions.blocksIniter = function(){
    var blocksobj = ${grammerName}Blocks;
    for(var key in blocksobj) {
        var value = blocksobj[key];
        if(value instanceof Array)continue;
        if(/^[A-Z].*$/.exec(key))continue;
        (function(key,value){
            if (value.menu && value.menu.length) {
                var menuRegisterMixin={
                    customContextMenu: function(options) {
                        for(var ii=0,op;op=value.menu[ii];ii++){
                            var option = {enabled: true};
                            option.text = op[0];
                            var check = 'function('
                            if (option.text.slice(0,check.length)==check){
                                option.text=eval('('+option.text+')(this)');
                            }
                            (function(block,fstr){
                                option.callback = function(){
                                    eval(fstr)
                                }
                            })(this,op[1]);
                            options.push(option);
                        }
                    }
                };
                value.json.extensions=value.json.extensions||[];
                var mixinName = 'contextMenu_${grammerName}_'+value.json.type
                value.json.extensions.push(mixinName)
                Blockly.Extensions.registerMixin(mixinName,menuRegisterMixin);
            }
            Blockly.Blocks[key] = {
                init: function() {this.jsonInit(value.json);}
            }
            Blockly.${language}[key] = value.generFunc;
        })(key,value);
    }
}
`;
}


var ToolboxObj = function(toolboxId,toolboxObj,toolboxGap) {
return /* js */`
var ${toolboxId} = (function(){

    var toolboxXml=document.createElement('xml')

    // 调整这个obj来更改侧边栏和其中的方块
    // 可以直接填 '<block type="xxx">...</block>'
    // 标签 '<label text="标签文本"></label>'
    var toolboxObj = ${toolboxObj}

    var getCategory = function(toolboxXml,name,custom){
        var node = document.createElement('category');
        node.setAttribute('name',name);
        if(custom)node.setAttribute('custom',custom);
        toolboxXml.appendChild(node);
        return node;
    }

    var toolboxGap = '<sep gap="${toolboxGap}"></sep>'

    for (var name in toolboxObj){
        var custom = null;
        if(name=='xxxxxx')custom='xxxxxx';
        if(name=='zzzzzz')custom='zzzzzz';
        getCategory(toolboxXml,name,custom).innerHTML = toolboxObj[name].join(toolboxGap);
        var node = document.createElement('sep');
        node.setAttribute('gap',${toolboxGap}*3);
        toolboxXml.appendChild(node);
    }

    return toolboxXml;
})();
`;
}

var mainFileTPL = function(
    grammerName,language,
    blocklyRuntimePath,blocklyRuntimeFiles,
    blocklyDivId,blocklyDivFixedSizeStyle,
    codeAreaId,codeAreaFunc,
    workspaceName,toolboxId,
){
return {
html:{
    htmlStart:`<!doctype html>
<head>
<meta charset="utf-8">
<title>${grammerName} --antlr-blockly</title>`,
    headScripts: `
`+blocklyRuntimeFiles.trim().split(/\s*,\s*/).map(function(file){
    return `<script src="${blocklyRuntimePath}${file}"></script>`
}).join(`
`),
    head_body:`
</head>
<body>`,
    bodyContent:`
<p>
<button onclick="showXML()">Show XML</button>
<button onclick="runCode()">console.log(obj=code)</button>
</p>
<div id="${blocklyDivId}" ${blocklyDivFixedSizeStyle}></div>
<pre id="${codeAreaId}"></pre>
`,
    bodyContent_dymanicSize:`
<p>
<button onclick="showXML()">Show XML</button>
<button onclick="runCode()">console.log(obj=code)</button>
</p>
<div id="${blocklyDivId}_Area"></div>
<div id="${blocklyDivId}" style="position: absolute"></div>
<pre id="${codeAreaId}"></pre>
`,
    bodyScripts:`
<script src="${grammerName}.js"></script>
`,
    bodyScripts_keepGrammar:`
<script src="Converter.bundle.min.js"></script>
<script src="${grammerName}.js"></script>
`,
    htmlEnd:`</body>
</html>
`
},
js:{
    BlocklyInject:`
var ${workspaceName} = Blockly.inject('${blocklyDivId}',{
    media: '${blocklyRuntimePath}media/',
    toolbox: ${toolboxId},
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
${grammerName}Functions.workspace = function(){return ${workspaceName}}
`,
    checkUpdateFunction:`
function omitedcheckUpdateFunction(event) {
    console.log(event);
    var codeAreaElement = document.getElementById('${codeAreaId}');
    var codeAreaFunc = ${codeAreaFunc};
    try {
        var code = Blockly.${language}.workspaceToCode(${workspaceName});
        codeAreaFunc(null,code);
    } catch (error) {
        codeAreaFunc(error,null);
        if (error instanceof OmitedError ||error instanceof MultiStatementError){
            var blockName = error.blockName;
            var varName = error.varName;
            var block = error.block;
        }
        console.log(error);
    }
}

${workspaceName}.addChangeListener(omitedcheckUpdateFunction);
`,
    disableOrphans:`
//自动禁用任何未连接到根块的块
${workspaceName}.addChangeListener(Blockly.Events.disableOrphans);
`,
    debugFunctions:`

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
`,
    dymanicSize:`
var blocklyArea = document.getElementById('${blocklyDivId}_Area');
var blocklyDiv = document.getElementById('${blocklyDivId}');
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
Blockly.svgResize(${grammerName}Functions.workspace());
`,
    keepGrammar:`
var grammarFile=__grammarFile__;
var option=__option__;
option.target.type="independentFile";
var converter = Converter.withOption(grammarFile,option);
var script = document.createElement('script');
script.innerHTML = converter.js.text();
document.body.appendChild(script);
`
}
}

}

exports.OmitedError = OmitedError;
exports.Functions_pre = Functions_pre;
exports.Functions_fieldDefault = Functions_fieldDefault;
exports.Functions_defaultCode = Functions_defaultCode;
exports.Functions_xmlText = Functions_xmlText;
exports.Functions_blocksIniter = Functions_blocksIniter;
exports.ToolboxObj = ToolboxObj;

exports.mainFileTPL = mainFileTPL;