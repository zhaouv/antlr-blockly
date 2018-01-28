grammar BlocklyGrammer;

//===============parser===============

grammarFile
    :   grammerDecl statmentRule*? statExprSplit expressionRule*? lexerRuleCollection meaningfulSplit lexerRuleCollection
    ;

grammerDecl
    :   'grammar' (ParserIdentifier | LexerIdentifier) ';'
    ;

statExprSplit
    :   'statExprSplit : \'=== statment ^ === expression v ===\' ;'
    ;

statmentRule
    :   ParserIdentifier ':' ParserIdentifier ('|' ParserIdentifier)* ';'
    |   ParserIdentifier ':' parserRuleAtom* ';'
    ;

expressionRule
    :   'expression' ':' arithmeticRuleCollection? ParserIdentifier ('|' ParserIdentifier)* ';'
    |   ParserIdentifier ':' parserRuleAtom* ';'
    ;

arithmeticRuleCollection
    :   'expression' parserRuleAtom* '|'
    ;

parserRuleAtom
    :   'expression' '?'?
    |   ParserIdentifier ('+' | '*' | '?')?
    |   LexerIdentifier '?'?
    |   String
    ;

lexerRuleCollection
    :   lexerRule*?
    ;

meaningfulSplit
    :   'MeaningfulSplit : \'=== meaningful ^ ===\' ;'
    ;

lexerRule
    :   LexerIdentifier ':' String+ ';'
    |   LexerIdentifier ':' String ('|' String)+ ';'
    |   LexerIdentifier ':' lexerRuleAtom ';'
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
