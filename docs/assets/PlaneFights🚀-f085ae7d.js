import{d,g as f,s as g,r as m,o as _,c as x,b as t,u as a,T as v,a as y}from"./index-6641d0f8.js";import{g as k}from"./index-10963069.js";import{u as b}from"./index-7e803947.js";const w=["hitArea"],C={zIndex:1},F=["drawRect","alpha"],B=t("Text",{text:"🛸 PlaneFight",x:12,"style+":{fill:16777215,lineHeight:55}},null,-1),G=["x","y","anchor+"],R=d({__name:"PlaneFights🚀",setup(S){const l=f().proxy,{width:s,height:c}=l.$app.screen,n=g();function h(e){n.value.parent.toLocal(e.global,null,n.value.position)}const o=m(),i=[],{pause:u}=b(()=>{const e=new v("🔥");e.x=n.value.x,e.y=n.value.y-40,e.anchor.set(.5,.5),o.value.addChild(e);const r=k.to(e,{y:0,duration:1,ease:"none",onComplete:()=>o.value.removeChild(e)});i.push(r)},300);_(()=>{i.forEach(e=>e.kill()),u()});function p(){const e=document.createElement("a");e.href="https://github.com/huodoushigemi/vue-canvas-snake.git",e.target="_blank",e.click()}return(e,r)=>(y(),x("Graphics",{hitArea:e.$app.screen,onMousemove:h},[t("Graphics",C,[t("Graphics",{beginFill:[2962235],drawRect:[0,0,a(s),55],endFill:"",alpha:.75},null,8,F),B,t("Sprite",{image:"https://huodoushigemi.github.io/docx2vue/assets/github-540f5a2f.svg",x:168,y:5,width:45,height:45,cursor:"pointer",onClick:p})]),t("Text",{ref_key:"plane",ref:n,text:"🛸",style:{fontSize:64},x:a(s)>>1,y:a(c)*.75,"anchor+":{x:.5,y:.5}},null,8,G),t("Container",{ref_key:"container",ref:o},null,512)],40,w))}});export{R as default};
