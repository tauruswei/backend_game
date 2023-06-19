<template>
  <div class="card">
    <page-title :option="title"></page-title>
    <div class="card-body">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <div class="input-group no-border">
              <input type="text" v-model="search" class="form-control" placeholder="Search ...">
              <button type="button" class="btn btn-info btn-round btn-just-icon" @click="query()">
                <i class="fa fa-search"></i>
                <div class="ripple-container"></div>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <button type="button" class="btn btn-info btn-round" style="margin-top:10px" @click="add('vlog')">
            <i class="fa fa-plus" style="font-size: 12px;vertical-align: baseline;"></i> New vlog
          </button>
          <button type="button" class="btn btn-warning btn-round" style="margin-top:10px;margin-left:10px" @click="add('h5')">
            <i class="fa fa-plus" style="font-size: 12px;vertical-align: baseline;"></i> New H5
          </button>
        </div>
      </div>
      <dynamic-table :data="tableData" :header="tableHeader" :operations="operations" :preNum="pageNum * pageSize - pageSize" @commands="view"></dynamic-table>
      <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :current-page="pageNum" @current-change="handlePageChange" @size-change="handleSizeChange" :page-size="pageSize" />
    </div>
    <!--View NFT on Blockchain-->
    <el-dialog v-model="visible" title="View" width="80%" destroy-on-close>
      <iframe :src="rowData.link" width="100%" height="400" style="border:none"></iframe>
    </el-dialog>
    <!--View NFT on Blockchain-->
    <blog-h5 v-model:visible="dialogShow" :title="dialogTitle" :data="editData"></blog-h5>
    <blog-vlog v-model:visible="dialogShow1" :title="dialogTitle" :data="editData"></blog-vlog>
  </div>
</template>
  <script setup>
import { ref, onMounted } from "vue";
import { blogApi } from "@/api/request";
import PageTitle from "@/components/page-title.vue";
import DynamicTable from "@/components/dynamic-table.vue";
import BlogH5 from "@/components/blog/blog-addh5.vue"
import BlogVlog from "@/components/blog/blog-addvlog.vue"
let title = ref({ type: "warning", title: "Blog", desc: "We provide timely, relevant, and credible information about game releases as they come available." })
let tableData = ref([])
let tableHeader = ref(["id", "type", "title", "author", "post_at"])
let operations = ref([{ id: 1, type: 'success', icon: "fa fa-eye", name: "view", event: 'view' }, { id: 2, type: 'primary', icon: "fa fa-edit", name: "edit", event: 'edit' }])
let visible = ref(false);
let rowData = ref({});
let pageNum = ref(1); 
let total = ref(1);
let pageSize = ref(10);
let search = ref("")
let type = ref(null);
let dialogShow = ref(false);
let dialogShow1 = ref(false);
let editData = ref(null);
const dialogTitle = ref("")
const loading = ref(false)
function view(data) {
  if (data.command == "view") {
    visible.value = true;
    queryRow(data.data);
  }
  if(data.command == "edit"){
    if(data.data.type == "h5"){
      editData.value = data.data;
      dialogShow.value = true;
    }else if(data.data.type == "vlog"){
      editData.value = data.data;
      dialogShow1.value = true;
    }
  }
}
function query() {
  let data = {
    pageSize: pageSize.value,
    pageNum: pageNum.value,
    search: search.value
  }
  loading.value = true
  blogApi.list(data).then((res) => {
    if (res.data.data) {
      tableData.value = res.data.data; total.value = res.data.total;
    }
    loading.value = false
  })
}
function queryRow(data) {
  rowData.value = data;
}
function handlePageChange(val) {
  pageNum.value = val;
  query();
}
function handleSizeChange(val) {
  pageSize.value = val;
  query()
}
function add(val){
  type.value = val;
  editData.value = null;
  if(val == 'h5'){
    dialogShow.value = true;
    dialogTitle.value = 'New Blog'
  }else if(val == 'vlog'){
    dialogShow1.value = true;
    dialogTitle.value = 'New Vlog'
  }
}
onMounted(() => {
  query();
})
  </script>