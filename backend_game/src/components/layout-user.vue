<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="menu-container" :class="!isCollapse ? 'open' : 'close'" :width="width">
        <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
          <img :src="require('@/assets/img/logo.webp')" />
          <span class="wtext-l">Chess Of Stars</span>
        </div>
        <el-menu class="menu" :default-active="$route.meta.route" :collapse="isCollapse" router>
          <el-menu-item index="/plat/assets" v-if="$store.state.role != 3">
            <i class="fa fa-dashboard"></i>
            <span>Assets</span>
          </el-menu-item>
          <el-menu-item index="/setting/profile" v-if="$store.state.role == 3">
            <i class="fa fa-user"></i>
            <span>Profile</span>
          </el-menu-item>
          <el-menu-item index="/admin/home" v-if="$store.state.role == 3">
            <i class="fa fa-dashboard"></i>
            <span>Dashboard</span>
          </el-menu-item>
          <el-menu-item index="/admin/staking-rewards" v-if="$store.state.role == 3">
            <i class="fa fa-hdd-o"></i>
            <span>Staking Rewards</span>
          </el-menu-item>
          <el-menu-item index="/admin/promotion-rewards" v-if="$store.state.role == 3">
            <i class="fa fa-share-alt"></i>
            <span>Promotion Rewards</span>
          </el-menu-item>
          <el-menu-item index="/admin/blog" v-if="$store.state.role == 3">
            <i class="fa fa-file-image-o"></i>
            <span>Blog</span>
          </el-menu-item>
          <el-menu-item index="/admin/logs" v-if="$store.state.role == 3">
            <i class="fa fa-file-text-o"></i>
            <span>Logs</span>
          </el-menu-item>
          <el-menu-item index="/plat/nfts" v-if="$store.state.role == 2||$store.state.role == 1">
            <i class="fa fa-ticket"></i>
            <span>NFTs</span>
          </el-menu-item>
          <el-menu-item index="/plat/staking" v-if="$store.state.role == 2||$store.state.role == 1">
            <i class="fa fa-hdd-o"></i>
            <span>Staking</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-row justify="space-between" style="height: 40px">
            <el-col :span="4">
              <i class="el-icon--right header-icon fa fa-navicon" @click="change()"></i>
            </el-col>
            <el-col :span="20" style="text-align: right;">
              <div style="margin-top:5px;margin-right:10px;display:inline-block" v-if="$store.state.role !== 3">
                <metamask-connect></metamask-connect>
                <!---->
                <el-tooltip placement="bottom" content="Invite to be channel Leader" v-if="$store.state.role == 1">
                  <el-button type="success" @click="inviteHandler()" round>
                    <i class="fa fa-link"></i>&nbsp;Invite
                  </el-button>
                </el-tooltip>
              </div>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <el-avatar :size="32" :src="require('@/assets/img/avatar.webp')" />
                  <span class="text-container">
                    {{ "&nbsp;&nbsp;" + ($store.state.user?$store.state.user.name:'user') }}
                    <i class="el-icon--right fa fa-caret-down"></i>
                  </span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="profile">Profile</el-dropdown-item>
                    <el-dropdown-item command="password">Change Password</el-dropdown-item>
                    <el-dropdown-item command="email">Change Email</el-dropdown-item>
                    <el-dropdown-item divided command="logout">Sign Out</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="height:calc(100vh - 120px)">
          <router-view />
        </el-main>
        <el-footer style="overflow: hidden;border-top: 1px solid #e6e8eb;">
          <layout-footer></layout-footer>
        </el-footer>
      </el-container>
    </el-container>
    <el-dialog v-model="visible" title="Change Password" width="480px" destroy-on-close>
      <password-cont @close="()=>{visible = false}"></password-cont>
    </el-dialog>
    <el-dialog v-model="visible1" title="Change Email" width="480px" destroy-on-close>
      <email-cont @close="closeemail"></email-cont>
    </el-dialog>
    <el-dialog v-model="inviteVisible" title="Welcome to Chess of stars" width="440px">
      <qcode-cont :id="inviterId" style="width:100%;text-align: center;"></qcode-cont>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
import {useStore} from "vuex";
import { useRouter } from "vue-router"
import LayoutFooter from "@/components/footer.vue"
import PasswordCont from "@/components/userAdmin/password.vue";
import EmailCont from "@/components/userAdmin/reset-email.vue";
import QcodeCont from "@/components/qcode.vue";
import MetamaskConnect from "@/components/metamask.vue";
import { userApi } from "@/api/request"
const router = useRouter()
const store = useStore()
const { proxy } = getCurrentInstance();
const metaMask = proxy.metaMask;
const isCollapse = ref(false);
const width = ref("240px");
const visible = ref(false);
const visible1 = ref(false);
const inviteVisible = ref(false)
const inviterId = ref();
function change() {
  isCollapse.value = !isCollapse.value;
  if (isCollapse.value) {
    width.value = "70px";
  } else {
    width.value = "240px";
  }
}
function handleCommand(command) {
  if (command == "logout") {
    metaMask.disconnect();
    router.push("/login")
  }
  if (command == 'password') visible.value = true;
  if (command == 'email') visible1.value = true;
  if (command == 'profile') router.push('/setting/profile')
}
function closeemail() {
  visible1.value = false
}
function inviteHandler() {
  if (!store.state.metaMask?.account) {
    ElMessage.error("You have not connected the wallet!")
    return;
  }
  let data = {
    walletAddress: store.state.metaMask?.account
  }
  userApi.channelLeader(data).then(res => {
    if (res.code == 0) {
      inviterId.value = res.data;
      inviteVisible.value = true;
    }
  })
}
</script>
<style scoped>
:deep(.el-avatar) {
  box-shadow: 0 2px 8px 0 rgba(83, 102, 203, 0.4);
}
</style>
