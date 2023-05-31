<template>
  <div>
    <qrcode-vue :value='url' :size='size' id="qcode"></qrcode-vue>
    <br/>
    <p>share the image to invite user</p>
    <el-button type="primary" @click="download()" id="download" round>Download</el-button>
  </div>
</template>
<script setup>
import QrcodeVue from 'qrcode.vue'
import { useStore } from "vuex"
import { ElMessage } from "element-plus";
import { ref,defineProps,watch } from "vue"
const store = useStore();
const props = defineProps({
  id: {
    type: Number
  }
})
const inviteId = ref(store.state.user.id)
watch(()=>props.id,(val)=>{
  if(val) {
    inviteId.value = val;
    url.value = process.env.VUE_APP_MODE == "development"?(window.location.protocol+window.location.host+'/register?id=' + inviteId.value):process.env.VUE_APP_LOCAL
  }
},{immediate:true})

const url = ref(null)
url.value = process.env.VUE_APP_MODE == "development"?(window.location.protocol+window.location.host+'/register?id=' + inviteId.value):process.env.VUE_APP_LOCAL
const size = ref(240)
function download() {
  //获取canvas标签
  let canvas = document.getElementById('qcode').getElementsByTagName('canvas')
  //创建a标签
  let a = document.createElement('a')
  //获取二维码的url并赋值为a.href
  a.href = canvas[0].toDataURL('img/png')
  //设置下载文件的名字
  a.download = 'chessofstars_invite'
  //点击事件，相当于下载
  a.click()
  //提示信息
  ElMessage.warning('loading...')
}
</script>