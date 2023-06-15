<template>
  <div>
    <el-table :data="listData" style="width:100%;min-height:360px">
      <el-table-column label="No." min-width="5%">
        <template #default="scope">
            {{ (scope.$index + 1) * pageNum }}
        </template>
      </el-table-column>
      <el-table-column label="Cost Amount" prop="fromAmount" min-width="10%"></el-table-column>
      <el-table-column label="Buy Amount" prop="toAmount" min-width="10%"></el-table-column>
      <el-table-column label="txID" min-width="30%">
        <template #default="scope">
            <a :href="$store.state.metaMask?($store.state.metaMask?.url+'tx/'+scope.row.txId):'javascript:void(0);'" :target="$store.state.metaMask?'_blank':null">{{ scope.row.txId }}</a>
        </template>
      </el-table-column>
      <el-table-column label="Create time" min-width="25%" prop="createTime"></el-table-column>
      <el-table-column label="Update time" min-width="20%" prop="updateTime"></el-table-column>
      <template #empty>
        <el-empty style="margin:0 auto"></el-empty>
      </template>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change="handlePageChange" :page-size="pageSize" />
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { chainApi } from "@/api/request";
import { DateHelper } from "@/utils/helper";
import {useStore} from "vuex";
const store = useStore()
const pageSize = ref(10);
const pageNum = ref(1)
const total = ref(1)
const listData = ref([]);
const props = defineProps({
  txtype: { type: Number },
})
watch(() => props.txtype, (val) => {
  if (val != undefined) {
    pageNum.value = 1;
    query(val)
  }  
}, { immediate: true })
function handlePageChange(val) {
  pageNum.value = val;
  query()
}
function query(txtype) {
  let data = {
    pageSize: pageSize.value,
    pageNo: pageNum.value,
    userId: store.state.user.id,
    transType: txtype,
    status: 1
  }
  chainApi.list(data).then((res) => {
    if (res.code == 0) {
      listData.value = res.data.list;
      listData.value.forEach(item=>{
        if(item.createTime) item.createTime = DateHelper.toString(item.createTime)
        if(item.updateTime) item.updateTime = DateHelper.toString(item.updateTime)
      }) 
      total.value = res.data.total;
    }
  })
}
</script>