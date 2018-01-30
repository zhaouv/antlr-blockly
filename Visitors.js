
var antlr4 = require('./antlr4/index');
var BlocklyGrammerVisitor = require('./BlocklyGrammerVisitor').
  BlocklyGrammerVisitor;

function SymbolVisitor() {
	BlocklyGrammerVisitor.call(this);
	return this;
}

SymbolVisitor.prototype = Object.create(BlocklyGrammerVisitor.prototype);
SymbolVisitor.prototype.constructor = SymbolVisitor;

SymbolVisitor.prototype.init = function() {
  this.statementRules=[];
  this.expressionRules=[];
  this.expression_arithmetic_num=0;
  this.lexerRules={};
  return this;
}

SymbolVisitor.prototype.error = function(error) {
  throw(new Error(error));
}

SymbolVisitor.prototype.checkSymbol = function() {
  var checkdict = {}
  var filter_ = function(list,name) {
    for(var ii=0,value;value=list[ii];ii++){
      if (value[0]===name) return value[1];
    }
    return [];
  }
  for(var ii=0,statementRule;statementRule=this.statementRules[ii];ii++){
    if (statementRule[1].length>1){
      for(var jj=0,statename;statename=statementRule[1][jj];jj++){
        if (checkdict[statename]) {
          this.error('语句 '+statename
          +' 同时在两个语句集合 '+checkdict[statename]
          +' 和 '+statementRule[0]+' 中出现了');
        }
        checkdict[statename] = statementRule[0];
        if (filter_(this.statementRules,statename).length>1){
          this.error(statementRule[0]+' 下的子规则 '+statename+' 包含了"|"');
        }
      }
    }
  }
  for(var ii=0,expressionRule;expressionRule=this.expressionRules[ii];ii++){
    if (expressionRule[1].length>1 && expressionRule[0]!=='expression'){
      this.error('表达式 '+expressionRule[0]+' 包含了"|"');
    }
  }
}

// Visit a parse tree produced by BlocklyGrammerParser#grammarFile.
SymbolVisitor.prototype.visitGrammarFile = function(ctx) {
  this.visit(ctx.statementRule());
  this.visit(ctx.expressionRule());
  this.visit(ctx.lexerRuleCollection(0));
  return this;
};

// Visit a parse tree produced by BlocklyGrammerParser#StatList.
SymbolVisitor.prototype.visitStatList = function(ctx) {
  var pIds = ctx.ParserIdentifier();
  for(var ii=0,value;value=pIds[ii];ii++){
    pIds[ii]=value.getText();
  }
  var statId = pIds.shift();
  this.statementRules.push([statId,pIds]);
};

// Visit a parse tree produced by BlocklyGrammerParser#StatValue.
SymbolVisitor.prototype.visitStatValue = function(ctx) {
  var statId = ctx.ParserIdentifier(0).getText();
  this.statementRules.push([statId,[statId]]);
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprList.
SymbolVisitor.prototype.visitExprList = function(ctx) {
  var exprs=[];
  this.expression_arithmetic_num=ctx.arithmeticRuleCollection().length;
  for(var ii=0;ii<this.expression_arithmetic_num;ii++){
    var exprname = 'expression_arithmetic_'+ii;
    exprs.push(exprname);
    this.expressionRules.push([exprname,[exprname]]);
  }
  var pIds = ctx.ParserIdentifier();
  for(var ii=0,value;value=pIds[ii];ii++){
    pIds[ii]=value.getText();
  }
  exprs=exprs.concat(pIds);
  this.expressionRules.push(['expression',exprs]);
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprValue.
SymbolVisitor.prototype.visitExprValue = function(ctx) {
  var exprId = ctx.ParserIdentifier(0).getText();
  this.expressionRules.push([exprId,[exprId]]);
};

// Visit a parse tree produced by BlocklyGrammerParser#lexerRuleCollection.
SymbolVisitor.prototype.visitLexerRuleCollection = function(ctx) {
  var lexerRules = ctx.lexerRule() || [];
  for(var ii=0,value;value=lexerRules[ii];ii++){
    var lexerId = value.LexerIdentifier(0).getText();
    this.lexerRules[lexerId]='';
  }
};

//============================================================================

function EvalVisitor() {
	BlocklyGrammerVisitor.call(this);
	return this;
}

EvalVisitor.prototype = Object.create(BlocklyGrammerVisitor.prototype);
EvalVisitor.prototype.constructor = EvalVisitor;

/**
 * @param {!SymbolVisitor} symbols SymbolVisitor.
 */
EvalVisitor.prototype.init = function(symbols) {
  var convert = function(rules){
    var ruledict = {}
    for(var ii=0,rule;rule=rules[ii];ii++){
      ruledict[rule[0]]={
        'check':rule[1],
        'user':{}
      }
    }
    return ruledict;
  }
  this.statementRules=convert(symbols.statementRules);
  this.expressionRules=convert(symbols.expressionRules);
  this.lexerRules=symbols.lexerRules;
  this.notentry = {}
  this.valueColor='valuecolor_oeusrderehrhnggb';//占位符
  this.statementColor='statementcolor_fuefheishfjawflb';
  this.valueColorHue=330;
  this.statementColorHue=160;
  return this;
}

EvalVisitor.prototype.getOutputString = function() {
  var evisitor_ = Object.assign({},evisitor);
  delete(evisitor_.valueColor);
  delete(evisitor_.statementColor);
  var str_ = JSON.stringify(evisitor_,null,4);
  str_ = str_.split('"'+this.valueColor+'"').join(this.valueColorHue);
  str_ = str_.split('"'+this.statementColor+'"').join(this.statementColorHue);
  return str_;
}

EvalVisitor.prototype.error = function(error) {
  throw(new Error(error));
}

EvalVisitor.prototype.setRule = function(type,name,value) {
  if (type==='lexer') {
    this.lexerRules[name]=value;
  }
  if (type==='statement') {
    this.statementRules[name]=value;
  }
  if (type==='value') {
    this.expressionRules[name]=value;
  }
}

EvalVisitor.prototype.getRule = function(type,name) {
  if (type==='lexer') {
    return this.lexerRules[name];
  }
  if (type==='statement') {
    return this.statementRules[name];
  }
  if (type==='value') {
    return this.expressionRules[name];
  }
}

EvalVisitor.prototype.escapeString = function(string_) {
  return eval(string_);
}

EvalVisitor.prototype.initAssemble = function(obj) {
  //把parserRuleAtom中获取的参数初步组装起来
  var args0 = [];
  obj.vars = [];//会包含null
  for(var ii=0,args,ids={};args=obj.args[ii];ii++){
    var args_ = Object.assign({},args.data);
    if (args.id) {
      ids[args.id]=ids[args.id]?ids[args.id]:0;
      args_.name=args.id+'_'+ids[args.id];
      ids[args.id]++;
      if (args.blockType!=='getFieldValue') {
        var childvalue = this.getRule(args.blockType.slice(0,-6),args.id);
        var check = childvalue.check;
        args_.check=check.length===1?check[0]:check;
        childvalue.user[obj.name]=obj.type;
        this.notentry[args.id]=true;
        this.setRule(args.blockType.slice(0,-6),args.id,childvalue);
      }
    }
    obj.vars.push(args_.name?args_.name:null);
    args0.push(args_);
  }
  var blockjs = {
    'type': obj.name,
    'message0': obj.message.join(' '),
    'args0': args0,
    'inputsInline': true,
    'tooltip': '',
    'helpUrl': ''
  }
  if (args0.length===0){
    delete(blockjs.args0);
  }
  var value = this.getRule(obj.type,obj.name);
  var check = value.check;
  check = check.length===1?check[0]:check;
  if (obj.type==='value') {
    blockjs.colour=this.valueColor;
    blockjs.output=check;
  } else { //statement
    blockjs.colour=this.statementColor;
    blockjs.previousStatement=check;
    blockjs.nextStatement=check;
    //statement的拼接处理初始化之后再处理
  }
  value.blockjs = blockjs;
  value.blockobj = obj;
  this.setRule(obj.type,obj.name,value);
}

EvalVisitor.prototype.assemble = function() {
  //第一轮遍历语句:处理语句集合的拼接
  var rulekeys = Object.keys(this.statementRules);
  for(var ii=0,stateRule;stateRule=this.statementRules[rulekeys[ii]];ii++){
    if (stateRule.check.length>1){
      this.notentry[rulekeys[ii]]=true;
      for(var jj=0,subStateRule;subStateRule=stateRule.check[jj];jj++){
        var value = this.getRule('statement',subStateRule);
        value.blockjs.nextStatement = stateRule.check;
        //此时statement的拼接才是正确的
        this.setRule('statement',subStateRule,value);
        this.notentry[subStateRule]=true;
      }
    }
  }
  //第二轮遍历语句:处理入口方块的拼接
  for(var ii=0,stateRule;stateRule=this.statementRules[rulekeys[ii]];ii++){
    if(!this.notentry[rulekeys[ii]]) {
      this.notentry[rulekeys[ii]]=false;
      delete(stateRule.blockjs.previousStatement);
      delete(stateRule.blockjs.nextStatement);
    }
  }
  //此时blockjs已经是各方块的完整的描述了
  //未完成  ==================================================
}

EvalVisitor.prototype.SpeicalLexerRule = function(lexerId) {
  var lexervalue = {};
  if (lexerId==='Bool') {
    lexervalue = {
      'type':'field_checkbox',
      'checked':true
    }
    this.setRule('lexer',lexerId,lexervalue);
    return true;
  }
  if (lexerId==='Int') {
    lexervalue = {
      'type': 'field_number',
      'value': 0,
      'min': 0,
      'precision': 1
    }
    this.setRule('lexer',lexerId,lexervalue);
    return true;
  }
  if (lexerId==='Number') {
    lexervalue = {
      'type': 'field_number',
      'value': 0,
    }
    this.setRule('lexer',lexerId,lexervalue);
    return true;
  }
  if (lexerId==='BGNL') {
    lexervalue = {
      'type': 'input_dummy'
    }
    this.setRule('lexer',lexerId,lexervalue);
    return true;
  }
  return false;
};

// Visit a parse tree produced by BlocklyGrammerParser#grammarFile.
EvalVisitor.prototype.visitGrammarFile = function(ctx) {
  this.visit(ctx.lexerRuleCollection(0));
  this.visit(ctx.statementRule());
  this.expression_arithmetic_num=0;
  this.visit(ctx.expressionRule());
  this.assemble();
};

// Visit a parse tree produced by BlocklyGrammerParser#strings.
EvalVisitor.prototype.visitStrings = function(ctx) {
  var Strings = ctx.String();
  for(var ii=0,value;value=Strings[ii];ii++){
    Strings[ii]=this.escapeString(value.getText());
  }
  return Strings.join(' ');
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleStrings.
EvalVisitor.prototype.visitLexerRuleStrings = function(ctx) {
  var lexerId = ctx.LexerIdentifier(0).getText();
  if (this.SpeicalLexerRule(lexerId)) return;
  var strings = this.visit(ctx.strings(0));
  this.setRule('lexer',lexerId,strings);
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleList.
EvalVisitor.prototype.visitLexerRuleList = function(ctx) {
  var lexerId = ctx.LexerIdentifier(0).getText();
  if (this.SpeicalLexerRule(lexerId)) return;
  if (lexerId.slice(-5)!=='_List') {
    this.visitLexerRuleComplex(ctx);
    return;
  }
  var strings = ctx.strings();
  for(var ii=0,value;value=strings[ii];ii++){
    var string_ = this.visit(value);
    strings[ii] = [string_,string_];
  }
  var lexervalue = {
    'type':'field_dropdown',
    'options':strings
  }
  this.setRule('lexer',lexerId,lexervalue);
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleComplex.
EvalVisitor.prototype.visitLexerRuleComplex = function(ctx) {
  var lexerId = ctx.LexerIdentifier(0).getText();
  if (this.SpeicalLexerRule(lexerId)) return;
  var lexervalue = {
    'type': 'field_input',
    'text': lexerId+'_default'
  }
  this.setRule('lexer',lexerId,lexervalue);
};

// Visit a parse tree produced by BlocklyGrammerParser#StatValue.
EvalVisitor.prototype.visitStatValue = function(ctx) {
  //ParserIdentifier ':' parserRuleAtom* ';'
  this.status={
    'name': ctx.ParserIdentifier(0).getText(),
    'type': 'statement',
    'message': [],
    'args': []
  }
  this.visitChildren(ctx);
  var obj = this.status;
  delete(this.status);
  this.initAssemble(obj);
};

// Visit a parse tree produced by BlocklyGrammerParser#arithmeticRuleCollection.
BlocklyGrammerVisitor.prototype.visitArithmeticRuleCollection = function(ctx) {
  //'expression' parserRuleAtom* '|'
  this.status={
    'name': 'expression',
    'type': 'value',
    'message': ['%1'],
    'args': [
      {
        'id': 'expression',
        'blockType': 'valueToCode',
        'omitted': false,
        'data': {
          'type': 'input_value'
        }
      }
    ]
  }
  this.visitChildren(ctx);
  this.status.name='expression_arithmetic_'+this.expression_arithmetic_num;
  this.expression_arithmetic_num++;
  var obj = this.status;
  delete(this.status);
  this.initAssemble(obj);
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprValue.
BlocklyGrammerVisitor.prototype.visitExprValue = function(ctx) {
  //ParserIdentifier ':' parserRuleAtom* ';'
  this.status={
    'name': ctx.ParserIdentifier(0).getText(),
    'type': 'value',
    'message': [],
    'args': []
  }
  this.visitChildren(ctx);
  var obj = this.status;
  delete(this.status);
  this.initAssemble(obj);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomExpr.
EvalVisitor.prototype.visitParserAtomExpr = function(ctx) {
  //'expression' '?'?
  var parservalue={
    'id': 'expression',
    'blockType': 'valueToCode',
    'omitted': ctx.children.length>1,
    'data': {
      'type': 'input_value'
    }
  }
  this.status.args.push(parservalue);
  this.status.message.push('%'+this.status.args.length);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomParserId.
EvalVisitor.prototype.visitParserAtomParserId = function(ctx) {
  //ParserIdentifier ('+' | '*' | '?')?
  var parserId = ctx.children[0].getText();
  var ex = (ctx.children.length>1 && ctx.children[1].getText()) || '';
  var blockType = this.getRule('value',parserId)?'value':'statement';
  var parservalue={
    'id':parserId,
    'blockType': blockType+'ToCode',
    'omitted': ex==='?' || ex==='*',
    'multi': ex==='+' || ex==='*',
    'data': {
      'type': 'input_'+blockType
    }
  }
  if (blockType==='value' && parservalue.multi) {
    this.error(this.status.name+' 下出现了复数组合的表达式 '+parserId+ex);
  }
  this.status.args.push(parservalue);
  this.status.message.push('%'+this.status.args.length);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomLexerId.
EvalVisitor.prototype.visitParserAtomLexerId = function(ctx) {
  //LexerIdentifier '?'?
  var lexerId = ctx.children[0].getText();
  var lexervalue = this.getRule('lexer',lexerId);
  if (!lexervalue) return;
  var parservalue={
    'id': lexerId,
    'blockType': 'getFieldValue',
    'omitted': ctx.children.length>1,
    'data': lexervalue
  }
  if (lexerId==='BGNL') {
    parservalue={'data': lexervalue}
  }
  if (typeof(lexervalue)===typeof('')) {
    //没有打'?'的纯文本lexerRule才会显示
    if (ctx.children.length===1)this.status.message.push(lexervalue);
    return;
  }
  this.status.args.push(parservalue);
  this.status.message.push('%'+this.status.args.length);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomStr.
EvalVisitor.prototype.visitParserAtomStr = function(ctx) {
  //String
  var string_ = this.escapeString(ctx.String().getText());
  this.status.message.push(string_);
};

exports.SymbolVisitor = SymbolVisitor;
exports.EvalVisitor = EvalVisitor;