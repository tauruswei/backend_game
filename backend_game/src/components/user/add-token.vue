<template>
  <div>
    <el-button type="danger" @click="open()" round>Add token to wallet</el-button>
    <el-dialog v-model="visible" title="Add to wallet manually" width="400px" destroy-on-close append-to-body>
      <el-row :gutter="5" style="margin-bottom:20px">
        <el-col :span="4">
          <span style="color:red">*</span>Contract Address
        </el-col>
        <el-col :span="20">
          <el-input v-model="address" style="width:100%" clearable required></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="4" style="margin-bottom:20px"><span style="color:red">*</span>Symbol</el-col>
        <el-col :span="20" style="margin-bottom:20px">
          <el-input v-model="symbol" style="width:100%" clearable required></el-input>
        </el-col>
        <el-col :span="4">Image url</el-col>
        <el-col :span="20">
          <el-input v-model="image" style="width:100%" clearable required></el-input>
        </el-col>
        <el-col :span="24" style="margin-top:15px">
          <el-button type="primary" @click="addToken()" style="width:100%">
            Sure
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref,getCurrentInstance } from "vue";
import { useStore } from "vuex"
import { loadingHelper } from "@/utils/loading";
const store = useStore()
let CONTRACTS = store.state.abi.contract;
const emit = defineEmits(['balance'])
const {proxy} = getCurrentInstance();
const metaMask = proxy.metaMask;
const address = ref("")
const symbol = ref("")
const image = ref('https://s3.ap-northeast-1.amazonaws.com/www.chessofstars.io/assets/img/favicon.ico')
const visible = ref(false)

async function open() {
  if (!metaMask.isAvailable()) return;
  visible.value = true
}
async function addToken() {
  if (!metaMask.isAvailable()) return;
  if(!address.value) {
    ElMessage.error("Contract address is required")
    return
  }
  if(!symbol.value) {
    ElMessage.error("Symbol is required")
    return
  }
  let param ={
        address: address.value,
        symbol: symbol.value,
        image: image.value||null
    }
    loadingHelper.show()
    await metaMask.watchAsset(param);
    loadingHelper.hide()
    visible.value = false
    await emit("balance");
}
</script>