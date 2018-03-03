# demo

> 建议使用支持antlr语法高亮的IDE来进行`.g4`文件的编辑, 如`vscode`安装`ANTLR4 grammar syntax support` 

## AddSubMulDiv  
非常简单的**四则运算**+**变量赋值**+**打印**的例子  
[目录demos/addSubMulDiv](https://github.com/zhaouv/antlr-blockly/tree/master/demos/addSubMulDiv) 中给出了 [纯规则](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv.g4) 以及 [生成code](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_generCode.g4) 和 [直接执行](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_exec.g4) 的两个版本的实现.  
**运行**:[[纯规则]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv.g4), [[生成cod]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_generCode.g4) ,[[直接执行]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_exec.g4)

## Sample
更复杂的算数运算的例子 [纯规则](https://github.com/zhaouv/antlr-blockly/blob/master/demos/sample/Sample.g4). [[运行]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/sample/Sample.g4)

## MotaAction
[MotaAction.g4](https://github.com/zhaouv/antlr-blockly/blob/master/demos/motaAction/MotaAction.g4) 一个较复杂的实际应用, [mota-js](https://github.com/ckcz123/mota-js) 的组件, 依照其 [文档](https://ckcz123.github.io/mota-js/#/event) 为其事件配置了图形化编辑器. [[运行]](https://zhaouv.github.io/antlr-blockly/demos/motaAction/parse.html)  
这里复制出一些其中值得注意的用法.  

+ **按类别统一设置颜色**  

<pre>
playSound_s
    :   '播放音效' EvalString Newline
    ;
/* playSound_s
tooltip : playSound: 播放音效
helpUrl : https://ckcz123.github.io/mota-js/#/event?id=playsound-%e6%92%ad%e6%94%be%e9%9f%b3%e6%95%88
default : ["item.ogg"]
<span style="font-weight: bold;color:navy">colour : this.soundColor</span>
var code = '{"type": "playSound", "name": "'+EvalString_0+'"},\n';
return code;
*/
<span style="font-weight: bold;color:teal">...</span>
/* Function_0
//converter.evisitor.recieveOrder='ORDER_NONE';
converter.evisitor.valueColor=330;
converter.evisitor.statementColor=70;
converter.evisitor.entryColor=250;

converter.evisitor.idstring_eColor=310;
<span style="font-weight: bold;color:navy">converter.evisitor.subColor=190;</span>
converter.evisitor.printColor=70;
converter.evisitor.dataColor=130;
converter.evisitor.eventColor=220;
converter.evisitor.soundColor=20;
*/
</pre>

+ **修改布尔非的`inputsInline`, 以及把方块`idString_1_e`和`idString_2_e`的类型设定为`idString_e`**

<pre>
/* Function_1
delete(converter.evisitor.expressionRules.negate_e.blockjs.inputsInline);
converter.evisitor.expressionRules.idString_1_e.blockjs.output='idString_e';
converter.evisitor.expressionRules.idString_2_e.blockjs.output='idString_e';
*/
</pre>

+ **Code转图块的实现**

其中`_next`,`this.insertActionList`的使用, 以及`MotaActionFunctions.parse`的写法值得注意.

``` js
function ActionParser(){
}

ActionParser.prototype.parse = function (obj,type) {
  switch (type) {
    case 'event':
      if(!obj)obj={};
      if(typeof(obj)===typeof('')) obj={'data':[obj]};
      if(obj instanceof Array) obj={'data':obj};
      return MotaActionBlocks['event_m'].xmlText([
        obj.enable,obj.noPass,obj.displayDamage,this.parseList(obj.data)
      ]);
    
    ...

    case 'shop':
      var text_choices = null;
      for(var ii=obj.choices.length-1,choice;choice=obj.choices[ii];ii--) {
        var text_effect = null;
        var effectList = choice.effect.split(';');
        for(var jj=effectList.length-1,effect;effect=effectList[jj];jj--) {
          if(effect.split('+=').length!==2){
            throw new Error('一个商店效果中必须包含恰好一个"+="');
          }
          text_effect=MotaActionBlocks['shopEffect'].xmlText([
            MotaActionBlocks['idString_e'].xmlText([effect.split('+=')[0]]),
            MotaActionBlocks['evalString_e'].xmlText([effect.split('+=')[1]]),
            text_effect]);
        }
        text_choices=MotaActionBlocks['shopChoices'].xmlText([
          choice.text,choice.need||'',text_effect,text_choices]);
      }
      return MotaActionBlocks['shop_m'].xmlText([
        obj.id,obj.name,obj.icon,obj.textInList,obj.use,obj.need,this.EvalString(obj.text),text_choices
      ]);
    
    default:
      return MotaActionBlocks[type+'_m'].xmlText([this.parseList(obj)]);
  }
}

////// 开始解析一系列自定义事件 //////
ActionParser.prototype.parseList = function (list) {
  if (!this.isset(list)) return MotaActionBlocks['pass_s'].xmlText([],true);
  if (!(list instanceof Array)) {
    list = [list];
  }
  if (list.length===0) return MotaActionBlocks['pass_s'].xmlText([],true);
  this.event = {'id': 'action', 'data': {
    'list': list
  }}
  this.next = null;
  this.result = null;
  this.parseAction();
  return this.result;
}

////// 解析当前自定义事件列表中的最后一个事件 //////
ActionParser.prototype.parseAction = function() {

  // 事件处理完毕
  if (this.event.data.list.length==0) {
    this.result = this.next;
    this.next = null;
    return;
  }

  var data = this.event.data.list.pop();
  this.event.data.current = data;

  // 不同种类的事件

  // 如果是文字：显示
  if (typeof data == "string") {
      data={"type": "text", "text": data}
  }
  this.event.data.type=data.type;
  switch (data.type) {
    case "_next":
      this.result = this.next;
      this.next = data.next;
      return;
    case "text": // 文字/对话
      this.next = MotaActionBlocks['text_0_s'].xmlText([
        this.EvalString(data.text),this.next]);
      break;
    case "autoText": // 自动剧情文本
      data.time=this.isset(data.time)?data.time:MotaActionBlocks['autoText_s'].fieldDefault[3];
      this.next = MotaActionBlocks['autoText_s'].xmlText([
        '','','',data.time,this.EvalString(data.text),this.next]);
      break;
    
    ...

    case "if": // 条件判断
      this.next = MotaActionBlocks['if_s'].xmlText([
        MotaActionBlocks['evalString_e'].xmlText([data.condition]),
        this.insertActionList(data["true"]),
        this.insertActionList(data["false"]),
        this.next]);
      break;
    case "choices": // 提供选项
      var text_choices = null;
      for(var ii=data.choices.length-1,choice;choice=data.choices[ii];ii--) {
        text_choices=MotaActionBlocks['choicesContext'].xmlText([
          choice.text,this.insertActionList(choice.action),text_choices]);
      }
      this.next = MotaActionBlocks['choices_s'].xmlText([
        this.EvalString(data.text),'','',text_choices,this.next]);
      break;
    
    ...

    default:
      throw new Error("[警告]出错啦！\n"+data.type+" 事件不被支持...");
  }
  this.parseAction();
  return;
}

////// 往当前事件列表之后添加一个事件组 //////
ActionParser.prototype.insertActionList = function (actionList) {
  if (actionList.length===0) return null;
  this.event.data.list.push({"type": "_next", "next": this.next});
  this.event.data.list=this.event.data.list.concat(actionList);
  this.next = null;
  this.parseAction();
  return this.result;
}

////// 判断某对象是否不为undefined也不会null //////
ActionParser.prototype.isset = function (val) {
    if (val === undefined || val === null) {
        return false;
    }
    return true
}

...

ActionParser.prototype.EvalString = function(EvalString) {
  return EvalString.split('\b').join('\\b').split('\t').join('\\t').split('\n').join('\\n');
}

MotaActionFunctions.actionParser = new ActionParser();

MotaActionFunctions.workspace = function(){return workspace}

MotaActionFunctions.parse = function(obj,type) {
  MotaActionFunctions.workspace().clear();
  xml_text = MotaActionFunctions.actionParser.parse(obj,type||'event');
  xml = Blockly.Xml.textToDom('<xml>'+xml_text+'</xml>');
  Blockly.Xml.domToWorkspace(xml, MotaActionFunctions.workspace());
}
```