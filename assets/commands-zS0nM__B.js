import{P as m}from"./command-prompt-Zk6CvO9t.js";import{g as n}from"./get-command-aliases-GnvQCPTr.js";import"./index-JVe8R7CI.js";import"./dynamic-import-helper-0gtGTknh.js";const e=m.sort().map(s=>{const a=n(s);return`  <span class="yellow">${s}</span>`+(a.length>0?` ${a.map(o=>`<span class="dim">${o}</span>`).join(" ")}`:"")}).join("<br>"),l={manpage:"displays some commands and their aliases",async handler(s){s.outputText(`some commands and their aliases:<br>${e}`)}};export{l as default};
//# sourceMappingURL=commands-zS0nM__B.js.map
