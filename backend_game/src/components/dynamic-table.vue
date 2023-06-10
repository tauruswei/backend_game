<template>
  <el-table :data="tableData" style="width: 100%;min-height:360px">
    <el-table-column label="No." min-width="50">
      <template #default="scope">
        {{ scope.$index + preNum+1 }}
      </template>
    </el-table-column>
    <el-table-column v-for="(item, index) in tableHeader" :key="index" :label="item.value" :prop="item.key" min-width="120">
    </el-table-column>
    <el-table-column label="Operations" min-width="120" v-if="operationsData">
      <template #default="scope">
        <span v-for="item in operationsData" :key="item.id" style="padding-left:5px;padding-right:5px;">
          <el-tooltip :content="item.name" placement="top">
            <el-button :type="item.type" size="small" @click="handleClick(item.event,scope.row,scope.$index)" circle><i :class="item.icon"></i></el-button>
          </el-tooltip>
        </span>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty style="margin:0 auto"></el-empty>
    </template>
  </el-table>
</template>
  
<script setup>
import { ref, watch } from "vue";
let tableHeader = ref([]);
let tableData = ref([]);
let operationsData = ref(null);
let emits = defineEmits(['commands']);
// 表格展示数据
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  header: {
    type: Array,
    default: () => []
  },
  operations: {
    type: Array,
    default: () => null
  },
  preNum: {
    type: Number,
    default: 0
  }
})
watch(() => props.data, (val) => {
  tableData.value = val;
}, { immediate: true })
watch(() => props.header, (val) => {
  tableHeader.value = generateHeader(val);
}, { immediate: true })
watch(() => props.operations, (val) => {
  if(val) operationsData.value = val;
  else operationsData.value = null
}, { immediate: true })
function generateHeader(data) {
  const ret = [];
  for (let key of data) {
    if (key !== "id") {
      const obj = {
        key: key,
        value: key.replace(/\_/g, " "),
      };
      ret.push(obj);
    }
  }
  return ret;
}
function handleClick(event, item) {
  emits('commands', { command: event, data: item })
}
  </script>
<style scoped>
:deep(.el-table) {
  min-height: 400px;
}
:deep(.el-table__header) {
  text-transform: capitalize;
}
</style>
  
  