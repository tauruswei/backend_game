<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="menu-container" :class="!isCollapse ? 'open' : 'close'" :width="width">
        <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
          <img :src="require('../assets/img/logo.png')" />
          <span class="wtext-l">Chess Of Stars</span>
        </div>
        <el-menu class="menu" :default-active="$route.meta.route" :collapse="isCollapse" router>
          <el-menu-item index="/plat/dashboard">
            <el-icon>
              <Odometer />
            </el-icon>
            <span>Dashboard</span>
          </el-menu-item>
          <el-menu-item index="/plat/staking-rewards" v-if="$store.state.role==0">
            <el-icon>
              <MessageBox />
            </el-icon>
            <span>Staking Rewards</span>
          </el-menu-item>
          <el-menu-item index="/plat/promotion-rewards" v-if="$store.state.role==0">
            <el-icon>
              <Present />
            </el-icon>
            <span>Promotion Rewards</span>
          </el-menu-item>
          <el-menu-item index="/plat/blog" v-if="$store.state.role==0">
            <el-icon>
              <Memo />
            </el-icon>
            <span>Blog</span>
          </el-menu-item>
          <el-menu-item index="/plat/logs" v-if="$store.state.role==0">
            <el-icon>
              <Document />
            </el-icon>
            <span>Logs</span>
          </el-menu-item>
          <el-menu-item index="/plat/nfts" v-if="$store.state.role==1">
            <el-icon>
              <Coin />
            </el-icon>
            <span>NFTs</span>
          </el-menu-item>
          <el-menu-item index="/plat/staking" v-if="$store.state.role==1">
            <el-icon>
              <MessageBox />
            </el-icon>
            <span>Staking</span>
          </el-menu-item>
          <el-menu-item index="/setting/profile">
            <el-icon>
              <Setting />
            </el-icon>
            <span>Profile</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-row justify="space-between" style="height: 40px">
            <el-col :span="4">
              <el-icon class="el-icon--right header-icon" @click="change()">
                <Expand />
              </el-icon>
            </el-col>
            <el-col :span="20" style="text-align: right;">
              <div style="margin-top:5px;margin-right:10px;display:inline-block">
                <el-button :type="isConnected?'success':'primary'" @click="connectWallet" :disabled="isConnected?true:false" round>
                  <span v-if="!isConnected"><i class="fa fa-btc"></i>&nbsp;&nbsp;Connect Wallet</span>
                  <el-tooltip v-if="isConnected" placement="bottom" :content="$store.state.metaMask.account">
                    <span>
                      <el-icon>
                        <SuccessFilled />
                      </el-icon>
                      <b style="display:inline-block;vertical-align: top;font-weight:400">&nbsp;&nbsp;Connected</b>
                    </span>
                  </el-tooltip>
                </el-button>
              </div>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <el-avatar :size="32" :src="require('@/assets/img/avatar.jpg')" />
                  <span class="text-container">
                    {{ "&nbsp;&nbsp;" + $store.state.user.name }}
                    <el-icon class="el-icon--right">
                      <CaretBottom />
                    </el-icon>
                  </span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="profile">Profile</el-dropdown-item>
                    <el-dropdown-item command="password">Password</el-dropdown-item>
                    <el-dropdown-item divided command="logout">Sign Out</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="height:calc(100vh - 120px)">
          <router-view></router-view>
        </el-main>
        <el-footer style="overflow: hidden;border-top: 1px solid #e6e8eb;">
          <layout-footer></layout-footer>
        </el-footer>
      </el-container>
    </el-container>
    <el-dialog v-model="visible" title="Change Password" width="480px" destroy-on-close>
      <password-cont @close="visible = false"></password-cont>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { logout } from "../utils/logout";
import LayoutFooter from "./footer.vue"
import PasswordCont from "./password.vue";
import { MetaMask } from "@/utils/meta-mask";
const store = useStore();
const router = useRouter()
const isCollapse = ref(false);
const width = ref("240px");
const visible = ref(false);
const isConnected = ref(false)
function change() {
  isCollapse.value = !isCollapse.value;
  if (isCollapse.value) {
    width.value = "70px";
  } else {
    width.value = "240px";
  }
}
isConnected.value = computed(() => {
  return store.state.metaMask ? true : false
})

function handleCommand(command) {
  if (command == "logout") {
    logout();
    store.commit("removeToken")
    store.commit("setUser", '')
    store.commit("setRole", '')
    store.commit("setMetaMask", null)
  }
  if (command == 'password') visible.value = true;
  if (command == 'profile') router.push('/setting/profile')
}
function connectWallet() {
  let metaMask = new MetaMask();
  if (!isConnected.value) metaMask.connectMetaMask()
}
</script>
<style scoped>
/deep/ .el-avatar {
  box-shadow: 0 2px 8px 0 rgba(83, 102, 203, 0.4);
}
</style>
