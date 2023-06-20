<template>
  <div>
    <el-table :data="listData" style="width:100%;min-height:360px" v-loading="loading">
      <el-table-column label="No." min-width="5%">
        <template #default="scope">
            {{ scope.$index + 1 + (pageNum - 1) * pageSize }}
        </template>
      </el-table-column>
      <el-table-column label="Amount" min-width="20%">
        <template #default="scope">
            <div>
                <h3 style="margin:0"><b>{{ scope.row.toAmount }}</b>&nbsp;<small style="font-size:14px;color:#999">{{ txtype[scope.row.transType].to }}</small></h3>
                <span v-if="[0,7,8,9].indexOf(scope.row.transType) > -1">({{ scope.row.fromAmount }} <small>{{ txtype[scope.row.transType].from }}</small>)</span>               
            </div>
        </template>
      </el-table-column>
      <el-table-column label="Transcation ID" min-width="30%">
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
    <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :current-page="pageNum" @current-change="handlePageChange" @size-change="handleSizeChange" :page-size="pageSize" />
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
const txtype = ref({0:{from:"USDT",to:"COSD"},1:{to:"COSD"},2:{to:"COSD"},3:{to:"COSD"},4:{to:"COSD"},
5:{to:"COSD"},6:{to:"COSD"},7:{from:"USDT",to:"Evic"},8:{from:"Evic",to:"USDT"},9:{from:"USDT",to:"NFT"},10:{from:"NFT",to:""}})
const currentType = ref()
const emit = defineEmits(['update:refresh'])
const props = defineProps({
  txtype: { type: [ Number,String ] },
  refresh: {type: Boolean, default:false}
})
const loading = ref(false)
watch(() => props.txtype, (val) => {
  if (val != undefined) {
    pageNum.value = 1;
    if(typeof val == 'string') {
        val = JSON.parse(val)
        currentType.value = val
        queryEvic() 
    }else{
      currentType.value = val  
      query()  
    }    
  }  
}, { immediate: true })
watch(()=>props.refresh,(val)=>{
    if(val) {
        if(typeof currentType.value == "number"){
            query()
        }else{
            queryEvic() 
        }
    }
},{immediate:true})
function handlePageChange(val) {
  pageNum.value = val;
  query()
}
function handleSizeChange(val) {
  pageSize.value = val;
  query()
}
function query() {
  let data = {
    pageSize: pageSize.value,
    pageNo: pageNum.value,
    userId: store.state.user.id,
    transType: currentType.value,
    status: 1
  }
  loading.value = true;
  chainApi.list(data).then((res) => {
    if (res.code == 0) {
      listData.value = res.data.list;
      listData.value.forEach(item=>{
        if(item.createTime) item.createTime = DateHelper.toString(item.createTime)
        if(item.updateTime) item.updateTime = DateHelper.toString(item.updateTime)
      }) 
      total.value = res.data.total;
      loading.value = false;
      emit("update:refresh", false)
    }
  })
}
function queryEvic() {
  let data = {
    pageSize: pageSize.value,
    pageNo: pageNum.value,
    userId: store.state.user.id,
    transType: currentType.value,
    status: 1
  }
  loading.value = true;
  chainApi.eviclist(data).then((res) => {
    if (res.code == 0) {
      listData.value = res.data.list;
      listData.value.forEach(item=>{
        if(item.createTime) item.createTime = DateHelper.toString(item.createTime)
        if(item.updateTime) item.updateTime = DateHelper.toString(item.updateTime)
      }) 
      total.value = res.data.total;
      loading.value = false;
      emit("update:refresh", false)
    }
  })
}
</script>