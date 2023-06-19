<template>
  <el-button style="width:100%" @click="getVerifyCode" type="primary" :disabled="btndisabled" plain>
    <span v-if="!btndisabled">{{sendBtnText}}</span>
    <span v-if="btndisabled">{{ time }}</span>
  </el-button>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, onBeforeUnmount, watch } from 'vue';
import { userApi } from "@/api/request";
const sendBtnText = ref("Send");
const btndisabled = ref(false);
const emailValue = ref()
const props = defineProps({
  email: { type: String }
})
const emit = defineEmits(['send'])
const time = ref(0);
let gen = null;
let timer = null;
watch(() => props.email, (val) => {
  if (!val) {
    return;
  }
  emailValue.value = val
}, { immediate: true })
//生成器
function* genTime(num) {
  let second = num;
  while (true) {
    second -= 1;
    if (second === -1) {
      clear()
    }
    yield `${second} s`;
  }
}
function getVerifyCode() {
  if (!emailValue.value) {
    ElMessage.error("Email is required")
    return;
  }
  emit("send",true);
  sendBtnText.value = "Sending..."
  userApi.code({ email: emailValue.value }).then(res => {
    if (res.code == 0) {
      ElNotification({
        type: "success",
        message: "The verification code has been sent to your email!",
      });

      btndisabled.value = true;
      time.value = res.data;
      if (timer) clearInterval(timer);
      gen = genTime(time.value);
      timer = setInterval(() => {
        time.value = gen.next().value;
      })
    }else{
      emit("send",false);
    }
    sendBtnText.value = "Send"
  })
}
function clear() {
  clearInterval(timer);
  gen = null;
  btndisabled.value = false;
  emit("send",false);
}
onBeforeUnmount(() => {
  clear()
})
  </script>