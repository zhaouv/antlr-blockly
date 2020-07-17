grammar BlocklyGrammer;

//===============parser===============

grammarFile
    :   grammerDecl statementRule*? statExprSplit expressionRule*? lexerRuleCollection meaningfulSplit lexerRuleCollection
    ;

grammerDecl
    :   'grammar' LexerIdentifier ';'
    ;

statExprSplit
    :   'statExprSplit : \'=== statement ^ === expression v ===\' ;'
    ;

statementRule
    :   ParserIdentifier ':' ruleListMember ('|' ruleListMember)+ ';' # StatList
    |   ParserIdentifier ':' parserRuleAtom+ ';' # StatValue
    ;

expressionRule
    :   ParserIdentifier ':' ruleListMember ('|' ruleListMember)+ ';' # ExprList
    |   ParserIdentifier ':' parserRuleAtom+ ';' # ExprValue
    ;

ruleListMember
    :   name=ParserIdentifier|blockContentCollection
    ;

blockContentCollection
    :   parserRuleAtom+ ('#' blockName=ParserIdentifier)?
    ;

parserRuleAtom
    :   (varName=(LexerIdentifier|ParserIdentifier) '=')? parserId=ParserIdentifier (ex=('+' | '*' | '?') '?'?)? # ParserAtomParserId
    |   (varName=(LexerIdentifier|ParserIdentifier) '=')? lexerId=LexerIdentifier (ex='?' '?'?)? # ParserAtomLexerId
    |   (varName=(LexerIdentifier|ParserIdentifier) '=')? String ('?' '?'?)? # ParserAtomStr
    ;

lexerRuleCollection
    :   lexerRule*?
    ;

meaningfulSplit
    :   'MeaningfulSplit : \'=== meaningful ^ ===\' ;'
    ;

lexerRule
    :   LexerIdentifier ':' strings ';' # LexerRuleStrings
    |   LexerIdentifier ':' strings ('|' strings)+ ';' # LexerRuleList
    |   LexerIdentifier ':' lexerRuleExpr ';' # LexerRuleComplex
    ;

strings
    :   (String ('?' '?'?)?)+
    ;
    
lexerRuleExpr
    :   lexerRuleExpr '?'
    |   lexerRuleExpr ('+'|'*') '?'?
    |   lexerRuleExpr '|' lexerRuleExpr
    |   lexerRuleExpr lexerRuleExpr
    |   '(' lexerRuleExpr ')'
    |   '~' lexerRuleExpr
    |   LexerIdentifier
    |   String '.' '.' String
    |   String
    |   '.'
    |   Brackets
    ;


//===============lexer===============

Brackets
    :  '[' (('\\' '\\') | ('\\' ']') | ~[\]])*? ']'
    ;

LexerIdentifier
    :   [A-Z] [a-zA-Z_0-9]*
    ;

ParserIdentifier
    :   [a-z] [a-zA-Z_0-9]*
    ;

String
    :   STRING_single
    |   STRING_double
    ;
fragment STRING_double
    :   '"' (ESC_double | ~["\\])* '"'
    ;
fragment ESC_double
    :   '\\' (["\\/bfnrt] | UNICODE)
    ;
fragment STRING_single
    :   '\'' (ESC_single | ~['\\])* '\''
    ;
fragment ESC_single
    :   '\\' (['\\/bfnrt] | UNICODE)
    ;
fragment UNICODE
    :   'u' HEX HEX HEX HEX
    ;
fragment HEX
    :   [0-9a-fA-F]
    ;

LabelForParserRule
    :   '#' LexerIdentifier -> skip
    ;

Newline
    :   ('\r' '\n'?| '\n') -> skip
    ;

WhiteSpace
    :   [ \t]+ -> skip
    ;

BlockComment
    :   '/*' .*? '*/' -> skip
    ;

FragmentComment
    :   'fragment' .*? ';' -> skip
    ;

LineComment
    :   '//' ~[\r\n]* -> skip
    ;

ArrowComment
    :   '->' ~[|;]* ->skip
    ;
