"use strict";(self["webpackChunkchessofstars"]=self["webpackChunkchessofstars"]||[]).push([[388],{98624:function(a,s,e){e.a(a,(async function(a,l){try{var t=e(73396),n=e(49242),r=e(44870),i=e(87139),o=e(69552),c=e(71118),d=e(2361),u=e(86853),m=(e(41602),e(69097),e(40470),a([o]));o=(m.then?(await m)():m)[0];const b={class:"content"},_={class:"container-fluid"},f={key:0,class:"row"},v={class:"col-md-8"},p={class:"row"},h={class:"card"},g=(0,t.uE)('<div class="card-header card-header-icon card-header-warning"><div class="card-icon"><i class="fa fa-user"></i>My Profile </div><h4 class="card-title"> - <small class="category">View or edit your profile</small></h4></div>',1),w={class:"card-body"},y={class:"row"},k={class:"col-md-12"},x={class:"form-group"},V=(0,t._)("label",{class:"bmd-label-floating"},"Nick Name",-1),U={class:"row"},C={class:"col-md-12"},A={class:"form-group"},E=(0,t._)("label",{class:"bmd-label-floating"},"Wallet Adress",-1),M={class:"input-group no-border"},$=(0,t._)("i",{class:"fa fa-level-down"},null,-1),q=[$],N=["href"],j=(0,t._)("i",{class:"fa fa-external-link"},null,-1),Z=[j],z=(0,t._)("i",{class:"fa fa-edit"},null,-1),D=(0,t._)("div",{class:"clearfix"},null,-1),R={class:"col-md-4"},W={class:"card card-profile for-clubadmin-only"},B={class:"card-avatar"},H={href:"#pablo"},K=["src"],L=(0,t.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Club Administrator (5% commission)</h4><p class="card-description"> Each club has its own administrator who is responsible for managing members, competitions, and training within the club. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1),P={key:1,class:"row"},F={class:"col-md-8"},G={class:"row"},I={class:"card"},S=(0,t.uE)('<div class="card-header card-header-icon card-header-warning"><div class="card-icon"><i class="fa fa-user"></i>My Profile </div><h4 class="card-title"> - <small class="category">View or edit your profile</small></h4></div>',1),T={class:"card-body"},J={class:"row"},O={class:"col-md-6"},Q={class:"form-group"},X=(0,t._)("label",{class:"bmd-label-floating"},"Email address",-1),Y={class:"row"},aa={class:"col-md-6"},sa={class:"form-group"},ea=(0,t._)("label",{class:"bmd-label-floating"},"Nick Name",-1),la={class:"row"},ta={class:"col-md-12"},na={class:"form-group"},ra=(0,t._)("label",{class:"bmd-label-floating"},"Wallet Adress for NFT retailing pool",-1),ia={class:"input-group no-border"},oa=(0,t._)("button",{class:"btn btn-sm btn-info btn-round btn-just-icon","data-original-title":"View address on blockchain",title:"View address on blockchain"},[(0,t._)("i",{class:"fa fa-external-link"})],-1),ca={class:"row"},da={class:"col-md-12"},ua={class:"form-group"},ma=(0,t._)("label",{class:"bmd-label-floating"},"Wallet Adress for Starlight league staking pool)",-1),ba={class:"input-group no-border"},_a=(0,t._)("button",{class:"btn btn-sm btn-info btn-round btn-just-icon","data-original-title":"View address on blockchain",title:"View address on blockchain"},[(0,t._)("i",{class:"fa fa-external-link"})],-1),fa=(0,t._)("button",{type:"submit",class:"btn btn-warning pull-right"},[(0,t._)("i",{class:"fa fa-edit"}),(0,t.Uk)("  Change Address")],-1),va=(0,t._)("div",{class:"clearfix"},null,-1),pa={class:"col-md-4"},ha={class:"card card-profile for-admin-only"},ga={class:"card-avatar"},wa={href:"#pablo"},ya=["src"],ka=(0,t.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Community administrator</h4><p class="card-description"> Be responsible for the management of the entire self-propelled chess game community, including maintaining game balance, handling complaints, and formulating rules, etc. Community administrators are required to have certain gaming experience and management skills, be able to coordinate the relationships among various clubs, and ensure the stable operation of each community. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1);s.Z={__name:"profile",setup(a){const s=(0,i.oR)(),l=(0,r.iH)(s.state.metaMask.url),m=(0,r.iH)({wallet_address_nft:"gueryiy",wallet_address_sl:"gueryiy",name:s.state.user.name,wallet_address:s.state.user.account});function $(){s.state.metaMask?m.value.wallet_address=s.state.metaMask.account:d.z8.error("please connect the wallet")}function j(){if(!m.value.name)return void d.z8.error("username is required");if(!m.value.wallet_address)return void d.z8.error("wallet address is required");let a={name:m.value.name,userId:s.state.user.id,walletAddress:m.value.wallet_address};c.K.show(),o.BG.update(a).then((a=>{0==a.code&&((0,u.bM)({type:"success",message:"update successfully"}),c.K.hide(),s.commit("setUser",{...s.state.user,name:m.value.name,account:m.value.wallet_address}))}))}return(a,s)=>((0,t.wg)(),(0,t.iD)("div",b,[(0,t._)("div",_,[0==a.$store.state.role||1==a.$store.state.role||2==a.$store.state.role?((0,t.wg)(),(0,t.iD)("div",f,[(0,t._)("div",v,[(0,t._)("div",p,[(0,t._)("div",h,[g,(0,t._)("div",w,[(0,t._)("div",null,[(0,t._)("div",y,[(0,t._)("div",k,[(0,t._)("div",x,[V,(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=a=>m.value.name=a),readonly:""},null,512),[[n.nr,m.value.name]])])])]),(0,t._)("div",U,[(0,t._)("div",C,[(0,t._)("div",A,[E,(0,t._)("div",M,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=a=>m.value.wallet_address=a),readonly:""},null,512),[[n.nr,m.value.wallet_address]]),(0,t._)("button",{class:"btn btn-sm btn-warning btn-round btn-just-icon",onClick:$,title:"get current wallet address"},q),(0,t._)("a",{class:"btn btn-sm btn-info btn-round btn-just-icon",href:`${l.value}${m.value.wallet_address}`,target:"_blank",title:"View address on blockchain"},Z,8,N)])])])]),(0,t._)("button",{class:"btn btn-warning pull-right",onClick:s[2]||(s[2]=a=>j())},[z,(0,t.Uk)("  Update")]),D])])])])]),(0,t._)("div",R,[(0,t._)("div",W,[(0,t._)("div",B,[(0,t._)("a",H,[(0,t._)("img",{class:"img",src:e(70007)},null,8,K)])]),L])])])):(0,t.kq)("",!0),3==a.$store.state.role?((0,t.wg)(),(0,t.iD)("div",P,[(0,t._)("div",F,[(0,t._)("div",G,[(0,t._)("div",I,[S,(0,t._)("div",T,[(0,t._)("form",null,[(0,t._)("div",J,[(0,t._)("div",O,[(0,t._)("div",Q,[X,(0,t.wy)((0,t._)("input",{type:"email",class:"form-control","onUpdate:modelValue":s[3]||(s[3]=a=>m.value.email=a),disabled:""},null,512),[[n.nr,m.value.email]])])])]),(0,t._)("div",Y,[(0,t._)("div",aa,[(0,t._)("div",sa,[ea,(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[4]||(s[4]=a=>m.value.name=a),disabled:""},null,512),[[n.nr,m.value.name]])])])]),(0,t._)("div",la,[(0,t._)("div",ta,[(0,t._)("div",na,[ra,(0,t._)("div",ia,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[5]||(s[5]=a=>m.value.wallet_address_nft=a),disabled:""},null,512),[[n.nr,m.value.wallet_address_nft]]),oa])])])]),(0,t._)("div",ca,[(0,t._)("div",da,[(0,t._)("div",ua,[ma,(0,t._)("div",ba,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[6]||(s[6]=a=>m.value.wallet_address_sl=a),disabled:""},null,512),[[n.nr,m.value.wallet_address_sl]]),_a])])])]),fa,va])])])])]),(0,t._)("div",pa,[(0,t._)("div",ha,[(0,t._)("div",ga,[(0,t._)("a",wa,[(0,t._)("img",{class:"img",src:e(29715)},null,8,ya)])]),ka])])])):(0,t.kq)("",!0)])]))}},l()}catch(b){l(b)}}))},83388:function(a,s,e){e.a(a,(async function(a,l){try{e.r(s);var t=e(59736),n=a([t]);t=(n.then?(await n)():n)[0];const r=t.Z;s["default"]=r,l()}catch(r){l(r)}}))},59736:function(a,s,e){e.a(a,(async function(a,l){try{e.d(s,{Z:function(){return t.Z}});var t=e(98624),n=a([t]);t=(n.then?(await n)():n)[0],l()}catch(r){l(r)}}))},70007:function(a,s,e){a.exports=e.p+"static/img/club-admin.58cd19c1.webp"}}]);
//# sourceMappingURL=388.undefined.1686296453693.js.map