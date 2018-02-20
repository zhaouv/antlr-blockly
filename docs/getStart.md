# Get Start

Get Start

```antlr
grammar Expr;

prog:   stat+ ; 

stat:   printExpr
    |   assign
    |   blank
    ;

printExpr : expr NEWLINE ;
assign : ID '=' expr NEWLINE ;
blank : NEWLINE ;

statExprSplit : '=== statement ^ === expression v ===' ;

expr:   expr MulDivAddSub_List expr
//    |   parens
    |   int
    |   id
    ;

//parens : '(' expr ')' ;
int : INT ;
id : ID ;

MulDivAddSub_List : '*'|'/'|'+'|'-' ;

ID  :   [a-zA-Z_][a-zA-Z_0-9]+ ; // match identifiers
INT :   [0-9]+ ;                 // match integers

MeaningfulSplit : '=== meaningful ^ ===' ;

NEWLINE:'\r'? '\n' ;             // return newlines to parser (is end-statement signal)
WS  :   [ \t]+ -> skip ;         // toss out whitespace
```