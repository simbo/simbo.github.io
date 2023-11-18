const t={manpage:{description:"empties the terminal view, otionally including the typed-text container",examples:["clear","clear -a","clear --all","clear all"]},async handler(l,{options:e,inputs:a}){l.clearOutput(),(e.a||e.all||a.includes("all"))&&document.querySelector("typed-text").resetTyping()}};export{t as default};
//# sourceMappingURL=clear-OU53t_ln.js.map
