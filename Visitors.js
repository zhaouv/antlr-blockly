
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
  this.expressionRules=[];
  this.expression_arithmetic_num=0;
  this.lexerRules={};
  return this;
}

SymbolVisitor.prototype.error = function(error) {
  throw(new Error(error));
}

SymbolVisitor.prototype.checkSymbol = function() {
  var filter_ = function(list,name) {
    for(var ii=0,value;value=list[ii];ii++){
      if (value[0]===name) return value[1];
    }
    return [];
  }
  for(var ii=0,statementRule;statementRule=this.statementRules[ii];ii++){
    if (statementRule[1].length>1){
      for(var jj=0,statname;statname=statementRule[1][jj];jj++){
        if (filter_(this.statementRules,statname).length>1){
          this.error(statementRule[0]+' 下的子规则 '+statname+' 包含了"|"');
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
    this.lexerRules[lexerId]=null;
  }
};


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
  this.statementRules=symbols.statementRules;
  this.expressionRules=symbols.expressionRules;
  this.lexerRules=symbols.lexerRules;
  this.expression_arithmetic_num=symbols.expression_arithmetic_num;
  return this;
}

EvalVisitor.prototype.setRule = function(type,name,value) {
  if (type==='lexer') {
    this.lexerRules[name]=value;
  }
}

EvalVisitor.prototype.escapeString = function(string_) {
  return eval(string_);
}

// Visit a parse tree produced by BlocklyGrammerParser#grammarFile.
EvalVisitor.prototype.visitGrammarFile = function(ctx) {
  this.visit(ctx.lexerRuleCollection(0));
  this.visit(ctx.statementRule());
  this.visit(ctx.expressionRule());
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
  var strings = this.visit(ctx.strings(0));
  this.setRule('lexer',lexerId,strings);
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleList.
EvalVisitor.prototype.visitLexerRuleList = function(ctx) {
  return this.visitChildren(ctx);
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleComplex.
EvalVisitor.prototype.visitLexerRuleComplex = function(ctx) {};


exports.SymbolVisitor = SymbolVisitor;
exports.EvalVisitor = EvalVisitor;