# antlr-blockly documentation

**To ensure the performance, use the docsify version: [antlr-blockly documentation (docsify)] (https://zhaouv.github.io/antlr-blockly/docs/#/en/README)**

[blockly](https://github.com/google/blockly) is a visual program editor that you can program by dragging and dropping blocks.

Configure each block mosaic logic and write the `generated code function`, you can generate a language code, or to generate javascript code and then directly on the page execution, is often used for programming education .  
In fact, blockly as a code editor for domain-specific languages ​​or new programming languages ​​is also quite advantageous. [Domain Specific Languages](https://en.wikipedia.org/wiki/Domain-specific_language): dsl, Can be understood as a certain format, can be some tools to resolve pseudo-code, such as regular expressions and embedded SQL)

Each box independently configured, you need to select the type of each input, give each input naming, the process is more complicated.  
The drag-and-drop process of the user essentially bypasses the process of editing the code by directly editing the Abstract Syntax Tree (ast), generating the code via ast, or executing ast directly (See details in [blockly running mechanism](blockly.md))

By [antlr4](https://github.com/antlr/antlr4) you can create a new language (dsl) very succinctly, using the very natural and understandable `.g4` file to describe the syntax and inherit listener or visitor Traversing the syntax tree, you can elegantly implement a language, and it's easy to convert between syntax trees and code.

Through antlr-blockly, you can use antlr4 syntax to describe the language, automatically generate a description of each box json, and can be similar to the antlr4 editor visitor, more concise and easy to write `block generated code function`, to traverse blockly generated syntax tree.  
Can simplify the blockly configuration, and can be easily unified set for all types of "escape" or default behavior.  
Combined antlr4 visitor generated, it is easy to do blockly blocks and code two-way conversion

antlr-blockly For users who have the need to `"visualize" domain specific languages`, you can efficiently generate a graphical editor.

Mainly for blockly users, to simplify the configuration blocklock box, without learning antlr4.  
For antlr4 users, it provides a means to efficiently generate their dsl development tools, with only a slight idea of ​​how blockly is laid out on the page.

> Use blockly for ide Compared to allow users to directly edit the benefits of dsl text: There will be no typos and keywords spelling mistakes, low learning costs, the syntax block highlighting the natural syntax, and help the document can be closely integrated.  
> ~~Through this document, do not need antlr4 or blockly experience, you can build your own blockly program~~

- - -

- **Start Page**
- [antlr4 syntax introduction](en/antlr4.md)
- [blockly running mechanism](en/blockly.md)
- [grammar file rules](en/grammerFile.md)
- [demo](en/demo.md)