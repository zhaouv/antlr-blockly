grammar Option;

option
    :   'option' BGNL
        'default blockly generating:' defaultGenerating=BlocklyGenerating_List BGNL
        'blocklyDiv' BGNL blocklyDiv=blocklyDivStatement
        'toolbox' BGNL toolbox=toolboxStatement
        'codeArea' BGNL codeArea=codeAreaStatement
        'target' BGNL target=targetStatement
    ;

blocklyDivStatement
    :   'dymanic' BGNL 
        'id' id=NormalString BGNL 
        # dymanicSizeBlocklyDiv
    |   'fixed size' BGNL
        'id' id=NormalString BGNL 
        'height' height=NormalString 'width' width=NormalString
        # fixedSizeBlocklyDiv
/* dymanicSizeBlocklyDiv
defaultMap:{id:"blocklyDiv"}
*/
/* fixedSizeBlocklyDiv
tooltip:height,width are only used in generated html
defaultMap:{id:"blocklyDiv",height:"480px",width:"940px"}
*/;

toolboxStatement
    :   'function' BGNL
        'id' id=NormalString 'function' func=RawString BGNL 
        # toolboxFunc
    |   'default' BGNL
        'id' id=NormalString 'gap' gap=Int BGNL
        # toolboxDefault
/* toolboxFunc
defaultMap:{id:"toolbox",func:"function(){return document.getElementById('toolboxXml')}"}
*/
/* toolboxDefault
defaultMap:{id:"toolbox",gap:5}
*/;

codeAreaStatement
    :   'output' output=RawString BGNL
/* codeAreaStatement
defaultMap:{output:"function(err,data){document.getElementById('abc').innerText=err||data}"}
*/;

targetStatement
    :   'Generate target source without keeping grammar' BGNL
        'output' output=RawString BGNL
        # independentFile
    |   'Keep grammar and antlr-blockly as source' BGNL
        'output' output=RawString BGNL
        # keepGrammar
/* independentFile
defaultMap:{output:"function(html,js){console.log(html,js)}"}
*/
/* keepGrammar
defaultMap:{output:"function(html,js){console.log(html,js)}"}
*/;

statExprSplit : '=== statement ^ === expression v ===' ;

// expression
//     :   expression MulDivAddSub_List expression
//     |   idExpr
//     |   intExpr
//     ;

BlocklyGenerating_List : 'JSON'|'TEXT';
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