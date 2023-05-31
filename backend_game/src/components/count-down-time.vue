<template>
  <div>{{ time }}</div>
</template>
<script setup>
import { ref, onBeforeUnmount, defineProps, watch } from 'vue';
const props = defineProps({
  limit: {
    type: [Number, String],
    default: 60
  }
})
const time = ref(0);
let gen = null;
let timer = null;
watch(() => props.limit, (val) => {
  if (timer) clearInterval(timer);
  gen = genTime(val);
  timer = setInterval(() => {
    time.value = gen.next().value;
  }, 1000);
}, { immediate: true })
//生成器
function* genTime(num) {
  let second = num;
  while (true) {
    second -= 1;
    if (second === 0) {
      second = 60;
    }
    yield `${second} s`;
  }
}
onBeforeUnmount(() => {
  clearInterval(timer);
  gen = null;
})
  </script>