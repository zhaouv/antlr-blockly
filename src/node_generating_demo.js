const {Converter} = require('./Converter')
const fs = require('fs')

let converter = new Converter()
converter.usefs(fs)