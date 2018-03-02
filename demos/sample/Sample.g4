grammar Sample;

prog
    :   statement+
    ;

statement
    :   varDecl
    |   setValue
    |   printOut
    ;

printOut
    :   'Print' expression
    ;

varDecl
    :   'var' IdString
    ;

setValue
    :   IdString '=' expression
    ;
    
statExprSplit : '=== statement ^ === expression v ===' ;

expression
    :   bool_not_e
    |   expression Arithmetic_1_List expression
    |   expression Arithmetic_2_List expression
    |   expression Arithmetic_3_List expression
    |   idString_e
    |   bool_e
//  |   bracket
    |   number_e
    ;

// bracket
//     :   '(' expression ')'
//     ;

bool_not_e
    :   'not' expression
    ;

idString_e
    :   IdString
    ;

number_e
    :   Number
    ;

bool_e
    :   Bool
    ;


Arithmetic_1_List
    :   '+'|'-'|'*'|'/'|'^'
    ;

Arithmetic_2_List
    :   '=='|'!='|'>'|'<'|'>='|'<='
    ;

Arithmetic_3_List
    :   'and'|'or'
    ;

Bool:   'TRUE' 
    |   'FALSE'
    ;


Number
    :   '-'? Int '.' Int EXP?   // 1.35, 1.35E-9, 0.3, -4.5
    |   '-'? Int EXP            // 1e10 -3e4
    |   '-'? Int                // -3, 45
    ;
fragment EXP : [Ee] [+\-]? Int ; // \- since - means "range" inside [...]
fragment Int :   '0' | [1-9][0-9]* ; // no leading zeros

IdString
    :   [a-zA-Z_][0-9a-zA-Z_\-:]*
    ;

MeaningfulSplit : '=== meaningful ^ ===' ;

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