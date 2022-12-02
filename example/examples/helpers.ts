type EventFunctionNames = "eventChannel1" |
"eventChannel2" |
"eventChannel3" |
"eventChannel4" |
"eventChannel5" |
"eventChannel6" |
"eventChannel7" |
"eventChannel8" |
"eventChannel9" |
"eventChannel10" |
"eventChannel11" |
"eventChannel12" |
"eventChannel13" |
"eventChannel14" |
"eventChannel15" |
"eventChannel16" |
"eventChannel17" |
"eventChannel18" |
"eventChannel19" |
"eventChannel20" |
"eventChannel21" |
"eventChannel22" |
"eventChannel23" |
"eventChannel24" |
"eventChannel25" |
"eventChannel26" |
"eventChannel27" |
"eventChannel28" |
"eventChannel29" |
"eventChannel30" |
"eventChannel31" |
"eventChannel32" |
"eventChannel33" |
"eventChannel34" |
"eventChannel35" |
"eventChannel36" |
"eventChannel37" |
"eventChannel38" |
"eventChannel39" |
"eventChannel40" |
"eventChannel41" |
"eventChannel42" |
"eventChannel43" |
"eventChannel44" |
"eventChannel45" |
"eventChannel46" |
"eventChannel47" |
"eventChannel48" |
"eventChannel49" |
"eventChannel50" |
"eventChannel51" |
"eventChannel52" |
"eventChannel53" |
"eventChannel54" |
"eventChannel55" |
"eventChannel56" |
"eventChannel57" |
"eventChannel58" |
"eventChannel59" |
"eventChannel60" |
"eventChannel61" |
"eventChannel62" |
"eventChannel63" |
"eventChannel64";


export const registerEventCallback = (name: EventFunctionNames, f: EventCallback) => registerFunction(name, f);
export const registerUpdate = (f: (...args: any[]) => any) => registerFunction("update", f); 


// allowed to be super generic
// @todo: investigate how the fenv stacks work
// - top level max depth is 1
// - one import down, max depth is 3
function registerFunction(name: string, f: any) {
    try {
        for(let i = 1; i < 1024; i++) {
            const env = getfenv(i);
            if("gdt" in env) {
                env[name] = f;
            }
            
        }
    } finally { }
}