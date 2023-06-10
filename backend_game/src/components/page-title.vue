<template>
  <!--Page Title-->
  <div :class="`card-header card-header-text card-header-${title.type}`">
    <div class="card-text" style="display:block">
      <h4 class="card-title">{{ title.title }}</h4>
      <p class="card-category" v-if="title.desc">{{ title.desc }}</p>
    </div>
  </div>
  <!--Page Title-->
</template>

<script setup>
import { ref, watch } from "vue"
const title = ref({})
const props = defineProps({ option: Object, default: () => { } })
watch(() => props.option, (val) => {
  title.value = val
}, { immediate: true })
</script>