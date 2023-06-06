<template>
      <w3m-core-button />
</template>
<script setup>
import { getCurrentInstance } from 'vue'
import { useStore } from "vuex"
const { proxy } = getCurrentInstance() 
import { watchAccount, watchNetwork } from '@wagmi/core'
import { ElMessage } from 'element-plus';
const store = useStore();
const modal = proxy.web3ModalManager.initModal();
const onModal = () => {
  modal.openModal()
}
watchAccount((account) => {
  if (!store.state.user) return;
  proxy.web3ModalManager.account = account;
  if(account.address) {
    store.commit("setMetaMask", { ...store.state.metaMask, account: account.address })
    proxy.web3ModalManager.isCurrentAccount()
  }else store.commit("setMetaMask", null)
  
})

watchNetwork((network) => {
  if (!store.state.user) return;
  proxy.web3ModalManager.network = network;
  if(network.chain){
    store.commit("setMetaMask", { ...store.state.metaMask, chainID: network.chain.id, chainName: network.chain.name })
  }
})
</script>

