grammar MotaActionPure;

//===============parser===============
//===blockly语句===

//事件 事件编辑器入口之一
event_m
    :   A_Img '事件' BGNL? Newline '覆盖触发器' trigger=Bool '启用' enable=Bool '通行状态' noPass=B_0_List '显伤' displayDamage=Bool BGNL? Newline data=action+ Colour Angle 'testinput' EvalString DymanicTest_List BEND
    ;
/* event_m
defaultMap : {trigger:false,enable:true}
*/


//加点 事件编辑器入口之一
point_m
    :   '加点' BGNL? Newline choicesContext+ BEND
    ;



//商店 事件编辑器入口之一
shop_m
    :   '全局商店列表' BGNL? Newline shoplist+
    ;


shoplist
    :   '商店 id' IdString '标题' EvalString '图标' IdString BGNL? Newline '快捷商店栏中名称' EvalString BGNL? Newline '使用' ShopUse_List '消耗' EvalString BGNL? Newline '显示文字' EvalString BGNL? Newline shopChoices+ BEND # shopsub
    |   Newline # emptyshop
    ;

shopChoices
    :   '商店选项' EvalString '消耗' EvalString? BGNL? Newline shopEffect+
    ;



shopEffect
    :   idString_e '+=' expression
    ;



//afterBattle 事件编辑器入口之一
afterBattle_m
    :   '战斗结束后' BGNL? Newline action+ BEND
    ;



//afterGetItem 事件编辑器入口之一
afterGetItem_m
    :   '获取道具后' BGNL? Newline action+ BEND
    ;



//afterOpenDoor 事件编辑器入口之一
afterOpenDoor_m
    :   '打开门后' BGNL? Newline action+ BEND
    ;



//firstArrive 事件编辑器入口之一
firstArrive_m
    :   '首次到达楼层' BGNL? Newline action+ BEND
    ;



//changeFloor 事件编辑器入口之一
changeFloor_m
    :   '楼梯, 传送门' BGNL? Newline '目标楼层' IdString Stair_List 'x' Number ',' 'y' Number '朝向' DirectionEx_List '动画时间' Int? '允许穿透' Bool BEND
    ;



//为了避免关键字冲突,全部加了_s
//动作
action
    :   text_0_s
    |   text_1_s
    |   autoText_s
    |   setText_s
    |   tip_s
    |   setValue_s
    |   show_s
    |   hide_s
    |   trigger_s
    |   revisit_s
    |   exit_s
    |   setBlock_s
    |   setHeroIcon_s
    |   update_s
    |   sleep_s
    |   battle_s
    |   openDoor_s
    |   changeFloor_s
    |   changePos_0_s
    |   changePos_1_s
    |   openShop_s
    |   disableShop_s
    |   animate_s
    |   showImage_0_s
    |   showImage_1_s
    |   animateImage_0_s
    |   animateImage_1_s
    |   showGif_0_s
    |   showGif_1_s
    |   setFg_0_s
    |   setFg_1_s
    |   setWeather_s
    |   move_s
    |   moveHero_s
    |   playBgm_s
    |   pauseBgm_s
    |   resumeBgm_s
    |   playSound_s
    |   win_s
    |   lose_s
    |   if_s
    |   input_s
    |   choices_s
    |   function_s
    |   pass_s
    ;

text_0_s
    :   '显示文章' ':' EvalString Newline
    ;



text_1_s
    :   '标题' EvalString? '图像' IdString? '对话框效果' EvalString? ':' EvalString Newline
    ;



autoText_s
    :   '自动剧情文本: 标题' EvalString? '图像' IdString? '对话框效果' EvalString? '时间' Int BGNL? EvalString Newline
    ;



setText_s
    :   '设置剧情文本的属性' '位置' SetTextPosition_List BGNL? '标题颜色' EvalString? '正文颜色' EvalString? '背景色' EvalString? BGNL? '粗体' B_1_List '打字间隔' EvalString? Newline
    ;



tip_s
    :   '显示提示' ':' EvalString Newline
    ;



setValue_s
    :   '变量操作' ':' '名称' idString_e '值' expression Newline
    ;



show_s
    :   '显示事件' 'x' EvalString ',' 'y' EvalString '楼层' IdString? '动画时间' Int? Newline
    ;



hide_s
    :   '隐藏事件' 'x' EvalString? ',' 'y' EvalString? '楼层' IdString? '动画时间' Int? Newline
    ;



trigger_s
    :   '触发事件' 'x' PosString ',' 'y' PosString Newline
    ;



revisit_s
    :   '重启当前事件' Newline
    ;



exit_s
    :   '立刻结束当前事件' Newline
    ;



setBlock_s
    :   '转变图块为' Int 'x' PosString? ',' 'y' PosString? '楼层' IdString? Newline
    ;



setHeroIcon_s
    :   '更改角色行走图' EvalString? Newline
    ;



update_s
    :   '更新状态栏和地图显伤' Newline
    ;



sleep_s
    :   '等待' Int '毫秒' Newline
    ;



battle_s
    :   '强制战斗' IdString Newline
    ;



openDoor_s
    :   '开门' 'x' PosString ',' 'y' PosString '楼层' IdString? Newline
    ;



changeFloor_s
    :   '楼层切换' IdString 'x' PosString ',' 'y' PosString '朝向' DirectionEx_List '动画时间' Int? Newline
    ;



changePos_0_s
    :   '位置切换' 'x' PosString ',' 'y' PosString '朝向' DirectionEx_List Newline
    ;



changePos_1_s
    :   '勇士转向' Direction_List Newline
    ;



openShop_s
    :   '打开全局商店' IdString Newline
    ;



disableShop_s
    :   '禁用全局商店' IdString Newline
    ;



animate_s
    :   '显示动画' IdString '位置' EvalString? Newline
    ;



showImage_0_s
    :   '显示图片' EvalString '起点像素位置' 'x' PosString 'y' PosString Newline
    ;



showImage_1_s
    :   '清除所有图片' Newline
    ;



animateImage_0_s
    : '图片淡入' EvalString '起点像素位置' 'x' Number 'y' Number '动画时间' Int Newline
    ;



animateImage_1_s
    : '图片淡出' EvalString '起点像素位置' 'x' Number 'y' Number '动画时间' Int Newline
    ;



showGif_0_s
    :   '显示动图' EvalString '起点像素位置' 'x' Number 'y' Number Newline
    ;



showGif_1_s
    :   '清除所有动图' Newline
    ;



setFg_0_s
    :   '更改画面色调' Number ',' Number ',' Number ',' Number '动画时间' Int? Newline
    ;



setFg_1_s
    :   '恢复画面色调' '动画时间' Int? Newline
    ;



setWeather_s
    :   '更改天气' Weather_List '强度' Int Newline
    ;



move_s
    :   '移动事件' 'x' PosString? ',' 'y' PosString? '动画时间' Int? '消失时无动画时间' Bool BGNL? StepString Newline
    ;



moveHero_s
    :   '移动勇士' '动画时间' Int? BGNL? StepString Newline
    ;



playBgm_s
    :   '播放背景音乐' EvalString Newline
    ;



pauseBgm_s
    :   '暂停背景音乐' Newline
    ;



resumeBgm_s
    :   '恢复背景音乐' Newline
    ;



playSound_s
    :   '播放音效' EvalString Newline
    ;



win_s
    :   '游戏胜利,结局' ':' EvalString? Newline
    ;



lose_s
    :   '游戏失败,结局' ':' EvalString? Newline
    ;



input_s
    :   '接受用户输入,提示' ':' EvalString Newline
    ;



if_s
    :   '如果' ':' expression BGNL? Newline action+ '否则' ':' BGNL? Newline action+ BEND Newline
    ;



choices_s
    :   '选项' ':' EvalString? BGNL? '标题' EvalString? '图像' IdString? BGNL? Newline choicesContext+ BEND Newline
    ;



choicesContext
    :   '子选项' EvalString BGNL? Newline action+
    ;



function_s
    :   '自定义JS脚本' BGNL? Newline RawEvalString Newline BEND Newline
    ;



pass_s
    :   Newline
    ;



statExprSplit : '=== statement ^ === expression v ===' ;
//===blockly表达式===

expression
    :   a=expression op=Arithmetic_List b=expression # arithmetic
    |   '非' expression # negate_e
    |   Bool # bool_e
    |   idString_0_e
    |   idString_1_e
    |   idString_2_e
    |   EvalString # evalString_e
    ;

idString_e
    :   idString_0_e
    |   idString_1_e
    |   idString_2_e
    ;

idString_0_e
    :   IdString
    ;

idString_1_e
    :   Id_List ':' IdText
    ;

idString_2_e
    :   FixedId_List
    ;


//===============lexer===============
Colour: 'asdasdasd';
Angle: 'asdassdasd';

IdText
    :   'sdeirughvuiyasdeb'+ //为了被识别为复杂词法规则
    ;

RawEvalString
    :   'sdeirughvuiyasdbe'+ //为了被识别为复杂词法规则
    ;

PosString
    :   'sdeirughvuiyasbde'+ //为了被识别为复杂词法规则
    ;

A_Img
    :   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABLUlEQVRYR8WW0RGDMAhAdRU7givYFZzFEdypK+gKrhKPePRiDAYIxv425T0ggbbNy5+2Fn9ZnEPWtm3NOH48u4qAcwd8XQ+FqgIIf0WAgoPM4y3gwB+7A1z4IwISuLmAFG4qoIGbCWjhJgIl8GKBUvitwDz//Picpm9yXFvASQGEd13n53YsAYul74+5Hs73cMJxl1wyOxAAeLi9UAK3GgiUwrMtiCWGYbgkBhXSZI6BbtdxqhKhRCmc9QpSEmFlcKtxex6fY/0hoSRK4ewKoDV1MbXZZwXCzLHf1hJkC6inePdENZUQzwGAWEpcBLjB8Ry2hhrZuaqcBLhwDJrbFzn46RJK4ZzgnDO+Am/B/xWIn5u2n5yMk5MQewlf1oRnB5EmI+lvWLtAGlRyfgcoKhgwVeF2FgAAAABJRU5ErkJggg=='|'32'|'32'|'sword';

DymanicTest_List
    :   'dymanic'|'3'
    /* DymanicTest_List function(){return [['1','1'],['2','3'],['4','5']]} */;

Stair_List
    :   '坐标'|'上楼'|'下楼'
    ;

SetTextPosition_List
    :   '不改变'|'上'|'中'|'下'
    ;

ShopUse_List
    :   '金币' | '经验'
    ;

Arithmetic_List
    :   '+'|'-'|'*'|'/'|'^'|'=='|'!='|'>'|'<'|'>='|'<='|'和'|'或'
    ;

Weather_List
    :   '无'|'雨'|'雪'
    ;

B_0_List
    :   '不改变'|'不可通行'|'可以通行'
    ;

B_1_List
    :   '不改变'|'设为粗体'|'取消粗体'
    ;

Bool:   'TRUE' 
    |   'FALSE'
    ;

Int :   '0' | [1-9][0-9]* ; // no leading zeros

Number
    :   '-'? Int '.' Int EXP?   // 1.35, 1.35E-9, 0.3, -4.5
    |   '-'? Int EXP            // 1e10 -3e4
    |   '-'? Int                // -3, 45
    ;
fragment EXP : [Ee] [+\-]? Int ; // \- since - means "range" inside [...]

Direction_List
    :   '上'|'下'|'左'|'右'
    ;

DirectionEx_List
    :   '不变'|'上'|'下'|'左'|'右'
    ;

StepString
    :   (Direction_List Int?)+
    ;

IdString
    :   [0-9a-zA-Z_][0-9a-zA-Z_:]*
    ;

FixedId_List
    :   'item:blueKey'|'status:hp'|'status:atk'|'status:def'|'item:yellowKey'
    ;

Id_List
    :   'flag' | 'status' | 'item'
    ;

//转blockly后不保留需要加"
EvalString
    :   Equote_double (ESC_double | ~["\\])* Equote_double
    ;

fragment ESC_double :   '\\' (["\\/bfnrt] | UNICODE) ;
fragment UNICODE : 'u' HEX HEX HEX HEX ;
fragment HEX : [0-9a-fA-F] ;

BGNL
    :   'BGNLaergayergfuybgv'
    ;

MeaningfulSplit : '=== meaningful ^ ===' ;

fragment Equote_double : '"' ;

BSTART
    :   '开始'
    ;

BEND:   '结束'
    ;

Newline
    :   ('\r' '\n'?| '\n')// -> skip
    ;

WhiteSpace
    :   [ \t]+ -> skip
    ;

BlockComment
    :   '/*' .*? '*/' -> skip
    ;

LineComment
    :   '//' ~[\r\n]* -> skip
    ;





