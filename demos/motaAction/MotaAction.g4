grammar MotaAction;

//===============parser===============
//===blockly语句===

//事件 事件编辑器入口之一
event_m
    :   '事件' BGNL? Newline '启用' Bool '不可通行' Bool '显伤' Bool BGNL? Newline action+ BEND
    ;

//加点 事件编辑器入口之一
point_m
    :   '加点' BGNL? Newline choicesContext+ BEND
    ;

//商店 事件编辑器入口之一
shop_m
    :   '商店 id' IdString '标题' EvalString '图标' IdString BGNL? Newline '快捷商店栏中名称' EvalString BGNL? Newline '使用' ShopUse_List '消耗' EvalString BGNL? Newline '显示文字' EvalString BGNL? Newline shopChoices+ BEND
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

//为了避免关键字冲突,全部加了_s
//动作
action
    :   text_0_s
    |   text_1_s
    |   tip_s
    |   setValue_s
    |   show_s
    |   hide_s
    |   trigger_s
    |   revisit_s
    |   exit_s
    |   update_s
    |   sleep_s
    |   battle_s
    |   openDoor_s
    |   changeFloor_s
    |   changePos_0_s
    |   changePos_1_s
    |   openShop_s
    |   disableShop_s
    |   setFg_0_s
    |   setFg_1_s
    |   move_s
    |   moveHero_s
    |   playBgm_s
    |   pauseBgm_s
    |   resumeBgm_s
    |   playSound_s
    |   win_s
    |   lose_s
    |   if_s
    |   choices_s
    |   function_s
    |   pass_s
    ;

text_0_s
    :   '显示文章' ':' EvalString Newline
    ;

text_1_s
    :   '标题' EvalString? '图像' IdString? ':' EvalString Newline
    ;

tip_s
    :   '显示提示' ':' EvalString Newline
    ;

setValue_s
    :   '变量操作' ':' '名称' idString_e '值' expression Newline
    ;

show_s
    :   '显示事件' 'x' Int ',' 'y' Int '楼层' IdString? '动画时间' Int? Newline
    ;

hide_s
    :   '隐藏事件' 'x' Int? ',' 'y' Int? '楼层' IdString? '动画时间' Int? Newline
    ;

trigger_s
    :   '触发事件' 'x' Int ',' 'y' Int Newline
    ;

revisit_s
    :   '重启当前事件' Newline
    ;

exit_s
    :   '立刻结束当前事件' Newline
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
    :   '开门' 'x' Int ',' 'y' Int '楼层' IdString? Newline
    ;

changeFloor_s
    :   '楼层切换' IdString 'x' Int ',' 'y' Int '朝向' DirectionEx_List '动画时间' Int? Newline
    ;

changePos_0_s
    :   '位置切换' 'x' Int ',' 'y' Int '朝向' DirectionEx_List Newline
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

setFg_0_s
    :   '更改画面色调' Number ',' Number ',' Number ',' Number '动画时间' Int? Newline
    ;
setFg_1_s
    :   '恢复画面色调' '动画时间' Int? Newline
    ;

move_s
    :   '移动事件' 'x' Int? ',' 'y' Int? '动画时间' Int? '立刻消失' Bool BGNL? StepString Newline
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
    :   '游戏胜利,原因' ':' EvalString Newline
    ;

lose_s
    :   '游戏失败,原因' ':' EvalString Newline
    ;

if_s
    :   '如果' ':' expression BGNL? Newline action+ '否则' ':' BGNL? Newline action+ BEND Newline
    ;

choices_s
    :   '选项' ':' EvalString BGNL? '标题' EvalString? '图像' IdString? BGNL? Newline choicesContext+ BEND Newline
    ;

choicesContext
    :   '子选项' EvalString BGNL? Newline action+
    ;

function_s
    :   '自定义JS脚本' BGNL? Newline EvalString Newline BEND Newline
    ;

pass_s
    :   Newline
    ;

statExprSplit : '=== statement ^ === expression v ===' ;
//===blockly表达式===

expression
    :   expression Arithmetic_List expression
    |   negate_e
    |   number_e
    |   bool_e
    |   idString_e
    |   evalString_e
    ;

negate_e
    :   '非' expression
    ;

bool_e
    :   Bool
    ;

number_e
    :   Number
    ;

idString_e
    :   IdString
    ;

//在visitor中将其output改成'idString_e'即可
idString_0_e
    :   Id_List ':' IdText
    ;

evalString_e
    :   EvalString
    ;

//===============lexer===============
Id_List
    :   'status' | 'item' | 'flag'
    ;

//为了被识别为复杂词法规则
IdText
    : 'sdeirughvuiyasdeb'+
    ;

ShopUse_List
    :   'money' | 'experience'
    ;

Arithmetic_List
    :   '+'|'-'|'*'|'/'|'^'|'=='|'!='|'>'|'<'|'>='|'<='|'和'|'或'
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
    :   [a-zA-Z_][0-9a-zA-Z_\-:]*
    ;

//转blockly后不准备保留需要加"
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