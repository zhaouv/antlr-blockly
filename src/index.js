// Entrance for webpack, do not use for other cases

// Strange but working format
// To make the bundle.min.js available in both browser and node
export let Converter = require('./Converter').Converter;
if (typeof exports!=='undefined') exports.Converter = require('./Converter').Converter;
if (typeof window!=='undefined') window.Converter = require('./Converter').Converter;
