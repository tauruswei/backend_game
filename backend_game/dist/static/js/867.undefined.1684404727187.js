"use strict";(self["webpackChunkknowledge"]=self["webpackChunkknowledge"]||[]).push([[867],{6629:function(e,a,t){t.d(a,{Z:function(){return d}});t(7658);var l=t(3396),n=t(4870),i=t(2268),r={__name:"dynamic-table",props:{data:{type:Array,default:()=>[]},header:{type:Array,default:()=>[]},operations:{type:Array,default:()=>null}},emits:["commands"],setup(e,{emit:a}){const t=e;let r=(0,n.iH)([]),o=(0,n.iH)([]),u=(0,n.iH)(null);function d(e){const a=[];for(let t of e)if("id"!==t){const e={key:t,value:t.replace(/\_/g," ")};a.push(e)}return a}function c(e,t){a("commands",{command:e,data:t})}return(0,l.YP)((()=>t.data),(e=>{o.value=e}),{immediate:!0}),(0,l.YP)((()=>t.header),(e=>{r.value=d(e)}),{immediate:!0}),(0,l.YP)((()=>t.operations),(e=>{u.value=e}),{immediate:!0}),(e,a)=>{const t=(0,l.up)("el-table-column"),d=(0,l.up)("el-button"),p=(0,l.up)("el-tooltip"),s=(0,l.up)("el-empty"),m=(0,l.up)("el-table");return(0,l.wg)(),(0,l.j4)(m,{data:(0,n.SU)(o),fit:""},{empty:(0,l.w5)((()=>[(0,l.Wm)(s,{style:{margin:"0 auto"}})])),default:(0,l.w5)((()=>[(0,l.Wm)(t,{type:"index",label:"No.",width:50}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,n.SU)(r),((e,a)=>((0,l.wg)(),(0,l.j4)(t,{key:a,label:e.value,prop:e.key},null,8,["label","prop"])))),128)),(0,n.SU)(u)?((0,l.wg)(),(0,l.j4)(t,{key:0,label:"Operations",width:"120"},{default:(0,l.w5)((e=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,n.SU)(u),(a=>((0,l.wg)(),(0,l.iD)("span",{key:a.id,style:{"padding-left":"5px","padding-right":"5px"}},[(0,l.Wm)(p,{content:a.name,placement:"top"},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{type:a.type,size:"small",onClick:t=>c(a.event,e.row,e.$index),circle:""},{default:(0,l.w5)((()=>[(0,l._)("i",{class:(0,i.C_)(a.icon)},null,2)])),_:2},1032,["type","onClick"])])),_:2},1032,["content"])])))),128))])),_:1})):(0,l.kq)("",!0)])),_:1},8,["data"])}}},o=t(89);const u=(0,o.Z)(r,[["__scopeId","data-v-10da8c81"]]);var d=u},9574:function(e,a,t){t.d(a,{Z:function(){return p}});var l=t(3396),n=t(2268),i=t(4870);const r={class:"card-text",style:{display:"block"}},o={class:"card-title"},u={key:0,class:"card-category"};var d={__name:"page-title",props:{option:Object,default:()=>{}},setup(e){const a=e,t=(0,i.iH)({});return(0,l.YP)((()=>a.option),(e=>{t.value=e}),{immediate:!0}),(e,a)=>((0,l.wg)(),(0,l.iD)("div",{class:(0,n.C_)(`card-header card-header-text card-header-${t.value.type}`)},[(0,l._)("div",r,[(0,l._)("h4",o,(0,n.zw)(t.value.title),1),t.value.desc?((0,l.wg)(),(0,l.iD)("p",u,(0,n.zw)(t.value.desc),1)):(0,l.kq)("",!0)])],2))}};const c=d;var p=c},867:function(e,a,t){t.r(a),t.d(a,{default:function(){return s}});var l=t(3396),n=t(4870),i=t(7104),r=t(9574),o=t(6629);const u={class:"card"},d={class:"card-body"};var c={__name:"logs",setup(e){let a=(0,n.iH)({type:"warning",title:"User Logs",desc:"Query log is a record of query behavior by a great quantity of users"}),t=(0,n.iH)([]),c=(0,n.iH)(["id","user","time","type","operation"]),p=(0,n.iH)(1),s=(0,n.iH)(1),m=(0,n.iH)(10);function g(){let e={pageSize:m.value,pageNum:p.value};i.BG.logs(e).then((e=>{e.data.data&&(t.value=e.data.data,s.value=e.data.total)}))}function v(e){p.value=e,g()}return(0,l.bv)((()=>{g()})),(e,i)=>{const g=(0,l.up)("el-pagination");return(0,l.wg)(),(0,l.iD)("div",u,[(0,l.Wm)(r.Z,{option:(0,n.SU)(a)},null,8,["option"]),(0,l._)("div",d,[(0,l.Wm)(o.Z,{data:(0,n.SU)(t),header:(0,n.SU)(c)},null,8,["data","header"]),(0,l.Wm)(g,{background:"",layout:"prev, pager, next",total:(0,n.SU)(s),"current-page":(0,n.SU)(p),"onUpdate:current-page":i[0]||(i[0]=e=>(0,n.dq)(p)?p.value=e:p=e),onCurrentChange:v,"page-size":(0,n.SU)(m)},null,8,["total","current-page","page-size"])])])}}};const p=c;var s=p}}]);
//# sourceMappingURL=867.undefined.1684404727187.js.map