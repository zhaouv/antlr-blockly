/**
 * use : 
 * ---
 * 
 * converter = new Converter().main(grammerFile);
 * 
 * ---
 * 
 * converter = new Converter();
 * converter.main(grammerFile,{Function_0:function(){
 *   this.evisitor.statementColor=230;
 * }});
 * 
 * ---
 * 
 * converter = new Converter().main(grammerFile,{},'Abc.html');
 * 
 * ===
 * @param {!String} grammerFile is [.g4 File] as String
 */

antlr4 = require('./antlr4/index');
var BlocklyGrammerVisitor = require('./BlocklyGrammerVisitor').
  BlocklyGrammerVisitor;
var BlocklyGrammerLexer = require('./BlocklyGrammerLexer').BlocklyGrammerLexer;
var BlocklyGrammerParser = require('./BlocklyGrammerParser').BlocklyGrammerParser;
var Visitors = require('./Visitors');
var SymbolVisitor=Visitors.SymbolVisitor;
var EvalVisitor=Visitors.EvalVisitor;
var tpl = require('./tpl');

//__all__=['converter','Converter','antlr4'];

function Converter() {
  return this;
}

Converter.prototype.constructor = Converter;

Converter.prototype.init = function () {
  this.toolboxGap=5;
  this.toolboxId='toolbox';
  this.blocklyDivId='blocklyDiv';
  this.workSpaceName='workspace';
  this.codeAreaId='codeArea';
  return this;
}

Converter.prototype.main = function (grammerFile,functions,filename) {
  this.init();
  this.generBlocks(grammerFile,functions);
  this.renderGrammerName();
  this.generToolbox();
  this.generMainFile(functions);
  this.writeMainFile(filename);
  return this;
}

Converter.prototype.generBlocks = function(grammerFile,functions) {
  if(!functions)functions={};

  var temp_consoleError = console.error;
  console.error = function(err){throw new Error(err);}
  var chars = new antlr4.InputStream(grammerFile);
  var lexer = new BlocklyGrammerLexer(chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new BlocklyGrammerParser(tokens);
  parser.buildParseTrees = true;
  var tree = parser.grammarFile();
  console.error = temp_consoleError;
  
  //test: print all tokens
  //tokens.tokens.forEach(function(v){console.log(v.toString())});

  var svisitor = new SymbolVisitor().init();
  this.svisitor = svisitor;
  svisitor.visit(tree);
  console.log(svisitor);

  svisitor.checkSymbol();

  var evisitor = new EvalVisitor().init(svisitor,grammerFile);
  this.evisitor = evisitor;

  /* Function_0
  // 此处是整体修改
  // 能够修改以下变量
  this.evisitor.valueColor=330;
  this.evisitor.statementColor=160;
  this.evisitor.entryColor=230;

  this.evisitor.generLanguage='JavaScript';
  this.evisitor.recieveOrder='ORDER_ATOMIC';
  this.evisitor.sendOrder='ORDER_NONE';
  this.evisitor.varPrefix='';

  this.toolboxGap=5;
  this.toolboxId='toolbox';
  this.blocklyDivId='blocklyDiv';
  this.workSpaceName='workspace';
  this.codeAreaId='codeArea';
   */
  eval(this.evisitor.matchInject('Function_0'));
  if(functions['Function_0'])functions['Function_0'].call(this);

  evisitor.visit(tree);
  /* Function_1
  // 此处修改各个具体方块
   */
  eval(this.evisitor.matchInject('Function_1'));
  if(functions['Function_1'])functions['Function_1'].call(this);

  evisitor.generBlocks();
  console.log(evisitor);
  this.blocks = evisitor.blocks;
  
  /* Function_2
  // 此处是整体修改
  可以通过对this.blocks进行replace替换,
  修改各复杂词法规则的默认值
   */
  eval(this.evisitor.matchInject('Function_2'));
  if(functions['Function_2'])functions['Function_2'].call(this);
  return this;
}

Converter.prototype.renderGrammerName = function() {
  this.grammerName = this.svisitor.grammerName;
  this.generLanguage = this.evisitor.generLanguage;//在generBlocks中可修改

  var grammerName = this.grammerName;
  var generLanguage = this.generLanguage;

  this.OmitedError = tpl.OmitedError();
  this.Functions_pre = tpl.Functions_pre(grammerName);
  this.Functions_fieldDefault = tpl.Functions_fieldDefault(grammerName);
  this.Functions_defaultCode = tpl.Functions_defaultCode(grammerName);
  this.Functions_xmlText=tpl.Functions_xmlText(grammerName);
  this.Functions_blocksIniter = 
    tpl.Functions_blocksIniter(grammerName,generLanguage);

  this.mainFileTPL = tpl.mainFileTPL;
  return this;
}

Converter.prototype.generToolbox = function() {
  var text = [];
  text.push('{');
  text.push('    // 每个键值对作为一页');
  text.push('    "statement" : [');
  text.push('      // 所有语句块');
  for (var key in this.evisitor.statementRules){
    if (!this.evisitor.statementRules[key].type) continue;
    text.push('      '+this.grammerName+'Blocks["'+key+'"].xmlText(),');
  }
  text.push('    ],');
  text.push('    "value" : [');
  text.push('      // 所有值块');
  for (var key in this.evisitor.expressionRules){
    if (!this.evisitor.expressionRules[key].type) continue;
    text.push('      '+this.grammerName+'Blocks["'+key+'"].xmlText(),');
  }
  text.push('    ]');
  text.push('  }');
  var toolboxObj=text.join('\n');
  this.toolbox=tpl.ToolboxObj(this.toolboxId,toolboxObj,this.toolboxGap);
  return this;
}

Converter.prototype.generMainFile = function(functions){
  if(!functions)functions={};

  var text = [];

  var grammerName = this.grammerName;

  text.push(this.blocks);
  text.push('\n\n');
  text.push(this.OmitedError);
  text.push('\n\n');
  text.push(grammerName+'Functions={}\n\n');
  text.push(this.evisitor.matchInject('Functions'));
  /* Functions
  // 此处可以嵌入词法规则的转义函数,例如
  XxxFunctions.IdString_pre = function(IdString){
    if (IdString.indexOf('__temp_name__')!==-1) throw new Error('请修改__temp_name__');
    if (IdString && !(/^[a-zA-Z_][0-9a-zA-Z_\-]*$/.test(IdString)))throw new Error('id: '+IdString+'中包含了0-9 a-z A-Z _ - 之外的字符');
    return IdString;
  }
   */
  if(functions['Functions'])text.push(functions['Functions']);
  text.push('\n\n');
  text.push(this.Functions_pre);
  text.push('\n\n');
  text.push(this.Functions_fieldDefault);
  text.push('\n\n');
  text.push(this.Functions_defaultCode);
  text.push('\n\n');
  text.push(this.Functions_xmlText);
  text.push('\n\n');
  text.push(this.Functions_blocksIniter);
  text.push('\n\n');
  text.push(grammerName+'Functions.blocksIniter();\n\n');

  this.mainFile = this.mainFileTPL(
    grammerName,this.generLanguage,
    this.blocklyDivId,this.codeAreaId,
    this.toolbox,this.workSpaceName,this.toolboxId,
    text.join('')
  );
}

Converter.prototype.writeMainFile = function(filename) {
  if(!filename)filename=this.grammerName+'index.html';
  this.createAndDownloadFile(this.mainFile.join(''), filename, 'html');
}

///////////////////////////////////////////////////////////////////////////////

Converter.prototype.block = function(blockname) {
  var obj = this.evisitor.expressionRules[blockname];
  if(!obj) obj = this.evisitor.statementRules[blockname];
  if(!obj || obj.checklength===1)return null;
  return obj.blockjs;
}

/**
 * Create a file with the given attributes and download it.
 * from FactoryUtils.createAndDownloadFile
 * https://github.com/google/blockly/blob/master/demos/blockfactory/factory_utils.js
 * @param {string} contents The contents of the file.
 * @param {string} filename The name of the file to save to.
 * @param {string} fileType The type of the file to save.
 */
Converter.prototype.createAndDownloadFile = function(contents, filename, fileType) {
  var data = new Blob([contents], {type: 'text/' + fileType});
  var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
  });

  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(data);
  a.download = filename;
  a.textContent = 'Download file!';
  a.dispatchEvent(clickEvent);
};

exports.Converter = Converter;