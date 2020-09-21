const {Converter} = require('./Converter')
const fs = require('fs')

// Converter.setfs(fs)
let grammerFile = fs.readFileSync('demos/motaAction/MotaActionPure.g4',{encoding:'utf-8'})
let converter = Converter.withOption(grammerFile,{
    "type": "option",
    "defaultGenerating": "JSON",
    "blocklyRuntime": {
        "type": "blocklyRuntimeStatement",
        "path": "blockly/",
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
        "type": "independentFile",
        "output": "function(html,js){}"
    }
})
fs.writeFileSync('gen/'+converter.html._name,converter.html.text(),{encoding:'utf8'})
fs.writeFileSync('gen/'+converter.js._name,converter.js.text(),{encoding:'utf8'})
if(!fs.existsSync('gen/blockly/blockly_compressed.js')) throw 'unzip blockly.3.20200402.1.zip to get blockly runtime `7z x blockly.3.20200402.1.zip -ogen/blockly`';
// let blocks=eval(['blocks_collection','blocks_field','blocks_block'].map(v=>converter.js[v]).join(''))
'end'