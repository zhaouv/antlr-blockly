grammar Option;

option
    :   'option' BGNL
        'default blockly generating:' defaultGenerating=BlocklyGenerating_List BGNL
        'blockly runtime' BGNL blocklyRuntime=blocklyRuntimeStatement
        'blocklyDiv' BGNL blocklyDiv=blocklyDivStatement
        'toolbox' BGNL toolbox=toolboxStatement
        'codeArea' BGNL codeArea=codeAreaStatement
        'target' BGNL target=targetStatement
    ;

blocklyRuntimeStatement
    :   'path' path=NormalString BGNL 
        'files' files=NormalString BGNL 
/* blocklyRuntimeStatement
defaultMap:{path:"./",files:'blockly_compressed.js, blocks_compressed.js, javascript_compressed.js, zh-hans.js'}
color : this.blocklyRuntimeStatementColor
*/
// cdn demo:
// {path:"https://cdn.bootcdn.net/ajax/libs/blockly/3.20200402.1/",files:'blockly.min.js, msg/zh-hans.min.js'}
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
color : this.blocklyDivStatementColor
*/
/* fixedSizeBlocklyDiv
tooltip:height,width are only used in generated html
defaultMap:{id:"blocklyDiv",height:"480px",width:"940px"}
color : this.blocklyDivStatementColor
*/
;

toolboxStatement
    :   'function' BGNL
        'id' id=NormalString 'function' func=RawString BGNL 
    # toolboxFunc
    |   'default' BGNL
        'id' id=NormalString 'gap' gap=Int BGNL
    # toolboxDefault
/* toolboxFunc
defaultMap:{id:"toolbox",func:"function(){return document.getElementById('toolboxXml')}"}
color : this.toolboxStatementColor
*/
/* toolboxDefault
defaultMap:{id:"toolbox",gap:5}
color : this.toolboxStatementColor
*/
;

codeAreaStatement
    :   'output' output=RawString BGNL
/* codeAreaStatement
defaultMap:{output:"function(err,data){document.getElementById('codeArea').innerText=err?String(err):data}"}
color : this.codeAreaStatementColor
*/
;

targetStatement
    :   'Keep grammar and antlr-blockly as source' BGNL
    # keepGrammar
    |   'Generate target source without keeping grammar' BGNL
    # independentFile
/* keepGrammar
color : this.targetStatementColor
*/
/* independentFile
color : this.targetStatementColor
*/
;

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
Color:   'asdfgdh'* ;
BGNL:   'asfvaswvr'? 'asdvaswvr'? ;

MeaningfulSplit : '=== meaningful ^ ===' ;

NEWLINE:'\r'? '\n' ; 
        // return newlines to parser (is end-statement signal)
WS  :   [ \t]+ -> skip ;         // toss out whitespace


/* Call_BeforeType
// this.evisitor.recieveOrder='ORDER_NONE';
// this.evisitor.valueColor=330;
// this.evisitor.statementColor=300;
// this.evisitor.entryColor=250;
this.evisitor.blocklyRuntimeStatementColor=135;
this.evisitor.blocklyDivStatementColor=160;
this.evisitor.toolboxStatementColor=180;
this.evisitor.codeAreaStatementColor=200;
this.evisitor.targetStatementColor=220;
*/

/* Insert_FunctionStart
for (var key in OptionBlocks) {
    if (OptionBlocks[key].json) {
        OptionBlocks[key].json.nextStatement=undefined;
    }
}
*/