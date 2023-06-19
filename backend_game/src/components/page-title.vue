<template>
  <!--Page Title-->
  <div :class="`card-header card-header-text card-header-${title.type}`">
    <div class="card-text" style="display:block">
      <el-row>
        <el-col :span="22">
          <h4 class="card-title">{{ title.title }}</h4>
          <p class="card-category" v-if="title.desc">{{ title.desc }}</p>
        </el-col>
        <el-col :span="2" style="text-align:right">
          <i class="fa fa-refresh page-refresh" @click="emit('refresh')"></i>
        </el-col>
      </el-row>

    </div>
  </div>
  <!--Page Title-->
</template>

<script setup>
import { ref, watch } from "vue"
const title = ref({})
const props = defineProps({ option: Object, default: () => { } })
const emit = defineEmits(['refresh'])
watch(() => props.option, (val) => {
  title.value = val
}, { immediate: true })
</script>