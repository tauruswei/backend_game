<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row" v-if="$store.state.role == 0||$store.state.role == 1||$store.state.role == 2">
        <div class="col-md-8">
          <div class="row">
            <div class="card">
              <div class="card-header card-header-icon card-header-warning">
                <div class="card-icon">
                  <i class="fa fa-user"></i>My Profile
                </div>
                <h4 class="card-title"> -
                  <small class="category">View or edit your profile</small>
                </h4>
              </div>
              <div class="card-body">
                <div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="bmd-label-floating">Nick Name</label>
                        <input type="text" class="form-control" v-model="userData.name" readonly>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="bmd-label-floating">Wallet Adress</label>
                        <div class="input-group no-border">
                          <input type="text" class="form-control" v-model="userData.wallet_address" readonly>
                          <button class="btn btn-sm btn-warning btn-round btn-just-icon" @click="getAddress" title="get current wallet address">
                            <i class="fa fa-level-down"></i>
                          </button>
                          <a class="btn btn-sm btn-info btn-round btn-just-icon" :href="url?`${url}address/${userData.wallet_address}`:'javascript:void(0);'" :target="url?'_blank':null" title="View address on blockchain">
                            <i class="fa fa-external-link"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-warning pull-right" @click="updateInfo()"><i class="fa fa-edit"></i>&nbsp;&nbsp;Update</button>
                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-profile for-channel-only" v-if="$store.state.role == 0">
            <div class="card-avatar">
              <a href="#pablo">
                <img class="img" :src="require('@/assets/img/channel-providers.webp')" />
              </a>
            </div>
            <div class="card-body">
              <h6 class="card-category text-gray">Role in community</h6>
              <h4 class="card-title">Channel provider (1% commission)</h4>
              <p class="card-description">
                As a channel provider, you are responsible for the promotion and publicity of the game, and you have the right to build multiple clubs.
              </p>
              <a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a>
            </div>
          </div>

          <div class="card card-profile for-clubadmin-only" v-if="$store.state.role == 1">
            <div class="card-avatar">
              <a href="#pablo">
                <img class="img" :src="require('@/assets/img/club-admin.webp')" />
              </a>
            </div>
            <div class="card-body">
              <h6 class="card-category text-gray">Role in community</h6>
              <h4 class="card-title">Club Administrator (5% commission)</h4>
              <p class="card-description">
                Each club has its own administrator who is responsible for managing members, competitions, and training within the club.
              </p>
              <a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a>
            </div>
          </div>

          <div class="card card-profile for-clubmember-only" v-if="$store.state.role == 2">
            <div class="card-avatar">
              <a href="#pablo">
                <img class="img" :src="require('@/assets/img/club-member.webp')" />
              </a>
            </div>
            <div class="card-body">
              <h6 class="card-category text-gray">Role in community</h6>
              <h4 class="card-title">Club member (No commission)</h4>
              <p class="card-description">
                Play games under the agreement of a club.
              </p>
              <a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="$store.state.role == 3">
        <div class="col-md-8">
          <div class="row">
            <div class="card">
              <div class="card-header card-header-icon card-header-warning">
                <div class="card-icon">
                  <i class="fa fa-user"></i>My Profile
                </div>
                <h4 class="card-title"> -
                  <small class="category">View or edit your profile</small>
                </h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="bmd-label-floating">Email address</label>
                        <input type="email" class="form-control" v-model="userData.email" disabled>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="bmd-label-floating">Nick Name</label>
                        <input type="text" class="form-control" v-model="userData.name" disabled>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="bmd-label-floating">Wallet Adress for NFT retailing pool</label>
                        <div class="input-group no-border">
                          <input type="text" class="form-control" v-model="userData.wallet_address_nft" disabled>
                          <button class="btn btn-sm btn-info btn-round btn-just-icon" data-original-title="View address on blockchain" title="View address on blockchain">
                            <i class="fa fa-external-link"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="bmd-label-floating">Wallet Adress for Starlight league staking pool)</label>
                        <div class="input-group no-border">
                          <input type="text" class="form-control" v-model="userData.wallet_address_sl" disabled>
                          <button class="btn btn-sm btn-info btn-round btn-just-icon" data-original-title="View address on blockchain" title="View address on blockchain">
                            <i class="fa fa-external-link"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-warning pull-right"><i class="fa fa-edit"></i>&nbsp;&nbsp;Change Address</button>
                  <div class="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-profile for-admin-only">
            <div class="card-avatar">
              <a href="#pablo">
                <img class="img" :src="require('@/assets/img/logo.webp')" />
              </a>
            </div>
            <div class="card-body">
              <h6 class="card-category text-gray">Role in community</h6>
              <h4 class="card-title">Community administrator</h4>
              <p class="card-description">
                Be responsible for the management of the entire self-propelled chess game community, including maintaining game balance,
                handling complaints, and formulating rules, etc. Community administrators are required to have certain gaming experience
                and management skills, be able to coordinate the relationships among various clubs, and ensure the stable operation of each community.
              </p>
              <a target="_blank" href="https://chess-of-stars.gitbook.io/whitepaper/4.-community-construction" class="btn btn-rose btn-round">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { userApi } from "@/api/request"
import { loadingHelper } from "@/utils/loading";
const store = useStore();
const url = ref(store.state.metaMask?.url);
const userData = ref({
  wallet_address_nft: "gueryiy",
  wallet_address_sl: "gueryiy",
  name: store.state.user.name,
  wallet_address: store.state.user?.account
})
function getAddress() {
  if (!store.state.metaMask) {
    ElMessage.error("please connect the wallet")
    return
  }
  userData.value.wallet_address = store.state.metaMask?.account
}
function updateInfo() {
  if (!userData.value.name) {
    ElMessage.error("username is required")
    return
  }
  if (!userData.value.wallet_address) {
    ElMessage.error("wallet address is required")
    return
  }
  let data = {
    name: userData.value.name,
    userId: store.state.user.id,
    walletAddress: userData.value.wallet_address
  }
  loadingHelper.show()
  userApi.update(data).then(res => {
    if (res.code == 0) {
      ElNotification({
        type: "success",
        message: "update successfully"
      })
      loadingHelper.hide()
      store.commit("setUser", { ...store.state.user, name: userData.value.name, account: userData.value.wallet_address })
    }
  })
}
</script>