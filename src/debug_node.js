const {Converter} = require('./Converter')
const fs = require('fs')

let grammerFile = fs.readFileSync('demos/motaAction/MotaActionPure.g4',{encoding:'utf-8'})

let converter = new Converter()
converter.init();
converter.generBlocks(grammerFile);
converter.renderGrammerName();
converter.generToolbox();
converter.generMainFile();
