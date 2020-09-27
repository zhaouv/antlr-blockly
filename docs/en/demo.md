# demo

> It is recommended that using an IDE that supports antlr syntax highlighting to edit `.g4` files such as `vscode` installed `ANTLR4 grammar syntax support`  

## AddSubMulDiv  
Very simple **AddSubMulDiv arithmetic**+**variable assignment**+**print** example  
[Directory demos/addSubMulDiv](https://github.com/zhaouv/antlr-blockly/tree/master/demos/addSubMulDiv) provides [Pure rules](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv.g4) and two implementations [Generating code](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_generCode.g4) and [Direct execution](https://github.com/zhaouv/antlr-blockly/blob/master/demos/addSubMulDiv/AddSubMulDiv_exec.g4).  
**Run**:[[Pure rules]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv.g4), [[Generating code]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_generCode.g4) ,[[Direct execution]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/addSubMulDiv/AddSubMulDiv_exec.g4)

## Sample
Examples of more complex arithmetic operations [Pure rules](https://github.com/zhaouv/antlr-blockly/blob/master/demos/sample/Sample.g4). [[Run]](https://zhaouv.github.io/antlr-blockly/?run=true&grammarFile=./demos/sample/Sample.g4)

## MotaAction
[MotaAction.g4](https://github.com/zhaouv/antlr-blockly/blob/master/demos/motaAction/MotaAction.g4) A more complicated practical application, a component of [mota-js](https://github.com/ckcz123/mota-js) , The graphical editor configured for its events according to [Document](https://ckcz123.github.io/mota-js/#/event). [[Run]](https://zhaouv.github.io/antlr-blockly/demos/motaAction/parse.html)  
Here are some of the notes worth noting.  

+ **Set the color by category**  

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
/* Call_BeforeType
//this.evisitor.recieveOrder='ORDER_NONE';
this.evisitor.valueColor=330;
this.evisitor.statementColor=70;
this.evisitor.entryColor=250;

this.evisitor.idstring_eColor=310;
<span style="font-weight: bold;color:navy">this.evisitor.subColor=190;</span>
this.evisitor.printColor=70;
this.evisitor.dataColor=130;
this.evisitor.eventColor=220;
this.evisitor.soundColor=20;
*/
</pre>

+ **Modify Boolean Not's `inputsInline` and set the type of block `idString_1_e` and block `idString_2_e` to `idString_e`**

<pre>
/* Call_BeforeBlock
delete(this.block('negate_e').inputsInline);
this.block('idString_1_e').output='idString_e';
this.block('idString_2_e').output='idString_e';
*/
</pre>

+ **The realization of converting code to block**

The use of `_next`, `this.insertActionList`, and the realization of `MotaActionFunctions.parse` are noteworthy.

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
      data.time=this.isset(data.time)?data.time:MotaActionBlocks['autoText_s'].fieldDefault(3);
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

- - -

- [Start Page](en/README.md)  
- [antlr4 syntax introduction](en/antlr4.md)
- [blockly running mechanism](en/blockly.md)
- [grammar file rules](en/grammarfile.md)
- **demo**