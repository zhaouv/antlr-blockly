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
    // "toolbox": { "type": "toolboxDefault", "id": "toolbox", "gap": 5 },
    "toolbox": {
        "type": "toolboxFunc",
        "id": "toolbox",
        "func": "function(){return window.optionToolboxFunc()}"
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


converter.html.bodyDebugButtons = ``
converter.html.head_body = `
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

converter.html.bodyScripts_keepGrammar = `
<script src="../../Converter.bundle.min.js"></script>
<script src="./Option.js"></script>
`

function jsContent(params) {
    // mark for split
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
    // mark for split
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
    // mark for split
}

converter.js._text.splice(1, 0, 'toolboxObj')
converter.js._text.push('message')
let jsContents = jsContent.toString().split('// mark for split')
converter.js.toolboxObj = jsContents[1]
converter.js.message = jsContents[2]

fs.writeFileSync('demos/option/' + 'iframe.html', converter.html.text(), { encoding: 'utf8' })
fs.writeFileSync('demos/option/' + converter.js._name, converter.js.text(), { encoding: 'utf8' })


