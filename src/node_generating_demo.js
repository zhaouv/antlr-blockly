const { Converter } = require('./Converter')
const fs = require('fs')

let grammarFile = fs.readFileSync('demos/option/Option.g4', { encoding: 'utf-8' })
let option = {
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
        "type": "independentFile"
    }
}
let converter = Converter.withOption(grammarFile, option)
fs.writeFileSync('gen/' + converter.html._name, converter.html.text(), { encoding: 'utf8' })
fs.writeFileSync('gen/' + converter.js._name, converter.js.text(), { encoding: 'utf8' })
if (!fs.existsSync('gen/blockly/blockly_compressed.js')) throw 'unzip blockly.3.20200402.1.zip to get blockly runtime `7z x blockly.3.20200402.1.zip -ogen/blockly`';
if (option.target.type === 'keepGrammar' && !fs.existsSync('gen/Converter.bundle.min.js')) throw 'copy Converter.bundle.min.js to get converter runtime `cp Converter.bundle.min.js gen/Converter.bundle.min.js`';
