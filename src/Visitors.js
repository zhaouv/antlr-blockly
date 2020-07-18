
var BlocklyGrammerVisitor = require('./gen/BlocklyGrammerVisitor').
    BlocklyGrammerVisitor;

/**
 * @class
 */
function SymbolVisitor() {
	BlocklyGrammerVisitor.call(this);
}

SymbolVisitor.prototype = Object.create(BlocklyGrammerVisitor.prototype);
SymbolVisitor.prototype.constructor = SymbolVisitor;

SymbolVisitor.prototype.init = function() {
    this.statementRules=[];
    this.expressionRules=[];
    this.arithmetic={};
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
            if (value[0]===name) return value[1][0]!==name;
        }
        return false;
    }
    for(var ii=0,statementRule;statementRule=this.statementRules[ii];ii++){
        if (statementRule[0]!==statementRule[1][0]){
            for(var jj=0,statename;statename=statementRule[1][jj];jj++){
                //检查是否有语句出现在了两个语句集合中
                if (checkdict[statename]) {
                    this.error('语句 '+statename
                    +' 同时在两个语句集合 '+checkdict[statename]
                    +' 和 '+statementRule[0]+' 中出现了');
                }
                checkdict[statename] = statementRule[0];
                //检查语句集合的子规则是否有语句集合
                if (filter_(this.statementRules,statename)){
                    this.error(statementRule[0]+' 下的子规则 '+statename+' 也是语句集合');
                }
            }
        }
    }
    // 允许一个表达式出现在多个表达式集合中
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

SymbolVisitor.prototype.getNameOfListMember = function (ctx) {
    var name = ctx.name && ctx.name.text;
    if (name) return name;
    var bctx = ctx.blockContentCollection();
    name = bctx && 
           bctx.blockName && 
           bctx.blockName.text;
    if (name) return name;
    return null
}

SymbolVisitor.prototype.processList = function(ctx, Rules) {
    //处理集合,parserId和pIds分别是集合名字和子规则名字数组
    var parserId = ctx.ParserIdentifier().getText();
    var pIds = ctx.ruleListMember();
    for(var ii=0,value;value=pIds[ii];ii++){
        pIds[ii]=this.getNameOfListMember(value);
        if (value.name==null) {
            if (pIds[ii]==null) pIds[ii]=parserId+'_arithmetic_'+(this.arithmetic[parserId]||0);
            this.arithmetic[parserId]=(this.arithmetic[parserId]||0)+1;
            Rules.push([pIds[ii],[pIds[ii]]]);
        }
    }
    Rules.push([parserId,pIds]);
};

SymbolVisitor.prototype.processValue = function(ctx, Rules) {
    var parserId = ctx.ParserIdentifier(0).getText();
    Rules.push([parserId,[parserId]]);
};

// Visit a parse tree produced by BlocklyGrammerParser#StatList.
SymbolVisitor.prototype.visitStatList = function(ctx) {
    this.processList(ctx,this.statementRules);
};

// Visit a parse tree produced by BlocklyGrammerParser#StatValue.
SymbolVisitor.prototype.visitStatValue = function(ctx) {
    this.processValue(ctx,this.statementRules);
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprList.
SymbolVisitor.prototype.visitExprList = function(ctx) {
    this.processList(ctx,this.expressionRules);
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprValue.
SymbolVisitor.prototype.visitExprValue = function(ctx) {
    this.processValue(ctx,this.expressionRules);
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
// 能指定展开的层数的 stringify
var json={
    stringify:function(data,replacer,space,d){
        d=~~d
        if (typeof space==typeof 0) {
            space=Array.from({length:space+1}).join(' ')
        }
        if (d<=0 || !space) {
            return JSON.stringify(data,replacer,space);
        }
        return json.json(JSON.parse(JSON.stringify(data,replacer)),d,space,'\n')
    },
    parse:JSON.parse,
    json:function(data,d,space,pre){
        if (d<=0) {
            return JSON.stringify(data);
        }
        if (data instanceof Array) {
            if (data.length==0) {
                return '[]'
            }
            var texts = [];
            for (var i in data) {
                texts.push(space+json.json(data[i],d-1,space,pre+space));
            }
            return '['+pre+texts.join(','+pre)+pre+']';
        }
        if (data instanceof Object) {
            if (Object.keys(data).length==0) {
                return '{}'
            }
            var texts = [];
            for (var i in data) {
                texts.push(space+'"'+i+'": '+json.json(data[i],d-1,space,pre+space))
            }
            return '{'+pre+texts.join(','+pre)+pre+'}';
        }
        return JSON.stringify(data);
    },
}
//============================================================================
/**
 * @class
 */
function EvalVisitor() {
	BlocklyGrammerVisitor.call(this);
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
    var pattern = new RegExp(
        '/\\*[^\\S\\r\\n]*'+IdString+'\\b[\\r\\n]*([^]*?)[\\r\\n]*\\*/'
    );
    var value = this.rawInput.match(pattern);
    if(!value) return '';
    return value[1];
}

/**
 * 这些之外的自定义的注入也会被生成到的json中
 */
EvalVisitor.prototype.inject = [
    'type','json','generFunc','args','argsType',
    'argsGrammarName','fieldDefault','menu','xmlText',

    'colour','tooltip','helpUrl','default','defaultMap','override','name'
]

EvalVisitor.prototype.loadInject = function(injectStr) {
    if(!injectStr)return {'default':[],'defaultMap':{},'name':[]};
    var obj = {};
    var keyvaluepart=
        /^((?:(?:[^\S\r\n]+|\s*\w+\s*:[^\r\n]*)[\r\n]*)*)/.exec(injectStr)
    obj.generFunc = injectStr.slice(0,keyvaluepart.index)+
        injectStr.slice(keyvaluepart.index+keyvaluepart[0].length);
    var lines=keyvaluepart[1].split('\n')
    for(var ii=0;ii<lines.length;ii++){
        var line=lines[ii];
        if (/^\s*$/.exec(line)) continue;
        var match = /^\s*(\w+)\s*:\s*([^\r\n]*?)\s*$/.exec(line);
        obj[match[1]]=match[2];
    }
    if(obj.colour) obj.colour=eval(obj.colour);
    for(var ii=0,key;key=['default','defaultMap','name'][ii];ii++){
        if(obj[key]){
            obj[key]=eval('('+obj[key]+')');
        } else {
            obj[key]=[];
        }
    }
    return obj;
}

EvalVisitor.prototype.initAssemble = function(obj) {
    //把parserRuleAtom中获取的参数初步组装起来
    obj.inject = this.loadInject(this.matchInject(obj.name));
    var args0 = [];
    obj.vars = [];//会包含null
    var manualWrap = false;
    var fieldNum_ = 0;
    var validinputNum_ = 0;
    //这个循环中把形如块的各输入命名为形如Int_0,Int_1,expression_0
    //并额外记录在vars中
    for(var ii=0,args,ids={};args=obj.args[ii];ii++){
        var args_ = JSON.parse(JSON.stringify(args.data));
        var setDeafault = null;
        var default_ = null;
        if (args.id && args.data.type!='field_image') { // 既不是换行也不是图片
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
                args_={name:args_.name};
                var key = ({
                    'field_input':'text',
                    'field_multilinetext':'text',
                    'field_number':'value',
                    'field_dropdown':'default',
                    'field_checkbox':'checked',
                    'field_colour':'colour',
                    'field_angle':'angle',
                    // 'field_image':'src'
                })[args.data.type];
                setDeafault=function (default_) {
                    args_[key]=default_;
                }
                default_ = obj.inject.default[fieldNum_];
                if (default_===undefined)default_=null;
                if (default_!==null){
                    setDeafault(default_);
                }
                fieldNum_++;
            }
            validinputNum_++;
        }
        if (args_.name) {
            if (obj.inject.name[validinputNum_-1]){
                args_.name=obj.inject.name[validinputNum_-1];
            }
            if (args.varName) {
                args_.name=args.varName;
            }
            obj.vars.push(args_.name);
            if (obj.inject.defaultMap[args_.name]!=null) {
                setDeafault(obj.inject.defaultMap[args_.name]);
            }
        } else {
            obj.vars.push(null);
            manualWrap = true;
        }
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
    // // 按照blockly原始的json定义,不应该包含空的args0,方便起见加上
    // if (args0.length===0) delete(blockjs.args0); 
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

    var temp_xml = []; // 所有的方块
    var temp_collection = []; // 所有的语句集合或表达式集合

    for (var typeIndex = 0; typeIndex < 2; typeIndex++) {
        var rule_type=typeIndex===0?'statement':'value';
        var rules=rule_type==='statement'?this.statementRules:this.expressionRules
        var rulekeys = Object.keys(rules);
        for(var ii=0,rule;rule=rules[rulekeys[ii]];ii++){
            if(rule.check.length>1){
                temp_collection.push([rulekeys[ii],rule]);
                continue;
            }
            temp_xml.push(rule);
            rule.type=rule_type;
            var text = [];
            var pre='';
            var cpre = function(point){
                if(point>0)pre+=Array(4*point+1).join(' ');
                if(point<0)pre=pre.slice(0,4*point);
            }
            var bl = 'Blockly.'+this.generLanguage+'.';
            text.push(pre+'function(block) {\n');
            cpre(1);
            for(var jj=0,arg;arg=rule.blockobj.args[jj];jj++){
                var var_ = this.varPrefix+rule.blockobj.vars[jj];
                if (!arg.id || arg.data.type=='field_image')continue;
                // 既不是换行也不是图片
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
                if (!arg.multi && arg.blockType==='statement') {//不允许复数个语句
                    text.push(pre+"if(block.getInputTargetBlock('"+var_+"') && \n");
                    cpre(1);
                    text.push(pre+"block.getInputTargetBlock('"+var_+"').getNextBlock())\n");
                    text.push(pre+"throw new MultiStatementError(block,'"+var_+"','");
                    text.push(rulekeys[ii]+"');\n");
                    cpre(-1);
                }
                var nextvar = {//不需要考虑省略
                    'field_checkbox':true,
                    'field_dropdown':true,
                    'field_number':true,
                    'field_colour':true,
                    'field_angle':true,
                    'field_image':true
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
                    text.push(arg.id+"')("+var_+",block,'"+var_+"','");
                    text.push(rulekeys[ii]+"');\n");
                }
            }
            if ((rule.blockobj.inject.generFunc||'').trim()) {
                if (rule.blockobj.inject.override) {
                    cpre(-9999);
                    text = [];
                    text.push(pre+'function(block) {\n');
                    cpre(1);
                }
                text.push(pre+
                    rule.blockobj.inject.generFunc.split('\n').join('\n'+pre));
                text.push('\n');
            } else {
                text.push(pre+"var code = "+this.grammerName+"Functions.defaultCode('");
                text.push(rule.check[0]+"',eval('['+"+this.grammerName+"Blocks['");
                text.push(rule.check[0]+"'].args.join(',')+']'),block);\n");
                if(rule_type==='statement'){
                    text.push(pre+'return code;\n');
                }else{
                    text.push(pre+'return [code, '+bl+this.sendOrder+'];\n');
                }
            }
            cpre(-1);
            text.push(pre+'}');
            rule.generFunc=text.join('');
            //a=evisitor.statementRules.setValue.generFunc;console.log(a);
            //a=evisitor.expressionRules.expression_arithmetic_0.generFunc;console.log(a);
        }
    }

    for(var ii=0,rule;rule=temp_xml[ii];ii++){
        //构造args和argsType和argsGrammarName,所有输入的名字和类型
        rule.args=[];
        rule.argsType=[];
        rule.argsGrammarName=[];
        rule.omitted=[];
        rule.multi=[];
        for(var jj=0,args;args=rule.blockobj.args[jj];jj++){
            if(args.id && args.data.type!='field_image'){ // 既不是换行也不是图片
                rule.args.push(rule.blockobj.vars[jj]);
                rule.argsType.push(args.blockType);
                rule.argsGrammarName.push(args.id);
                rule.omitted.push(args.omitted);
                rule.multi.push(args.multi);
            }
        }
        //生成构造xmltext的函数
        //构造这个方法是为了能够不借助workspace,从语法树直接构造图块结构
        var text = [];
        var pre='';
        var cpre = function(point){
            if(point>0)pre+=Array(4*point+1).join(' ');
            if(point<0)pre=pre.slice(0,4*point);
        }
        var grammerName=this.grammerName;
        var ruleName=rule.check[0];
        text.push(pre+'function (inputs,next,isShadow,comment,attribute) {\n');
        cpre(1);
        text.push(pre+'return '+grammerName+"Functions.xmlText('");
        text.push(ruleName+"',inputs,next,isShadow,comment,attribute);\n");
        cpre(-1);
        text.push(pre+'}');
        rule.xmlText=text.join('');
        //生成获取块的域的默认值的方法
        text = [];
        cpre(-9999);
        text.push(pre+'function (keyOrIndex) {\n');
        cpre(1);
        text.push(pre+'return '+grammerName+"Functions.fieldDefault('");
        text.push(ruleName+"',keyOrIndex);\n");
        cpre(-1);
        text.push(pre+'}');
        rule.fieldDefault=text.join('');
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
 *   argsGrammarName: [...] 第i个参数的输入的类型名称
 *   omitted: [...] 第i个参数是否允许省略
 *   multi: [...] 第i个参数是否接收多个语句
 *   fieldDefault: function(keyOrIndex){...}
 *                 根据输入是整数字符串或null
 *                 第index个或者名字为key的域的默认值, null时返回所有field默认值的数组
 *   menu: [['菜单项1','alert(1)'],
 *          ['function(block){return "菜单项2"}','console.log(block);alert(2)'],
 *           ...] 方块的右键菜单中的增项
 *   ...: String 其他注入的属性
 *   xmlText: function([...args],next,isShadow,comment,attribute){...}
 *            第一个参数的第i个元素是第i个args的xmlText,null或undefined表示空
 *            next是其下一个语句的xmlText
 * }
 * AbcBlocks在构建时会先生成为只含语句集合的对象,用Object.assign来添加方块
 * 以支持在方块中使用AbcBlocks.collection
 */
EvalVisitor.prototype.generBlocks = function() {
    var text = [];
    var pre='';
    var cpre = function(point){
        if(point>0)pre+=Array(4*point+1).join(' ');
        if(point<0)pre=pre.slice(0,4*point);
    }
    var temp_xml=this.temp_xml; // 所有的方块
    delete(this.temp_xml);
    var temp_collection=this.temp_collection; // 所有的语句集合或表达式集合
    delete(this.temp_collection);
    //添加所有语句集合和表达式集合
    text.push(pre+'// 语句集合和表达式集合\n');
    text.push(pre+this.grammerName+'Blocks = {\n');
    text.push('');
    cpre(1);
    for(var ii=0,crule;crule=temp_collection[ii];ii++){
        text.push(pre+'"'+crule[0]+'": ');
        text.push(
            JSON.stringify(crule[1].check,null,4).split('\n').join('\n'+pre)
        );
        text.push(',\n');
    }
    text.pop();
    text.push('\n');
    cpre(-1);
    text.push(pre+'}\n');
    //添加域
    text.push(pre+'// 所有域的默认行为\n');
    text.push(pre+'Object.assign(');
    text.push(this.grammerName+'Blocks,');
    function renderLexerRules(lexerRules) {
        var rcount=0;
        var replaceobj={};
        var text1=json.stringify(lexerRules,function(k,v){
            if (k==='options'&&(typeof v===typeof '')&&v.slice(0,8)==='function') {
                ++rcount;
                replaceobj['"_'+rcount+'_1_fry2_3_inrgv"']=v.split('\n').join('\n    '+pre);
                return '_'+rcount+'_1_fry2_3_inrgv'
            }
            return v
        },4,3).split('\n').join('\n'+pre);
        for(var key in replaceobj) {
            text1=text1.split(key).join(replaceobj[key]);
        }
        return text1
    }
    text.push(renderLexerRules(this.lexerRules));
    text.push(pre+');\n');
    //添加所有方块
    text.push(pre+'// 所有方块的实际内容\n');
    text.push(pre+'Object.assign(');
    text.push(this.grammerName+'Blocks,{\n');
    cpre(1);
    //此函数的目的是将块中的语句集合和表达式集合在生成为文件时
    //从展开的数组换回AbcBlock.expression的形式
    function renderblockjs(obj,rule,pre) {
        var blockjs = JSON.parse(JSON.stringify(rule.blockjs));
        var replaceobj = {};
        // 表达式集合
        for(var jj=0,arg;arg=rule.blockobj.args[jj];jj++){
            if(!arg.id)continue;
            var usedrule=obj.getRule(arg.blockType,arg.id);
            if(!usedrule)continue;
            if(usedrule.check.length===1)continue;
            blockjs.args0[jj].check='1_fry2_3_inrgv'+arg.id;
            replaceobj['"1_fry2_3_inrgv'+arg.id+'"']=obj.grammerName+'Blocks.'+arg.id;
        }
        // 语句集合
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
        // field使用引用
        for(var jj=0,index=0,arg;arg=rule.blockobj.args[jj];jj++){
            if (!arg.id)continue;
            if (arg.data.type=='field_image'){
                replaceobj['"1_fry2_3_inrgv'+arg.id+'_'+jj+'"']=
                    'Object.assign({},'+obj.grammerName+'Blocks.'+arg.id+')';
                blockjs.args0[jj]='1_fry2_3_inrgv'+arg.id+'_'+jj;
                continue;
            }
            if (rule.argsType[index++]!='field')continue;
            replaceobj['"1_fry2_3_inrgv'+arg.id+blockjs.args0[jj].name+'"']=
                'Object.assign({},'+
                obj.grammerName+'Blocks.'+arg.id+','+
                JSON.stringify(blockjs.args0[jj],null,4).split('\n').join('\n'+pre+'        ')
                +')';
            blockjs.args0[jj]='1_fry2_3_inrgv'+arg.id+blockjs.args0[jj].name;
        }
        var blockjsstr = JSON.stringify(blockjs,null,4).split('\n').join('\n'+pre);
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
        text.push(JSON.stringify(rule.args,null,0).split('\n').join('\n'+pre));
        text.push(',\n');
        //块的所有输入的类型
        text.push(pre+'"argsType": ');
        text.push(JSON.stringify(rule.argsType,null,0));
        text.push(',\n');
        text.push(pre+'"argsGrammarName": ');
        text.push(JSON.stringify(rule.argsGrammarName,null,0));
        text.push(',\n');
        //块的所有输入的省略与重复
        text.push(pre+'"omitted": ');
        text.push(JSON.stringify(rule.omitted,null,0));
        text.push(',\n');
        text.push(pre+'"multi": ');
        text.push(JSON.stringify(rule.multi,null,0));
        text.push(',\n');
        //块的获取域的默认值的方法
        text.push(pre+'"fieldDefault": ');
        text.push(rule.fieldDefault.split('\n').join('\n'+pre));
        text.push(',\n');
        //块的右键菜单
        text.push(pre+'"menu": ');
        text.push(rule.blockobj.inject.menu||'[]');
        text.push(',\n');
        //其他注入的属性
        for(var key in rule.blockobj.inject){
            if (this.inject.indexOf(key)===-1) {
                text.push(pre+'"'+key+'": ');
                text.push(JSON.stringify(rule.blockobj.inject[key],null,0));
                text.push(',\n');
            }
        }
        //块生成为xmlText的方法
        text.push(pre+'"xmlText": ');
        text.push(rule.xmlText.split('\n').join('\n'+pre));
        text.push('\n');
        //
        cpre(-1);
        text.push(pre+'},\n');
    }
    text.pop();
    text.push(pre+'}\n');
    cpre(-1);
    text.push(pre+'});\n');
    this.blocks=text.join('');
}

EvalVisitor.prototype.speicalLexerRule = function(lexerId) {
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
    if (lexerId==='Colour') {
        lexervalue = {
            'type': 'field_colour',
            'colour': '#ff0000',
        }
        this.setRule('lexer',lexerId,lexervalue);
        return true;
    }
    if (lexerId==='Angle') {
        lexervalue = {
            'type': 'field_angle',
            'angle': 90,
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
    this.arithmetic={};
    this.visit(ctx.statementRule());
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
    if (this.speicalLexerRule(lexerId)) return;
    var strings = this.visit(ctx.strings(0));
    //只包含字符串的词法规则直接代入
    this.setRule('lexer',lexerId,strings);
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleList.
EvalVisitor.prototype.visitLexerRuleList = function(ctx) {
    var lexerId = ctx.LexerIdentifier(0).getText();
    if (this.speicalLexerRule(lexerId)) return;
    if (lexerId.slice(-5)!=='_List' && lexerId.slice(-4)!=='_Img') {
        this.visitLexerRuleComplex(ctx);
        return;
    }
    var strings = ctx.strings();
    var values = this.matchInject(lexerId);
    if(values)values=eval('('+values+')');
    else values=[];
    if (typeof values===typeof (function(){})) {
        var lexervalue = {
            'type':'field_dropdown',
            'options':values.toString(),
            'default':this.visit(strings[1])
        }
        this.setRule('lexer',lexerId,lexervalue);
        return;
    }
    for(var ii=0,value;value=strings[ii];ii++){
        var string_ = this.visit(value);
        strings[ii] = [string_,values[ii]==null?string_:values[ii]];
    }
    if (lexerId.slice(-5)==='_List'){
        //以'_List'结尾的'|'分隔的纯字符串,作为下拉菜单
        var lexervalue = {
            'type':'field_dropdown',
            'options':strings,
            'default':strings[0][1]
        }
    } else {
        //以'_Img'结尾的'|'分隔的纯字符串,作为图片
        var lexervalue = {
            'type':'field_image',
            'src': strings[0][0],
            'width': strings[1]&&strings[1][0]||0,
            'height': strings[2]&&strings[2][0]||0,
            'alt': strings[3]&&strings[3][0]||'img' //alt不生效, 始终是*
        }
    }
    
    this.setRule('lexer',lexerId,lexervalue);
};

// Visit a parse tree produced by BlocklyGrammerParser#LexerRuleComplex.
EvalVisitor.prototype.visitLexerRuleComplex = function(ctx) {
    var lexerId = ctx.LexerIdentifier(0).getText();
    if (this.speicalLexerRule(lexerId)) return;
    //复杂词法规则作为文本域让用户输入
    var lexervalue = {
        'type': lexerId.slice(-6)!=='_Multi'?'field_input':'field_multilinetext',
        'text': lexerId+'_default'
    }
    this.setRule('lexer',lexerId,lexervalue);
};

EvalVisitor.prototype.processList = function (ctx, typeStr) {
    //ParserIdentifier ':' ruleListMember ('|' ruleListMember)+ ';'
    this.listInformation={
        'name': ctx.ParserIdentifier().getText(),
        'type': typeStr
    }
    this.visitChildren(ctx);
    this.listInformation=null;
}

EvalVisitor.prototype.processValue = function (ctx, typeStr) {
    //ParserIdentifier ':' parserRuleAtom* ';'
    this.blockInformation={
        'name': ctx.ParserIdentifier(0).getText(),
        'type': typeStr,
        'message': [],
        'args': []
    }
    this.visitChildren(ctx);
    var obj = this.blockInformation;
    this.blockInformation=null;
    this.initAssemble(obj);
}

// Visit a parse tree produced by BlocklyGrammerParser#StatList.
EvalVisitor.prototype.visitStatList = function(ctx) {
    this.processList(ctx,'statement');
};

// Visit a parse tree produced by BlocklyGrammerParser#StatValue.
EvalVisitor.prototype.visitStatValue = function(ctx) {
    this.processValue(ctx,'statement');
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprList.
EvalVisitor.prototype.visitExprList = function(ctx) {
    this.processList(ctx,'value');
};

// Visit a parse tree produced by BlocklyGrammerParser#ExprValue.
EvalVisitor.prototype.visitExprValue = function(ctx) {
    this.processValue(ctx,'value');
};

// Visit a parse tree produced by BlocklyGrammerParser#blockContentCollection.
EvalVisitor.prototype.visitBlockContentCollection = function(ctx) {
    //parserRuleAtom+ ('#' blockName=ParserIdentifier)?
    var parserId = this.listInformation.name;
    this.blockInformation={
        'name': ctx.blockName && ctx.blockName.text || 
                parserId+'_arithmetic_'+(this.arithmetic[parserId]||0),
        'type': this.listInformation.type,
        'message': [],
        'args': []
    }
    this.arithmetic[parserId]=(this.arithmetic[parserId]||0)+1;
    this.visitChildren(ctx);
    var obj = this.blockInformation;
    this.blockInformation=null;
    this.initAssemble(obj);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomParserId.
EvalVisitor.prototype.visitParserAtomParserId = function(ctx) {
    //ParserIdentifier ('+' | '*' | '?')?
    var parserId = ctx.parserId.text;
    var ex = ctx.ex && ctx.ex.text || '';
    var blockType = this.getRule('value',parserId)?'value':'statement';
    var parservalue={
        'id':parserId,
        'blockType': blockType,
        'omitted': ex==='?' || ex==='*',
        'multi': ex==='+' || ex==='*',
        'data': {
            'type': 'input_'+blockType
        },
        'varName': ctx.varName && ctx.varName.text || null
    }
    if (blockType==='value' && parservalue.multi) {
        this.error(this.blockInformation.name+' 下出现了复数组合的表达式 '+parserId+ex);
    }
    this.blockInformation.args.push(parservalue);
    this.blockInformation.message.push('%'+this.blockInformation.args.length);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomLexerId.
EvalVisitor.prototype.visitParserAtomLexerId = function(ctx) {
    //LexerIdentifier '?'?
    var lexerId = ctx.lexerId.text;
    var lexervalue = this.getRule('lexer',lexerId);
    if (!lexervalue) return;//分隔符之下的词法规则直接丢弃
    var parservalue={
        'id': lexerId,
        'blockType': 'field',
        'omitted': ctx.ex!=null,
        'multi': false,
        'data': lexervalue,
        'varName': ctx.varName && ctx.varName.text || null
    }
    //特殊规则BGNL对应换行,没有id和blockType
    if (lexerId==='BGNL') {
        parservalue={'data': lexervalue}
    }
    //纯字符串的词法规则直接代入
    if (typeof(lexervalue)===typeof('')) {
        this.blockInformation.message.push(lexervalue);
        return;
    }
    this.blockInformation.args.push(parservalue);
    //message0中的'%num'是从1开头的
    this.blockInformation.message.push('%'+this.blockInformation.args.length);
};

// Visit a parse tree produced by BlocklyGrammerParser#ParserAtomStr.
EvalVisitor.prototype.visitParserAtomStr = function(ctx) {
    //String
    var string_ = this.escapeString(ctx.String().getText());
    //纯字符串直接代入
    this.blockInformation.message.push(string_);
};

exports.SymbolVisitor = SymbolVisitor;
exports.EvalVisitor = EvalVisitor;