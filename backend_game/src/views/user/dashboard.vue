<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-warning card-header-icon">
              <div class="card-icon">
                <i class="fa fa-btc"></i>
              </div>
              <p class="card-category">COSD</p>
              <h3 class="card-title">{{ dashboard.cosd }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-btc"></i>&nbsp;All COSD staked for the game
                <!-- <a href="#pablo">Get More COSD...</a> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-warning card-header-icon">
              <div class="card-icon">
                <i class="fa fa-money"></i>
              </div>
              <p class="card-category">Evics</p>
              <h3 class="card-title">{{ dashboard.evics }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-money"></i>&nbsp;Evics earned in the game
                <!-- <a href="#pablo">Exchange to USDT</a> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <div class="card-icon">
                <i class="fa fa-ticket"></i>
              </div>
              <p class="card-category">NFTs</p>
              <h3 class="card-title">{{ dashboard.nfts }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-ticket"></i>&nbsp;
                <a href="#pablo">Get More NFTs</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <div class="card-icon">
                <i class="fa fa-gamepad"></i>
              </div>
              <p class="card-category">Games played</p>
              <h3 class="card-title">{{ dashboard.games }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-gamepad"></i>&nbsp;
                <a href="#pablo">View games remaining</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row for-channel-or-club">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="fa fa-sitemap"></i>
              </div>
              <p class="card-category">Clubs</p>
              <h3 class="card-title">{{ dashboard.clubs }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-sitemap"></i>&nbsp;All your clubs
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="fa fa-group"></i>
              </div>
              <p class="card-category">All Members</p>
              <h3 class="card-title">{{ dashboard.members }}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-group"></i>&nbsp;All members in your clubs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 <script setup>
import { ref,onMounted } from 'vue'
import {useStore} from "vuex";
import { dashboardApi } from '@/api/request';
const store = useStore();
const dashboard = ref({})
function query(){
  let data = {
    email:store.state.user.name
  }
  dashboardApi.alldata(data).then(res=>{
    dashboard.value = res.data
  })
}
onMounted(()=>{
  query()
})
 </script>