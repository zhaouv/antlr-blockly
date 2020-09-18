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
 * converter = new Converter().main(grammerFile,null,'Abc.html');
 * 
 * ===
 * @param {!String} grammerFile is [.g4 File] as String
 */

var antlr4 = require('antlr4/index');
var BlocklyGrammerLexer = require('./gen/BlocklyGrammerLexer').BlocklyGrammerLexer;
var BlocklyGrammerParser = require('./gen/BlocklyGrammerParser').BlocklyGrammerParser;
var Visitors = require('./Visitors');
var SymbolVisitor = Visitors.SymbolVisitor;
var EvalVisitor = Visitors.EvalVisitor;
var tpl = require('./tpl');

/**
 * @class
 */
function Converter() {
    return this;
}

Converter.prototype.constructor = Converter;

Converter.prototype.init = function () {
    this.toolboxGap = 5;
    this.toolboxId = 'toolbox';
    this.blocklyDivId = 'blocklyDiv';
    this.workSpaceName = 'workspace';
    this.codeAreaId = 'codeArea';
    return this;
}

Converter.prototype.main = function (grammerFile, functions, filename) {
    this.init();
    this.generBlocks(grammerFile, functions);
    this.renderGrammerName();
    this.generToolbox();
    this.generMainFile(functions);
    this.writeMainFile(filename);
    return this;
}

Converter.prototype.loadOption = function (option) {
    this.option = option
    return this
}

Converter.prototype.generBlocks = function (grammerFile, functions) {
    if (!functions) functions = {};

    var temp_consoleError = console.error;
    console.error = function (err) { throw new Error(err); }
    var chars = new antlr4.InputStream(grammerFile);
    var lexer = new BlocklyGrammerLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new BlocklyGrammerParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.grammarFile();
    console.error = temp_consoleError;

    //test: print all tokens
    //tokens.tokens.forEach(function(v){console.log(v.toString())});

    var svisitor = new SymbolVisitor().init();
    this.svisitor = svisitor;
    svisitor.visit(tree);
    // console.log(svisitor);

    svisitor.checkSymbol();

    var evisitor = new EvalVisitor().init(svisitor, grammerFile);
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
    if (functions['Function_0']) functions['Function_0'].call(this);

    evisitor.visit(tree);
    /* Function_1
    // 此处修改各个具体方块
     */
    eval(this.evisitor.matchInject('Function_1'));
    if (functions['Function_1']) functions['Function_1'].call(this);

    evisitor.generBlocks();
    // console.log(evisitor);

    this.blocks_collection = evisitor.blocks_collection;
    this.blocks_field = evisitor.blocks_field;
    this.blocks_block = evisitor.blocks_block;

    /* Function_2
    // 此处是整体修改
    可以通过对this.blocks进行replace替换,
    修改各复杂词法规则的默认值
     */
    eval(this.evisitor.matchInject('Function_2'));
    if (functions['Function_2']) functions['Function_2'].call(this);
    return this;
}

Converter.prototype.renderGrammerName = function () {
    this.grammerName = this.svisitor.grammerName;
    this.generLanguage = this.evisitor.generLanguage;//在generBlocks中可修改

    var grammerName = this.grammerName;
    var generLanguage = this.generLanguage;

    this.OmitedError = tpl.OmitedError();
    this.Functions_pre = tpl.Functions_pre(grammerName);
    this.Functions_fieldDefault = tpl.Functions_fieldDefault(grammerName);
    this.Functions_defaultCode = tpl.Functions_defaultCode(grammerName);
    this.Functions_xmlText = tpl.Functions_xmlText(grammerName);
    this.Functions_blocksIniter =
        tpl.Functions_blocksIniter(grammerName, generLanguage);

    this.mainFileTPL = tpl.mainFileTPL;
    return this;
}

Converter.prototype.generToolbox = function () {
    var text = [];
    text.push('{');
    text.push('        // 每个键值对作为一页');
    text.push('        "statement": [');
    text.push('            // 所有语句块');
    for (var key in this.evisitor.statementRules) {
        if (!this.evisitor.statementRules[key].type) continue;
        text.push('            ' + this.grammerName + 'Blocks["' + key + '"].xmlText(),');
    }
    text.push('        ],');
    text.push('        "value": [');
    text.push('            // 所有值块');
    for (var key in this.evisitor.expressionRules) {
        if (!this.evisitor.expressionRules[key].type) continue;
        text.push('            ' + this.grammerName + 'Blocks["' + key + '"].xmlText(),');
    }
    text.push('        ]');
    text.push('    }');
    var toolboxObj = text.join('\n');
    this.toolbox = tpl.ToolboxObj(this.toolboxId, toolboxObj, this.toolboxGap);
    return this;
}

Converter.prototype.generMainFile = function (functions) {
    if (!functions) functions = {};

    var grammerName = this.grammerName;

    this.js = {
        blocks_collection: this.blocks_collection + '\n\n',
        blocks_field: this.blocks_field + '\n\n',
        blocks_block: this.blocks_block + '\n\n',
        OmitedError: this.OmitedError + '\n\n',
        Functions_define: grammerName + 'Functions={}\n\n',
        injectFunctions: this.evisitor.matchInject('Functions'),
        insertFunctions: functions['Functions'] || '',
        Functions_pre: this.Functions_pre + '\n\n',
        Functions_fieldDefault: this.Functions_fieldDefault + '\n\n',
        Functions_defaultCode: this.Functions_defaultCode + '\n\n',
        Functions_xmlText: this.Functions_xmlText + '\n\n',
        Functions_blocksIniter: this.Functions_blocksIniter + '\n\n',
        callIniter: grammerName + 'Functions.blocksIniter();\n\n',
        toolbox: this.toolbox + '\n\n',
    }
    this.html = {
    }

    var mainFile = this.mainFileTPL(
        grammerName, this.generLanguage,
        this.blocklyDivId, this.codeAreaId,
        this.workSpaceName, this.toolboxId,
    );

    var text = function () {
        var obj = this
        return obj._text.map(function (v) { return obj[v] }).join('')
    }
    Object.assign(this.html, mainFile.html)
    Object.assign(this.js, mainFile.js)
    this.html._text = [
        // from tpl
        'htmlStart',
        'headScripts',
        'head_body',
        'bodyContent',
        'bodyScripts',
        'htmlEnd'
    ]
    this.js._text = [
        'blocks_collection',
        'blocks_field',
        'blocks_block',
        'OmitedError',
        'Functions_define',
        'injectFunctions',
        'insertFunctions',
        'Functions_pre',
        'Functions_fieldDefault',
        'Functions_defaultCode',
        'Functions_xmlText',
        'Functions_blocksIniter',
        'callIniter',
        'toolbox',
        // from tpl
        'BlocklyInject',
        'checkUpdateFunction',
        'disableOrphans',
        'debugFunctions'
    ]
    this.html._name = 'index.html'
    this.js._name = this.grammerName + '.js'
    this.html.text = text
    this.js.text = text
}

///////////////////////////////////////////////////////////////////////////////

Converter.prototype.block = function (blockname) {
    var obj = this.evisitor.expressionRules[blockname];
    if (!obj) obj = this.evisitor.statementRules[blockname];
    if (!obj || obj.checklength === 1) return null;
    return obj.blockjs;
}

exports.Converter = Converter;