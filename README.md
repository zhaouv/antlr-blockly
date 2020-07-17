# antlr-blockly

Generate visual programming editor from BNF grammar.

The purely Javascript implementation of generating [blockly](https://github.com/google/blockly) visual editor from [antlr](https://github.com/antlr/antlr4) grammar file.

Typical applications: DSL editor and JSON editor. Additional design is made for JSON editing. As an editor that generates JSON, it can also automatically complete reverse parsing.

[Document](https://zhaouv.github.io/antlr-blockly/docs/#/en/README)

基于BNF文法生成可视化编辑器.

纯Javascript实现的[antlr](https://github.com/antlr/antlr4)语法文件生成[blockly](https://github.com/google/blockly)可视化编辑器.  

典型应用: DSL编辑器 和 JSON编辑器. 针对JSON编辑做了额外的设计, 作为生成JSON的编辑器的同时, 也能够自动完成反向的解析.

[文档](https://zhaouv.github.io/antlr-blockly/docs/#/README)  

---

<!-- 转化思路 [convert.md](./convert.md) -->

作为示例MotaAction.g4给项目 [mota-js](https://github.com/ckcz123/mota-js) 提供事件编辑器子模块

## LICENSE

[Apache License 2.0](./LICENSE)

[NOTICE](./NOTICE.md)

## Todo

+ 单语句的支持: json中不再是数组, 放入多个语句时报错

+ [ ] demos按照新的设计改写

+ [ ] 文档
  + [ ] xmlText函数attribute
  + [ ] defaultCode_JSON
  + [ ] `# id`
  + [ ] `abc=Bool`
  + [ ] defaultMap

+ [x] 默认值提供defaultMap, 优先级大于default数组

+ [x] name也可以用`event : '覆盖触发器' abc=Bool '启用' def=Bool ;`来进行, 算数规则可以用`# id`来命名

+ [ ] 更可控的配置, 提供一个option对象作为接口, 分为保留g4和不保留两类部署方案, blockly可以选择文件或者cdn等等, 目前的主页作为playground

+ [x] 语句集合和表达式集合内允许定义一般方块, 通过` # id`规则来命名方块, 或者使用xxx_arithmetic_ii的默认名称

+ [x] 表达式集合支持expression之外的集合, 选择一种方案支持
  + ~~只有expression允许直接的左递归~~
  + ~~所有都允许左递归, 只有expression允许直接的左递归且不命名方块~~
  + ~~所有都允许左递归, 放弃expression的特殊地位, 不兼容旧的.g4~~
  + [x] 所有都允许左递归, 放弃expression的特殊地位, 所有的列表都用xxx_arithmetic_ii给默认名称

+ [ ] 文档:api说明

+ 多语言的支持

+ 注释,每处做了什么的说明

+ [ ] 更多demo,提供一个包含`function`的例子

## v 0.1.1 (Beta)

+ [x] package化

+ [x] xmlText函数加入attribute, 以及把next单独作为输入参数

+ [x] json生成版本的defaultCode_JSON, 以及相应的默认json到方块的Parser

+ [x] 文本生成版的defaultCode_TEXT不再需要在数组中加'\n'

+ [x] 多行文本的文档

+ [x] 多行文本 https://github.com/google/blockly/pull/2663  
  `xxxx_Multi`

+ [x] 动态下拉菜单的文档

+ [x] 动态下拉菜单  
  生成后的代码把options从二维数组改成`function(block){return [['text','value']]}`的样子就行  
  格式约定 `'dynamic'|'<默认值>'`(一定要有两个使之识别为list), 在注入中放function  

+ [x] 下拉菜单的默认值不起效(虽然本质是blockly的机制options无法把非第一项注册成默认值)

+ [x] 方块的配置:menu和name 的文档

+ [x] 域也放在blocks中以供引用 方块的配置:menu和name

+ [x] `field_colour field_angle field_image`

+ [x] 支持嵌入的方式直接修改下拉菜单的对应值

+ [x] 修改下拉菜单在default中的行为,使之更自然(与之前的.g4不兼容)

+ [x] 形如`xxx ??`,`xxx +?`,`xxx *?`的支持 (更像是fix bug)  
strings 中要支持`??`,parserRule中要支持非贪婪匹配的形式

+ [x] `lexerRuleAtom`的命名不合理,应改成`lexerRuleExpr`  
`grammerDecl`中不应包含`ParserIdentifier`

+ [x] 支持colour,tooltip,helpUrl  
  默认值default的设置  
  generFunc的代码  
  嵌入到.g4里

+ [x] override,嵌入`override : true`则用嵌入的函数整个覆盖generFunc,不保留原有的变量获取部分的代码,  
  可以用来改变valueToCode的优先级recieveOrder或者遍历   

+ [x] 文档  
  如何使用这个工具  
  需要对antlr和blockly了解到什么程度  
  目标是只看antlr-blockly就能高效的搭一个的blockly  

+ [x] 文档:blockly在网页上如何配置,如何设置侧边栏  

+ [x] 主页支持search参数直接加载和运行demos中的.g4文件

+ [x] 优化一些默认值,缺省之类的细节

+ [x] ~~不使用反引号的字符串模板以提高兼容性,借助`Function.prototype.toString()`实现多行字符串~~

## v 0.1.0 (Alpha)
+ 主页点`Run`就可以运行生成的blockly
+ 主页点`Download`后产生一个能运行生成的blockly的代码的网页(放在此目录下)