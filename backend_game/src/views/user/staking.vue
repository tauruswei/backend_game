<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <!--Purchase cosd-->
        <div class="card" style="margin-bottom:0;margin-top:10px">
          <div class="card-header" style="display:flex;align-items: center;justify-content: space-between;padding:10px;">
            <div>Current COSD: <b>{{ balance.cosd }}</b></div>
            <div>
              <purchase-cosd @balance="getBalance('cosd')"></purchase-cosd>
            </div>
          </div>
        </div>
        <div class="card" style="margin-top:15px">
          <div class="card-header ">
            <h4 class="card-title">COSD Staking
              <small class="description">Please choose purpose</small>
            </h4>
          </div>
          <div class="card-body ">
            <el-alert type="warning" style="margin-bottom:20px" title="Reminder: BSC(Binance smart chain) chain supported only, we'll support various chains soon."></el-alert>
            <div class="row">
              <div class="col-md-3">
                <ul class="nav nav-pills nav-pills-warning nav-pills-icons flex-column" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link" :class="active=='sl'?' active show':''" data-toggle="tab" @click="handleClick('sl')" role="tablist">
                      <i class="fa fa-connectdevelop"></i> Staking for <br />starlight league
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
                          <i class="fa fa-connectdevelop"></i>
                        </div>
                        <p class="card-category">Current staking COSD</p>
                        <h3 class="card-title">{{ balance.sl }}</h3>
                        <span class="badge badge-pill" :class="balance.sl<400?' badge-default':' badge-success'">Starlight League Unqualified</span>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="fa fa-cubes"></i>&nbsp;Staking pool contract address:&nbsp;&nbsp;
                          <a href="javascript:void(0);">{{contracts.sl.address}}</a>
                        </div>
                      </div>
                    </div>
                    <div class="card card-pricing card-raised for-unqualified">
                      <div class="card-body">
                        <div class="card-icon icon-rose">
                          <i class="fa fa-connectdevelop"></i>
                        </div>
                        <h3 class="card-title" style="color: rgb(188, 0, 0);font-weight:bold;"> 400 COSD = 20 USDT</h3>
                        <div style="font-weight: bold;color:rgb(66, 66, 66);">
                          <span style="text-decoration:line-through!important;">1980 COSD = 99 USDT</span>&nbsp;&nbsp;Limited time discount
                        </div>
                        <p class="card-description">
                          You need to stake 400 COSD (equivalent to 20 USDT) to get a qualification for Starlight League.
                        </p>
                        <button class="btn btn-rose btn-round" @click="open('slstaking')">Stake</button>
                        <button class="btn btn-warning btn-round" v-if="balance.sl" @click="open('slunstaking')">Stop staking</button>
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
                          <a href="javascript:void(0);">{{contracts.club.address}}</a>
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
                        <el-popover placement="top" :width="300" effect="dark" trigger="hover">
                          <template #reference>
                            <p>Activity Rules: <i class="fa fa-question-circle"></i></p>
                          </template>
                          <div style="letter-spacing: .01em;line-height: 1;">
                            <h4 style="padding-bottom: 15px;">Activity Rules</h4>
                            <p><span style="display:inline-block;width:140px">Activity Start Time: </span>{{ stakeStartTime.defi?.time }}</p>
                            <p><span style="display:inline-block;width:140px">Lockup Period: </span>90 Days</p>
                            <p><span style="display:inline-block;width:140px">Amount: </span>at latest 4000 cosd</p>
                          </div>
                        </el-popover>
                        <a href="javascript:void(0);" class="btn btn-rose btn-round" @click="open('clubstaking')">Stake</a>
                        <button class="btn btn-warning btn-round" v-if="balance.club" @click="open('clubunstaking')">Stop staking</button>
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
                          <a href="javascript:void(0);">{{contracts.defi.address}}</a>
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
                        <el-popover placement="top" effect="dark" :width="300" trigger="hover">
                          <template #reference>
                            <p>Activity Rules: <i class="fa fa-question-circle"></i></p>
                          </template>
                          <div style="letter-spacing: .01em;line-height: 1;">
                            <h4 style="padding-bottom: 15px;">Activity Rules</h4>
                            <p><span style="display:inline-block;width:140px">Activity Start Time: </span>{{ stakeStartTime.defi?.time }}</p>
                            <p><span style="display:inline-block;width:140px">Lockup Period: </span>90 Days</p>
                            <p><span style="display:inline-block;width:140px">Annualized Return: </span>11%</p>
                          </div>
                        </el-popover>
                        <button class="btn btn-rose btn-round" @click="open('defistaking')">Stake</button>
                      </div>
                    </div>
                    <div class="card card-pricing card-raised for-cosd-unstaked" v-if="balance.defi||reward">
                      <div class="card-body">
                        <div class="card-icon icon-rose">
                          <i class="fa fa-line-chart"></i>
                        </div>
                        <h3 class="card-title"> <el-tooltip placement="top" :content="reward+''"><b>{{ Math.round((reward) * 1000) / 1000 }}</b></el-tooltip> COSD will be rewarded</h3>
                        <p class="card-description">
                          Retain 3 decimal places
                        </p>
                        <button class="btn btn-warning btn-round" v-if="balance.defi" @click="open('defiunstaking')">Stop staking</button>
                        <button class="btn btn-success btn-round" v-if="reward" @click="claimReward()">Claim rewards</button>
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
    <!--Staking && UnStaking-->
    <el-dialog v-model="visible" :title="action.title" width="400px" destroy-on-close>
      <el-row :gutter="5">
        <el-col :span="4">
          AMOUNT
        </el-col>
        <el-col :span="20">
          <el-input-number v-model.number="action.amount" controls-position="right" :step="1" :min="min.value" :max="100000" placeholder="`set amount" style="width:100%" clearable></el-input-number>
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
import { ref, onMounted, getCurrentInstance,computed } from "vue"
import { useStore } from "vuex"
import buyToken from "@/abi/buytoken.json";
import cosdToken from "@/abi/cosdtoken.json";
import busdApprove from "@/abi/busdtoken.json";
import slStaking from "@/abi/slStaking.json";
import clubStaking from "@/abi/clubStaking.json";
import defiStaking from "@/abi/stakingPool.json";
import { DateHelper } from "@/utils/helper";
import { loadingHelper } from "@/utils/loading";
import { CONTRACTS, ASSETTYPE, TXTYPE, POOL, savaAfterTranscation } from "@/utils/meta-mask";
import { cosdApi } from "@/api/request";
import PurchaseCosd from "@/components/purchase-cosd.vue";
const store = useStore();
const active = ref("sl");
const balance = ref({
  cosd: 0,
  sl: 0, club: 0, defi: 0
});
const action = ref({
  amount1: 20,
  amount: 1,
  title: '',
  command: ''
});
const contracts = ref(CONTRACTS)
const abis = ref({ sl: slStaking, club: clubStaking, defi: defiStaking, buy: buyToken, cosd: cosdToken, busd: busdApprove })
const titles = ref({ buy: "Purchase COSD", "slstaking": "Staking for starlight league", "clubstaking": "Staking for club ownership", "defistaking": "Staking for earning COSD" })
const visible = ref(false)
const isClubBoss = ref(false)
const needApprove = ref(true);
const { proxy } = getCurrentInstance();
const metaMask = proxy.metaMask;
const disabled = ref(false)
const reward = ref(0)
const buttonText = ref('Stake')
const min = ref(1)
const stakeStartTime = ref({ club: {}, defi: {} })
function handleClick(tab) {
  active.value = tab;
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
function getRewardBalance() {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value['defi'],
    address: CONTRACTS['defi'].address,
    from: store.state.metaMask.account
  }
  metaMask.getRewardByContract(data).then(res => {
    reward.value = res
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
    if (res) store.commit("setRole", 1)
    else store.commit("setRole", 2)
  });
}
function getStakeStartTime(key) {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value[key],
    address: CONTRACTS[key].address,
    from: store.state.metaMask.account
  }
  metaMask.getStakeStartTimeByContract(data).then(res => {
    stakeStartTime.value[key] = { time: DateHelper.toString(res * 1000), origin: res * 1000 }
  });
}
async function open(command) {
  if (!metaMask.isAvailable()) return;
  action.value = {
    amount1: 20,
    amount: 1,
    title: titles.value[command],
    command: command
  }
  disabled.value = false;
  min.value = 1;
  openHandler[command]();
}
const openHandler = {
  slstaking: () => {
    action.value.amount = 400;
    needApprove.value = true;
    buttonText.value = "Stake";
    min.value = 400;
    visible.value = true
  },
  clubstaking: () => {
    action.value.amount = 4000;
    needApprove.value = true;
    buttonText.value = "Stake";
    min.value = 4000;
    visible.value = true
  },
  defistaking: () => {
    action.value.amount = 1;
    needApprove.value = true;
    buttonText.value = "Stake";
    min.value = 1;
    visible.value = true
  },
  slunstaking: () => {
    action.value.amount = balance.value['sl'];
    needApprove.value = false
    buttonText.value = "Unstake"
    disabled.value = true;
    visible.value = true
  },
  clubunstaking: () => {
    action.value.amount = balance.value['club'];
    needApprove.value = false
    buttonText.value = "Unstake"
    disabled.value = true;
    visible.value = true
  },
  defiunstaking: () => {
    action.value.amount = balance.value['defi'];
    needApprove.value = false
    buttonText.value = "Unstake"
    disabled.value = true;
    visible.value = true
  }
}
const approveHandler = {
  slstaking: stakingApprove.bind(this, 'sl'),
  clubstaking: stakingApprove.bind(this, 'club'),
  defistaking: stakingApprove.bind(this, 'defi')
}
const transferHandler = {
  slstaking: stakingTransfer.bind(this, 'sl'),
  clubstaking: stakingTransfer.bind(this, 'club'),
  defistaking: stakingTransfer.bind(this, 'defi'),
  slunstaking: unstakingTransfer.bind(this, 'sl'),
  clubunstaking: unstakingTransfer.bind(this, 'club'),
  defiunstaking: unstakingTransfer.bind(this, 'defi')
}
function handleApproveOperate() {
  approveHandler[action.value.command]();
}
function handleTransferOperate() {
  transferHandler[action.value.command]();
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
async function getStakeTime(key) {
  let data = {
    poolId: POOL[key]
  };
  let ret;
  await cosdApi.checkTime(data).then((res => {
    if (res.code == 0) ret = res.data
  }))
  return ret
}
async function getUnstakeTime(key) {
  let data = {
    userId: store.state.user.id,
    poolId: POOL[key]
  }
  let ret;
  await cosdApi.checkTimeun(data).then((res => {
    if (res.code == 0) ret = res.data.flag
  }))
  return ret
}
async function isStakeTimeAvailable(key) {
  let ret = false;
  ret = await getStakeTime(key)
  if (!ret) ElMessage.error("Not exceeding the specified time limit!")
  return ret
}
async function isUnStakeTimeAvailable(key) {
  let ret = false;
  ret = await getUnstakeTime(key)
  if (!ret) ElMessage.error("Not exceeding the specified time limit!")
  return ret
}
async function stakingApprove(key) {
  let isTimeAvailable = await isStakeTimeAvailable(key)
  if (key != 'sl' && !isTimeAvailable) return;
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
function stakingTransfer(key) {
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
      "toAssetType": ASSETTYPE.cosd,
      "toAmount": action.value.amount,
      "nftVo": {},
      "poolId": POOL[key],
      "blockNumber": res.blockNumber
    }
    savaAfterTranscation(param)
    getBalance(key);
    getBalance('cosd');
    if (key == 'club') getClubStatus()
    if (key == 'defi') { getRewardBalance() }
  }).catch(err => {
    loadingHelper.hide();
  })
}
async function unstakingTransfer(key) {
  let isTimeAvailable = await isUnStakeTimeAvailable(key);
  if (key !== 'sl' && !isTimeAvailable) return;
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
      "fromAssetType": ASSETTYPE.cosd,
      "fromAmount": 0 - action.value.amount,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE.cosd,
      "toAmount": 0 - action.value.amount,
      "nftVo": {},
      "poolId": POOL[key],
      "blockNumber": res.blockNumber
    }
    savaAfterTranscation(param)
    if (key == 'defi') { getRewardBalance() }
    loadingHelper.hide();
    getBalance(key);
    getBalance('cosd');
    if (key == 'club') getClubStatus()
  }).catch(err => {
    console.log(err)
    loadingHelper.hide();
  })
}
async function claimReward() {
  let isTimeAvailable = await isUnStakeTimeAvailable('defi');
  if (!isTimeAvailable) return;
  if (!metaMask.isAvailable()) return;
  let data = { from: store.state.metaMask.account, address: CONTRACTS['defi'].address, abi: abis.value['defi'] };
  loadingHelper.show();
  metaMask.claimRewardByContract(data).then(() => {
    loadingHelper.hide();
  }).catch(err => {
    loadingHelper.hide();
  })
}
function refresh() {
  getBalance('cosd')
  getBalance('sl')
  getBalance('club')
  getBalance('defi')
  getStakeStartTime('club')
  getStakeStartTime('defi')
  getClubStatus()
  getRewardBalance()
}
onMounted(() => {
  if (metaMask.isAvailable()) {
    refresh()
  }
})
</script>