const {Converter} = require('./Converter')
const fs = require('fs')

// Converter.setfs(fs)
let converter = Converter.withOption({
    "type": "option",
    "defaultGenerating": "JSON",
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
        "type": "independentFile",
        "output": "function(html,js){console.log(html,js)}"
    }
})
'end'