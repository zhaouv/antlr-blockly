/**
 * use : 
 * ---
 * 
 * converter = new Converter().main(grammarFile);
 * 
 * ---
 * 
 * converter = new Converter();
 * converter.main(grammarFile,{Call_BeforeType:function(){
 *   this.evisitor.statementColor=230;
 * }});
 * 
 * ---
 * 
 * converter = new Converter().main(grammarFile,null);
 * 
 * ===
 * @param {!String} grammarFile is [.g4 File] as String
 */

var antlr4 = require('antlr4/index');
var BlocklyGrammarLexer = require('./gen/BlocklyGrammarLexer').BlocklyGrammarLexer;
var BlocklyGrammarParser = require('./gen/BlocklyGrammarParser').BlocklyGrammarParser;
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


Converter.withOption = function (grammarFile, option) {
    // throw 'unfinished';
    var converter = new this();
    // converter.option = option;

    converter.init();
    converter.defaultGenerating = option.defaultGenerating;
    converter.blocklyDivId = option.blocklyDiv.id;
    converter.blocklyRuntimePath = option.blocklyRuntime.path;
    converter.blocklyRuntimeFiles = option.blocklyRuntime.files;
    if (option.blocklyDiv.type === 'fixedSizeBlocklyDiv') {
        converter.blocklyDivFixedSizeStyle = `style="height: ${option.blocklyDiv.height}; width: ${option.blocklyDiv.width};"`;
    }
    converter.toolboxId = option.toolbox.id;
    if (option.toolbox.type === 'toolboxDefault') {
        converter.toolboxGap = option.toolbox.gap;
    }

    converter.generBlocks(grammarFile, {});
    converter.renderGrammarName();

    if (option.toolbox.type === 'toolboxFunc') {
        converter.toolbox = `var ${converter.toolboxId} = (${option.toolbox.func})();`;
    }
    if (option.toolbox.type === 'toolboxDefault') {
        converter.generToolbox();
    }
    converter.codeAreaFunc = option.codeArea.output;
    converter.generMainFile({});
    if (option.blocklyDiv.type === 'dymanicSizeBlocklyDiv') {
        converter.html._text[converter.html._text.indexOf('bodyContent')] = 'bodyContent_dymanicSize';
        converter.js._text.push('dymanicSize');
    }

    if (option.target.type === 'independentFile') {
    }
    if (option.target.type === 'keepGrammar') {
        converter.html._text[converter.html._text.indexOf('bodyScripts')] = 'bodyScripts_keepGrammar';
        converter.js._text = ['generatedMark','keepGrammar']
        converter.js.keepGrammar = converter.js.keepGrammar.replace('__grammarFile__', JSON.stringify(grammarFile))
            .replace('__option__', JSON.stringify(option));
    }

    return converter;
}

Converter.prototype.main = function (grammarFile, functions) {
    this.init();
    this.generBlocks(grammarFile, functions);
    this.renderGrammarName();
    this.generToolbox();
    this.generMainFile(functions);
    return this;
}

Converter.prototype.init = function () {
    this.toolboxGap = 5;
    this.toolboxId = 'toolbox';
    this.blocklyDivId = 'blocklyDiv';
    this.blocklyDivFixedSizeStyle = 'style="height: 480px; width: 940px;"';
    this.workSpaceName = 'workspace';
    this.codeAreaId = 'codeArea';
    this.codeAreaFunc = 'function(err,data){codeAreaElement.innerText = err?String(err):data}';
    this.defaultGenerating = 'JSON';
    this.blocklyRuntimePath = './';
    this.blocklyRuntimeFiles = 'blockly_compressed.js, blocks_compressed.js, javascript_compressed.js, zh-hans.js';
    return this;
}

Converter.prototype.generBlocks = function (grammarFile, functions) {
    if (!functions) functions = {};

    var temp_consoleError = console.error;
    console.error = function (err) { throw new Error(err); }
    var chars = new antlr4.InputStream(grammarFile);
    var lexer = new BlocklyGrammarLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new BlocklyGrammarParser(tokens);
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

    var evisitor = new EvalVisitor().init(svisitor, grammarFile);
    this.evisitor = evisitor;

    /* Call_BeforeType
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
    eval(this.evisitor.matchInject('Call_BeforeType'));
    if (functions['Call_BeforeType']) functions['Call_BeforeType'].call(this);

    evisitor.visit(tree);
    /* Call_BeforeBlock
    // 此处修改各个具体方块
     */
    eval(this.evisitor.matchInject('Call_BeforeBlock'));
    if (functions['Call_BeforeBlock']) functions['Call_BeforeBlock'].call(this);

    evisitor.generBlocks();
    // console.log(evisitor);

    this.blocks_collection = evisitor.blocks_collection;
    this.blocks_field = evisitor.blocks_field;
    this.blocks_block = evisitor.blocks_block;

    return this;
}

Converter.prototype.renderGrammarName = function () {
    this.grammarName = this.svisitor.grammarName;
    this.generLanguage = this.evisitor.generLanguage;//在generBlocks中可修改

    var grammarName = this.grammarName;
    var generLanguage = this.generLanguage;
    var defaultGenerating = this.defaultGenerating;

    this.OmitedError = tpl.OmitedError();
    this.Functions_pre = tpl.Functions_pre(grammarName);
    this.Functions_fieldDefault = tpl.Functions_fieldDefault(grammarName);
    this.Functions_defaultCode = tpl.Functions_defaultCode(grammarName, defaultGenerating);
    this.Functions_xmlText = tpl.Functions_xmlText(grammarName);
    this.Functions_blocksIniter =
        tpl.Functions_blocksIniter(grammarName, generLanguage);

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
        text.push('            ' + this.grammarName + 'Blocks["' + key + '"].xmlText(),');
    }
    text.push('        ],');
    text.push('        "value": [');
    text.push('            // 所有值块');
    for (var key in this.evisitor.expressionRules) {
        if (!this.evisitor.expressionRules[key].type) continue;
        text.push('            ' + this.grammarName + 'Blocks["' + key + '"].xmlText(),');
    }
    text.push('        ]');
    text.push('    }');
    var toolboxObj = text.join('\n');
    this.toolbox = tpl.ToolboxObj(this.toolboxId, toolboxObj, this.toolboxGap);
    return this;
}

Converter.prototype.generMainFile = function (functions) {
    if (!functions) functions = {};

    var grammarName = this.grammarName;

    this.js = {
        blocks_collection: this.blocks_collection + '\n\n',
        blocks_field: this.blocks_field + '\n\n',
        blocks_block: this.blocks_block + '\n\n',
        OmitedError: this.OmitedError + '\n\n',
        Functions_define: grammarName + 'Functions={}\n\n',
        Insert_FunctionStart: this.evisitor.matchInject('Insert_FunctionStart'),
        Functions_pre: this.Functions_pre + '\n\n',
        Functions_fieldDefault: this.Functions_fieldDefault + '\n\n',
        Functions_defaultCode: this.Functions_defaultCode + '\n\n',
        Functions_xmlText: this.Functions_xmlText + '\n\n',
        Functions_blocksIniter: this.Functions_blocksIniter + '\n\n',
        Insert_BeforeCallIniter: this.evisitor.matchInject('Insert_BeforeCallIniter'),
        callIniter: grammarName + 'Functions.blocksIniter();\n\n',
        toolbox: this.toolbox + '\n\n',
    }
    this.html = {
    }

    var mainFile = this.mainFileTPL(
        grammarName, this.generLanguage,
        this.blocklyRuntimePath, this.blocklyRuntimeFiles,
        this.blocklyDivId, this.blocklyDivFixedSizeStyle,
        this.codeAreaId, this.codeAreaFunc,
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
        'generatedMark',
        'htmlStart',
        'headScripts',
        'head_body',
        'bodyDebugButtons',
        'bodyContent',
        'bodyScripts',
        'htmlEnd'
    ]
    this.js._text = [
        // from tpl
        'generatedMark',
        // from this Class
        'blocks_collection',
        'blocks_field',
        'blocks_block',
        'OmitedError',
        'Functions_define',
        'Insert_FunctionStart',
        'Functions_pre',
        'Functions_fieldDefault',
        'Functions_defaultCode',
        'Functions_xmlText',
        'Functions_blocksIniter',
        'Insert_BeforeCallIniter',
        'callIniter',
        'toolbox',
        // from tpl
        'BlocklyInject',
        'checkUpdateFunction',
        'disableOrphans',
        'debugFunctions'
    ]
    this.html._name = 'index.html'
    this.js._name = grammarName + '.js'
    this.html.text = text
    this.js.text = text

    /* Call_AfterAllContent
     */
    eval(this.evisitor.matchInject('Call_AfterAllContent'));
    if (functions['Call_AfterAllContent']) functions['Call_AfterAllContent'].call(this);

    return this
}

///////////////////////////////////////////////////////////////////////////////

Converter.prototype.block = function (blockname) {
    var obj = this.evisitor.expressionRules[blockname];
    if (!obj) obj = this.evisitor.statementRules[blockname];
    if (!obj || obj.checklength === 1) return null;
    return obj.blockjs;
}

exports.Converter = Converter;