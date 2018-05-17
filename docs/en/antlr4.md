# antlr4 syntax introduction

When we want to describe a programming language (or describe a domain specific language), I will generally say what keywords are used in the language, how to control conditions, loops, declarative assignments, arithmetic operations, etc. In antlr , Using its naturally straightforward rules to standardize descriptions of these, a syntax statement that analyzes the four arithmetic expressions AddSubMulDiv.g4 is as follows:
```antlr
grammar AddSubMulDiv;

prog: stat +;

stat: expr NEWLINE
    ID '=' expr NEWLINE
    | NEWLINE
    ;

expr: expr ('*' | '/') expr
    expr ('+' | '-') expr
    | '(' expr ')'
    Int
    | ID
    ;

ID: [a-zA-Z _] [a-zA-Z_0-9] +; // match identifiers
Int: [0-9] +; // match integers
NEWLINE: '\ r'? '\ N';
        // return newlines to parser (is end-statement signal)
WS: [\ t] + -> skip; // toss out whitespace
```
Describes an `AddSubMulDiv program consists of a number of statements, there are three statements , print expressions or assignment or blank lines, the expression by expression multiplication or subtraction or parentheses expressions and integer or variable name`.  
The antlr statement is separated by `;`, the first is `grammer`, followed by the name of the grammar with the same name as the file, followed by the lower case, parsed by the parser (parser rule ), Capitalized at the beginning of the token parsed by the lexical analyzer (lexical rules token). The colon is the contents of the rule name, you can [string, regular expression, parser rules, lexical rules] in accordance with similar regular expressions A combination of ways, that is
```
a b on behalf of a first match then b
a | b on behalf of the match a or b, and a higher priority than b, (as in the regular expression, said the local multi-select braces)
a + a +? a * a *? a? a ?? are matches [greedy or non-greedy] [multiple, any, 1 or 0] rules a
```
Parser rules can only be used by parser rules, regular expressions can only be used by lexical rules, can be added to the lexical rules by the keyword `fragment`, so that they are no longer used as independent token and can not be called by parser rules.  
The syntax for `.g4` comments is`/ * block comments * /`,`// line comments`  
Also noteworthy is that the `->` appearing on the last line places the code in a different channel, such as `-> skip` to drop comments and whitespace directly.

Such a piece of code will be automatically generated antlr lexer and parser parsed into the tree map
```js
193
a = 5
b = 6
a + b * 2
(1 + 2) * 3
```
![Please read docsify version. parse_tree] (./img/expr_parse_tree.png)

+ > `expr` in the order of priority: Multiplication and division at the same level greater than the addition and subtraction of this level,`Atomic` need not participate in the priority on the last, and bracket group due to parentheses match, itself is Atomic level Intensity  
+ > antlr-blockly uses a subset of the syntax rules for antlr4, which is a weak version that works in antlr4, using the antlr-blockly unrecognized `.g4` file for more advanced features. This section [Grammar Document rules](en/grammerfile.md) in detail.

- - -

- [Start Page](en/README.md)
- **antlr4 syntax introduction**
- [blockly operation mechanism](en/blockly.md)
- [grammar file rules](en/grammerfile.md)
- [demo](en/demo.md)