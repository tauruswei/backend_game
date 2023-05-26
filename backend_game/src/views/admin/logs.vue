<template>
  <div class="card">
    <page-title :option="title"></page-title>
    <div class="card-body">
    <dynamic-table :data="tableData" :header="tableHeader" :preNum="pageNum * pageSize - pageSize"></dynamic-table>
    <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="pageNum" @current-change="handlePageChange" :page-size="pageSize" />
  </div>
  </div>
</template>
  <script setup>
import { ref, onMounted } from "vue";
import { userApi } from "@/api/request";
import PageTitle from "@/components/page-title.vue";
import DynamicTable from "@/components/dynamic-table.vue";
let title = ref({ type:"warning",title: "User Logs", desc: "Query log is a record of query behavior by a great quantity of users" })
let tableData = ref([])
let tableHeader = ref(["id", "user", "time", "type", "operation"])
let pageNum = ref(1); 
let total = ref(1);
let pageSize = ref(10);
function query() {
  let data = {
    pageSize: pageSize.value,
    pageNum: pageNum.value
  }
  userApi.logs(data).then((res) => {
    if (res.data.data) {
      tableData.value = res.data.data; 
      total.value = res.data.total;
    }
  })
}
function handlePageChange(val) {
  pageNum.value = val;
  query();
}
onMounted(() => {
  query();
})
  </script>