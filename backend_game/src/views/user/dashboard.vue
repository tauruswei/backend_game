<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-warning card-header-icon">
              <div class="card-icon">
                <i class="fa fa-btc"></i>
              </div>
              <p class="card-category">COSD</p>
              <h3 class="card-title">{{ dashboard.cosd }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-btc"></i>&nbsp;All COSD staked for the game
                <!-- <a href="#pablo">Get More COSD...</a> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-warning card-header-icon">
              <div class="card-icon">
                <i class="fa fa-money"></i>
              </div>
              <p class="card-category">Evics</p>
              <h3 class="card-title">{{ dashboard.evics }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-money"></i>&nbsp;Evics earned in the game
                <!-- <a href="#pablo">Exchange to USDT</a> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <div class="card-icon">
                <i class="fa fa-ticket"></i>
              </div>
              <p class="card-category">NFTs</p>
              <h3 class="card-title">{{ dashboard.nft }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-ticket"></i>&nbsp;
                <a href="#pablo">Get More NFTs</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <div class="card-icon">
                <i class="fa fa-gamepad"></i>
              </div>
              <p class="card-category">Games played</p>
              <h3 class="card-title">{{ dashboard.games }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-gamepad"></i>&nbsp;
                <a href="#pablo">View games remaining</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="row for-channel-or-club">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="fa fa-sitemap"></i>
              </div>
              <p class="card-category">Clubs</p>
              <h3 class="card-title">{{ dashboard.clubs }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-sitemap"></i>&nbsp;All your clubs
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="fa fa-group"></i>
              </div>
              <p class="card-category">All Members</p>
              <h3 class="card-title">{{ dashboard.members }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-group"></i>&nbsp;All members in your clubs
              </div>
            </div>
          </div>
        </div>
      </div>-->
      <div class="card">
        <div style="display:flex;align-items: center;justify-content: space-between;padding:10px;">
          <div>Current Evics: <b>{{ dashboard.evics }}</b></div>
          <div>
            <el-button type="primary" @click="open('buy')" round>Purchase</el-button>
            <el-button type='success' style="margin-left:10px;" :disabled="!dashboard.evics" @click="open('withdraw')" round>Withdraw</el-button>
          </div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex;align-items: center;justify-content: space-between;padding:10px;">
          <div>Current COSD: <b>{{ dashboard.cosd }}</b></div>
          <div>
            <purchase-cosd @balance="getBalance('cosd')"></purchase-cosd>
          </div>
        </div>
      </div>

    </div>
    <el-dialog v-model="visible" :title="action.title" width="400px" destroy-on-close>
      <el-alert title="TIP: 1 USDT = 100 EVIC" type="info" style="margin-bottom:20px"></el-alert>
      <el-row :gutter="10">
        <el-col :span="6">EVIC</el-col>
        <el-col :span="18">
          <el-input-number v-model.number="amount1" controls-position="right" :step="100" :min="min" :max="max" style="width:100%" @change="translate('evic')" clearable></el-input-number>
        </el-col>
        <el-col :span="6" style="margin-top:10px">USDT</el-col>
        <el-col :span="18" style="margin-top:10px">
          <el-input-number v-model.number="amount" controls-position="right" :step="1" :min="min/100" :max="max/100" style="width:100%" @change="translate('usdt')" clearable></el-input-number>
        </el-col>
        <el-col :span="24" style="margin-top:30px;">
          <el-button type="success" style="width:100%" @click="handleOperate">{{ action.btn }}</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>

</template>
 <script setup>
import { ref, onMounted } from 'vue'
import { useStore } from "vuex";
import cosdToken from "@/abi/cosdtoken.json";
import nftToken from "@/abi/nft.json";
import busdToken from "@/abi/busdtoken.json";
import { CONTRACTS, MetaMask, ASSETTYPE, TXTYPE, savaAfterTranscation } from "@/utils/meta-mask";
import { evicsApi } from '@/api/request';
import { loadingHelper } from "@/utils/loading";
import PurchaseCosd from "@/components/purchase-cosd.vue";
const store = useStore();
const dashboard = ref({ cosd: 0, nft: 0, games: 1, evics: 0 })
const metaMask = new MetaMask();
const abis = ref({ cosd: cosdToken, nft: nftToken, busd: busdToken })
const amount = ref(0)
const amount1 = ref(0)
const visible = ref(false)
const action = ref({ title: "", btn: "" })
const max = ref(Infinity)
const min = ref(100)
function isEmpty() {
  if (!amount.value) {
    ElMessage.error("amount is required!")
  }
  return amount.value ? false : true;
}
function translate(type) {
  let rate = 100;
  if (type == 'evic') {
    amount.value = amount1.value / rate;
  } else if (type == 'usdt') {
    amount1.value = amount.value * rate;
  }
}
function evicBalance() {
  let data = {
    "userId": store.state.user.id,
    "assetType": 3
  }
  evicsApi.data(data).then(res => {
    if (res.code == 0) dashboard.value.evics = res.data.amount
  })
}
function getBalance(key) {
  let data = {
    abi: abis.value[key],
    address: CONTRACTS[key].address,
    from: store.state.metaMask.account,
    key: key
  }
  metaMask.getBalanceByContract(data).then(res => {
    dashboard.value[key] = Math.round((res) * 1000) / 1000;
  });
}
function open(command) {
  if (!metaMask.isAvailable()) return;
  action.value = {
    btn: command == 'buy' ? 'Buy' : "Withdraw",
    title: "Evics Transcation",
    command: command
  }
  openHandler[command];
  visible.value = true;
}
function handleOperate() {
  evicHandler[action.value.command]
}
const openHandler = {
  withdraw: () => {
    max.value = dashboard.value.evics;
    min.value = 1000;
    if (dashboard.value.evics < 1000) {
      ElMessage.warning("Lower limit of withdrawal 1000 evic!");
      return;
    }
    amount.value = 10;
    amount1.value = 1000;
  },
  buy: () => {
    max.value = Infinity
    min.value = 100
    amount.value = 1;
    amount1.value = 100;
  }
}
const evicHandler = {
  buy: () => {
    if (!metaMask.isAvailable()) return;
    if (isEmpty()) return;
    let data = {
      from: store.state.metaMask.account,
      to: CONTRACTS['evic'].address,
      address: CONTRACTS["busd"].address,
      money: amount.value,
      abi: abis.value.busd
    }
    loadingHelper.show()
    metaMask.transferEvicByContract(data).then((res) => {
      visible.value = false;
      loadingHelper.hide();
      let param = {
        "txId": res.transactionHash,
        "transType": TXTYPE.evic,
        "fromUserId": store.state.user.id,
        "fromAssetType": ASSETTYPE.usdt,
        "fromAmount": amount.value,
        "toUserId": store.state.user.id,
        "toAssetType": ASSETTYPE.evic,
        "toAmount": amount1.value,
        "nftVo": {},
      }
      savaAfterTranscation(param)
      dashboard.value.evics = dashboard.value.evics + amount.value * 100;
    }).catch(err => {
      loadingHelper.hide();
    })
  },
  withdraw: () => {
    if (!amount1.value) return;
    if (amount1.value > dashboard.value.evics) {
      ElMessage.error("cannot exceed the balance!")
      return
    }
    let param = {
      "transType": TXTYPE.evic1,
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE.evic,
      "fromAmount": 0 - amount1.value,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE.usdt,
      "toAmount": 0 - amount.value,
      "nftVo": {}
    }
    loadingHelper.show()
    evicsApi.withdraw(param).then((res) => {
      visible.value = false;
      loadingHelper.hide();
      ElNotification({ type: "success", message: "it will take a few minutes,please refresh later" })
      dashboard.value.evics = dashboard.value.evics - amount1.value;
    }).catch(err => {
      loadingHelper.hide();
    })
  }
}

onMounted(() => {
  evicBalance()
  if (metaMask.isAvailable()) {
    getBalance('cosd')
    getBalance('nft')
  }
})
 </script>