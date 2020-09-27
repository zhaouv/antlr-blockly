grammar AddSubMulDiv_generCode;

prog:   stat+ ; 
/* prog
var code = '(function(printf){\n'+stat_0+'})(console.log);';
return code;
*/

stat:   printExpr
    |   assign
    |   blank
    ;

printExpr : expression NEWLINE ;
/* printExpr
var code = 'printf('+expression_0+');\n';
return code;
*/
assign : ID '=' expression NEWLINE ;
/* assign
default : ["x"]
var code = 'var '+ID_0+' = '+expression_0+';\n';
return code;
*/
blank : NEWLINE ;
/* blank
var code = '\n';
return code;
*/

statExprSplit : '=== statement ^ === expression v ===' ;

expression
    :   expression MulDivAddSub_List expression
//  |   parens
    |   idExpr
    |   intExpr
    ;
/* expression_arithmetic_0
override : true

var MulDivAddSub_List_0 = block.getFieldValue('MulDivAddSub_List_0');
MulDivAddSub_List_0 = AddSubMulDiv_generCodeFunctions.pre('MulDivAddSub_List')(MulDivAddSub_List_0);
var orders = {
  '+': Blockly.JavaScript.ORDER_ADDITION,
  '-': Blockly.JavaScript.ORDER_SUBTRACTION,
  '*': Blockly.JavaScript.ORDER_MULTIPLICATION,
  '/': Blockly.JavaScript.ORDER_DIVISION,
};
var order = orders[MulDivAddSub_List_0];
var expression_0 = Blockly.JavaScript.valueToCode(block, 'expression_0', 
  order);
if (expression_0==='') {
  throw new OmitedError(block,'expression_0','expression_arithmetic_0');
}
var expression_1 = Blockly.JavaScript.valueToCode(block, 'expression_1', 
  order);
if (expression_1==='') {
  throw new OmitedError(block,'expression_1','expression_arithmetic_0');
}
var code = expression_0 + MulDivAddSub_List_0 + expression_1;
return [code, order];
*/

// parens : '(' expression ')' ;
intExpr : Int ;
/* intExpr
var code = Int_0;
return [code, Blockly.JavaScript.ORDER_ATOMIC];
*/
idExpr : ID ;
/* idExpr
default : ["x"]
colour : 300
var code = ID_0;
return [code, Blockly.JavaScript.ORDER_ATOMIC];
*/

MulDivAddSub_List : '*'|'/'|'+'|'-' ;

ID  :   [a-zA-Z_][a-zA-Z_0-9]+ ; // match identifiers
Int :   [0-9]+ ;                 // match integers

MeaningfulSplit : '=== meaningful ^ ===' ;

NEWLINE:'\r'? '\n' ; 
        // return newlines to parser (is end-statement signal)
WS  :   [ \t]+ -> skip ;         // toss out whitespace

/* Call_BeforeType
this.evisitor.recieveOrder='ORDER_NONE';
*/