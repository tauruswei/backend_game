<template>
  <div class="login-bg">
    <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
      <img :src="require('@/assets/img/logo.png')" />
      <span class="wtext-l">Chess Of Stars</span>
    </div>
    <div class="login-box">
      <h3 class="title-des wtext-xl">To Be Channel Leader !</h3>
      <p class="text-muted"><small>Enter your wallet Address</small></p>
      <div style="text-align: left;">
        <label>wallet address</label>
        <el-input v-model="walletAddress" clearable></el-input>
        <el-button type="primary" class="w-100 shadow" style="margin:30px 0 0" @click="submit()">Submit</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { userApi } from "@/api/request";
import { AppHelper } from "@/utils/helper";
import { ElMessage, ElNotification } from "element-plus";

const walletAddress = ref("")
function submit() {
  if (!walletAddress.value) {
    ElMessage.error("Wallet address is required!")
    return;
  }
  let data = {
    inviteId: AppHelper.getURLParam('id'),
    walletAddress: walletAddress.value
  }
  userApi.channel(data).then(res => {
    console.log(res)
    if (res.code == 0) {
      ElNotification({
        type: "success",
        message: "Congratulations! You have been a channel leader"
      })
    }
  })
}
</script>