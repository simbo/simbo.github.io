const c={"&":"&amp;","<":"&lt;",">":"&gt;"};function e(n){return n.replaceAll(/[&<>]/g,t=>c[t])}const s=async(n,t)=>{const o=t.inputs;console.log(t),n.outputText(`${o.map(a=>e(a)).join(" ")}`)};export{s as default};
//# sourceMappingURL=echo-X0VyPO2-.js.map
