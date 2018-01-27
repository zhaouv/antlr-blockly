grammar BlocklyGrammer;

//===============parser===============

grammarFile
    :   grammerDecl parserRuleCollection statExprSplit parserRuleCollection lexerRuleCollection meaningfulSplit lexerRuleCollection
    ;

grammerDecl
    :   'grammar' GrammerIdentifier ';'
    ;

parserRuleCollection
    :   parserRule*
    ;

statExprSplit
    :   'statExprSplit : \'=== statment ^ === expression v ===\' ;'
    ;

parserRule
    :   'statment' ':' ParserIdentifier ('|' ParserIdentifier)* ';'
    |   'expression' ':' ParserIdentifier ('|' ParserIdentifier)* ';'
    |   ParserIdentifier ':' ( (ParserIdentifier ('+'|'*'|'?')? | LexerIdentifier '?'?) | String )* ';'
    ;

lexerRuleCollection
    :   (lexerRule|fragmentRule)*
    ;

meaningfulSplit
    :   'MeaningfulSplit : \'=== meaningful ^ ===\' ;'
    ;

lexerRule
    :   LexerIdentifier ':' (~[;] | String)* ';'
    ;

fragmentRule
    :   'fragment' ':' LexerIdentifier (~[;] | String)* ';'
    ;

//===============lexer===============

ParserIdentifier
    :   [a-z] [a-zA-Z_0-9]*
    ;

LexerIdentifier
    :   [A-Z] [a-zA-Z_0-9]*
    ;

GrammerIdentifier
    :   [a-zA-Z_] [a-zA-Z_0-9]*
    ;

STRING
    :   STRING_single | STRING_double
    ;
fragment STRING_double
    :   '"' ('\\' ["\\] | ~["\\])* '"'
    ;
fragment STRING_single
    :   '\'' ('\\' ['\\] | ~['\\])* '\''
    ;

Newline
    :   ('\r' '\n'?| '\n')// -> skip
    ;

WhiteSpace
    :   [ \t]+ -> skip
    ;

BlockComment
    :   '/*' .*? '*/' -> skip
    ;

LineComment
    :   '//' ~[\r\n]* -> skip
    ;