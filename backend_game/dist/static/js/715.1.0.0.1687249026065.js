"use strict";(self["webpackChunkaccount_chessofstars"]=self["webpackChunkaccount_chessofstars"]||[]).push([[715],{5745:function(e,a,l){l.d(a,{Ov:function(){return t},lV:function(){return r}});l(2062);const r={getURLParam:e=>{let a=new URL(window.location),l=a.searchParams,r=l.get(e);return r}},t={toString:(e,a)=>{if(!e)return"";a||(a="yyyy-MM-dd hh:mm:ss");let l=new Date(e),r={"M+":l.getMonth()+1,"d+":l.getDate(),"h+":l.getHours(),"m+":l.getMinutes(),"s+":l.getSeconds(),"q+":Math.floor((l.getMonth()+3)/3),S:l.getMilliseconds()};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(l.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in r)new RegExp("("+t+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?r[t]:("00"+r[t]).substr((""+r[t]).length)));return a},getDay:e=>{let a=new Date,l=a.getTime()+864e5*e;return a.setTime(l),a}}},7715:function(e,a,l){l.r(a),l.d(a,{default:function(){return k}});var r=l(9229),t=(l(1602),l(8968),l(8671)),s=(l(2938),l(4349)),n=(l(6618),l(4116)),u=(l(7903),l(3013),l(3102)),o=(l(7972),l(7658),l(3396)),i=l(4870),d=l(7139),c=l(5490),m=l(890),p=l(5745),g=l(1118),w=l(662),h=l(5441),v=l(5323);const f={class:"login-bg"},b={class:"logo",style:{position:"relative","z-index":"9","padding-left":"20px","text-align":"left"}},y=["src"],_=(0,o._)("span",{class:"wtext-l"},"Chess Of Stars",-1),x={class:"login-box",style:{"margin-top":"10px"}},V=(0,o._)("h3",{class:"title-des wtext-xl"},"Play & Earn,",-1),$=(0,o._)("p",{class:"text-muted"},[(0,o._)("small",null,"register your own account^^")],-1),W=(0,o._)("div",{style:{"margin-top":"60px","font-size":"14px"}},[(0,o._)("span",{class:"text-muted"},"Already have an account？"),(0,o._)("a",{href:"/login"},"Sign In")],-1);var E={__name:"register",setup(e){(0,d.oR)();const a=(0,c.tv)(),E=((0,i.iH)([{id:0,name:"channel leader"},{id:1,name:"club boss"},{id:2,name:"user"}]),(0,i.iH)(null));let q=p.lV.getURLParam("id");console.log(q);const k=(0,i.iH)({email:"",name:"",passwd:"",userType:2,code:"",rpassword:"",inviterId:q||null}),T=(0,i.iH)({}),R=((0,i.iH)(0),(0,i.iH)(!1));function S(){g.K.show(),E.value.validate((e=>{if(e){let e={email:k.value.email,name:k.value.name,passwd:(0,w.m)(k.value.passwd),userType:k.value.userType,code:k.value.code,inviterId:k.value.inviterId};m.BG.signup(e).then((e=>{0==e.code&&"success"==e.msg&&(E.value.resetFields(),g.K.hide(),v.T.confirm("Sign up successfully!Do you want to redirected to login now?","Success",{confirmButtonText:"Yes",cancelButtonText:"Cancel",type:"success"}).then((()=>{a.push("/login")})).catch((()=>{console.log("cancel")})))}))}else g.K.hide()}))}function U(e){R.value=e}return T.value.email=[{required:!0,message:"Email is required",trigger:"blur"},{type:"email",message:"Please input correct email address",trigger:["blur","change"]},{validator:function(e,a,l){a&&m.BG.checkEmail(a).then((e=>{e.data?l():l(new Error("this email has been used,please use another one"))}))},trigger:"blur"}],T.value.name=[{required:!0,message:"Nick name is required",trigger:"blur"},{min:2,max:64,message:"The length between 2 and 64 character",trigger:"blur"},{required:!0,pattern:/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){1,64}$/,message:"Begin with a letter, and use letters, numbers and the underscore(_)",trigger:"blur"},{validator:function(e,a,l){a&&m.BG.checkUser(a).then((e=>{0!=e.code||e.data?l(new Error("this nick name has been used,please use another one")):l()}))},trigger:"blur"}],T.value.passwd=[{required:!0,message:"Password is required",trigger:"blur"},{min:8,max:64,message:"The length between 8 and 64 character",trigger:"blur"},{required:!0,pattern:/^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,message:"Contains at least two types of numbers, uppercase and lowercase letters, and special characters",trigger:"blur"}],T.value.code=[{required:!0,message:"Verify code is required",trigger:"blur"}],T.value.rpassword=[{required:!0,message:"password is required",trigger:"blur"},{min:8,max:64,message:"The length between 8 and 64 character",trigger:"blur"},{required:!0,pattern:/^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,message:"Contains at least two types of numbers, uppercase and lowercase letters, and special characters",trigger:"blur"},{validator:function(e,a,l){a!=k.value.passwd?l(new Error("The passwords are inconsistent, please re-enter ")):l()},trigger:"blur"}],(e,a)=>{const i=u.EZ,d=r.nH,c=n.Dv,m=s.dq,p=t.ElButton,g=r.ly;return(0,o.wg)(),(0,o.iD)("div",f,[(0,o._)("div",b,[(0,o._)("img",{src:l(9715)},null,8,y),_]),(0,o._)("div",x,[V,$,(0,o.Wm)(g,{ref_key:"formRef",ref:E,rules:T.value,"label-position":"top","label-width":"100px",model:k.value,style:{"padding-top":"40px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{label:"Email",prop:"email"},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{modelValue:k.value.email,"onUpdate:modelValue":a[0]||(a[0]=e=>k.value.email=e),placeholder:"enter your email",clearable:"",disabled:R.value},null,8,["modelValue","disabled"])])),_:1}),(0,o.Wm)(d,{label:"Verify code",prop:"code"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{gutter:10,style:{width:"100%"}},{default:(0,o.w5)((()=>[(0,o.Wm)(c,{span:16},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{modelValue:k.value.code,"onUpdate:modelValue":a[1]||(a[1]=e=>k.value.code=e),type:"text",placeholder:"enter your verify code",clearable:""},null,8,["modelValue"])])),_:1}),(0,o.Wm)(c,{span:8},{default:(0,o.w5)((()=>[(0,o.Wm)(h.Z,{email:k.value.email,onSend:U},null,8,["email"])])),_:1})])),_:1})])),_:1}),(0,o.Wm)(d,{label:"Nick name",prop:"name"},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{modelValue:k.value.name,"onUpdate:modelValue":a[2]||(a[2]=e=>k.value.name=e),placeholder:"enter your nick name",clearable:""},null,8,["modelValue"])])),_:1}),(0,o.Wm)(d,{label:"Password",prop:"passwd"},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{modelValue:k.value.passwd,"onUpdate:modelValue":a[3]||(a[3]=e=>k.value.passwd=e),type:"password",placeholder:"enter your password","show-password":"",clearable:""},null,8,["modelValue"])])),_:1}),(0,o.Wm)(d,{label:"Repeat password",prop:"rpassword"},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{modelValue:k.value.rpassword,"onUpdate:modelValue":a[4]||(a[4]=e=>k.value.rpassword=e),type:"password",placeholder:"enter your password again","show-password":"",clearable:""},null,8,["modelValue"])])),_:1}),(0,o.Wm)(d,null,{default:(0,o.w5)((()=>[(0,o.Wm)(p,{type:"primary",class:"w-100 shadow",onClick:a[5]||(a[5]=e=>S())},{default:(0,o.w5)((()=>[(0,o.Uk)("Sign Up")])),_:1})])),_:1})])),_:1},8,["rules","model"]),W])])}}};const q=E;var k=q}}]);
//# sourceMappingURL=715.1.0.0.1687249026065.js.map