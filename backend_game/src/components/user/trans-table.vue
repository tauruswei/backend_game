<template>
  <div>
    <el-table :data="listData" style="width:100%;min-height:360px">
      <el-table-column label="No." min-width="5%">
        <template #default="scope">
            {{ (scope.$index + 1) * pageNum }}
        </template>
      </el-table-column>
      <el-table-column label="Amount" min-width="20%">
        <template #default="scope">
            <span>
                <h3 style="margin-bottom:0"><b>{{ scope.row.toAmount }}</b>&nbsp;<small style="font-size:14px;color:#999">{{ txtype[scope.row.transType].to }}</small></h3>
                <span>({{ scope.row.fromAmount }} <small>{{ txtype[scope.row.transType].from }}</small>)</span>               
            </span>
        </template>
      </el-table-column>
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
import { useStore } from "vuex";
const store = useStore()
const pageSize = ref(10);
const pageNum = ref(1)
const total = ref(1)
const listData = ref([]);
const txtype = ref({0:{from:"USDT",to:"COSD"},1:{from:"COSD",to:"defi"},2:{from:"COSD",to:"starlight"},3:{from:"COSD",to:"club"},4:{from:"COSD",to:"defi"},
5:{from:"COSD",to:"starlight"},6:{from:"COSD",to:"club"},7:{from:"USDT",to:"Evic"},8:{from:"Evic",to:"USDT"},9:{from:"USDT",to:"NFT"},10:{from:"NFT",to:""}})
const props = defineProps({
  txtype: { type: [ Number,String ] },
})
watch(() => props.txtype, (val) => {
  if (val != undefined) {
    pageNum.value = 1;
    if(typeof val == 'string') {
        val = JSON.parse(val)
        queryEvic(val) 
    }else{
      query(val)  
    }    
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
function queryEvic(txtype) {
  let data = {
    pageSize: pageSize.value,
    pageNo: pageNum.value,
    userId: store.state.user.id,
    transType: txtype,
    status: 1
  }
  chainApi.eviclist(data).then((res) => {
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