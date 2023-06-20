<template>
  <div>
    <el-button type="danger" @click="open()" round>Add token to wallet</el-button>
    <el-dialog v-model="visible" title="Add to wallet" style="word-break: break-all;" width="480px" destroy-on-close append-to-body>
      <div style="padding:10px;margin:10px 0;border:1px solid #eee;border-radius:12px">
      <el-row :gutter="10">
        <el-col :span="14">
          <el-avatar :src="infos.cosd.image"></el-avatar>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" style="width:100%" @click="addToken(infos.cosd)" :disabled="$store.state.metaMask?false:true" round>Add to MetaMask</el-button>
        </el-col>
        <el-col :span="24">
          <span><b>Symbol:&nbsp;&nbsp;</b> {{ infos.cosd.symbol }}&nbsp;&nbsp;<i class="fa fa-copy" @click="copy(infos.cosd.symbol)"></i></span><br />
          <span><b>Address:&nbsp;</b> {{ infos.cosd.address }}&nbsp;&nbsp;<i class="fa fa-copy" @click="copy(infos.cosd.address)"></i></span><br />
          <span><b>Image:&nbsp;&nbsp;&nbsp;&nbsp;</b> {{ infos.cosd.image }}&nbsp;&nbsp;<i class="fa fa-copy" @click="copy(infos.cosd.image)"></i></span><br />
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
          <span><b>Symbol:&nbsp;&nbsp;</b> {{ infos.busd.symbol }}&nbsp;&nbsp;<i class="fa fa-copy" @click="copy(infos.busd.symbol)"></i></span><br />
          <span><b>Address:&nbsp;</b> {{ infos.busd.address }}&nbsp;&nbsp;<i class="fa fa-copy" @click="copy(infos.busd.address)"></i></span><br />
          <span><b>Image:&nbsp;&nbsp;&nbsp;&nbsp;</b> {{ infos.busd.image }}&nbsp;&nbsp;<i class="fa fa-copy" @click="copy(infos.busd.image)"></i></span><br />
        </el-col>
        
      </el-row>
    </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
import { useStore } from "vuex"
import { copyClick } from '@/utils/copy';
import { loadingHelper } from "@/utils/loading";
const store = useStore()
let CONTRACTS = store.state.abi.contract;
const emit = defineEmits(['balance'])
const { proxy } = getCurrentInstance();
const metaMask = proxy.metaMask;
const infos = ref({
  cosd:{
    symbol:"COSD1",
    address:CONTRACTS.cosd.address,
    image:CONTRACTS.cosd.image||"https://s3.ap-northeast-1.amazonaws.com/www.chessofstars.io/assets/img/crypto/cosd.png"
  },
  bnb:{
    symbol:"BNB",
    address:"",
    image:"https://s3.ap-northeast-1.amazonaws.com/www.chessofstars.io/assets/img/favicon.ico"
  },
  busd:{
    symbol:"BUSD",
    address:CONTRACTS.busd.address,
    image:CONTRACTS.busd.image||"https://s3.ap-northeast-1.amazonaws.com/www.chessofstars.io/assets/img/favicon.ico"
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
function copy(val){
  copyClick(val)
}
</script>
<style scoped>
.fa-copy{
  cursor: pointer;
  color:rgb(121, 121, 158)
}
</style>