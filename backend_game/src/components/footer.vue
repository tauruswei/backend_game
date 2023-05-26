<template>
  <div class="container-fluid" style="padding-top:22px">
    <div class="copyright float-right">
      &copy;
      {{ date }}, made with <i class="fa fa-heart"></i> by
      <a href="https://chessofstars.io" target="_blank">COSD</a> for a better GameFi.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const date = ref(new Date().getFullYear())
</script>

<style>
</style>