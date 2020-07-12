const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  node: { module: "empty", net: "empty", fs: "empty" },
  entry: {
    Converter: "./src/index",
  },
  output: {
    path: __dirname ,
    filename: "[name].bundle.min.js"
  },
  plugins: [
    new UglifyJsPlugin()
  ]
}