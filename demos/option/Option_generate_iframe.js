const { Converter } = require('../../src/Converter')
const fs = require('fs')

// Converter.setfs(fs)
let grammarFile = fs.readFileSync('demos/option/Option.g4', { encoding: 'utf-8' })
let option = {
    "type": "option",
    "defaultGenerating": "JSON",
    "blocklyRuntime": {
        "type": "blocklyRuntimeStatement",
        "path": "../../",
        "files": "blockly_compressed.js, blocks_compressed.js, javascript_compressed.js, zh-hans.js"
    },
    "blocklyDiv": {
        "type": "fixedSizeBlocklyDiv",
        "id": "blocklyDiv",
        "height": "480px",
        "width": "940px"
    },
    "toolbox": {
        "type": "toolboxDefault",
        "id": "toolbox",
        "gap": 5
    },
    "codeArea": {
        "type": "codeAreaStatement",
        "output": "function(err,data){window.parent.postMessage(err?String(err):data,'*')}"
    },
    "target": {
        "type": "keepGrammar"
    }
}
let converter = Converter.withOption(grammarFile, option)


converter.html.bodyDebugButtons=``
converter.html.head_body=`
<style>
    body {
        margin:0 0 0 0;
    }
    #codeArea {
        display: none;
    }
</style>
</head>
<body>
`

converter.html.bodyScripts_keepGrammar=`
<script src="../../Converter.bundle.min.js"></script>
<script src="./Option.js"></script>
`

function jsContent(params) {
    // mark for split
    // receive messege
    codeArea=document.getElementById('codeArea')
    function initAsBlock(blockName){
        var xml_text = OptionBlocks[blockName].xmlText();
        var xml = Blockly.Xml.textToDom('<xml>'+xml_text+'</xml>');
        OptionFunctions.workspace().clear();
        Blockly.Xml.domToWorkspace(xml, OptionFunctions.workspace());
    }
    function receiveFunc(event) {
        if (event.data._meta==='blockName') {
            initAsBlock(event.data.blockName);
            return;
        }
        OptionFunctions.parse(event.data);
    }
    window.addEventListener("message", receiveFunc, false);
    // mark for split
}

converter.js._text.push('message')
converter.js.message = jsContent.toString().split('// mark for split')[1]

fs.writeFileSync('demos/option/' + converter.html._name, converter.html.text(), { encoding: 'utf8' })
fs.writeFileSync('demos/option/' + converter.js._name, converter.js.text(), { encoding: 'utf8' })


