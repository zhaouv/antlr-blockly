// Generated from Option.g4 by antlr-blockly

    // toolboxFunc
    window.optionToolboxFunc = function () {

        var toolboxXml = document.createElement('xml')

        // 调整这个obj来更改侧边栏和其中的方块
        // 可以直接填 '<block type="xxx">...</block>'
        // 标签 '<label text="标签文本"></label>'
        var toolboxObj = {
            "sub-options": [
                OptionBlocks["blocklyRuntimeStatement"].xmlText(),
                OptionBlocks["blocklyRuntimeStatement"].xmlText(['https://unpkg.com/blockly@3.20200402.1/','blockly.min.js, msg/en.min.js']),
                OptionBlocks["blocklyRuntimeStatement"].xmlText(['https://cdn.bootcdn.net/ajax/libs/blockly/3.20200402.1/','blockly.min.js, msg/zh-hans.min.js']),
                OptionBlocks["fixedSizeBlocklyDiv"].xmlText(),
                OptionBlocks["dymanicSizeBlocklyDiv"].xmlText(),
                OptionBlocks["toolboxDefault"].xmlText(),
                OptionBlocks["toolboxFunc"].xmlText(),
                OptionBlocks["codeAreaStatement"].xmlText(),
                OptionBlocks["independentFile"].xmlText(),
                OptionBlocks["keepGrammar"].xmlText(),
            ],
            "templates": [
                OptionBlocks["option"].xmlText(),
            ]
        }

        var getCategory = function (toolboxXml, name, custom) {
            var node = document.createElement('category');
            node.setAttribute('name', name);
            if (custom) node.setAttribute('custom', custom);
            toolboxXml.appendChild(node);
            return node;
        }

        var toolboxGap = '<sep gap="5"></sep>'

        for (var name in toolboxObj) {
            var custom = null;
            if (name == 'xxxxxx') custom = 'xxxxxx';
            if (name == 'zzzzzz') custom = 'zzzzzz';
            getCategory(toolboxXml, name, custom).innerHTML = toolboxObj[name].join(toolboxGap);
            var node = document.createElement('sep');
            node.setAttribute('gap', 5 * 3);
            toolboxXml.appendChild(node);
        }

        return toolboxXml;
    }
    
var grammarFile="grammar Option;\r\n\r\noption\r\n    :   'option' BGNL\r\n        'default blockly generating:' defaultGenerating=BlocklyGenerating_List BGNL\r\n        'blockly runtime' BGNL blocklyRuntime=blocklyRuntimeStatement\r\n        'blocklyDiv' BGNL blocklyDiv=blocklyDivStatement\r\n        'toolbox' BGNL toolbox=toolboxStatement\r\n        'codeArea' BGNL codeArea=codeAreaStatement\r\n        'target' BGNL target=targetStatement\r\n    ;\r\n\r\nblocklyRuntimeStatement\r\n    :   'path' path=NormalString BGNL \r\n        'files' files=NormalString BGNL \r\n/* blocklyRuntimeStatement\r\ndefaultMap:{path:\"./\",files:'blockly_compressed.js, blocks_compressed.js, javascript_compressed.js, zh-hans.js'}\r\ncolor : this.blocklyRuntimeStatementColor\r\n*/\r\n;\r\n\r\nblocklyDivStatement\r\n    :   'dymanic' BGNL \r\n        'id' id=NormalString BGNL \r\n    # dymanicSizeBlocklyDiv\r\n    |   'fixed size' BGNL\r\n        'id' id=NormalString BGNL \r\n        'height' height=NormalString 'width' width=NormalString\r\n    # fixedSizeBlocklyDiv\r\n/* dymanicSizeBlocklyDiv\r\ndefaultMap:{id:\"blocklyDiv\"}\r\ncolor : this.blocklyDivStatementColor\r\n*/\r\n/* fixedSizeBlocklyDiv\r\ntooltip:height,width are only used in generated html\r\ndefaultMap:{id:\"blocklyDiv\",height:\"480px\",width:\"940px\"}\r\ncolor : this.blocklyDivStatementColor\r\n*/\r\n;\r\n\r\ntoolboxStatement\r\n    :   'function' BGNL\r\n        'id' id=NormalString 'function' func=RawString BGNL \r\n    # toolboxFunc\r\n    |   'default' BGNL\r\n        'id' id=NormalString 'gap' gap=Int BGNL\r\n    # toolboxDefault\r\n/* toolboxFunc\r\ndefaultMap:{id:\"toolbox\",func:\"function(){return document.getElementById('toolboxXml')}\"}\r\ncolor : this.toolboxStatementColor\r\n*/\r\n/* toolboxDefault\r\ndefaultMap:{id:\"toolbox\",gap:5}\r\ncolor : this.toolboxStatementColor\r\n*/\r\n;\r\n\r\ncodeAreaStatement\r\n    :   'output' output=RawString BGNL\r\n/* codeAreaStatement\r\ndefaultMap:{output:\"function(err,data){document.getElementById('codeArea').innerText=err?String(err):data}\"}\r\ncolor : this.codeAreaStatementColor\r\n*/\r\n;\r\n\r\ntargetStatement\r\n    :   'Keep grammar and antlr-blockly as source' BGNL\r\n    # keepGrammar\r\n    |   'Generate target source without keeping grammar' BGNL\r\n    # independentFile\r\n/* keepGrammar\r\ncolor : this.targetStatementColor\r\n*/\r\n/* independentFile\r\ncolor : this.targetStatementColor\r\n*/\r\n;\r\n\r\nstatExprSplit : '=== statement ^ === expression v ===' ;\r\n\r\n// expression\r\n//     :   expression MulDivAddSub_List expression\r\n//     |   idExpr\r\n//     |   intExpr\r\n//     ;\r\n\r\nBlocklyGenerating_List : 'JSON'|'TEXT';\r\nRawString: ('asdsaw'+)*;\r\nNormalString: ('asdsaw'+)*;\r\n\r\n\r\nInt :   [0-9]+ ;\r\nBool:   'true'|'false' ;\r\nColor:   'asdfgdh'* ;\r\nBGNL:   'asfvaswvr'? 'asdvaswvr'? ;\r\n\r\nMeaningfulSplit : '=== meaningful ^ ===' ;\r\n\r\nNEWLINE:'\\r'? '\\n' ; \r\nWS  :   [ \\t]+ -> skip ; \r\n\r\n\r\n/* Call_BeforeType\r\nthis.evisitor.blocklyRuntimeStatementColor=135;\r\nthis.evisitor.blocklyDivStatementColor=160;\r\nthis.evisitor.toolboxStatementColor=180;\r\nthis.evisitor.codeAreaStatementColor=200;\r\nthis.evisitor.targetStatementColor=220;\r\n*/\r\n\r\n/* Insert_FunctionStart\r\nfor (var key in OptionBlocks) {\r\n    if (OptionBlocks[key].json) {\r\n        OptionBlocks[key].json.nextStatement=undefined;\r\n    }\r\n}\r\n*/";
var option={"type":"option","defaultGenerating":"JSON","blocklyRuntime":{"type":"blocklyRuntimeStatement","path":"../../","files":"blockly_compressed.js, blocks_compressed.js, javascript_compressed.js, zh-hans.js"},"blocklyDiv":{"type":"fixedSizeBlocklyDiv","id":"blocklyDiv","height":"480px","width":"940px"},"toolbox":{"type":"toolboxFunc","id":"toolbox","func":"function(){return window.optionToolboxFunc()}"},"codeArea":{"type":"codeAreaStatement","output":"function(err,data){window.parent.postMessage(err?String(err):data,'*')}"},"target":{"type":"keepGrammar"}};
option.target.type="independentFile";
var converter = Converter.withOption(grammarFile,option);
var script = document.createElement('script');
script.innerHTML = converter.js.text();
document.body.appendChild(script);

    // receive messege
    codeArea = document.getElementById('codeArea')
    function initAsBlock(blockName) {
        var xml_text = OptionBlocks[blockName].xmlText();
        var xml = Blockly.Xml.textToDom('<xml>' + xml_text + '</xml>');
        OptionFunctions.workspace().clear();
        Blockly.Xml.domToWorkspace(xml, OptionFunctions.workspace());
    }
    function receiveFunc(event) {
        if (event.data._meta === 'blockName') {
            initAsBlock(event.data.blockName);
            return;
        }
        OptionFunctions.parse(event.data);
    }
    window.addEventListener("message", receiveFunc, false);
    