<template>
  <div>
    <el-button type="danger" @click="open()" round>Add token to wallet</el-button>
    <el-dialog v-model="visible" title="Add to wallet" style="word-break: break-all;" width="480px" destroy-on-close append-to-body>
      <el-button type="success" style="width:100%" :disabled="$store.state.metaMask?false:true" @click="addTokens()" round>Add to MetaMask automatically</el-button>
      <hr />
      <p><b>Add to wallet manually</b></p>
      <!--<div style="padding:10px;margin:10px 0;border:1px solid #eee;border-radius:12px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-avatar :src="infos.bnb.image"></el-avatar>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" style="width:100%" @click="addToken(infos.bnb)" :disabled="$store.state.metaMask?false:true" round>Add to MetaMask</el-button>
          </el-col>
          <el-col :span="24">
            <span>Symbol: {{ infos.bnb.symbol }}</span><br />
            <span>Address: {{ infos.bnb.address }}</span><br />
            <span>Image: {{ infos.bnb.image }}</span><br />
          </el-col>
          
        </el-row>
      </div>-->
      <div style="padding:10px;margin:10px 0;border:1px solid #eee;border-radius:12px">
      <el-row :gutter="10">
        <el-col :span="14">
          <el-avatar :src="infos.cosd.image"></el-avatar>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" style="width:100%" @click="addToken(infos.cosd)" :disabled="$store.state.metaMask?false:true" round>Add to MetaMask</el-button>
        </el-col>
        <el-col :span="24">
          <span>Symbol: {{ infos.cosd.symbol }}</span><br />
          <span>Address: {{ infos.cosd.address }}</span><br />
          <span>Image: {{ infos.cosd.image }}</span><br />
        </el-col>
      </el-row>
    </div>
    <div style="padding:10px;border:1px solid #eee;border-radius:12px">
      <el-row :gutter="10">
        <el-col :span="14">
          <el-avatar :src="infos.busd.image"></el-avatar>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" style="width:100%" @click="addToken(infos.busd)" :disabled="$store.state.metaMask?false:true" round>Add to MetaMask</el-button>
        </el-col>
        <el-col :span="24">
          <span>Symbol: {{ infos.busd.symbol }}</span><br />
          <span>Address: {{ infos.busd.address }}</span><br />
          <span>Image: {{ infos.busd.image }}</span><br />
        </el-col>
        
      </el-row>
    </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
import { useStore } from "vuex"
import { loadingHelper } from "@/utils/loading";
const store = useStore()
let CONTRACTS = store.state.abi.contract;
const emit = defineEmits(['balance'])
const { proxy } = getCurrentInstance();
const metaMask = proxy.metaMask;
const infos = ref({
  cosd:{
    symbol:"COSD",
    address:CONTRACTS.cosd.address,
    image:"https://s3.ap-northeast-1.amazonaws.com/www.chessofstars.io/assets/img/favicon.ico"
  },
  bnb:{
    symbol:"BNB",
    address:"",
    image:"https://s3.ap-northeast-1.amazonaws.com/www.chessofstars.io/assets/img/favicon.ico"
  },
  busd:{
    symbol:"BUSD",
    address:CONTRACTS.busd.address,
    image:"https://s3.ap-northeast-1.amazonaws.com/www.chessofstars.io/assets/img/favicon.ico"
  }
})
const visible = ref(false)

async function open() {
  if (!metaMask.isAvailable()) return;
  visible.value = true
}
async function addToken(data) {
  if (!metaMask.isAvailable()) return;
  let param = {
    address: data.address,
    symbol: data.symbol,
    image: data.image || null
  }
  loadingHelper.show()
  await metaMask.watchAsset(param);
  loadingHelper.hide()
  await emit("balance");
}
async function addTokens(){
  await addToken(infos.value.cosd)
  await addToken(infos.value.busd)
  visible.value = false
}
</script>