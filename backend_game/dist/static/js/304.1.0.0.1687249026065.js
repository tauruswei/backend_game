"use strict";(self["webpackChunkaccount_chessofstars"]=self["webpackChunkaccount_chessofstars"]||[]).push([[304],{1304:function(a,s,e){e.r(s),e.d(s,{default:function(){return Na}});var l=e(3396),t=e(9242),r=e(4870),i=e(7139),o=e(890),n=e(1118),c=e(2361),d=e(6853);e(1602),e(9120),e(470);const u={class:"content"},m={class:"container-fluid"},b={key:0,class:"row"},p={class:"col-md-8"},v={class:"row"},_={class:"card"},f=(0,l.uE)('<div class="card-header card-header-icon card-header-warning"><div class="card-icon"><i class="fa fa-user"></i>My Profile </div><h4 class="card-title"> - <small class="category">View or edit your profile</small></h4></div>',1),h={class:"card-body"},g={class:"row"},w={class:"col-md-12"},y={class:"form-group"},k=(0,l._)("label",{class:"bmd-label-floating"},"Nick Name",-1),x={class:"row"},V={class:"col-md-12"},C={class:"form-group"},U=(0,l._)("label",{class:"bmd-label-floating"},"Wallet Adress",-1),$={class:"input-group no-border"},q=(0,l._)("i",{class:"fa fa-level-down"},null,-1),E=[q],A=["href","target"],D=(0,l._)("i",{class:"fa fa-external-link"},null,-1),M=[D],N=(0,l._)("i",{class:"fa fa-edit"},null,-1),j=(0,l._)("div",{class:"clearfix"},null,-1),R={class:"col-md-4"},L={key:0,class:"card card-profile for-channel-only"},z={class:"card-avatar"},P={href:"#pablo"},W=["src"],B=(0,l.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Channel provider (1% commission)</h4><p class="card-description"> As a channel provider, you are responsible for the promotion and publicity of the game, and you have the right to build multiple clubs. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1),H={key:1,class:"card card-profile for-clubadmin-only"},K={class:"card-avatar"},F={href:"#pablo"},G=["src"],I=(0,l.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Club Administrator (5% commission)</h4><p class="card-description"> Each club has its own administrator who is responsible for managing members, competitions, and training within the club. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1),S={key:2,class:"card card-profile for-clubmember-only"},T={class:"card-avatar"},J={href:"#pablo"},O=["src"],Q=(0,l.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Club member (No commission)</h4><p class="card-description"> Play games under the agreement of a club. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1),X={key:1,class:"row"},Y={class:"col-md-8"},Z={class:"row"},aa={class:"card"},sa=(0,l.uE)('<div class="card-header card-header-icon card-header-warning"><div class="card-icon"><i class="fa fa-user"></i>My Profile </div><h4 class="card-title"> - <small class="category">View or edit your profile</small></h4></div>',1),ea={class:"card-body"},la={class:"row"},ta={class:"col-md-6"},ra={class:"form-group"},ia=(0,l._)("label",{class:"bmd-label-floating"},"Email address",-1),oa={class:"row"},na={class:"col-md-6"},ca={class:"form-group"},da=(0,l._)("label",{class:"bmd-label-floating"},"Nick Name",-1),ua={class:"row"},ma={class:"col-md-12"},ba={class:"form-group"},pa=(0,l._)("label",{class:"bmd-label-floating"},"Wallet Adress for NFT retailing pool",-1),va={class:"input-group no-border"},_a=(0,l._)("button",{class:"btn btn-sm btn-info btn-round btn-just-icon","data-original-title":"View address on blockchain",title:"View address on blockchain"},[(0,l._)("i",{class:"fa fa-external-link"})],-1),fa={class:"row"},ha={class:"col-md-12"},ga={class:"form-group"},wa=(0,l._)("label",{class:"bmd-label-floating"},"Wallet Adress for Starlight league staking pool)",-1),ya={class:"input-group no-border"},ka=(0,l._)("button",{class:"btn btn-sm btn-info btn-round btn-just-icon","data-original-title":"View address on blockchain",title:"View address on blockchain"},[(0,l._)("i",{class:"fa fa-external-link"})],-1),xa=(0,l._)("button",{type:"submit",class:"btn btn-warning pull-right"},[(0,l._)("i",{class:"fa fa-edit"}),(0,l.Uk)("  Change Address")],-1),Va=(0,l._)("div",{class:"clearfix"},null,-1),Ca={class:"col-md-4"},Ua={class:"card card-profile for-admin-only"},$a={class:"card-avatar"},qa={href:"#pablo"},Ea=["src"],Aa=(0,l.uE)('<div class="card-body"><h6 class="card-category text-gray">Role in community</h6><h4 class="card-title">Community administrator</h4><p class="card-description"> Be responsible for the management of the entire self-propelled chess game community, including maintaining game balance, handling complaints, and formulating rules, etc. Community administrators are required to have certain gaming experience and management skills, be able to coordinate the relationships among various clubs, and ensure the stable operation of each community. </p><a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a></div>',1);var Da={__name:"profile",setup(a){const s=(0,i.oR)(),q=(0,r.iH)(s.state.metaMask?.url),D=(0,r.iH)({wallet_address_nft:"gueryiy",wallet_address_sl:"gueryiy",name:s.state.user.name,wallet_address:s.state.user?.account});function Da(){s.state.metaMask?D.value.wallet_address=s.state.metaMask?.account:c.z8.error("please connect the wallet")}function Ma(){if(!D.value.name)return void c.z8.error("username is required");if(!D.value.wallet_address)return void c.z8.error("wallet address is required");let a={name:D.value.name,userId:s.state.user.id,walletAddress:D.value.wallet_address};n.K.show(),o.BG.update(a).then((a=>{0==a.code&&((0,d.bM)({type:"success",message:"update successfully"}),n.K.hide(),s.commit("setUser",{...s.state.user,name:D.value.name,account:D.value.wallet_address}))}))}return(a,s)=>((0,l.wg)(),(0,l.iD)("div",u,[(0,l._)("div",m,[0==a.$store.state.role||1==a.$store.state.role||2==a.$store.state.role?((0,l.wg)(),(0,l.iD)("div",b,[(0,l._)("div",p,[(0,l._)("div",v,[(0,l._)("div",_,[f,(0,l._)("div",h,[(0,l._)("div",null,[(0,l._)("div",g,[(0,l._)("div",w,[(0,l._)("div",y,[k,(0,l.wy)((0,l._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=a=>D.value.name=a),readonly:""},null,512),[[t.nr,D.value.name]])])])]),(0,l._)("div",x,[(0,l._)("div",V,[(0,l._)("div",C,[U,(0,l._)("div",$,[(0,l.wy)((0,l._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=a=>D.value.wallet_address=a),readonly:""},null,512),[[t.nr,D.value.wallet_address]]),(0,l._)("button",{class:"btn btn-sm btn-warning btn-round btn-just-icon",onClick:Da,title:"get current wallet address"},E),(0,l._)("a",{class:"btn btn-sm btn-info btn-round btn-just-icon",href:q.value?`${q.value}address/${D.value.wallet_address}`:"javascript:void(0);",target:q.value?"_blank":null,title:"View address on blockchain"},M,8,A)])])])]),(0,l._)("button",{class:"btn btn-warning pull-right",onClick:s[2]||(s[2]=a=>Ma())},[N,(0,l.Uk)("  Update")]),j])])])])]),(0,l._)("div",R,[0==a.$store.state.role?((0,l.wg)(),(0,l.iD)("div",L,[(0,l._)("div",z,[(0,l._)("a",P,[(0,l._)("img",{class:"img",src:e(7012)},null,8,W)])]),B])):(0,l.kq)("",!0),1==a.$store.state.role?((0,l.wg)(),(0,l.iD)("div",H,[(0,l._)("div",K,[(0,l._)("a",F,[(0,l._)("img",{class:"img",src:e(7)},null,8,G)])]),I])):(0,l.kq)("",!0),2==a.$store.state.role?((0,l.wg)(),(0,l.iD)("div",S,[(0,l._)("div",T,[(0,l._)("a",J,[(0,l._)("img",{class:"img",src:e(8509)},null,8,O)])]),Q])):(0,l.kq)("",!0)])])):(0,l.kq)("",!0),3==a.$store.state.role?((0,l.wg)(),(0,l.iD)("div",X,[(0,l._)("div",Y,[(0,l._)("div",Z,[(0,l._)("div",aa,[sa,(0,l._)("div",ea,[(0,l._)("form",null,[(0,l._)("div",la,[(0,l._)("div",ta,[(0,l._)("div",ra,[ia,(0,l.wy)((0,l._)("input",{type:"email",class:"form-control","onUpdate:modelValue":s[3]||(s[3]=a=>D.value.email=a),disabled:""},null,512),[[t.nr,D.value.email]])])])]),(0,l._)("div",oa,[(0,l._)("div",na,[(0,l._)("div",ca,[da,(0,l.wy)((0,l._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[4]||(s[4]=a=>D.value.name=a),disabled:""},null,512),[[t.nr,D.value.name]])])])]),(0,l._)("div",ua,[(0,l._)("div",ma,[(0,l._)("div",ba,[pa,(0,l._)("div",va,[(0,l.wy)((0,l._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[5]||(s[5]=a=>D.value.wallet_address_nft=a),disabled:""},null,512),[[t.nr,D.value.wallet_address_nft]]),_a])])])]),(0,l._)("div",fa,[(0,l._)("div",ha,[(0,l._)("div",ga,[wa,(0,l._)("div",ya,[(0,l.wy)((0,l._)("input",{type:"text",class:"form-control","onUpdate:modelValue":s[6]||(s[6]=a=>D.value.wallet_address_sl=a),disabled:""},null,512),[[t.nr,D.value.wallet_address_sl]]),ka])])])]),xa,Va])])])])]),(0,l._)("div",Ca,[(0,l._)("div",Ua,[(0,l._)("div",$a,[(0,l._)("a",qa,[(0,l._)("img",{class:"img",src:e(9715)},null,8,Ea)])]),Aa])])])):(0,l.kq)("",!0)])]))}};const Ma=Da;var Na=Ma},7012:function(a,s,e){a.exports=e.p+"static/img/channel-providers.4c7ce3f0.webp"},7:function(a,s,e){a.exports=e.p+"static/img/club-admin.58cd19c1.webp"},8509:function(a,s,e){a.exports=e.p+"static/img/club-member.6dbae680.webp"}}]);
//# sourceMappingURL=304.1.0.0.1687249026065.js.map