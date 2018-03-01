grammar AddSubMulDiv_exec;

prog:   stat+ ; 
/* prog
override : true
vars={};
printf=console.log;
blocks={};
Blockly.JavaScript.statementToCode(block, 'stat_0');
delete(printf);
//delete(vars);
//delete(blocks);
return block.id;
*/

stat:   printExpr
    |   assign
    |   blank
    ;

printExpr : expression NEWLINE ;
/* printExpr
printf(blocks[expression_0]);
return block.id;
*/
assign : ID '=' expression NEWLINE ;
/* assign
default : ["x",null]
vars[ID_0]=blocks[expression_0];
return block.id;
*/
blank : NEWLINE ;
/* blank
return block.id;
*/

statExprSplit : '=== statement ^ === expression v ===' ;

expression
    :   expression MulDivAddSub_List expression
//  |   parens
    |   idExpr
    |   intExpr
    ;
/* expression_arithmetic_0
var a = blocks[expression_0], b = blocks[expression_1];
var function_ = {
  '+': function(a,b){return a+b},
  '-': function(a,b){return a-b},
  '*': function(a,b){return a*b},
  '/': function(a,b){return a/b},
}[MulDivAddSub_List_0];
blocks[block.id]=function_(a,b);
return [block.id, Blockly.JavaScript.ORDER_ATOMIC];
*/

// parens : '(' expression ')' ;
intExpr : Int ;
/* intExpr
blocks[block.id]=Int_0;
return [block.id, Blockly.JavaScript.ORDER_ATOMIC];
*/
idExpr : ID ;
/* idExpr
default : ["x"]
colour : 300
blocks[block.id]=vars[ID_0];
return [block.id, Blockly.JavaScript.ORDER_ATOMIC];
*/

MulDivAddSub_List : '*'|'/'|'+'|'-' ;

ID  :   [a-zA-Z_][a-zA-Z_0-9]+ ; // match identifiers
Int :   [0-9]+ ;                 // match integers

MeaningfulSplit : '=== meaningful ^ ===' ;

NEWLINE:'\r'? '\n' ; 
        // return newlines to parser (is end-statement signal)
WS  :   [ \t]+ -> skip ;         // toss out whitespace