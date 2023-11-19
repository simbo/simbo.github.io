import{_ as o}from"./index-JVe8R7CI.js";import{_ as r}from"./dynamic-import-helper-0gtGTknh.js";const n=new Map,i="icon-name";class u extends HTMLElement{static observedAttributes=[i];constructor(){super()}attributeChangedCallback(t,s,e){t===i&&this.setIcon(e)}setIcon(t){typeof t!="string"||t.length===0||this.getIcon(t).then(s=>{this.innerHTML=s})}async getIcon(t){if(!n.has(t)){const{default:e}=await r(Object.assign({"./svg-icons/github.ts":()=>o(()=>import("./github-2IFn9t5S.js"),__vite__mapDeps([])),"./svg-icons/moon.ts":()=>o(()=>import("./moon-2H6ZF6GE.js"),__vite__mapDeps([])),"./svg-icons/sun.ts":()=>o(()=>import("./sun-W9U8S791.js"),__vite__mapDeps([]))}),`./svg-icons/${t}.ts`);n.set(t,e)}return n.get(t)}}export{i as ICON_NAME_ATTRIBUTE,u as SvgIcon};
//# sourceMappingURL=svg-icon-3P_BxEmg.js.map
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}