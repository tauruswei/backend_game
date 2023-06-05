"use strict";(self["webpackChunkknowledge"]=self["webpackChunkknowledge"]||[]).push([[24],{7941:function(e,t,a){a.a(e,(async function(e,n){try{var l=a(3396),u=a(4870),i=a(8859),r=a(9574),o=a(5920),c=e([i]);i=(c.then?(await c)():c)[0];const d={class:"card"},p={class:"card-body"};t.Z={__name:"logs",setup(e){let t=(0,u.iH)({type:"warning",title:"User Logs",desc:"Query log is a record of query behavior by a great quantity of users"}),a=(0,u.iH)([]),n=(0,u.iH)(["id","user","time","type","operation"]),c=(0,u.iH)(1),s=(0,u.iH)(1),m=(0,u.iH)(10);function y(){let e={pageSize:m.value,pageNum:c.value};i.BG.logs(e).then((e=>{e.data.data&&(a.value=e.data.data,s.value=e.data.total)}))}function f(e){c.value=e,y()}return(0,l.bv)((()=>{y()})),(e,i)=>{const y=(0,l.up)("el-pagination");return(0,l.wg)(),(0,l.iD)("div",d,[(0,l.Wm)(r.Z,{option:(0,u.SU)(t)},null,8,["option"]),(0,l._)("div",p,[(0,l.Wm)(o.Z,{data:(0,u.SU)(a),header:(0,u.SU)(n),preNum:(0,u.SU)(c)*(0,u.SU)(m)-(0,u.SU)(m)},null,8,["data","header","preNum"]),(0,l.Wm)(y,{background:"",layout:"prev, pager, next",total:(0,u.SU)(s),"current-page":(0,u.SU)(c),"onUpdate:currentPage":i[0]||(i[0]=e=>(0,u.dq)(c)?c.value=e:c=e),onCurrentChange:f,"page-size":(0,u.SU)(m)},null,8,["total","current-page","page-size"])])])}}},n()}catch(d){n(d)}}))},5920:function(e,t,a){a.d(t,{Z:function(){return c}});a(7658);var n=a(3396),l=a(4870),u=a(2268),i={__name:"dynamic-table",props:{data:{type:Array,default:()=>[]},header:{type:Array,default:()=>[]},operations:{type:Array,default:()=>null},preNum:{type:Number,default:0}},emits:["commands"],setup(e,{emit:t}){const a=e;let i=(0,l.iH)([]),r=(0,l.iH)([]),o=(0,l.iH)(null);function c(e){const t=[];for(let a of e)if("id"!==a){const e={key:a,value:a.replace(/\_/g," ")};t.push(e)}return t}function d(e,a){t("commands",{command:e,data:a})}return(0,n.YP)((()=>a.data),(e=>{r.value=e}),{immediate:!0}),(0,n.YP)((()=>a.header),(e=>{i.value=c(e)}),{immediate:!0}),(0,n.YP)((()=>a.operations),(e=>{o.value=e||null}),{immediate:!0}),(t,a)=>{const c=(0,n.up)("el-table-column"),p=(0,n.up)("el-button"),s=(0,n.up)("el-tooltip"),m=(0,n.up)("el-empty"),y=(0,n.up)("el-table");return(0,n.wg)(),(0,n.j4)(y,{data:(0,l.SU)(r),fit:""},{empty:(0,n.w5)((()=>[(0,n.Wm)(m,{style:{margin:"0 auto"}})])),default:(0,n.w5)((()=>[(0,n.Wm)(c,{label:"No.",width:50},{default:(0,n.w5)((t=>[(0,n.Uk)((0,u.zw)(t.$index+e.preNum+1),1)])),_:1}),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)((0,l.SU)(i),((e,t)=>((0,n.wg)(),(0,n.j4)(c,{key:t,label:e.value,prop:e.key},null,8,["label","prop"])))),128)),(0,l.SU)(o)?((0,n.wg)(),(0,n.j4)(c,{key:0,label:"Operations",width:"120"},{default:(0,n.w5)((e=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)((0,l.SU)(o),(t=>((0,n.wg)(),(0,n.iD)("span",{key:t.id,style:{"padding-left":"5px","padding-right":"5px"}},[(0,n.Wm)(s,{content:t.name,placement:"top"},{default:(0,n.w5)((()=>[(0,n.Wm)(p,{type:t.type,size:"small",onClick:a=>d(t.event,e.row,e.$index),circle:""},{default:(0,n.w5)((()=>[(0,n._)("i",{class:(0,u.C_)(t.icon)},null,2)])),_:2},1032,["type","onClick"])])),_:2},1032,["content"])])))),128))])),_:1})):(0,n.kq)("",!0)])),_:1},8,["data"])}}},r=a(89);const o=(0,r.Z)(i,[["__scopeId","data-v-07c19c6d"]]);var c=o},9574:function(e,t,a){a.d(t,{Z:function(){return p}});var n=a(3396),l=a(2268),u=a(4870);const i={class:"card-text",style:{display:"block"}},r={class:"card-title"},o={key:0,class:"card-category"};var c={__name:"page-title",props:{option:Object,default:()=>{}},setup(e){const t=e,a=(0,u.iH)({});return(0,n.YP)((()=>t.option),(e=>{a.value=e}),{immediate:!0}),(e,t)=>((0,n.wg)(),(0,n.iD)("div",{class:(0,l.C_)(`card-header card-header-text card-header-${a.value.type}`)},[(0,n._)("div",i,[(0,n._)("h4",r,(0,l.zw)(a.value.title),1),a.value.desc?((0,n.wg)(),(0,n.iD)("p",o,(0,l.zw)(a.value.desc),1)):(0,n.kq)("",!0)])],2))}};const d=c;var p=d},7024:function(e,t,a){a.a(e,(async function(e,n){try{a.r(t);var l=a(4019),u=e([l]);l=(u.then?(await u)():u)[0];const i=l.Z;t["default"]=i,n()}catch(i){n(i)}}))},4019:function(e,t,a){a.a(e,(async function(e,n){try{a.d(t,{Z:function(){return l.Z}});var l=a(7941),u=e([l]);l=(u.then?(await u)():u)[0],n()}catch(i){n(i)}}))}}]);
//# sourceMappingURL=24.undefined.1685951997342.js.map