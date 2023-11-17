const c={"&":"&amp;","<":"&lt;",">":"&gt;"};function p(t){return t.replaceAll(/[&<>]/g,a=>c[a])}const s=async(t,a)=>{const e=a.inputs;t.outputText(`${e.map(n=>p(n)).join(" ")}`)};export{s as default};
//# sourceMappingURL=echo-thbbqyKb.js.map
