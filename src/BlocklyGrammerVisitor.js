// Generated from BlocklyGrammer.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('./antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by BlocklyGrammerParser.

function BlocklyGrammerVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

BlocklyGrammerVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
BlocklyGrammerVisitor.prototype.constructor = BlocklyGrammerVisitor;

// Visit a parse tree produced by BlocklyGrammerParser#grammarFile.
BlocklyGrammerVisitor.prototype.visitGrammarFile = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#grammerDecl.
BlocklyGrammerVisitor.prototype.visitGrammerDecl = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#statExprSplit.
BlocklyGrammerVisitor.prototype.visitStatExprSplit = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#StatList.
BlocklyGrammerVisitor.prototype.visitStatList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#StatValue.
BlocklyGrammerVisitor.prototype.visitStatValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#ExprExpression.
BlocklyGrammerVisitor.prototype.visitExprExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#ExprValue.
BlocklyGrammerVisitor.prototype.visitExprValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#arithmeticRuleCollection.
BlocklyGrammerVisitor.prototype.visitArithmeticRuleCollection = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomExpr.
BlocklyGrammerVisitor.prototype.visitParserAtomExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomParserId.
BlocklyGrammerVisitor.prototype.visitParserAtomParserId = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomLexerId.
BlocklyGrammerVisitor.prototype.visitParserAtomLexerId = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomStr.
BlocklyGrammerVisitor.prototype.visitParserAtomStr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#lexerRuleCollection.
BlocklyGrammerVisitor.prototype.visitLexerRuleCollection = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#meaningfulSplit.
BlocklyGrammerVisitor.prototype.visitMeaningfulSplit = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleStrings.
BlocklyGrammerVisitor.prototype.visitLexerRuleStrings = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleList.
BlocklyGrammerVisitor.prototype.visitLexerRuleList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleComplex.
BlocklyGrammerVisitor.prototype.visitLexerRuleComplex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#strings.
BlocklyGrammerVisitor.prototype.visitStrings = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by BlocklyGrammerParser#lexerRuleAtom.
BlocklyGrammerVisitor.prototype.visitLexerRuleAtom = function(ctx) {
  return this.visitChildren(ctx);
};



exports.BlocklyGrammerVisitor = BlocklyGrammerVisitor;