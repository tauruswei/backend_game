<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-warning card-header-icon">
              <div class="card-icon">
                <i class="fa fa-btc"></i>
              </div>
              <p class="card-category">COSD</p>
              <h3 class="card-title">{{dashboard.cosd}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-btc"></i>&nbsp;
                All COSD staked
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-warning card-header-icon">
              <div class="card-icon">
                <i class="fa fa-money"></i>
              </div>
              <p class="card-category">Evics</p>
              <h3 class="card-title">{{dashboard.evics}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-money"></i>&nbsp;
                Evics produced in all games
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <div class="card-icon">
                <i class="fa fa-ticket"></i>
              </div>
              <p class="card-category">NFTs</p>
              <h3 class="card-title">{{dashboard.nfts}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-ticket"></i>&nbsp;
                All NFTs minted
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="fa fa-sitemap"></i>
              </div>
              <p class="card-category">Clubs</p>
              <h3 class="card-title">{{dashboard.clubs}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-sitemap"></i>&nbsp;All clubs
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="fa fa-group"></i>
              </div>
              <p class="card-category">All Members</p>
              <h3 class="card-title">{{dashboard.members}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-group"></i>&nbsp;All members
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <div class="card-icon">
                <i class="fa fa-gamepad"></i>
              </div>
              <p class="card-category">Games played</p>
              <h3 class="card-title">{{dashboard.games}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="fa fa-gamepad"></i>&nbsp;
                All games played by users
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header card-header-icon card-header-info">
              <div class="card-icon">
                <i class="fa fa-line-chart"></i>
              </div>
              <h4 class="card-title">All time user & income increasing
                <small></small>
              </h4>
            </div>
            <div class="card-body">
              <div id="colouredBarsChart" class="ct-chart" style="height:300px">
                <chart-viewer ref="chartViewer" type="line"></chart-viewer>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-chart">
            <div class="card-header card-header-icon card-header-danger">
              <div class="card-icon">
                <i class="fa fa-pie-chart"></i>
              </div>
              <h4 class="card-title">Staking by purpose</h4>
            </div>
            <div class="card-body">
              <div id="chartPreferences" class="ct-chart" style="height:213px">
                <chart-viewer ref="chartViewerB" type="pie" :height="213"></chart-viewer>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-12">
                  <h6 class="card-category">Legend</h6>
                </div>
                <div class="col-md-12">
                  <i class="fa fa-circle text-info"></i> Starlight league
                  <i class="fa fa-circle text-warning"></i> Club ownership
                  <i class="fa fa-circle text-danger"></i> COSD earning
                </div>
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
import { useStore } from "vuex";
import { dashboardApi } from '@/api/request';
import ChartViewer from "@/components/chart-viewer.vue"
const store = useStore();
const dashboard = ref({})
const chartViewer = ref(null);
const chartViewerB = ref(null);
let pieData = ref(null)
let lineData = ref(null)
function query(){
  let data = {
    email:store.state.user.name
  }
  dashboardApi.alldata(data).then(res=>{
    dashboard.value = res.data;
    pieData.value = dashboard.value.purpose;
    lineData.value = dashboard.value.line;
    if(lineData.value) chartViewer.value.refresh(lineData.value)
    if(pieData.value) chartViewerB.value.refresh(pieData.value)
  })
}
onMounted(()=>{
  query()
})



</script>