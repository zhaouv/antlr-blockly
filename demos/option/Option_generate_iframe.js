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
        "output": "function(err,data){document.getElementById('codeArea').innerText=err?String(err):data}"
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


fs.writeFileSync('demos/option/' + converter.html._name, converter.html.text(), { encoding: 'utf8' })
fs.writeFileSync('demos/option/' + converter.js._name, converter.js.text(), { encoding: 'utf8' })


