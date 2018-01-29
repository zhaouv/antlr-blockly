grammar BlocklyGrammer;

//===============parser===============

grammarFile
    :   grammerDecl statementRule*? statExprSplit expressionRule*? lexerRuleCollection meaningfulSplit lexerRuleCollection
    ;

grammerDecl
    :   'grammar' (ParserIdentifier | LexerIdentifier) ';'
    ;

statExprSplit
    :   'statExprSplit : \'=== statment ^ === expression v ===\' ;'
    ;

statementRule
    :   ParserIdentifier ':' ParserIdentifier ('|' ParserIdentifier)* ';' # StatList
    |   ParserIdentifier ':' parserRuleAtom* ';' # StatValue
    ;

expressionRule
    :   'expression' ':' (arithmeticRuleCollection|ParserIdentifier) ('|' (arithmeticRuleCollection|ParserIdentifier))* ';' # ExprList
    |   ParserIdentifier ':' parserRuleAtom* ';' # ExprValue
    ;

arithmeticRuleCollection
    :   'expression' parserRuleAtom*
    ;

parserRuleAtom
    :   'expression' '?'? # ParserAtomExpr
    |   ParserIdentifier ('+' | '*' | '?')? # ParserAtomParserId
    |   LexerIdentifier '?'? # ParserAtomLexerId
    |   String # ParserAtomStr
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
    |   LexerIdentifier ':' lexerRuleAtom ';' # LexerRuleComplex
    ;

strings
    :   String+
    ;
    
lexerRuleAtom
    :   lexerRuleAtom '?'
    |   lexerRuleAtom ('+'|'*') '?'?
    |   lexerRuleAtom '|' lexerRuleAtom
    |   lexerRuleAtom lexerRuleAtom
    |   '(' lexerRuleAtom ')'
    |   '~' lexerRuleAtom
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
