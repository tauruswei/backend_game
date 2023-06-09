<template>
  <div class="login-bg">
    <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
      <img :src="require('@/assets/img/logo.webp')" />
      <span class="wtext-l">Chess Of Stars</span>
    </div>
    <div class="login-box">
      <h3 class="title-des wtext-xl">Channel Leader !</h3>
      <p class="text-muted"><small>Enter your wallet Address</small></p>
      <div style="text-align: left;">
        <label>wallet address</label>
        <el-input v-model="walletAddress" clearable></el-input>
        <el-button type="primary" class="w-100 shadow" style="margin:30px 0 0" @click="submit()">Generate Qrcode</el-button>
      </div>
    </div>
    <el-dialog v-model="inviteVisible" title="Welcome to Chess of stars" width="440px">
      <qcode-cont style="width:100%;text-align: center;" :id="inviterId"></qcode-cont>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import QcodeCont from "@/components/qcode.vue";
import { userApi } from "@/api/request";

const walletAddress = ref("")
const inviteVisible = ref(false)
const inviterId = ref();
function submit() {
  if (!walletAddress.value) {
    ElMessage.error("Wallet address is required!")
    return;
  }
  let data = {
    walletAddress: walletAddress.value
  }
  userApi.channelLeader(data).then(res => {
    if (res.code == 0) {
      inviterId.value = res.data;
      inviteVisible.value = true;
    }
  })
}
</script>
