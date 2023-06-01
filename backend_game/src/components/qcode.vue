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
const inviterId = ref(store.state.user.id)
watch(()=>props.id,(val)=>{
  if(val) {
    inviterId.value = val;
    url.value = process.env.VUE_APP_MODE == "development"?(window.location.protocol+window.location.host+'/register?id=' + inviterId.value):process.env.VUE_APP_LOCAL
  }
},{immediate:true})

const url = ref(null)
url.value = process.env.VUE_APP_MODE == "development"?(window.location.protocol+window.location.host+'/register?id=' + inviterId.value):process.env.VUE_APP_LOCAL
const size = ref(240)
function download() {
  let canvas = document.getElementById('qcode').getElementsByTagName('canvas')
  let a = document.createElement('a')
  a.href = canvas[0].toDataURL('img/png')
  a.download = 'chessofstars_invite'
  a.click()
  ElMessage.warning('loading...')
}
</script>
