"use strict";(self["webpackChunkknowledge"]=self["webpackChunkknowledge"]||[]).push([[66],{7679:function(a,s,e){e.a(a,(async function(a,l){try{var t=e(3396),r=e(9242),n=e(4870),i=e(7139),o=e(8859),c=e(5657),d=e(8238),u=e(6853),m=a([o]);o=(m.then?(await m)():m)[0];const b={class:"content"},p={class:"container-fluid"},_={key:0,class:"row"},f={class:"col-md-8"},v={class:"row"},h={class:"card"},g=(0,t.uE)('<div class="card-header card-header-icon card-header-warning"><div class="card-icon"><i class="fa fa-user"></i>My Profile </div><h4 class="card-title"> - <small class="category">View or edit your profile</small></h4></div>',1),y={class:"card-body"},w={class:"row"},k={class:"col-md-12"},x={class:"form-group"},V=(0,t._)("label",{class:"bmd-label-floating"},"Nick Name",-1),C={class:"row"},U={class:"col-md-12"},E={class:"form-group"},A=(0,t._)("label",{class:"bmd-label-floating"},"Wallet Adress",-1),j={class:"input-group no-border"},N=(0,t._)("i",{class:"fa level-down"},null,-1),q=[N],M=["href"],R=(0,t._)("i",{class:"fa fa-external-link"},null,-1),$=[R],L=(0,t._)("i",{class:"fa fa-edit"},null,-1),Z=(0,t._)("div",{class:"clearfix"},null,-1),z={class:"col-md-4"},D={class:"card card-profile for-channel-only"},P={class:"card-avatar"},W={href:"#pablo"},B=["src"],K=(0,t.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Channel provider (1% commission)</h4><p class="card-description"> As a channel provider, you are responsible for the promotion and publicity of the game, and you have the right to build multiple clubs. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1),F={class:"card card-profile for-clubadmin-only"},G={class:"card-avatar"},H={href:"#pablo"},I=["src"],S=(0,t.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Club Administrator (5% commission)</h4><p class="card-description"> Each club has its own administrator who is responsible for managing members, competitions, and training within the club. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1),T={class:"card card-profile for-clubmember-only"},J={class:"card-avatar"},O={href:"#pablo"},Q=["src"],X=(0,t.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Club member (No commission)</h4><p class="card-description"> Play games under the agreement of a club. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1),Y={key:1,class:"row"},aa={class:"col-md-8"},sa={class:"row"},ea={class:"card"},la=(0,t.uE)('<div class="card-header card-header-icon card-header-warning"><div class="card-icon"><i class="fa fa-user"></i>My Profile </div><h4 class="card-title"> - <small class="category">View or edit your profile</small></h4></div>',1),ta={class:"card-body"},ra={class:"row"},na={class:"col-md-6"},ia={class:"form-group"},oa=(0,t._)("label",{class:"bmd-label-floating"},"Email address",-1),ca={class:"row"},da={class:"col-md-6"},ua={class:"form-group"},ma=(0,t._)("label",{class:"bmd-label-floating"},"Nick Name",-1),ba={class:"row"},pa={class:"col-md-12"},_a={class:"form-group"},fa=(0,t._)("label",{class:"bmd-label-floating"},"Wallet Adress for NFT retailing pool",-1),va={class:"input-group no-border"},ha=(0,t._)("button",{class:"btn btn-sm btn-info btn-round btn-just-icon","data-original-title":"View address on blockchain",title:"View address on blockchain"},[(0,t._)("i",{class:"fa fa-external-link"})],-1),ga={class:"row"},ya={class:"col-md-12"},wa={class:"form-group"},ka=(0,t._)("label",{class:"bmd-label-floating"},"Wallet Adress for Starlight league staking pool)",-1),xa={class:"input-group no-border"},Va=(0,t._)("button",{class:"btn btn-sm btn-info btn-round btn-just-icon","data-original-title":"View address on blockchain",title:"View address on blockchain"},[(0,t._)("i",{class:"fa fa-external-link"})],-1),Ca=(0,t._)("button",{type:"submit",class:"btn btn-warning pull-right"},[(0,t._)("i",{class:"fa fa-edit"}),(0,t.Uk)("  Change Address")],-1),Ua=(0,t._)("div",{class:"clearfix"},null,-1),Ea={class:"col-md-4"},Aa={class:"card card-profile for-admin-only"},ja={class:"card-avatar"},Na={href:"#pablo"},qa=["src"],Ma=(0,t.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Community administrator</h4><p class="card-description"> Be responsible for the management of the entire self-propelled chess game community, including maintaining game balance, handling complaints, and formulating rules, etc. Community administrators are required to have certain gaming experience and management skills, be able to coordinate the relationships among various clubs, and ensure the stable operation of each community. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1);s.Z={__name:"profile",setup(a){const s=(0,i.oR)(),l=(0,n.iH)({wallet_address_nft:"gueryiy",wallet_address_sl:"gueryiy",name:s.state.user.name,wallet_address:s.state.user.account});function m(){s.state.metaMask?l.value.wallet_address=s.state.metaMask.account:d.z8.error("please connect the wallet")}function N(){if(!l.value.name)return void d.z8.error("username is required");if(!l.value.wallet_address)return void d.z8.error("wallet address is required");let a={name:l.value.name,userId:s.state.user.id,walletAddress:l.value.wallet_address};c.K.show(),o.BG.update(a).then((a=>{0==a.code&&((0,u.bM)({type:"success",message:"update successfully"}),c.K.hide(),s.commit("setUser",{...s.state.user,name:l.value.name,account:l.value.wallet_address}))}))}return(a,s)=>((0,t.wg)(),(0,t.iD)("div",b,[(0,t._)("div",p,[0==a.$store.state.role||1==a.$store.state.role||2==a.$store.state.role?((0,t.wg)(),(0,t.iD)("div",_,[(0,t._)("div",f,[(0,t._)("div",v,[(0,t._)("div",h,[g,(0,t._)("div",y,[(0,t._)("div",null,[(0,t._)("div",w,[(0,t._)("div",k,[(0,t._)("div",x,[V,(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=a=>l.value.name=a),readonly:""},null,512),[[r.nr,l.value.name]])])])]),(0,t._)("div",C,[(0,t._)("div",U,[(0,t._)("div",E,[A,(0,t._)("div",j,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=a=>l.value.wallet_address=a),readonly:""},null,512),[[r.nr,l.value.wallet_address]]),(0,t._)("button",{class:"btn btn-sm btn-warning btn-round btn-just-icon",onClick:m,title:"get current wallet address"},q),(0,t._)("a",{class:"btn btn-sm btn-info btn-round btn-just-icon",href:`${l.value.wallet_address}`,title:"View address on blockchain"},$,8,M)])])])]),(0,t._)("button",{class:"btn btn-warning pull-right",onClick:s[2]||(s[2]=a=>N())},[L,(0,t.Uk)("  Update")]),Z])])])])]),(0,t._)("div",z,[(0,t._)("div",D,[(0,t._)("div",P,[(0,t._)("a",W,[(0,t._)("img",{class:"img",src:e(2789)},null,8,B)])]),K]),(0,t._)("div",F,[(0,t._)("div",G,[(0,t._)("a",H,[(0,t._)("img",{class:"img",src:e(2335)},null,8,I)])]),S]),(0,t._)("div",T,[(0,t._)("div",J,[(0,t._)("a",O,[(0,t._)("img",{class:"img",src:e(3012)},null,8,Q)])]),X])])])):(0,t.kq)("",!0),3==a.$store.state.role?((0,t.wg)(),(0,t.iD)("div",Y,[(0,t._)("div",aa,[(0,t._)("div",sa,[(0,t._)("div",ea,[la,(0,t._)("div",ta,[(0,t._)("form",null,[(0,t._)("div",ra,[(0,t._)("div",na,[(0,t._)("div",ia,[oa,(0,t.wy)((0,t._)("input",{type:"email",class:"form-control","onUpdate:modelValue":s[3]||(s[3]=a=>l.value.email=a),disabled:""},null,512),[[r.nr,l.value.email]])])])]),(0,t._)("div",ca,[(0,t._)("div",da,[(0,t._)("div",ua,[ma,(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[4]||(s[4]=a=>l.value.name=a),disabled:""},null,512),[[r.nr,l.value.name]])])])]),(0,t._)("div",ba,[(0,t._)("div",pa,[(0,t._)("div",_a,[fa,(0,t._)("div",va,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[5]||(s[5]=a=>l.value.wallet_address_nft=a),disabled:""},null,512),[[r.nr,l.value.wallet_address_nft]]),ha])])])]),(0,t._)("div",ga,[(0,t._)("div",ya,[(0,t._)("div",wa,[ka,(0,t._)("div",xa,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[6]||(s[6]=a=>l.value.wallet_address_sl=a),disabled:""},null,512),[[r.nr,l.value.wallet_address_sl]]),Va])])])]),Ca,Ua])])])])]),(0,t._)("div",Ea,[(0,t._)("div",Aa,[(0,t._)("div",ja,[(0,t._)("a",Na,[(0,t._)("img",{class:"img",src:e(5080)},null,8,qa)])]),Ma])])])):(0,t.kq)("",!0)])]))}},l()}catch(b){l(b)}}))},1066:function(a,s,e){e.a(a,(async function(a,l){try{e.r(s);var t=e(406),r=a([t]);t=(r.then?(await r)():r)[0];const n=t.Z;s["default"]=n,l()}catch(n){l(n)}}))},406:function(a,s,e){e.a(a,(async function(a,l){try{e.d(s,{Z:function(){return t.Z}});var t=e(7679),r=a([t]);t=(r.then?(await r)():r)[0],l()}catch(n){l(n)}}))},2789:function(a,s,e){a.exports=e.p+"static/img/channel-providers.b5adce3a.jpg"},2335:function(a,s,e){a.exports=e.p+"static/img/club-admin.2a7165f5.png"},3012:function(a,s,e){a.exports=e.p+"static/img/club-member.22f252d6.jpg"}}]);
//# sourceMappingURL=66.undefined.1685951997342.js.map