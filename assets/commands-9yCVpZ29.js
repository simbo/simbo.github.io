import{a as r}from"./index-2owh-gj-.js";const a=["clear","color-theme","colors","commands","echo","foo","hello","help","maximize","minimize","reload","test","type","version"].sort().map(e=>{const o=Object.entries(r).reduce((s,[t,n])=>(e===n&&s.push(`<span class="dim">${t}</span>`),s),[]);return o.length>0?`- ${e} ${o.join(" ")}`:`- ${e}`}).join("<br/>"),c=async e=>{e.outputText(`known commands and their aliases:<br/>${a}`)};export{c as default};
//# sourceMappingURL=commands-9yCVpZ29.js.map