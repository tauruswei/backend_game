<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="card ">
          <div class="card-header ">
            <el-row :gutter="10">
              <el-col :span="12">
                <h4 class="card-title">COSD Staking
                  <small class="description">Please choose purpose</small>
                </h4>
              </el-col>
              <el-col :span="8" style="font-size:18px;line-height: 32px;">current balance:&nbsp;<b>{{ balance.cosd }}</b></el-col>
              <el-col :span="4" style="text-align: right;">
                <el-button type="primary" @click="open('buy')" round>Purchase COSD</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="card-body ">
            <div class="alert alert-warning">
              <span>Reminder: BSC(Binance smart chain) chain supported only, we'll support various chains soon.</span>
            </div>

            <div class="row">
              <div class="col-md-3">
                <ul class="nav nav-pills nav-pills-warning nav-pills-icons flex-column" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link" :class="active=='sl'?' active show':''" data-toggle="tab" @click="handleClick('sl')" role="tablist">
                      <i class="fa fa-asterisk"></i> Staking for <br />starlight league
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" :class="active=='club'?' active show':''" data-toggle="tab" @click="handleClick('club')" role="tablist">
                      <i class="fa fa-group"></i> Staking for <br />club ownership
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" :class="active=='cosd'?' active show':''" data-toggle="tab" @click="handleClick('cosd')" role="tablist">
                      <i class="fa fa-btc"></i> Staking for <br />earning COSD
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-md-9">
                <div class="tab-content">
                  <!--Starlight league-->
                  <div class="tab-pane" :class="active=='sl'?' active show':''" id="tab-staking-sll">
                    <div class="card card-stats for-unqualified">
                      <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                          <i class="fa fa-asterisk"></i>
                        </div>
                        <p class="card-category">Current staking COSD</p>
                        <h3 class="card-title">{{ balance.sl }}</h3>
                        <span class="badge badge-pill" :class="balance.sl<400?' badge-default':' badge-success'">Starlight League Unqualified</span>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="fa fa-cubes"></i>&nbsp;Staking pool contract address:&nbsp;&nbsp;
                          <a target="_blank" href="#">{{contracts.sl.address}}</a>
                        </div>
                      </div>
                    </div>
                    <div class="card card-pricing card-raised for-unqualified">
                      <div class="card-body">
                        <div class="card-icon icon-rose">
                          <i class="fa fa-asterisk"></i>
                        </div>
                        <h3 class="card-title" style="color: rgb(188, 0, 0);font-weight:bold;"> 400 COSD = 20 USDT</h3>
                        <div style="font-weight: bold;color:rgb(66, 66, 66);">
                          <span style="text-decoration:line-through!important;">1980 COSD = 99 USDT</span>&nbsp;&nbsp;Limited time discount
                        </div>
                        <p class="card-description">
                          You need to stake 400 COSD (equivalent to 20 USDT) to get a qualification for Starlight League.
                        </p>
                        <button class="btn btn-rose btn-round" @click="open('slstaking')">Stake</button>
                      </div>
                    </div>
                    <div class="card card-stats for-qualified" v-if="balance.sl">
                      <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                          <i class="fa fa-asterisk"></i>
                        </div>
                        <p class="card-category">Current staking COSD</p>
                        <h3 class="card-title">{{ balance.sl }}</h3>
                        <span class="badge badge-pill" :class="balance.sl<400?' badge-default':' badge-success'">Starlight League Qualified</span><br /><br />
                        <button class="btn btn-warning btn-round" @click="open('slunstaking')">Stop staking</button>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <div class="">
                            <i class="fa fa-cubes"></i>&nbsp;Staking pool contract address:&nbsp;&nbsp;
                            <a target="_blank" href="#">{{contracts.sl.address}}</a>
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <div class="">
                            <span>You need to stake enough COSD to get a qualification for Starlight League.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--Club ownership-->
                  <div class="tab-pane" :class="active=='club'?' active show':''" id="tab-staking-club">
                    <div class="card card-stats for-unqualified">
                      <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                          <i class="fa fa-group"></i>
                        </div>
                        <p class="card-category">Current staking COSD</p>
                        <h3 class="card-title">{{ balance.club }}</h3>
                        <span class="badge badge-pill" :class="isClubBoss?' badge-success':' badge-default'">Club ownership Unqualified</span>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="fa fa-cubes"></i>&nbsp;Staking pool contract address:&nbsp;&nbsp;
                          <a target="_blank" href="#">{{contracts.club.address}}</a>
                        </div>
                      </div>
                    </div>
                    <div class="card card-pricing card-raised for-unqualified">
                      <div class="card-body">
                        <div class="card-icon icon-rose">
                          <i class="fa fa-group"></i>
                        </div>
                        <h3 class="card-title" style="color: rgb(188, 0, 0);font-weight:bold;"> 4000 COSD = 200 USDT</h3>
                        <div style="font-weight: bold;color:rgb(66, 66, 66);">
                          <span style="text-decoration:line-through!important;">19800 COSD = 990 USDT</span>&nbsp;&nbsp;Limited time discount
                        </div>
                        <p class="card-description">
                          You need to stake 4000 COSD (equivalent to 200 USDT) to get a qualification for a club ownership.
                        </p>
                        <a href="javascript:void(0);" class="btn btn-rose btn-round" @click="open('clubstaking')">Stake</a>
                      </div>
                    </div>
                    <div class="card card-stats for-qualified" v-if="balance.club">
                      <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                          <i class="fa fa-group"></i>
                        </div>
                        <p class="card-category">Current staking COSD</p>
                        <h3 class="card-title">{{ balance.club }}</h3>
                        <span class="badge badge-pill badge" :class="isClubBoss?' badge-success':' badge-default'">Club ownership Qualified</span><br /><br />
                        <button class="btn btn-warning btn-round" @click="open('clubunstaking')">Stop staking</button>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <div class="">
                            <i class="fa fa-cubes"></i>&nbsp;Staking pool contract address:&nbsp;&nbsp;
                            <a target="_blank" href="#">{{contracts.club.address}}</a>
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <div class="">
                            <span>You need to stake enough COSD to get a qualification for a club ownership.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--COSD Earning-->
                  <div class="tab-pane" :class="active=='cosd'?' active show':''" id="tab-staking-cosd">
                    <div class="card card-stats">
                      <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                          <i class="fa fa-btc"></i>
                        </div>
                        <p class="card-category">Current staking COSD</p>
                        <h3 class="card-title">{{ balance.defi }}</h3>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="fa fa-cubes"></i>&nbsp;Staking pool contract address:&nbsp;&nbsp;
                          <a target="_blank" href="#">{{contracts.defi.address}}</a>
                        </div>
                      </div>
                    </div>
                    <div class="card card-pricing card-raised for-cosd-unstaked">
                      <div class="card-body">
                        <div class="card-icon icon-rose">
                          <i class="fa fa-btc"></i>
                        </div>
                        <h3 class="card-title"> 2000 COSD = 100 USDT</h3>
                        <p class="card-description">
                          You can only stake 2000 COSD (equivalent to 100 USDT).
                        </p>
                        <button class="btn btn-rose btn-round" @click="open('defistaking')">Stake</button>
                      </div>
                    </div>
                    <div class="card card-pricing card-raised for-cosd-unstaked" v-if="balance.defi">
                      <div class="card-body">
                        <div class="card-icon icon-rose">
                          <i class="fa fa-line-chart"></i>
                        </div>
                        <h3 class="card-title"> <b>{{ reward }}</b> COSD earned</h3>
                        <p class="card-description">
                        </p>
                        <button class="btn btn-warning btn-round" @click="open('defiunstaking')">Stop staking</button>
                        <button class="btn btn-success btn-round" v-if="show" @click="claimReward()">Claim rewards</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="visible" :title="action.title" width="400px" destroy-on-close>
      <el-alert v-if="action.command == 'buy'" title="Tip: Accumulated expenses of usdt cannot exceed 100,000" type="info" style="margin-bottom:20px"></el-alert>
      <el-row :gutter="5" style="margin-bottom:20px" v-if="action.command == 'buy'">
        <el-col :span="4">
          COSD
        </el-col>
        <el-col :span="20">
          <el-input-number v-model.number="action.amount1" controls-position="right" :step="1" :min="20" :max="100000" placeholder="`set amount" style="width:100%" @change="translate('usdt')" clearable></el-input-number>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="4">
          {{action.command == 'buy'?'USDT':'AMOUNT'}}
        </el-col>
        <el-col :span="20">
          <el-input-number v-model.number="action.amount" controls-position="right" :step="1" :min="min.value" :max="100000" placeholder="`set amount" style="width:100%" @change="translate('cosd')" clearable></el-input-number>
        </el-col>
        <el-col :span="24" style="margin-top:15px" v-if="needApprove">
          <el-button type="primary" @click="handleApproveOperate()" style="width:100%" :disabled="disabled">
            <el-tag size="small">1</el-tag>&nbsp;Approve Spending
          </el-button>
        </el-col>
        <el-col :span="24" style="margin-top:15px">
          <el-button type="success" @click="handleTransferOperate()" style="width:100%" :disabled="!disabled">
            <el-tag size="small" v-if="needApprove">2</el-tag>&nbsp;{{buttonText}}
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { useStore } from "vuex"
import buyToken from "@/abi/buytoken.json";
import cosdToken from "@/abi/cosdtoken.json";
import busdApprove from "@/abi/busdtoken.json";
import slStaking from "@/abi/slStaking.json";
import clubStaking from "@/abi/clubStaking.json";
import defiStaking from "@/abi/stakingPool.json";
import { chainApi } from "@/api/request";
import { loadingHelper } from "@/utils/loading";
import { CONTRACTS, MetaMask, ASSETTYPE, TXTYPE, POOL,savaAfterTranscation } from "@/utils/meta-mask";
import { ElMessage } from "element-plus";
const store = useStore();
const active = ref("sl");
const balance = ref({
  cosd: 0,
  sl: 0, club: 0, defi: 0
});
const contracts = ref(CONTRACTS)
const abis = ref({ sl: slStaking, club: clubStaking, defi: defiStaking, buy: buyToken, cosd: cosdToken, busd: busdApprove })
const action = ref({
  amount1: 20,
  amount: 1,
  title: '',
  command: ''
});
const titles = ref({ buy: "Purchase COSD", "slstaking": "Staking for starlight league", "clubstaking": "Staking for club ownership", "defistaking": "Staking for earning COSD" })
const visible = ref(false)
const show = ref(false)
const timeEnd = ref({ defi: 30 * 60 * 1000, sl: 60 * 60 * 1000, club: 60 * 60 * 1000 })
const isClubBoss = ref(false)
const needApprove = ref(true);
const metaMask = new MetaMask();
const disabled = ref(false)
const reward = ref(0)
const buttonText = ref('Buy')
const min = ref(1)
function handleClick(tab) {
  active.value = tab;
}
function translate(type) {
  let rate = 20;
  if (type == 'cosd') {
    action.value.amount1 = action.value.amount * rate;
  } else if (type == 'usdt') {
    action.value.amount = action.value.amount1 / rate;
  }
}
function setTime(key) {
  let time = new Date().getTime();
  let data = {};
  data[key] = time + timeEnd.value[key];
  store.commit("setTime", data)
}
function getTranscationTime() {
  let data = {}
  store.commit("setTime", data)
}
function isTimeAvailable(key) {
  let ret = false;
  let time = new Date().getTime();
  if (!store.state.time) return true;
  if (!store.state.time[key] || store.state.time[key] < time) ret = true;
  else ElMessage.error("Not exceeding the specified time limit!")
  return ret;
}
function getBalance(key) {
  let data = {
    abi: abis.value[key],
    address: CONTRACTS[key].address,
    from: store.state.metaMask.account
  }
  metaMask.getBalanceByContract(data).then(res => {
    balance.value[key] = Math.round((res) * 1000) / 1000;
  });
}
function getReward() {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value['defi'],
    address: CONTRACTS['defi'].address,
    from: store.state.metaMask.account
  }
  metaMask.getRewardByContract(data).then(res => {
    reward.value = Math.round((res) * 1000) / 1000
  });
}
function getClubStatus() {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value['club'],
    address: CONTRACTS['club'].address,
    from: store.state.metaMask.account
  }
  metaMask.getClubStatusByContract(data).then(res => {
    isClubBoss.value = res;
  });
}
function open(command) {
  if (!metaMask.isAvailable()) return;
  action.value = {
    amount1: 20,
    amount: 1,
    title: titles.value[command],
    command: command
  }
  disabled.value = false;
  min.value = 1;
  if (command == 'buy') buttonText.value = "Buy"
  if (command == 'slstaking') {
    needApprove.value = true; 
    buttonText.value = "Stake";
    min.value = 400;
  }
  if(command == 'clubunstaking') {
    action.value.amount = balance.value['club'];
    needApprove.value = false
    buttonText.value = "Unstake"
    disabled.value = true;
    min.value = 4000;
  }
  if(command == 'slunstaking') {
    action.value.amount = balance.value['sl'];
    needApprove.value = false
    buttonText.value = "Unstake"
    disabled.value = true;
  }
  if(command == 'defiunstaking') {
    action.value.amount = balance.value['defi'];
    needApprove.value = false
    buttonText.value = "Unstake"
    disabled.value = true;
  }
  if(command == 'defirewards') {
    needApprove.value = false
    buttonText.value = "Unstake"
    disabled.value = true;
  }
  visible.value = true
}
function handleApproveOperate() {
  if (action.value.command == "buy") purchaseApprove();
  if (action.value.command == "slstaking") stakingApprove('sl');
  if (action.value.command == "clubstaking") stakingApprove('club');
  if (action.value.command == "defistaking") stakingApprove('defi');
}
function handleTransferOperate() {
  if (action.value.command == "buy") purchase();
  if (action.value.command == "slstaking") stakingFunc('sl');
  if (action.value.command == "clubstaking") stakingFunc('club');
  if (action.value.command == "defistaking") stakingFunc('defi');
  if (action.value.command == "slunstaking") unStakingFunc('sl');
  if (action.value.command == "clubunstaking") unStakingFunc('club');
  if (action.value.command == "defiunstaking") unStakingFunc('defi');
}
function isEmpty() {
  if (!action.value.amount) {
    ElMessage.error("amount is required!")
  }
  return action.value.amount ? false : true;
}
function validatorAmount(key) {
  if (isEmpty()) return false;
  if (action.value.amount > balance.value[key]) {
    ElMessage.error("Cannot exceed the balance value!")
    return false
  } else {
    return true;
  }
}
function purchaseApprove() {
  if (!metaMask.isAvailable()) return;
  let data = {
    from: store.state.metaMask.account,
    address: CONTRACTS["buycosd"].address,
    money: action.value.amount,
    abi: abis.value.buy,
    approveAddress: CONTRACTS["busd"].address,
    abiApprove: busdApprove
  }
  if (isEmpty()) return;
  loadingHelper.show()
  metaMask.approveByContract(data).then(() => {
    loadingHelper.hide();
    disabled.value = true;
  }).catch(err => {
    loadingHelper.hide();
  })
}
function purchase() {
  if (!metaMask.isAvailable()) return;
  if (isEmpty()) return;
  let data = {
    from: store.state.metaMask.account,
    address: CONTRACTS["buycosd"].address,
    money: action.value.amount,
    abi: abis.value.buy,
    approveAddress: CONTRACTS["busd"].address,
    abiApprove: busdApprove
  }
  loadingHelper.show()
  metaMask.transferByContract(data).then((res) => {
    visible.value = false;
    loadingHelper.hide();
    let param = {
      "txId": res.transactionHash,
      "transType": TXTYPE.buy,
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE.usdt,
      "fromAmount": action.value.amount,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE.cosd,
      "toAmount": action.value.amount1,
      "nftVo": {},
      "blockNumber":res.blockNumber
    }
    savaAfterTranscation(param)
    getBalance('cosd');
  }).catch(err => {
    loadingHelper.hide();
  })
}
function stakingApprove(key) {
  if (!isTimeAvailable(key)) return
  if (!metaMask.isAvailable()) return;
  let data = { from: store.state.metaMask.account, address: CONTRACTS[key].address, money: action.value.amount, abi: abis.value[key], abiApprove: cosdToken, approveAddress: CONTRACTS["cosd"].address }
  if (!validatorAmount('cosd')) return;
  loadingHelper.show()
  metaMask.approveByContract(data).then(() => {
    loadingHelper.hide();
    disabled.value = true;
  }).catch(err => {
    loadingHelper.hide();
  })
}
function stakingFunc(key) {
  if (!isTimeAvailable(key)) return
  if (!metaMask.isAvailable()) return;
  let data = { from: store.state.metaMask.account, address: CONTRACTS[key].address, money: action.value.amount, abi: abis.value[key], abiApprove: cosdToken, approveAddress: CONTRACTS["cosd"].address }
  loadingHelper.show()
  metaMask.stakingByContract(data).then((res) => {
    visible.value = false;
    loadingHelper.hide()
    let param = {
      "txId": res.transactionHash,
      "transType": TXTYPE.stake[key],
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE.cosd,
      "fromAmount": action.value.amount,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE[key] ? ASSETTYPE[key] : ASSETTYPE.cosd,
      "toAmount": action.value.amount,
      "nftVo": {},
      "poolId": POOL[key],
      "blockNumber":res.blockNumber
    }
    savaAfterTranscation(param)
    setTime(key)
    getBalance(key);
    if (key == 'club') getClubStatus()
    if (key == 'defi') { getReward() }
  }).catch(err => {
    loadingHelper.hide();
  })
}
function unStakingFunc(key) {
  if (!isTimeAvailable(key)) return
  if (!metaMask.isAvailable()) return;
  if (!validatorAmount(key)) return;
  let account = store.state.metaMask.account;
  let data = { from: account, address: CONTRACTS[key].address, money: action.value.amount, abi: abis.value[key] }
  loadingHelper.show()
  metaMask.unStakingByContract(data).then((res) => {
    visible.value = false;
    let param = {
      "txId": res.transactionHash,
      "transType": TXTYPE.unstake[key],
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE[key] ? ASSETTYPE[key] : ASSETTYPE.cosd,
      "fromAmount": 0 - action.value.amount,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE.cosd,
      "toAmount": 0 - action.value.amount,
      "nftVo": {},
      "poolId": POOL[key],
      "blockNumber":res.blockNumber
    }
    savaAfterTranscation(param)
    if (key == 'defi') { show.value = true; getReward() }
    setTime(key)
    loadingHelper.hide();
    getBalance(key);
    if (key == 'club') getClubStatus()
  }).catch(err => {
    loadingHelper.hide();
  })
}
function claimReward() {
  if (!metaMask.isAvailable()) return;
  let data = { from: store.state.metaMask.account, address: CONTRACTS['defi'].address, abi: abis.value['defi'] };
  loadingHelper.show();
  metaMask.claimRewardByContract(data).then(() => {
    loadingHelper.hide();
  }).catch(err => {
    loadingHelper.hide();
  })
}
onMounted(() => {
  if (metaMask.isAvailable()) {
    getBalance('cosd')
    getBalance('sl')
    getBalance('club')
    getBalance('defi')
    getTranscationTime()
    getClubStatus()
    getReward()
  }
})
</script>