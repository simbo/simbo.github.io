const o={"&":"&amp;","<":"&lt;",">":"&gt;"};function p(t){return t.replaceAll(/[&<>]/g,n=>o[n])}const s={manpage:"outputs inputs",async handler(t,n){const a=n.inputs;t.outputText(`${a.map(e=>p(e)).join(" ")}`)}};export{s as default};
//# sourceMappingURL=echo-5iZpBI2u.js.map
