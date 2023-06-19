<template>
  <div class="card">
    <div class="card-header card-header-tabs card-header-warning">
      <div class="nav-tabs-navigation">
        <div class="nav-tabs-wrapper">
          <ul class="nav nav-tabs" data-tabs="tabs">
            <li class="nav-item" @click="handleClick('cp')">
              <a class="nav-link" :class="activeName =='cp'?' active show':''" href="javascript:void(0);" data-toggle="tab">
                <i class="fa fa-share-alt"></i> Channel Providers
                <div class="ripple-container"></div>
              </a>
            </li>
            <li class="nav-item" @click="handleClick('ca')">
              <a class="nav-link" :class="activeName =='ca'?' active show':''" href="javascript:void(0);" data-toggle="tab">
                <i class="fa fa-group"></i> Club Administrators
                <div class="ripple-container"></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-3">
          <label>Epoch:&nbsp;</label>
          <div class="dropdown bootstrap-select" id="selectpicker">
            <el-select v-model="epoch" class="selectpicker btn btn-info btn-round" placeholder="Select Epoch">
              <el-option label="1 2023-05-01 - 2023-05-31" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4">4</el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <div class="input-group no-border">
              <input type="text" v-model="search" class="form-control" placeholder="Search user...">
              <button type="button" class="btn btn-info btn-round btn-just-icon" @click="query()">
                <i class="fa fa-search"></i>
                <div class="ripple-container"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <dynamic-table :data="tableData" :header="tableHeader" :preNum="pageNum * pageSize - pageSize" :operations="operations" @commands="view"></dynamic-table>
      <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :current-page="pageNum" @current-change="handlePageChange" @size-change="handleSizeChange" :page-size="pageSize" />
    </div>
    <!--View NFT on Blockchain-->
    <el-dialog v-model="visible" title="View NFT on Blockchain" destroy-on-close>
      <div class="detail-box">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-image :src="rowData.src"></el-image>
          </el-col>
          <el-col :span="16">
            <template v-for="(item,key) in rowData">
              <div v-if="key !='src'" :key="key" class="detail-item">
                <span>{{ key.replace(/\_/g," ")+":" }}</span>
                <span>{{ item }}</span>
              </div>
            </template>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--View NFT on Blockchain-->
  </div>
</template>
  <script setup>
import { ref, onMounted } from "vue";
import { gameApi } from "@/api/request";
import DynamicTable from "@/components/dynamic-table.vue";
let activeName = ref("cp");
let tableData = ref([])
let tableHeader = ref(["id", "user", "commission", "count_of_promoted", "total_amount_of_promoted", "awards"])
let operations = ref([{ id: 1, type: 'success', icon: "fa fa-group", name: "view members", event: 'view' }, { id: 1, type: 'primary', icon: "fa fa-cc", name: "Allocate awards", event: 'allocate' }])
let visible = ref(false);
let rowData = ref({});
let pageNum = ref(1); let total = ref(1);
let pageSize = ref(10);
let epoch = ref("")
let search = ref("")
const loading = ref(false)
function view(data) {
  if (data.command == "view") {
    visible.value = true;
    queryRow(data.data);
  }
}
function query() {
  let data = {
    pageSize: pageSize.value,
    pageNum: pageNum.value,
    type: activeName.value,
    epoch: epoch.value ? epoch.value : null,
    search: search.value ? search.value : null
  }
  loading.value = true
  gameApi.rewards(data).then((res) => {
    if (res.data.data) {
      tableData.value = res.data.data;
      total.value = res.data.total;
      
    }
    loading.value = false
  })
}
function queryRow(data) {
  let res = [data].map(i => {
    return {
      NFT_type: i.nft_type,
      Game_chances: i.game_chances,
      Blockchain: i.blockchain,
      Token_ID: i.token_id,
      Contract_Address: i.contract_address,
      Minted_at: i.minted_at,
      src: i.src
    }
  });
  rowData.value = res[0];
}
function handleClick(tab) {
  activeName.value = tab;
  pageNum.value = 1;
  epoch.value = "";
  search.value = ""
  query();
}
function handlePageChange(val) {
  pageNum.value = val;
  query();
}
function handleSizeChange(val) {
  pageSize.value = val;
  query()
}
onMounted(() => {
  query();
})
  </script>