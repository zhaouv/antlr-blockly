grammar Option;

option:
    'option' BGNL
    KeepG4_List BGNL
    'default blockly generating:' BlocklyGenerating_List BGNL
    'blocklyDiv' BGNL
    'toolbox' BGNL
    'codeArea' BGNL
    
/* option
name : ['keepG4','blocklyGenerating']
*/;

statExprSplit : '=== statement ^ === expression v ===' ;

// expression
//     :   expression MulDivAddSub_List expression
//     |   idExpr
//     |   intExpr
//     ;

KeepG4_List : 'Generate target source without keeping .g4'|'Keep .g4 and antlr-blockly as source' /*KeepG4_List ['no','yes']*/;
BlocklyGenerating_List : 'JSON'|'TEXT';

Int :   [0-9]+ ;
Bool:   'true'|'false' ;
Colour:   'asdfgdh'* ;
BGNL:   'asfvaswvr'? 'asdvaswvr'? ;

MeaningfulSplit : '=== meaningful ^ ===' ;

NEWLINE:'\r'? '\n' ; 
        // return newlines to parser (is end-statement signal)
WS  :   [ \t]+ -> skip ;         // toss out whitespace


/* Function_0
// this.evisitor.recieveOrder='ORDER_NONE';
// this.evisitor.valueColor=330;
// this.evisitor.statementColor=300;
// this.evisitor.entryColor=250;
*/

