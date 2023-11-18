import{r as s}from"./render-output-XRwz_Qpj.js";const o={manpage:{description:"controls and monitors the typed-text component",examples:["type [ACTION]"],append:[s("possible actions","<br>  start, stop, restart, reset, status"),s("default action","<br>  status")].join("<br>")},async handler(e,{inputs:r}){const t=document.querySelector("typed-text");switch((r[0]||"").toLowerCase()){case"start":{if(t.isTyping)throw new Error("typing is already in progress");if(t.typingDone)throw new Error("nothing more to type");t.startTyping(),e.outputText("typing started");break}case"restart":{t.restartTyping(),e.outputText("typing restarted");break}case"stop":{if(!t.isTyping)throw new Error("typing is already stopped");t.stopTyping(),e.outputText("typing stopped");break}case"reset":{t.resetTyping(),e.outputText("typing resetted");break}case"status":case"":{t.isTyping?e.outputText("typing is in progress"):e.outputText("typing has stopped");break}default:throw new Error("unknown input for type")}}};export{o as default};
//# sourceMappingURL=type-lgJe23De.js.map
