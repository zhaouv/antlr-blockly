grammar Option;

option:
    'option' BGNL
    keepG4=KeepG4_List BGNL
    'default blockly generating:' defaultGenerating=BlocklyGenerating_List BGNL
    'grammarFile' BGNL grammarFile=grammarStatement
    'blocklyDiv' BGNL blocklyDiv=blocklyDivStatement
    'toolbox' BGNL toolbox=toolboxStatement
    'codeArea' BGNL codeArea=codeAreaStatement
    ;

grammarStatement
    :   'content' BGNL source=BlockString_Multi BGNL # grammarContent
    |   'filename' filename=NormalString BGNL # grammarFilename
    |   'function' func=RawString BGNL # grammarFunction
    ;

blocklyDivStatement
    :   'id :' id=NormalString BGNL 'dymanic' # dymanicSizeBlocklyDiv
    |   'id :' id=NormalString BGNL 'fix size' 'x:' x=Int 'y:' y=Int # fixSizeBlocklyDiv
    ;

toolboxStatement
    :   'function' func=RawString BGNL
    ;

codeAreaStatement
    :   'output' output=RawString BGNL 'input (JSON only)' input=RawString?
    ;

statExprSplit : '=== statement ^ === expression v ===' ;

// expression
//     :   expression MulDivAddSub_List expression
//     |   idExpr
//     |   intExpr
//     ;

KeepG4_List : 'Generate target source without keeping grammar'|'Keep grammar and antlr-blockly as source' /*KeepG4_List ['no','yes']*/;
BlocklyGenerating_List : 'JSON'|'TEXT';
BlockString_Multi: ('asdaw'+)*;
RawString: ('asdsaw'+)*;
NormalString: ('asdsaw'+)*;


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

/* Functions
for (var key in OptionBlocks) {
    if (OptionBlocks[key].json) {
        OptionBlocks[key].json.nextStatement=undefined;
    }
}
*/