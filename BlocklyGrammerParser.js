// Generated from BlocklyGrammer.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');
var BlocklyGrammerVisitor = require('./BlocklyGrammerVisitor').BlocklyGrammerVisitor;

var grammarFileName = "BlocklyGrammer.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u001b\u00c0\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0003\u0002\u0003\u0002\u0007\u0002\u001d\n\u0002\f\u0002",
    "\u000e\u0002 \u000b\u0002\u0003\u0002\u0003\u0002\u0007\u0002$\n\u0002",
    "\f\u0002\u000e\u0002\'\u000b\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0006\u00058\n\u0005\r\u0005\u000e\u00059\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0007\u0005@\n\u0005\f\u0005\u000e\u0005C\u000b\u0005",
    "\u0003\u0005\u0005\u0005F\n\u0005\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0005\u0006L\n\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0005\u0006Q\n\u0006\u0007\u0006S\n\u0006\f\u0006\u000e\u0006V\u000b",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u0006\\",
    "\n\u0006\f\u0006\u000e\u0006_\u000b\u0006\u0003\u0006\u0005\u0006b\n",
    "\u0006\u0003\u0007\u0003\u0007\u0007\u0007f\n\u0007\f\u0007\u000e\u0007",
    "i\u000b\u0007\u0003\b\u0003\b\u0005\bm\n\b\u0003\b\u0003\b\u0005\bq",
    "\n\b\u0003\b\u0003\b\u0005\bu\n\b\u0003\b\u0005\bx\n\b\u0003\t\u0007",
    "\t{\n\t\f\t\u000e\t~\u000b\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0006\u000b\u008c\n\u000b\r\u000b\u000e\u000b",
    "\u008d\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0005\u000b\u0097\n\u000b\u0003\f\u0006\f\u009a\n",
    "\f\r\f\u000e\f\u009b\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0005\r\u00ad\n\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0005\r\u00b9\n\r\u0007\r\u00bb\n\r",
    "\f\r\u000e\r\u00be\u000b\r\u0003\r\u0005\u001e%|\u0003\u0018\u000e\u0002",
    "\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u0002\u0005\u0003",
    "\u0002\u0012\u0013\u0003\u0002\t\u000b\u0003\u0002\n\u000b\u0002\u00d4",
    "\u0002\u001a\u0003\u0002\u0002\u0002\u0004,\u0003\u0002\u0002\u0002",
    "\u00060\u0003\u0002\u0002\u0002\bE\u0003\u0002\u0002\u0002\na\u0003",
    "\u0002\u0002\u0002\fc\u0003\u0002\u0002\u0002\u000ew\u0003\u0002\u0002",
    "\u0002\u0010|\u0003\u0002\u0002\u0002\u0012\u007f\u0003\u0002\u0002",
    "\u0002\u0014\u0096\u0003\u0002\u0002\u0002\u0016\u0099\u0003\u0002\u0002",
    "\u0002\u0018\u00ac\u0003\u0002\u0002\u0002\u001a\u001e\u0005\u0004\u0003",
    "\u0002\u001b\u001d\u0005\b\u0005\u0002\u001c\u001b\u0003\u0002\u0002",
    "\u0002\u001d \u0003\u0002\u0002\u0002\u001e\u001f\u0003\u0002\u0002",
    "\u0002\u001e\u001c\u0003\u0002\u0002\u0002\u001f!\u0003\u0002\u0002",
    "\u0002 \u001e\u0003\u0002\u0002\u0002!%\u0005\u0006\u0004\u0002\"$\u0005",
    "\n\u0006\u0002#\"\u0003\u0002\u0002\u0002$\'\u0003\u0002\u0002\u0002",
    "%&\u0003\u0002\u0002\u0002%#\u0003\u0002\u0002\u0002&(\u0003\u0002\u0002",
    "\u0002\'%\u0003\u0002\u0002\u0002()\u0005\u0010\t\u0002)*\u0005\u0012",
    "\n\u0002*+\u0005\u0010\t\u0002+\u0003\u0003\u0002\u0002\u0002,-\u0007",
    "\u0003\u0002\u0002-.\t\u0002\u0002\u0002./\u0007\u0004\u0002\u0002/",
    "\u0005\u0003\u0002\u0002\u000201\u0007\u0005\u0002\u00021\u0007\u0003",
    "\u0002\u0002\u000223\u0007\u0013\u0002\u000234\u0007\u0006\u0002\u0002",
    "47\u0007\u0013\u0002\u000256\u0007\u0007\u0002\u000268\u0007\u0013\u0002",
    "\u000275\u0003\u0002\u0002\u000289\u0003\u0002\u0002\u000297\u0003\u0002",
    "\u0002\u00029:\u0003\u0002\u0002\u0002:;\u0003\u0002\u0002\u0002;F\u0007",
    "\u0004\u0002\u0002<=\u0007\u0013\u0002\u0002=A\u0007\u0006\u0002\u0002",
    ">@\u0005\u000e\b\u0002?>\u0003\u0002\u0002\u0002@C\u0003\u0002\u0002",
    "\u0002A?\u0003\u0002\u0002\u0002AB\u0003\u0002\u0002\u0002BD\u0003\u0002",
    "\u0002\u0002CA\u0003\u0002\u0002\u0002DF\u0007\u0004\u0002\u0002E2\u0003",
    "\u0002\u0002\u0002E<\u0003\u0002\u0002\u0002F\t\u0003\u0002\u0002\u0002",
    "GH\u0007\b\u0002\u0002HK\u0007\u0006\u0002\u0002IL\u0005\f\u0007\u0002",
    "JL\u0007\u0013\u0002\u0002KI\u0003\u0002\u0002\u0002KJ\u0003\u0002\u0002",
    "\u0002LT\u0003\u0002\u0002\u0002MP\u0007\u0007\u0002\u0002NQ\u0005\f",
    "\u0007\u0002OQ\u0007\u0013\u0002\u0002PN\u0003\u0002\u0002\u0002PO\u0003",
    "\u0002\u0002\u0002QS\u0003\u0002\u0002\u0002RM\u0003\u0002\u0002\u0002",
    "SV\u0003\u0002\u0002\u0002TR\u0003\u0002\u0002\u0002TU\u0003\u0002\u0002",
    "\u0002UW\u0003\u0002\u0002\u0002VT\u0003\u0002\u0002\u0002Wb\u0007\u0004",
    "\u0002\u0002XY\u0007\u0013\u0002\u0002Y]\u0007\u0006\u0002\u0002Z\\",
    "\u0005\u000e\b\u0002[Z\u0003\u0002\u0002\u0002\\_\u0003\u0002\u0002",
    "\u0002][\u0003\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002^`\u0003\u0002",
    "\u0002\u0002_]\u0003\u0002\u0002\u0002`b\u0007\u0004\u0002\u0002aG\u0003",
    "\u0002\u0002\u0002aX\u0003\u0002\u0002\u0002b\u000b\u0003\u0002\u0002",
    "\u0002cg\u0007\b\u0002\u0002df\u0005\u000e\b\u0002ed\u0003\u0002\u0002",
    "\u0002fi\u0003\u0002\u0002\u0002ge\u0003\u0002\u0002\u0002gh\u0003\u0002",
    "\u0002\u0002h\r\u0003\u0002\u0002\u0002ig\u0003\u0002\u0002\u0002jl",
    "\u0007\b\u0002\u0002km\u0007\t\u0002\u0002lk\u0003\u0002\u0002\u0002",
    "lm\u0003\u0002\u0002\u0002mx\u0003\u0002\u0002\u0002np\u0007\u0013\u0002",
    "\u0002oq\t\u0003\u0002\u0002po\u0003\u0002\u0002\u0002pq\u0003\u0002",
    "\u0002\u0002qx\u0003\u0002\u0002\u0002rt\u0007\u0012\u0002\u0002su\u0007",
    "\t\u0002\u0002ts\u0003\u0002\u0002\u0002tu\u0003\u0002\u0002\u0002u",
    "x\u0003\u0002\u0002\u0002vx\u0007\u0014\u0002\u0002wj\u0003\u0002\u0002",
    "\u0002wn\u0003\u0002\u0002\u0002wr\u0003\u0002\u0002\u0002wv\u0003\u0002",
    "\u0002\u0002x\u000f\u0003\u0002\u0002\u0002y{\u0005\u0014\u000b\u0002",
    "zy\u0003\u0002\u0002\u0002{~\u0003\u0002\u0002\u0002|}\u0003\u0002\u0002",
    "\u0002|z\u0003\u0002\u0002\u0002}\u0011\u0003\u0002\u0002\u0002~|\u0003",
    "\u0002\u0002\u0002\u007f\u0080\u0007\f\u0002\u0002\u0080\u0013\u0003",
    "\u0002\u0002\u0002\u0081\u0082\u0007\u0012\u0002\u0002\u0082\u0083\u0007",
    "\u0006\u0002\u0002\u0083\u0084\u0005\u0016\f\u0002\u0084\u0085\u0007",
    "\u0004\u0002\u0002\u0085\u0097\u0003\u0002\u0002\u0002\u0086\u0087\u0007",
    "\u0012\u0002\u0002\u0087\u0088\u0007\u0006\u0002\u0002\u0088\u008b\u0005",
    "\u0016\f\u0002\u0089\u008a\u0007\u0007\u0002\u0002\u008a\u008c\u0005",
    "\u0016\f\u0002\u008b\u0089\u0003\u0002\u0002\u0002\u008c\u008d\u0003",
    "\u0002\u0002\u0002\u008d\u008b\u0003\u0002\u0002\u0002\u008d\u008e\u0003",
    "\u0002\u0002\u0002\u008e\u008f\u0003\u0002\u0002\u0002\u008f\u0090\u0007",
    "\u0004\u0002\u0002\u0090\u0097\u0003\u0002\u0002\u0002\u0091\u0092\u0007",
    "\u0012\u0002\u0002\u0092\u0093\u0007\u0006\u0002\u0002\u0093\u0094\u0005",
    "\u0018\r\u0002\u0094\u0095\u0007\u0004\u0002\u0002\u0095\u0097\u0003",
    "\u0002\u0002\u0002\u0096\u0081\u0003\u0002\u0002\u0002\u0096\u0086\u0003",
    "\u0002\u0002\u0002\u0096\u0091\u0003\u0002\u0002\u0002\u0097\u0015\u0003",
    "\u0002\u0002\u0002\u0098\u009a\u0007\u0014\u0002\u0002\u0099\u0098\u0003",
    "\u0002\u0002\u0002\u009a\u009b\u0003\u0002\u0002\u0002\u009b\u0099\u0003",
    "\u0002\u0002\u0002\u009b\u009c\u0003\u0002\u0002\u0002\u009c\u0017\u0003",
    "\u0002\u0002\u0002\u009d\u009e\b\r\u0001\u0002\u009e\u009f\u0007\r\u0002",
    "\u0002\u009f\u00a0\u0005\u0018\r\u0002\u00a0\u00a1\u0007\u000e\u0002",
    "\u0002\u00a1\u00ad\u0003\u0002\u0002\u0002\u00a2\u00a3\u0007\u000f\u0002",
    "\u0002\u00a3\u00ad\u0005\u0018\r\b\u00a4\u00ad\u0007\u0012\u0002\u0002",
    "\u00a5\u00a6\u0007\u0014\u0002\u0002\u00a6\u00a7\u0007\u0010\u0002\u0002",
    "\u00a7\u00a8\u0007\u0010\u0002\u0002\u00a8\u00ad\u0007\u0014\u0002\u0002",
    "\u00a9\u00ad\u0007\u0014\u0002\u0002\u00aa\u00ad\u0007\u0010\u0002\u0002",
    "\u00ab\u00ad\u0007\u0011\u0002\u0002\u00ac\u009d\u0003\u0002\u0002\u0002",
    "\u00ac\u00a2\u0003\u0002\u0002\u0002\u00ac\u00a4\u0003\u0002\u0002\u0002",
    "\u00ac\u00a5\u0003\u0002\u0002\u0002\u00ac\u00a9\u0003\u0002\u0002\u0002",
    "\u00ac\u00aa\u0003\u0002\u0002\u0002\u00ac\u00ab\u0003\u0002\u0002\u0002",
    "\u00ad\u00bc\u0003\u0002\u0002\u0002\u00ae\u00af\f\u000b\u0002\u0002",
    "\u00af\u00b0\u0007\u0007\u0002\u0002\u00b0\u00bb\u0005\u0018\r\f\u00b1",
    "\u00b2\f\n\u0002\u0002\u00b2\u00bb\u0005\u0018\r\u000b\u00b3\u00b4\f",
    "\r\u0002\u0002\u00b4\u00bb\u0007\t\u0002\u0002\u00b5\u00b6\f\f\u0002",
    "\u0002\u00b6\u00b8\t\u0004\u0002\u0002\u00b7\u00b9\u0007\t\u0002\u0002",
    "\u00b8\u00b7\u0003\u0002\u0002\u0002\u00b8\u00b9\u0003\u0002\u0002\u0002",
    "\u00b9\u00bb\u0003\u0002\u0002\u0002\u00ba\u00ae\u0003\u0002\u0002\u0002",
    "\u00ba\u00b1\u0003\u0002\u0002\u0002\u00ba\u00b3\u0003\u0002\u0002\u0002",
    "\u00ba\u00b5\u0003\u0002\u0002\u0002\u00bb\u00be\u0003\u0002\u0002\u0002",
    "\u00bc\u00ba\u0003\u0002\u0002\u0002\u00bc\u00bd\u0003\u0002\u0002\u0002",
    "\u00bd\u0019\u0003\u0002\u0002\u0002\u00be\u00bc\u0003\u0002\u0002\u0002",
    "\u0019\u001e%9AEKPT]aglptw|\u008d\u0096\u009b\u00ac\u00b8\u00ba\u00bc"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'grammar'", "';'", "'statExprSplit : '=== statment ^ === expression v ===' ;'", 
                     "':'", "'|'", "'expression'", "'?'", "'+'", "'*'", 
                     "'MeaningfulSplit : '=== meaningful ^ ===' ;'", "'('", 
                     "')'", "'~'", "'.'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, "Brackets", "LexerIdentifier", 
                      "ParserIdentifier", "String", "LabelForParserRule", 
                      "Newline", "WhiteSpace", "BlockComment", "FragmentComment", 
                      "LineComment", "ArrowComment" ];

var ruleNames =  [ "grammarFile", "grammerDecl", "statExprSplit", "statementRule", 
                   "expressionRule", "arithmeticRuleCollection", "parserRuleAtom", 
                   "lexerRuleCollection", "meaningfulSplit", "lexerRule", 
                   "strings", "lexerRuleAtom" ];

function BlocklyGrammerParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

BlocklyGrammerParser.prototype = Object.create(antlr4.Parser.prototype);
BlocklyGrammerParser.prototype.constructor = BlocklyGrammerParser;

Object.defineProperty(BlocklyGrammerParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

BlocklyGrammerParser.EOF = antlr4.Token.EOF;
BlocklyGrammerParser.T__0 = 1;
BlocklyGrammerParser.T__1 = 2;
BlocklyGrammerParser.T__2 = 3;
BlocklyGrammerParser.T__3 = 4;
BlocklyGrammerParser.T__4 = 5;
BlocklyGrammerParser.T__5 = 6;
BlocklyGrammerParser.T__6 = 7;
BlocklyGrammerParser.T__7 = 8;
BlocklyGrammerParser.T__8 = 9;
BlocklyGrammerParser.T__9 = 10;
BlocklyGrammerParser.T__10 = 11;
BlocklyGrammerParser.T__11 = 12;
BlocklyGrammerParser.T__12 = 13;
BlocklyGrammerParser.T__13 = 14;
BlocklyGrammerParser.Brackets = 15;
BlocklyGrammerParser.LexerIdentifier = 16;
BlocklyGrammerParser.ParserIdentifier = 17;
BlocklyGrammerParser.String = 18;
BlocklyGrammerParser.LabelForParserRule = 19;
BlocklyGrammerParser.Newline = 20;
BlocklyGrammerParser.WhiteSpace = 21;
BlocklyGrammerParser.BlockComment = 22;
BlocklyGrammerParser.FragmentComment = 23;
BlocklyGrammerParser.LineComment = 24;
BlocklyGrammerParser.ArrowComment = 25;

BlocklyGrammerParser.RULE_grammarFile = 0;
BlocklyGrammerParser.RULE_grammerDecl = 1;
BlocklyGrammerParser.RULE_statExprSplit = 2;
BlocklyGrammerParser.RULE_statementRule = 3;
BlocklyGrammerParser.RULE_expressionRule = 4;
BlocklyGrammerParser.RULE_arithmeticRuleCollection = 5;
BlocklyGrammerParser.RULE_parserRuleAtom = 6;
BlocklyGrammerParser.RULE_lexerRuleCollection = 7;
BlocklyGrammerParser.RULE_meaningfulSplit = 8;
BlocklyGrammerParser.RULE_lexerRule = 9;
BlocklyGrammerParser.RULE_strings = 10;
BlocklyGrammerParser.RULE_lexerRuleAtom = 11;

function GrammarFileContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_grammarFile;
    return this;
}

GrammarFileContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
GrammarFileContext.prototype.constructor = GrammarFileContext;

GrammarFileContext.prototype.grammerDecl = function() {
    return this.getTypedRuleContext(GrammerDeclContext,0);
};

GrammarFileContext.prototype.statExprSplit = function() {
    return this.getTypedRuleContext(StatExprSplitContext,0);
};

GrammarFileContext.prototype.lexerRuleCollection = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LexerRuleCollectionContext);
    } else {
        return this.getTypedRuleContext(LexerRuleCollectionContext,i);
    }
};

GrammarFileContext.prototype.meaningfulSplit = function() {
    return this.getTypedRuleContext(MeaningfulSplitContext,0);
};

GrammarFileContext.prototype.statementRule = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatementRuleContext);
    } else {
        return this.getTypedRuleContext(StatementRuleContext,i);
    }
};

GrammarFileContext.prototype.expressionRule = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionRuleContext);
    } else {
        return this.getTypedRuleContext(ExpressionRuleContext,i);
    }
};

GrammarFileContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitGrammarFile(this);
    } else {
        return visitor.visitChildren(this);
    }
};




BlocklyGrammerParser.GrammarFileContext = GrammarFileContext;

BlocklyGrammerParser.prototype.grammarFile = function() {

    var localctx = new GrammarFileContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, BlocklyGrammerParser.RULE_grammarFile);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 24;
        this.grammerDecl();
        this.state = 28;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,0,this._ctx)
        while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1+1) {
                this.state = 25;
                this.statementRule(); 
            }
            this.state = 30;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,0,this._ctx);
        }

        this.state = 31;
        this.statExprSplit();
        this.state = 35;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
        while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1+1) {
                this.state = 32;
                this.expressionRule(); 
            }
            this.state = 37;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
        }

        this.state = 38;
        this.lexerRuleCollection();
        this.state = 39;
        this.meaningfulSplit();
        this.state = 40;
        this.lexerRuleCollection();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function GrammerDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_grammerDecl;
    return this;
}

GrammerDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
GrammerDeclContext.prototype.constructor = GrammerDeclContext;

GrammerDeclContext.prototype.ParserIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.ParserIdentifier, 0);
};

GrammerDeclContext.prototype.LexerIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.LexerIdentifier, 0);
};

GrammerDeclContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitGrammerDecl(this);
    } else {
        return visitor.visitChildren(this);
    }
};




BlocklyGrammerParser.GrammerDeclContext = GrammerDeclContext;

BlocklyGrammerParser.prototype.grammerDecl = function() {

    var localctx = new GrammerDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, BlocklyGrammerParser.RULE_grammerDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 42;
        this.match(BlocklyGrammerParser.T__0);
        this.state = 43;
        _la = this._input.LA(1);
        if(!(_la===BlocklyGrammerParser.LexerIdentifier || _la===BlocklyGrammerParser.ParserIdentifier)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
        this.state = 44;
        this.match(BlocklyGrammerParser.T__1);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StatExprSplitContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_statExprSplit;
    return this;
}

StatExprSplitContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatExprSplitContext.prototype.constructor = StatExprSplitContext;


StatExprSplitContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitStatExprSplit(this);
    } else {
        return visitor.visitChildren(this);
    }
};




BlocklyGrammerParser.StatExprSplitContext = StatExprSplitContext;

BlocklyGrammerParser.prototype.statExprSplit = function() {

    var localctx = new StatExprSplitContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, BlocklyGrammerParser.RULE_statExprSplit);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 46;
        this.match(BlocklyGrammerParser.T__2);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StatementRuleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_statementRule;
    return this;
}

StatementRuleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementRuleContext.prototype.constructor = StatementRuleContext;


 
StatementRuleContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function StatValueContext(parser, ctx) {
	StatementRuleContext.call(this, parser);
    StatementRuleContext.prototype.copyFrom.call(this, ctx);
    return this;
}

StatValueContext.prototype = Object.create(StatementRuleContext.prototype);
StatValueContext.prototype.constructor = StatValueContext;

BlocklyGrammerParser.StatValueContext = StatValueContext;

StatValueContext.prototype.ParserIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.ParserIdentifier, 0);
};

StatValueContext.prototype.parserRuleAtom = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ParserRuleAtomContext);
    } else {
        return this.getTypedRuleContext(ParserRuleAtomContext,i);
    }
};
StatValueContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitStatValue(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function StatListContext(parser, ctx) {
	StatementRuleContext.call(this, parser);
    StatementRuleContext.prototype.copyFrom.call(this, ctx);
    return this;
}

StatListContext.prototype = Object.create(StatementRuleContext.prototype);
StatListContext.prototype.constructor = StatListContext;

BlocklyGrammerParser.StatListContext = StatListContext;

StatListContext.prototype.ParserIdentifier = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(BlocklyGrammerParser.ParserIdentifier);
    } else {
        return this.getToken(BlocklyGrammerParser.ParserIdentifier, i);
    }
};

StatListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitStatList(this);
    } else {
        return visitor.visitChildren(this);
    }
};



BlocklyGrammerParser.StatementRuleContext = StatementRuleContext;

BlocklyGrammerParser.prototype.statementRule = function() {

    var localctx = new StatementRuleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, BlocklyGrammerParser.RULE_statementRule);
    var _la = 0; // Token type
    try {
        this.state = 67;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
        switch(la_) {
        case 1:
            localctx = new StatListContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 48;
            this.match(BlocklyGrammerParser.ParserIdentifier);
            this.state = 49;
            this.match(BlocklyGrammerParser.T__3);
            this.state = 50;
            this.match(BlocklyGrammerParser.ParserIdentifier);
            this.state = 53; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 51;
                this.match(BlocklyGrammerParser.T__4);
                this.state = 52;
                this.match(BlocklyGrammerParser.ParserIdentifier);
                this.state = 55; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===BlocklyGrammerParser.T__4);
            this.state = 57;
            this.match(BlocklyGrammerParser.T__1);
            break;

        case 2:
            localctx = new StatValueContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 58;
            this.match(BlocklyGrammerParser.ParserIdentifier);
            this.state = 59;
            this.match(BlocklyGrammerParser.T__3);
            this.state = 63;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << BlocklyGrammerParser.T__5) | (1 << BlocklyGrammerParser.LexerIdentifier) | (1 << BlocklyGrammerParser.ParserIdentifier) | (1 << BlocklyGrammerParser.String))) !== 0)) {
                this.state = 60;
                this.parserRuleAtom();
                this.state = 65;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 66;
            this.match(BlocklyGrammerParser.T__1);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExpressionRuleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_expressionRule;
    return this;
}

ExpressionRuleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionRuleContext.prototype.constructor = ExpressionRuleContext;


 
ExpressionRuleContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function ExprListContext(parser, ctx) {
	ExpressionRuleContext.call(this, parser);
    ExpressionRuleContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprListContext.prototype = Object.create(ExpressionRuleContext.prototype);
ExprListContext.prototype.constructor = ExprListContext;

BlocklyGrammerParser.ExprListContext = ExprListContext;

ExprListContext.prototype.arithmeticRuleCollection = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ArithmeticRuleCollectionContext);
    } else {
        return this.getTypedRuleContext(ArithmeticRuleCollectionContext,i);
    }
};

ExprListContext.prototype.ParserIdentifier = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(BlocklyGrammerParser.ParserIdentifier);
    } else {
        return this.getToken(BlocklyGrammerParser.ParserIdentifier, i);
    }
};

ExprListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitExprList(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprValueContext(parser, ctx) {
	ExpressionRuleContext.call(this, parser);
    ExpressionRuleContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprValueContext.prototype = Object.create(ExpressionRuleContext.prototype);
ExprValueContext.prototype.constructor = ExprValueContext;

BlocklyGrammerParser.ExprValueContext = ExprValueContext;

ExprValueContext.prototype.ParserIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.ParserIdentifier, 0);
};

ExprValueContext.prototype.parserRuleAtom = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ParserRuleAtomContext);
    } else {
        return this.getTypedRuleContext(ParserRuleAtomContext,i);
    }
};
ExprValueContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitExprValue(this);
    } else {
        return visitor.visitChildren(this);
    }
};



BlocklyGrammerParser.ExpressionRuleContext = ExpressionRuleContext;

BlocklyGrammerParser.prototype.expressionRule = function() {

    var localctx = new ExpressionRuleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, BlocklyGrammerParser.RULE_expressionRule);
    var _la = 0; // Token type
    try {
        this.state = 95;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case BlocklyGrammerParser.T__5:
            localctx = new ExprListContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 69;
            this.match(BlocklyGrammerParser.T__5);
            this.state = 70;
            this.match(BlocklyGrammerParser.T__3);
            this.state = 73;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case BlocklyGrammerParser.T__5:
                this.state = 71;
                this.arithmeticRuleCollection();
                break;
            case BlocklyGrammerParser.ParserIdentifier:
                this.state = 72;
                this.match(BlocklyGrammerParser.ParserIdentifier);
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 82;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===BlocklyGrammerParser.T__4) {
                this.state = 75;
                this.match(BlocklyGrammerParser.T__4);
                this.state = 78;
                this._errHandler.sync(this);
                switch(this._input.LA(1)) {
                case BlocklyGrammerParser.T__5:
                    this.state = 76;
                    this.arithmeticRuleCollection();
                    break;
                case BlocklyGrammerParser.ParserIdentifier:
                    this.state = 77;
                    this.match(BlocklyGrammerParser.ParserIdentifier);
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 84;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 85;
            this.match(BlocklyGrammerParser.T__1);
            break;
        case BlocklyGrammerParser.ParserIdentifier:
            localctx = new ExprValueContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 86;
            this.match(BlocklyGrammerParser.ParserIdentifier);
            this.state = 87;
            this.match(BlocklyGrammerParser.T__3);
            this.state = 91;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << BlocklyGrammerParser.T__5) | (1 << BlocklyGrammerParser.LexerIdentifier) | (1 << BlocklyGrammerParser.ParserIdentifier) | (1 << BlocklyGrammerParser.String))) !== 0)) {
                this.state = 88;
                this.parserRuleAtom();
                this.state = 93;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 94;
            this.match(BlocklyGrammerParser.T__1);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ArithmeticRuleCollectionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_arithmeticRuleCollection;
    return this;
}

ArithmeticRuleCollectionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ArithmeticRuleCollectionContext.prototype.constructor = ArithmeticRuleCollectionContext;

ArithmeticRuleCollectionContext.prototype.parserRuleAtom = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ParserRuleAtomContext);
    } else {
        return this.getTypedRuleContext(ParserRuleAtomContext,i);
    }
};

ArithmeticRuleCollectionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitArithmeticRuleCollection(this);
    } else {
        return visitor.visitChildren(this);
    }
};




BlocklyGrammerParser.ArithmeticRuleCollectionContext = ArithmeticRuleCollectionContext;

BlocklyGrammerParser.prototype.arithmeticRuleCollection = function() {

    var localctx = new ArithmeticRuleCollectionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, BlocklyGrammerParser.RULE_arithmeticRuleCollection);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 97;
        this.match(BlocklyGrammerParser.T__5);
        this.state = 101;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << BlocklyGrammerParser.T__5) | (1 << BlocklyGrammerParser.LexerIdentifier) | (1 << BlocklyGrammerParser.ParserIdentifier) | (1 << BlocklyGrammerParser.String))) !== 0)) {
            this.state = 98;
            this.parserRuleAtom();
            this.state = 103;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ParserRuleAtomContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_parserRuleAtom;
    return this;
}

ParserRuleAtomContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParserRuleAtomContext.prototype.constructor = ParserRuleAtomContext;


 
ParserRuleAtomContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function ParserAtomExprContext(parser, ctx) {
	ParserRuleAtomContext.call(this, parser);
    ParserRuleAtomContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ParserAtomExprContext.prototype = Object.create(ParserRuleAtomContext.prototype);
ParserAtomExprContext.prototype.constructor = ParserAtomExprContext;

BlocklyGrammerParser.ParserAtomExprContext = ParserAtomExprContext;

ParserAtomExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitParserAtomExpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ParserAtomParserIdContext(parser, ctx) {
	ParserRuleAtomContext.call(this, parser);
    ParserRuleAtomContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ParserAtomParserIdContext.prototype = Object.create(ParserRuleAtomContext.prototype);
ParserAtomParserIdContext.prototype.constructor = ParserAtomParserIdContext;

BlocklyGrammerParser.ParserAtomParserIdContext = ParserAtomParserIdContext;

ParserAtomParserIdContext.prototype.ParserIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.ParserIdentifier, 0);
};
ParserAtomParserIdContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitParserAtomParserId(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ParserAtomStrContext(parser, ctx) {
	ParserRuleAtomContext.call(this, parser);
    ParserRuleAtomContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ParserAtomStrContext.prototype = Object.create(ParserRuleAtomContext.prototype);
ParserAtomStrContext.prototype.constructor = ParserAtomStrContext;

BlocklyGrammerParser.ParserAtomStrContext = ParserAtomStrContext;

ParserAtomStrContext.prototype.String = function() {
    return this.getToken(BlocklyGrammerParser.String, 0);
};
ParserAtomStrContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitParserAtomStr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ParserAtomLexerIdContext(parser, ctx) {
	ParserRuleAtomContext.call(this, parser);
    ParserRuleAtomContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ParserAtomLexerIdContext.prototype = Object.create(ParserRuleAtomContext.prototype);
ParserAtomLexerIdContext.prototype.constructor = ParserAtomLexerIdContext;

BlocklyGrammerParser.ParserAtomLexerIdContext = ParserAtomLexerIdContext;

ParserAtomLexerIdContext.prototype.LexerIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.LexerIdentifier, 0);
};
ParserAtomLexerIdContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitParserAtomLexerId(this);
    } else {
        return visitor.visitChildren(this);
    }
};



BlocklyGrammerParser.ParserRuleAtomContext = ParserRuleAtomContext;

BlocklyGrammerParser.prototype.parserRuleAtom = function() {

    var localctx = new ParserRuleAtomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, BlocklyGrammerParser.RULE_parserRuleAtom);
    var _la = 0; // Token type
    try {
        this.state = 117;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case BlocklyGrammerParser.T__5:
            localctx = new ParserAtomExprContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 104;
            this.match(BlocklyGrammerParser.T__5);
            this.state = 106;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===BlocklyGrammerParser.T__6) {
                this.state = 105;
                this.match(BlocklyGrammerParser.T__6);
            }

            break;
        case BlocklyGrammerParser.ParserIdentifier:
            localctx = new ParserAtomParserIdContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 108;
            this.match(BlocklyGrammerParser.ParserIdentifier);
            this.state = 110;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << BlocklyGrammerParser.T__6) | (1 << BlocklyGrammerParser.T__7) | (1 << BlocklyGrammerParser.T__8))) !== 0)) {
                this.state = 109;
                _la = this._input.LA(1);
                if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << BlocklyGrammerParser.T__6) | (1 << BlocklyGrammerParser.T__7) | (1 << BlocklyGrammerParser.T__8))) !== 0))) {
                this._errHandler.recoverInline(this);
                }
                else {
                	this._errHandler.reportMatch(this);
                    this.consume();
                }
            }

            break;
        case BlocklyGrammerParser.LexerIdentifier:
            localctx = new ParserAtomLexerIdContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 112;
            this.match(BlocklyGrammerParser.LexerIdentifier);
            this.state = 114;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===BlocklyGrammerParser.T__6) {
                this.state = 113;
                this.match(BlocklyGrammerParser.T__6);
            }

            break;
        case BlocklyGrammerParser.String:
            localctx = new ParserAtomStrContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 116;
            this.match(BlocklyGrammerParser.String);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function LexerRuleCollectionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_lexerRuleCollection;
    return this;
}

LexerRuleCollectionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LexerRuleCollectionContext.prototype.constructor = LexerRuleCollectionContext;

LexerRuleCollectionContext.prototype.lexerRule = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LexerRuleContext);
    } else {
        return this.getTypedRuleContext(LexerRuleContext,i);
    }
};

LexerRuleCollectionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitLexerRuleCollection(this);
    } else {
        return visitor.visitChildren(this);
    }
};




BlocklyGrammerParser.LexerRuleCollectionContext = LexerRuleCollectionContext;

BlocklyGrammerParser.prototype.lexerRuleCollection = function() {

    var localctx = new LexerRuleCollectionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, BlocklyGrammerParser.RULE_lexerRuleCollection);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 122;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,15,this._ctx)
        while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1+1) {
                this.state = 119;
                this.lexerRule(); 
            }
            this.state = 124;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,15,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function MeaningfulSplitContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_meaningfulSplit;
    return this;
}

MeaningfulSplitContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MeaningfulSplitContext.prototype.constructor = MeaningfulSplitContext;


MeaningfulSplitContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitMeaningfulSplit(this);
    } else {
        return visitor.visitChildren(this);
    }
};




BlocklyGrammerParser.MeaningfulSplitContext = MeaningfulSplitContext;

BlocklyGrammerParser.prototype.meaningfulSplit = function() {

    var localctx = new MeaningfulSplitContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, BlocklyGrammerParser.RULE_meaningfulSplit);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 125;
        this.match(BlocklyGrammerParser.T__9);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function LexerRuleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_lexerRule;
    return this;
}

LexerRuleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LexerRuleContext.prototype.constructor = LexerRuleContext;


 
LexerRuleContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function LexerRuleStringsContext(parser, ctx) {
	LexerRuleContext.call(this, parser);
    LexerRuleContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LexerRuleStringsContext.prototype = Object.create(LexerRuleContext.prototype);
LexerRuleStringsContext.prototype.constructor = LexerRuleStringsContext;

BlocklyGrammerParser.LexerRuleStringsContext = LexerRuleStringsContext;

LexerRuleStringsContext.prototype.LexerIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.LexerIdentifier, 0);
};

LexerRuleStringsContext.prototype.strings = function() {
    return this.getTypedRuleContext(StringsContext,0);
};
LexerRuleStringsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitLexerRuleStrings(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LexerRuleComplexContext(parser, ctx) {
	LexerRuleContext.call(this, parser);
    LexerRuleContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LexerRuleComplexContext.prototype = Object.create(LexerRuleContext.prototype);
LexerRuleComplexContext.prototype.constructor = LexerRuleComplexContext;

BlocklyGrammerParser.LexerRuleComplexContext = LexerRuleComplexContext;

LexerRuleComplexContext.prototype.LexerIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.LexerIdentifier, 0);
};

LexerRuleComplexContext.prototype.lexerRuleAtom = function() {
    return this.getTypedRuleContext(LexerRuleAtomContext,0);
};
LexerRuleComplexContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitLexerRuleComplex(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LexerRuleListContext(parser, ctx) {
	LexerRuleContext.call(this, parser);
    LexerRuleContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LexerRuleListContext.prototype = Object.create(LexerRuleContext.prototype);
LexerRuleListContext.prototype.constructor = LexerRuleListContext;

BlocklyGrammerParser.LexerRuleListContext = LexerRuleListContext;

LexerRuleListContext.prototype.LexerIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.LexerIdentifier, 0);
};

LexerRuleListContext.prototype.strings = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StringsContext);
    } else {
        return this.getTypedRuleContext(StringsContext,i);
    }
};
LexerRuleListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitLexerRuleList(this);
    } else {
        return visitor.visitChildren(this);
    }
};



BlocklyGrammerParser.LexerRuleContext = LexerRuleContext;

BlocklyGrammerParser.prototype.lexerRule = function() {

    var localctx = new LexerRuleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, BlocklyGrammerParser.RULE_lexerRule);
    var _la = 0; // Token type
    try {
        this.state = 148;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
        switch(la_) {
        case 1:
            localctx = new LexerRuleStringsContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 127;
            this.match(BlocklyGrammerParser.LexerIdentifier);
            this.state = 128;
            this.match(BlocklyGrammerParser.T__3);
            this.state = 129;
            this.strings();
            this.state = 130;
            this.match(BlocklyGrammerParser.T__1);
            break;

        case 2:
            localctx = new LexerRuleListContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 132;
            this.match(BlocklyGrammerParser.LexerIdentifier);
            this.state = 133;
            this.match(BlocklyGrammerParser.T__3);
            this.state = 134;
            this.strings();
            this.state = 137; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 135;
                this.match(BlocklyGrammerParser.T__4);
                this.state = 136;
                this.strings();
                this.state = 139; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===BlocklyGrammerParser.T__4);
            this.state = 141;
            this.match(BlocklyGrammerParser.T__1);
            break;

        case 3:
            localctx = new LexerRuleComplexContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 143;
            this.match(BlocklyGrammerParser.LexerIdentifier);
            this.state = 144;
            this.match(BlocklyGrammerParser.T__3);
            this.state = 145;
            this.lexerRuleAtom(0);
            this.state = 146;
            this.match(BlocklyGrammerParser.T__1);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StringsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_strings;
    return this;
}

StringsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StringsContext.prototype.constructor = StringsContext;

StringsContext.prototype.String = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(BlocklyGrammerParser.String);
    } else {
        return this.getToken(BlocklyGrammerParser.String, i);
    }
};


StringsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitStrings(this);
    } else {
        return visitor.visitChildren(this);
    }
};




BlocklyGrammerParser.StringsContext = StringsContext;

BlocklyGrammerParser.prototype.strings = function() {

    var localctx = new StringsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, BlocklyGrammerParser.RULE_strings);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 151; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 150;
            this.match(BlocklyGrammerParser.String);
            this.state = 153; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===BlocklyGrammerParser.String);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function LexerRuleAtomContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BlocklyGrammerParser.RULE_lexerRuleAtom;
    return this;
}

LexerRuleAtomContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LexerRuleAtomContext.prototype.constructor = LexerRuleAtomContext;

LexerRuleAtomContext.prototype.lexerRuleAtom = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LexerRuleAtomContext);
    } else {
        return this.getTypedRuleContext(LexerRuleAtomContext,i);
    }
};

LexerRuleAtomContext.prototype.LexerIdentifier = function() {
    return this.getToken(BlocklyGrammerParser.LexerIdentifier, 0);
};

LexerRuleAtomContext.prototype.String = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(BlocklyGrammerParser.String);
    } else {
        return this.getToken(BlocklyGrammerParser.String, i);
    }
};


LexerRuleAtomContext.prototype.Brackets = function() {
    return this.getToken(BlocklyGrammerParser.Brackets, 0);
};

LexerRuleAtomContext.prototype.accept = function(visitor) {
    if ( visitor instanceof BlocklyGrammerVisitor ) {
        return visitor.visitLexerRuleAtom(this);
    } else {
        return visitor.visitChildren(this);
    }
};



BlocklyGrammerParser.prototype.lexerRuleAtom = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new LexerRuleAtomContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 22;
    this.enterRecursionRule(localctx, 22, BlocklyGrammerParser.RULE_lexerRuleAtom, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 170;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
        switch(la_) {
        case 1:
            this.state = 156;
            this.match(BlocklyGrammerParser.T__10);
            this.state = 157;
            this.lexerRuleAtom(0);
            this.state = 158;
            this.match(BlocklyGrammerParser.T__11);
            break;

        case 2:
            this.state = 160;
            this.match(BlocklyGrammerParser.T__12);
            this.state = 161;
            this.lexerRuleAtom(6);
            break;

        case 3:
            this.state = 162;
            this.match(BlocklyGrammerParser.LexerIdentifier);
            break;

        case 4:
            this.state = 163;
            this.match(BlocklyGrammerParser.String);
            this.state = 164;
            this.match(BlocklyGrammerParser.T__13);
            this.state = 165;
            this.match(BlocklyGrammerParser.T__13);
            this.state = 166;
            this.match(BlocklyGrammerParser.String);
            break;

        case 5:
            this.state = 167;
            this.match(BlocklyGrammerParser.String);
            break;

        case 6:
            this.state = 168;
            this.match(BlocklyGrammerParser.T__13);
            break;

        case 7:
            this.state = 169;
            this.match(BlocklyGrammerParser.Brackets);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 186;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 184;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new LexerRuleAtomContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, BlocklyGrammerParser.RULE_lexerRuleAtom);
                    this.state = 172;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 173;
                    this.match(BlocklyGrammerParser.T__4);
                    this.state = 174;
                    this.lexerRuleAtom(10);
                    break;

                case 2:
                    localctx = new LexerRuleAtomContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, BlocklyGrammerParser.RULE_lexerRuleAtom);
                    this.state = 175;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 176;
                    this.lexerRuleAtom(9);
                    break;

                case 3:
                    localctx = new LexerRuleAtomContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, BlocklyGrammerParser.RULE_lexerRuleAtom);
                    this.state = 177;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 178;
                    this.match(BlocklyGrammerParser.T__6);
                    break;

                case 4:
                    localctx = new LexerRuleAtomContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, BlocklyGrammerParser.RULE_lexerRuleAtom);
                    this.state = 179;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 180;
                    _la = this._input.LA(1);
                    if(!(_la===BlocklyGrammerParser.T__7 || _la===BlocklyGrammerParser.T__8)) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 182;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
                    if(la_===1) {
                        this.state = 181;
                        this.match(BlocklyGrammerParser.T__6);

                    }
                    break;

                } 
            }
            this.state = 188;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,22,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


BlocklyGrammerParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 11:
			return this.lexerRuleAtom_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

BlocklyGrammerParser.prototype.lexerRuleAtom_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 9);
		case 1:
			return this.precpred(this._ctx, 8);
		case 2:
			return this.precpred(this._ctx, 11);
		case 3:
			return this.precpred(this._ctx, 10);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.BlocklyGrammerParser = BlocklyGrammerParser;
