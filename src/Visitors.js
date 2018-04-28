
var antlr4 = require('./antlr4/index');
var BlocklyGrammerVisitor = require('./BlocklyGrammerVisitor').
  BlocklyGrammerVisitor;

function SymbolVisitor() {
	BlocklyGrammerVisitor.call(this);
	return this;
}

SymbolVisitor.prototype = Object.create(BlocklyGrammerVisitor.prototype);
SymbolVisitor.prototype.constructor = SymbolVisitor;

SymbolVisitor.prototype.init = function() {
  this.statementRules=[];
  this.expressionRules=[];
  this.expression_arithmetic_num=0;
  this.lexerRules={};
  this.grammerName='';
  return this;
}

SymbolVisitor.prototype.error = function(error) {
  throw(new Error(error));
}

SymbolVisitor.prototype.checkSymbol = function() {
  var checkdict = {}
  var filter_ = function(list,name) {
    for(var ii=0,value;value=list[ii];ii++){
      if (value[0]===name) return value[1];
    }
    return [];
  }
  for(var ii=0,statementRule;statementRule=this.statementRules[ii];ii++){
    if (statementRule[1].length>1){
      for(var jj=0,statename;statename=statementRule[1][jj];jj++){
        //检查是否有语句出现在了两个语句集合中
        if (checkdict[statename]) {
          this.error('语句 '+statename
          +' 同时在两个语句集合 '+checkdict[statename]
          +' 和 '+statementRule[0]+' 中出现了');
        }
        checkdict[statename] = statementRule[0];
        //检查语句集合的子规则是否有语句集合
        if (filter_(this.statementRules,statename).length>1){
          this.error(statementRule[0]+' 下的子规则 '+statename+' 包含了"|"');
        }
      }
    }
  }
  //检查是否有expression之外的表达式集合
  for(var ii=0,expressionRule;expressionRule=this.expressionRules[ii];ii++){
    if (expressionRule[1].length>1 && expressionRule[0]!=='expression'){
      this.error('表达式 '+expressionRule[0]+' 包含了"|"');
    }
  }
}

// Visit a parse tree produced by BlocklyGrammerParser#grammarFile.
SymbolVisitor.prototype.visitGrammarFile = function(ctx) {
  this.visit(ctx.grammerDecl());
  this.visit(ctx.statementRule());
  this.visit(ctx.expressionRule());
  //只检查meaningful之前的词法规则
  this.visit(ctx.lexerRuleCollection(0));
  return this;
};

// Visit a parse tree produced by BlocklyGrammerParser#grammerDecl.
SymbolVisitor.prototype.visitGrammerDecl = function(ctx) {
  //获取名字
  this.grammerName = ctx.children[1].getText();
};

// Visit a parse tree produced by BlocklyGrammerParser#StatList.
SymbolVisitor.prototype.visitStatList = function(ctx) {
  //处理语句集合,statId和pIds分别是集合名字和子规则名字数组
  var pIds = ctx.ParserIdentifier();
  for(var ii=0,value;value=pIds[ii];ii++){
    pIds[ii]=value.getText();
  }
  var statId = pIds.shift();
  this.statementRules.push([statId,pIds]);
};

// Visit a parse tree produced by BlocklyGrammerParser#StatValue.
SymbolVisitor.prototype.visitStatValue = function(ctx) {
  var statId = ctx.ParserIdentifier(0).getText();
  this.statementRules.push([statId,[statId]]);
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprExpression.
SymbolVisitor.prototype.visitExprExpression = function(ctx) {
  //解析表达式的符号,以'expression'开头的,
  //用expression_arithmetic_[num]来依次命名
  var exprs=[];
  this.expression_arithmetic_num=ctx.arithmeticRuleCollection().length;
  for(var ii=0;ii<this.expression_arithmetic_num;ii++){
    var exprname = 'expression_arithmetic_'+ii;
    exprs.push(exprname);
    this.expressionRules.push([exprname,[exprname]]);
  }
  var pIds = ctx.ParserIdentifier();
  for(var ii=0,value;value=pIds[ii];ii++){
    pIds[ii]=value.getText();
  }
  exprs=exprs.concat(pIds);
  this.expressionRules.push(['expression',exprs]);
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprValue.
SymbolVisitor.prototype.visitExprValue = function(ctx) {
  var exprId = ctx.ParserIdentifier(0).getText();
  this.expressionRules.push([exprId,[exprId]]);
};

// Visit a parse tree produced by BlocklyGrammerParser#lexerRuleCollection.
SymbolVisitor.prototype.visitLexerRuleCollection = function(ctx) {
  var lexerRules = ctx.lexerRule() || [];
  for(var ii=0,value;value=lexerRules[ii];ii++){
    var lexerId = value.LexerIdentifier(0).getText();
    this.lexerRules[lexerId]='';
  }
};

//============================================================================

function EvalVisitor() {
	BlocklyGrammerVisitor.call(this);
	return this;
}

EvalVisitor.prototype = Object.create(BlocklyGrammerVisitor.prototype);
EvalVisitor.prototype.constructor = EvalVisitor;

/**
 * @param {!SymbolVisitor} symbols SymbolVisitor.
 */
EvalVisitor.prototype.init = function(symbols,rawInput) {
  this.rawInput = rawInput;

  var convert = function(rules){
    var ruledict = {}
    for(var ii=0,rule;rule=rules[ii];ii++){
      ruledict[rule[0]]={
        'check':rule[1],
        'user':{}
      }
    }
    return ruledict;
  }
  this.grammerName=symbols.grammerName;
  this.statementRules=convert(symbols.statementRules);
  this.expressionRules=convert(symbols.expressionRules);
  this.lexerRules=symbols.lexerRules;
  this.notEntry = {}

  //在Converter的generBlocks的第二个参数可以传入函数来修改以下的值
  //目前generLanguage:JavaScript还不能修改
  this.valueColor=330;
  this.statementColor=160;
  this.entryColor=260;

  this.generLanguage='JavaScript';
  this.recieveOrder='ORDER_ATOMIC';
  this.sendOrder='ORDER_NONE';
  this.varPrefix='';

  this.blocks='';

  return this;
}

EvalVisitor.prototype.error = function(error) {
  throw(new Error(error));
}

EvalVisitor.prototype.setRule = function(type,name,value) {
  if (type==='lexer') {
    this.lexerRules[name]=value;
  }
  if (type==='statement') {
    this.statementRules[name]=value;
  }
  if (type==='value') {
    this.expressionRules[name]=value;
  }
}

EvalVisitor.prototype.getRule = function(type,name) {
  if (type==='lexer') {
    return this.lexerRules[name];
  }
  if (type==='statement') {
    return this.statementRules[name];
  }
  if (type==='value') {
    return this.expressionRules[name];
  }
}

EvalVisitor.prototype.escapeString = function(string_) {
  return eval(string_);
}

EvalVisitor.prototype.matchInject = function(IdString) {
  var pattern = new RegExp('/\\*[^\\S\\r\\n]*'+IdString+'[\\r\\n]*([^]*?)[\\r\\n]*\\*/');
  var value = this.rawInput.match(pattern);
  if(!value) return '';
  return value[1];
}

EvalVisitor.prototype.inject = ['colour','tooltip','helpUrl','default','override']

EvalVisitor.prototype.loadInject = function(injectStr) {
  if(!injectStr)return {'default':[]};
  var obj = {};
  for(var ii=0,inject;inject=this.inject[ii];ii++){
    var pattern = new RegExp(
      '^\\s*'+inject+'\\s*:\\s*([^\\r\\n]*)\\s*?[\\r\\n]+','m');
    var value = injectStr.match(pattern);
    if(!value)continue;
    obj[inject]=value[1]
    injectStr=injectStr.slice(0,value.index)+injectStr.slice(
      value.index+value[0].length);
  }
  if(obj.colour) obj.colour=eval(obj.colour);
  if(obj.default){
    obj.default=eval(obj.default);
  } else {
    obj.default=[];
  }
  obj.generFunc = injectStr;
  return obj;
}

EvalVisitor.prototype.initAssemble = function(obj) {
  //把parserRuleAtom中获取的参数初步组装起来
  obj.inject = this.loadInject(this.matchInject(obj.name));
  var args0 = [];
  obj.vars = [];//会包含null
  obj.fieldDefault = [];
  var manualWrap = false;
  var fieldNum_ = 0;
  //这个循环中把形如块的各输入命名为形如Int_0,Int_1,expression_0
  //并额外记录在vars中
  for(var ii=0,args,ids={};args=obj.args[ii];ii++){
    var args_ = JSON.parse(JSON.stringify(args.data));
    var default_ = null;
    if (args.id) {
      ids[args.id]=ids[args.id]?ids[args.id]:0;
      args_.name=args.id+'_'+ids[args.id];
      ids[args.id]++;
      if (args.blockType!=='field') {
        var childvalue = this.getRule(args.blockType,args.id);
        var check = childvalue.check;
        args_.check=check.length===1?check[0]:check;
        childvalue.user[obj.name]=obj.type;
        this.notEntry[args.id]=true;//被其他语句使用过的语句不是入口方块
        this.setRule(args.blockType,args.id,childvalue);
      } else {
        var key = ({
          'field_input':'text',
          'field_number':'value',
          'field_dropdown':'options',
          'field_checkbox':'checked'
        })[args_.type];
        default_ = obj.inject.default[fieldNum_];
        if (default_===undefined)default_=null;
        if (default_!==null){
          args_[key]=default_;
        }
        default_=args_[key];
        if (key==='options')default_=args_[key][0][1];
        fieldNum_++;
      }
    }
    if (args_.name) {
      obj.vars.push(args_.name);
    } else {
      obj.vars.push(null);
      manualWrap = true;
    }
    obj.fieldDefault.push(default_);
    args0.push(args_);
  }
  var blockjs = {
    'type': obj.name,
    'message0': obj.message.join(' '),
    'args0': args0,
    'inputsInline': true,//如果有手动换行时,不添加此属性
    'tooltip': obj.inject.tooltip||'',
    'helpUrl': obj.inject.helpUrl||''
  }
  if (args0.length===0) delete(blockjs.args0);
  if (manualWrap) delete(blockjs.inputsInline);
  var value = this.getRule(obj.type,obj.name);
  var check = value.check;
  check = check.length===1?check[0]:check;
  if (obj.type==='value') {
    blockjs.colour=obj.inject.colour||this.valueColor;
    blockjs.output=check;
  } else { //statement
    blockjs.colour=obj.inject.colour||this.statementColor;
    blockjs.previousStatement=check;
    blockjs.nextStatement=check;
    //statement的拼接处理初始化之后再处理
    //语句集合的情况nextStatement之后会被修改
  }
  value.blockjs = blockjs;
  value.blockobj = obj;
  this.setRule(obj.type,obj.name,value);
}

EvalVisitor.prototype.assemble = function() {
  //第一轮遍历语句:处理语句集合的拼接
  var rulekeys = Object.keys(this.statementRules);
  for(var ii=0,stateRule;stateRule=this.statementRules[rulekeys[ii]];ii++){
    if (stateRule.check.length>1){
      this.notEntry[rulekeys[ii]]=true;//语句集合不是入口方块
      for(var jj=0,subStateRule;subStateRule=stateRule.check[jj];jj++){
        var value = this.getRule('statement',subStateRule);
        value.blockjs.nextStatement = stateRule.check;
        //此时statement的拼接才是正确的
        //然而此处写入的是数组,到输出时
        //其字符串会被形如AbcBlocks.collection来替换,以避免生成重复的内容
        //同时方便修改
        this.setRule('statement',subStateRule,value);
        this.notEntry[subStateRule]=true;//语句集合内的元素不是入口方块
      }
    }
  }
  //第二轮遍历语句:处理入口方块的拼接
  for(var ii=0,stateRule;stateRule=this.statementRules[rulekeys[ii]];ii++){
    //当一个语句方块未被任何块使用过时,视为入口方块
    if(!this.notEntry[rulekeys[ii]]) {
      this.notEntry[rulekeys[ii]]=false;
      delete(stateRule.blockjs.previousStatement);
      delete(stateRule.blockjs.nextStatement);
      delete(stateRule.blockjs.inputsInline);
      stateRule.blockjs.colour = this.entryColor;
    }
  }
  //此时blockjs已经是各方块的完整的描述了

  //生成遍历语法树的函数--statement块部分
  var temp_xml = [];
  var temp_collection = [];
  for(var ii=0,stateRule;stateRule=this.statementRules[rulekeys[ii]];ii++){
    if(stateRule.check.length>1){
      temp_collection.push([rulekeys[ii],stateRule]);
      continue;
    }
    temp_xml.push(stateRule);
    stateRule.type='statement';
    var text = [];
    var pre='';
    var cpre = function(point){
      if(point>0)pre+=Array(2*point+1).join(' ');
      if(point<0)pre=pre.slice(0,2*point);
    }
    var bl = 'Blockly.'+this.generLanguage+'.';
    text.push(pre+'function(block) {\n');
    cpre(1);
    for(var jj=0,arg;arg=stateRule.blockobj.args[jj];jj++){
      var var_ = this.varPrefix+stateRule.blockobj.vars[jj];
      if (!arg.id)continue;
      if (arg.blockType==='value'){
        text.push(pre+'var '+var_+' = '+bl+'valueToCode'+"(block, '");
        text.push(var_+"', \n  "+pre+bl+this.recieveOrder+')');
      } else if (arg.blockType==='statement') {
        text.push(pre+'var '+var_+' = '+bl+'statementToCode'+"(block, '");
        text.push(var_+"')");
      } else { // field
        text.push(pre+'var '+var_+' = '+'block.getFieldValue'+"('");
        text.push(var_+"')");
      }
      if (arg.data.type==='field_checkbox'){
        text.push(" === 'TRUE'");
      }
      text.push(';\n');
      if (!arg.multi) {//不允许复数个语句
      }
      var nextvar = {//不需要考虑省略
        'field_checkbox':true,
        'field_dropdown':true,
        'field_number':true
      }
      if (!nextvar[arg.data.type] && !arg.omitted) {//不允许省略
        text.push(pre+'if ('+var_+"==='') {\n");
        cpre(1);
        text.push(pre+"throw new OmitedError(block,'"+var_+"','");
        text.push(rulekeys[ii]+"');\n");
        cpre(-1);
        text.push(pre+'}\n');
      }
      if (arg.blockType==='field'){
        text.push(pre+var_+' = '+this.grammerName+"Functions.pre('");
        text.push(arg.id+"')("+var_+');\n');
      }
    }
    if (stateRule.blockobj.inject.generFunc) {
      if (stateRule.blockobj.inject.override) {
        cpre(-9999);
        text = [];
        text.push(pre+'function(block) {\n');
        cpre(1);
      }
      text.push(pre+
        stateRule.blockobj.inject.generFunc.split('\n').join('\n'+pre));
      text.push('\n');
    } else {
      text.push(pre+"var code = '1111111111;\\n';\n");
      text.push(pre+'return code;\n');
    }
    cpre(-1);
    text.push(pre+'}');
    stateRule.generFunc=text.join('');
    //a=evisitor.statementRules.setValue.generFunc;console.log(a);
  }

  //生成遍历语法树的函数--value块部分
  rulekeys = Object.keys(this.expressionRules);
  for(var ii=0,exprRule;exprRule=this.expressionRules[rulekeys[ii]];ii++){
    if(exprRule.check.length>1){
      temp_collection.push([rulekeys[ii],exprRule]);
      continue;
    }
    temp_xml.push(exprRule);
    exprRule.type='value';
    var text = [];
    var pre='';
    var cpre = function(point){
      if(point>0)pre+=Array(2*point+1).join(' ');
      if(point<0)pre=pre.slice(0,2*point);
    }
    var bl = 'Blockly.'+this.generLanguage+'.';
    text.push(pre+'function(block) {\n');
    cpre(1);
    for(var jj=0,arg;arg=exprRule.blockobj.args[jj];jj++){
      var var_ = this.varPrefix+exprRule.blockobj.vars[jj];
      if (!arg.id)continue;
      if (arg.blockType==='value'){
        text.push(pre+'var '+var_+' = '+bl+'valueToCode'+"(block, '");
        text.push(var_+"', \n  "+pre+bl+this.recieveOrder+')');
      } else if (arg.blockType==='statement') {
        text.push(pre+'var '+var_+' = '+bl+'statementToCode'+"(block, '");
        text.push(var_+"')");
      } else { // field
        text.push(pre+'var '+var_+' = '+'block.getFieldValue'+"('");
        text.push(var_+"')");
      }
      if (arg.data.type==='field_checkbox'){
        text.push(" === 'TRUE'");
      }
      text.push(';\n');
      if (!arg.multi) {//不允许复数个语句
      }
      var nextvar = {//不需要考虑省略
        'field_checkbox':true,
        'field_dropdown':true,
        'field_number':true
      }
      if (!nextvar[arg.data.type] && !arg.omitted) {//不允许省略
        text.push(pre+'if ('+var_+"==='') {\n");
        cpre(1);
        text.push(pre+"throw new OmitedError(block,'"+var_+"','");
        text.push(rulekeys[ii]+"');\n");
        cpre(-1);
        text.push(pre+'}\n');
      }
      if (arg.blockType==='field'){
        text.push(pre+var_+' = '+this.grammerName+"Functions.pre('");
        text.push(arg.id+"')("+var_+');\n');
      }
    }
    if (exprRule.blockobj.inject.generFunc) {
      if (exprRule.blockobj.inject.override) {
        cpre(-9999);
        text = [];
        text.push(pre+'function(block) {\n');
        cpre(1);
      }
      text.push(pre+
        exprRule.blockobj.inject.generFunc.split('\n').join('\n'+pre));
      text.push('\n');
    } else {
      text.push(pre+"var code = 0000000000;\n");
      text.push(pre+'return [code, '+bl+this.sendOrder+'];\n');
    }
    cpre(-1);
    text.push(pre+'}');
    exprRule.generFunc=text.join('');
    //a=evisitor.expressionRules.expression_arithmetic_0.generFunc;
    //console.log(a);
  }


  for(var ii=0,rule;rule=temp_xml[ii];ii++){
    //构造args和argsType和fieldDefault,所有输入的名字和类型以及域的默认值
    rule.args=[];
    rule.argsType=[];
    rule.fieldDefault=[];
    for(var jj=0,arg;arg=rule.blockobj.args[jj];jj++){
      if(arg.id){
        rule.args.push(rule.blockobj.vars[jj]);
        rule.argsType.push(arg.blockType);
        rule.fieldDefault.push(rule.blockobj.fieldDefault[jj]);
      }
    }
    //生成构造xmltext的函数
    //构造这个方法是为了能够不借助workspace,从语法树直接构造图块结构
    var text = [];
    var pre='';
    var cpre = function(point){
      if(point>0)pre+=Array(2*point+1).join(' ');
      if(point<0)pre=pre.slice(0,2*point);
    }
    var grammerName=this.grammerName;
    var ruleName=rule.check[0];
    text.push(pre+'function (inputs,isShadow) {\n');
    cpre(1);
    text.push(pre+'return '+grammerName+"Functions.xmlText('");
    text.push(ruleName+"',inputs,isShadow);\n");
    cpre(-1);
    text.push(pre+'}');
    rule.xmlText=text.join('');
  }
  this.temp_xml=temp_xml;
  this.temp_collection=temp_collection;
}

/**
 * 生成grammerName Blocks
 * 数据结构 以grammerName是Abc为例
 * AbcBlocks = {
 *   rule1: rule1_data
 *   rule2: rule2_data
 *   ...
 *   collection1 : ['rulename1',...]
 *   ...
 * }
 * rule1_data = {
 *   type: '...' 块的类型'value','statement'中的一个
 *   json: {...} 与blockfactory给出的Block Definition json一致
 *   generFunc: function(block){...}
 *              与blockfactory给出的Generator stub JavaScript一致
 *   args: [...]  第i个元素的是其第i个输入的域的名字或方块名(方块名数组)
 *   argsType: [...] 第i个参数的输入类型,'value','statement','field'中的一个
 *   fieldDefault: [...] 第i个参数的输入如果是field,其默认值,非field时是null
 *   xmlText: function([...args,next],isShadow){...}
 *            第一个参数的第i个元素是第i个args的xmlText,null或undefined表示空
 *            第一个参数的第args.length个元素是其下一个语句的xmlText
 * }
 * AbcBlocks在构建时会先生成为只含语句集合的对象,用Object.assign来添加方块
 * 以支持在方块中使用AbcBlocks.collection
 */
EvalVisitor.prototype.generBlocks = function() {
  var text = [];
  var pre='';
  var cpre = function(point){
    if(point>0)pre+=Array(2*point+1).join(' ');
    if(point<0)pre=pre.slice(0,2*point);
  }
  temp_xml=this.temp_xml;
  delete(this.temp_xml);
  temp_collection=this.temp_collection;
  delete(this.temp_collection);
  //添加所有语句集合和表达式集合
  text.push(pre+this.grammerName+'Blocks = {\n');
  cpre(1);
  for(var ii=0,crule;crule=temp_collection[ii];ii++){
    text.push(pre+'"'+crule[0]+'": ');
    text.push(
      JSON.stringify(crule[1].check,null,2).split('\n').join('\n'+pre)
    );
    text.push(',\n');
  }
  text.pop();
  text.push('\n');
  cpre(-1);
  text.push(pre+'}\n');
  //添加所有方块
  text.push(pre+this.grammerName+'Blocks = Object.assign(');
  text.push(this.grammerName+'Blocks,{\n');
  cpre(1);
  //此函数的目的是将块中的语句集合和表达式集合在生成为文件时
  //从展开的数组换回AbcBlock.expression的形式
  function renderblockjs(obj,rule,pre) {
    var blockjs = rule.blockjs;
    var blockjsstr = JSON.stringify(blockjs).split('\n').join('\n'+pre);
    var replaceobj = {};
    blockjs = JSON.parse(blockjsstr);//复制一份
    for(var jj=0,arg;arg=rule.blockobj.args[jj];jj++){
      if(!arg.id)continue;
      var usedrule=obj.getRule(arg.blockType,arg.id);
      if(!usedrule)continue;
      if(usedrule.check.length===1)continue;
      blockjs.args0[jj].check='1_fry2_3_inrgv'+arg.id;
      replaceobj['"1_fry2_3_inrgv'+arg.id+'"']=obj.grammerName+'Blocks.'+arg.id;
    }
    if (blockjs.nextStatement) {
      for(var kk=0,crule;crule=temp_collection[kk];kk++){
        if (crule[1].check.indexOf(blockjs.type)!==-1){
          blockjs.nextStatement='1_fry2_3_inrgv'+crule[0];
          replaceobj['"1_fry2_3_inrgv'+crule[0]+'"']=obj.grammerName+
            'Blocks.'+crule[0];
          break;
        }
      }
    }
    blockjsstr = JSON.stringify(blockjs,null,2).split('\n').join('\n'+pre);
    for(var key in replaceobj) {
      blockjsstr=blockjsstr.split(key).join(replaceobj[key]);
    }
    return blockjsstr
  }
  //依次写入各个值
  for(var ii=0,rule;rule=temp_xml[ii];ii++){
    //方块名
    text.push(pre+'"'+rule.check[0]+'": {\n');
    cpre(1);
    //类型
    text.push(pre+'"type": "'+rule.type+'",\n');
    //初始化用的json
    text.push(pre+'"json": ');
    text.push(renderblockjs(this,rule,pre));
    text.push(',\n');
    //visitor函数
    text.push(pre+'"generFunc": ');
    text.push(rule.generFunc.split('\n').join('\n'+pre));
    text.push(',\n');
    //块的所有输入的名字
    text.push(pre+'"args": ');
    text.push(JSON.stringify(rule.args,null,2).split('\n').join('\n'+pre));
    text.push(',\n');
    //块的所有输入的类型
    text.push(pre+'"argsType": ');
    text.push(JSON.stringify(rule.argsType,null,0));
    text.push(',\n');
    //块的所有域的默认值,非域是null
    text.push(pre+'"fieldDefault": ');
    text.push(JSON.stringify(rule.fieldDefault,null,0));
    text.push(',\n');
    //块生成为xmlText的方法
    text.push(pre+'"xmlText": ');
    text.push(rule.xmlText.split('\n').join('\n'+pre));
    text.push('\n');
    cpre(-1);
    text.push(pre+'},\n');
  }
  text.pop();
  text.push(pre+'}\n');
  cpre(-1);
  text.push(pre+'});\n');
  this.blocks=text.join('');
}

EvalVisitor.prototype.SpeicalLexerRule = function(lexerId) {
  //当识别出特定的语法规格后,生成内容并返回true
  var lexervalue = {};
  if (lexerId==='Bool') {
    lexervalue = {
      'type':'field_checkbox',
      'checked':true
    }
    this.setRule('lexer',lexerId,lexervalue);
    return true;
  }
  if (lexerId==='Int') {
    lexervalue = {
      'type': 'field_number',
      'value': 0,
      'min': 0,
      'precision': 1
    }
    this.setRule('lexer',lexerId,lexervalue);
    return true;
  }
  if (lexerId==='Number') {
    lexervalue = {
      'type': 'field_number',
      'value': 0,
    }
    this.setRule('lexer',lexerId,lexervalue);
    return true;
  }
  if (lexerId==='BGNL') {
    lexervalue = {
      'type': 'input_dummy'
    }
    this.setRule('lexer',lexerId,lexervalue);
    return true;
  }
  return false;
};

// Visit a parse tree produced by BlocklyGrammerParser#grammarFile.
EvalVisitor.prototype.visitGrammarFile = function(ctx) {
  //先生成词法规则再组装块.调整了遍历顺序
  this.visit(ctx.lexerRuleCollection(0));
  this.visit(ctx.statementRule());
  this.expression_arithmetic_num=0;
  this.visit(ctx.expressionRule());
  this.assemble();
};

// Visit a parse tree produced by BlocklyGrammerParser#strings.
EvalVisitor.prototype.visitStrings = function(ctx) {
  var Strings = ctx.String();
  for(var ii=0,value;value=Strings[ii];ii++){
    Strings[ii]=this.escapeString(value.getText());
  }
  return Strings.join(' ');
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleStrings.
EvalVisitor.prototype.visitLexerRuleStrings = function(ctx) {
  var lexerId = ctx.LexerIdentifier(0).getText();
  if (this.SpeicalLexerRule(lexerId)) return;
  var strings = this.visit(ctx.strings(0));
  //只包含字符串的词法规则直接代入
  this.setRule('lexer',lexerId,strings);
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleList.
EvalVisitor.prototype.visitLexerRuleList = function(ctx) {
  var lexerId = ctx.LexerIdentifier(0).getText();
  if (this.SpeicalLexerRule(lexerId)) return;
  if (lexerId.slice(-5)!=='_List') {
    this.visitLexerRuleComplex(ctx);
    return;
  }
  //以'_List'结尾的'|'分隔的纯字符串,作为下拉菜单
  var strings = ctx.strings();
  var values = this.matchInject(lexerId);
  if(values)values=eval(values);
  else values=[];
  for(var ii=0,value;value=strings[ii];ii++){
    var string_ = this.visit(value);
    strings[ii] = [string_,values[ii]||string_];
  }
  var lexervalue = {
    'type':'field_dropdown',
    'options':strings
  }
  this.setRule('lexer',lexerId,lexervalue);
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleComplex.
EvalVisitor.prototype.visitLexerRuleComplex = function(ctx) {
  var lexerId = ctx.LexerIdentifier(0).getText();
  if (this.SpeicalLexerRule(lexerId)) return;
  //复杂词法规则作为文本域让用户输入
  var lexervalue = {
    'type': 'field_input',
    'text': lexerId+'_default'
  }
  this.setRule('lexer',lexerId,lexervalue);
};

// Visit a parse tree produced by BlocklyGrammerParser#StatValue.
EvalVisitor.prototype.visitStatValue = function(ctx) {
  //ParserIdentifier ':' parserRuleAtom* ';'
  this.status={
    'name': ctx.ParserIdentifier(0).getText(),
    'type': 'statement',
    'message': [],
    'args': []
  }
  this.visitChildren(ctx);
  var obj = this.status;
  delete(this.status);
  this.initAssemble(obj);
};

// Visit a parse tree produced by BlocklyGrammerParser#arithmeticRuleCollection.
BlocklyGrammerVisitor.prototype.visitArithmeticRuleCollection = function(ctx) {
  //'expression' parserRuleAtom* '|'
  this.status={
    'name': 'expression',
    'type': 'value',
    'message': ['%1'],
    'args': [
      {
        'id': 'expression',
        'blockType': 'value',
        'omitted': false,
        'data': {
          'type': 'input_value'
        }
      }
    ]
  }
  this.visitChildren(ctx);
  this.status.name='expression_arithmetic_'+this.expression_arithmetic_num;
  this.expression_arithmetic_num++;
  var obj = this.status;
  delete(this.status);
  this.initAssemble(obj);
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprValue.
BlocklyGrammerVisitor.prototype.visitExprValue = function(ctx) {
  //ParserIdentifier ':' parserRuleAtom* ';'
  this.status={
    'name': ctx.ParserIdentifier(0).getText(),
    'type': 'value',
    'message': [],
    'args': []
  }
  this.visitChildren(ctx);
  var obj = this.status;
  delete(this.status);
  this.initAssemble(obj);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomExpr.
EvalVisitor.prototype.visitParserAtomExpr = function(ctx) {
  //'expression' '?'?
  var parservalue={
    'id': 'expression',
    'blockType': 'value',
    'omitted': ctx.children.length>1,
    'data': {
      'type': 'input_value'
    }
  }
  this.status.args.push(parservalue);
  this.status.message.push('%'+this.status.args.length);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomParserId.
EvalVisitor.prototype.visitParserAtomParserId = function(ctx) {
  //ParserIdentifier ('+' | '*' | '?')?
  var parserId = ctx.children[0].getText();
  var ex = (ctx.children.length>1 && ctx.children[1].getText()) || '';
  var blockType = this.getRule('value',parserId)?'value':'statement';
  var parservalue={
    'id':parserId,
    'blockType': blockType,
    'omitted': ex==='?' || ex==='*',
    'multi': ex==='+' || ex==='*',
    'data': {
      'type': 'input_'+blockType
    }
  }
  if (blockType==='value' && parservalue.multi) {
    this.error(this.status.name+' 下出现了复数组合的表达式 '+parserId+ex);
  }
  this.status.args.push(parservalue);
  this.status.message.push('%'+this.status.args.length);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomLexerId.
EvalVisitor.prototype.visitParserAtomLexerId = function(ctx) {
  //LexerIdentifier '?'?
  var lexerId = ctx.children[0].getText();
  var lexervalue = this.getRule('lexer',lexerId);
  if (!lexervalue) return;//分隔符之下的词法规则直接丢弃
  var parservalue={
    'id': lexerId,
    'blockType': 'field',
    'omitted': ctx.children.length>1,
    'data': lexervalue
  }
  //特殊规则BGNL对应换行,没有id和blockType
  if (lexerId==='BGNL') {
    parservalue={'data': lexervalue}
  }
  //纯字符串的词法规则直接代入
  if (typeof(lexervalue)===typeof('')) {
    this.status.message.push(lexervalue);
    return;
  }
  this.status.args.push(parservalue);
  //message0中的'%num'是从1开头的
  this.status.message.push('%'+this.status.args.length);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomStr.
EvalVisitor.prototype.visitParserAtomStr = function(ctx) {
  //String
  var string_ = this.escapeString(ctx.String().getText());
  //纯字符串直接代入
  this.status.message.push(string_);
};

exports.SymbolVisitor = SymbolVisitor;
exports.EvalVisitor = EvalVisitor;