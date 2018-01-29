
var antlr4 = require('./antlr4/index');
var BlocklyGrammerVisitor = require('./BlocklyGrammerVisitor').BlocklyGrammerVisitor;

function SymbolVisitor() {
	BlocklyGrammerVisitor.call(this);
	return this;
}

SymbolVisitor.prototype = Object.create(BlocklyGrammerVisitor.prototype);
SymbolVisitor.prototype.constructor = SymbolVisitor;

SymbolVisitor.prototype.init = function() {
  this.statementRules=[];
  this.expressionRules=[[],[]];//0 for type: expression, 1 for block: value
  this.lexerRules=[];
  this.expression_arithmetic_num=0;
  return this;
}

// Visit a parse tree produced by BlocklyGrammerParser#grammarFile.
SymbolVisitor.prototype.visitGrammarFile = function(ctx) {
  this.visit(ctx.statementRule());
  this.visit(ctx.expressionRule());
  this.visit(ctx.lexerRuleCollection(0));
  return Object.assign({},this);
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
    this.expressionRules[1].push(exprname);
  }
  var pIds = ctx.ParserIdentifier();
  for(var ii=0,value;value=pIds[ii];ii++){
    pIds[ii]=value.getText();
  }
  exprs=exprs.concat(pIds);
  this.expressionRules[0]=['expression',exprs];
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprValue.
SymbolVisitor.prototype.visitExprValue = function(ctx) {
  var exprId = ctx.ParserIdentifier(0).getText();
  this.expressionRules[1].push(exprId);
};

// Visit a parse tree produced by BlocklyGrammerParser#lexerRuleCollection.
SymbolVisitor.prototype.visitLexerRuleCollection = function(ctx) {
  var lexerRules = ctx.lexerRule() || [];
  for(var ii=0,value;value=lexerRules[ii];ii++){
    var lexerId = value.LexerIdentifier(0).getText();
    this.lexerRules.push(lexerId);
  }
};


function EvalVisitor() {
	BlocklyGrammerVisitor.call(this);
	return this;
}

EvalVisitor.prototype = Object.create(BlocklyGrammerVisitor.prototype);
EvalVisitor.prototype.constructor = EvalVisitor;

EvalVisitor.prototype.init = function(symbols) {
  this.statementRules=symbols.statementRules;
  this.expressionRules=symbols.expressionRules;
  //0 for type: expression, 1 for block: value
  this.lexerRules=symbols.lexerRules;
  this.expression_arithmetic_num=symbols.expression_arithmetic_num;
  return this;
}

// Visit a parse tree produced by BlocklyGrammerParser#grammarFile.
EvalVisitor.prototype.visitGrammarFile = function(ctx) {
  this.visit(ctx.statementRule());
  this.visit(ctx.expressionRule());
  this.visit(ctx.lexerRuleCollection(0));
  return Object.assign({},this);
};

exports.SymbolVisitor = SymbolVisitor;
exports.EvalVisitor = EvalVisitor;