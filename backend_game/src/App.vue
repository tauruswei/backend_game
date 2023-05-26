<template>
  <div id="app">
    <router-view></router-view>  
  </div>
</template>

<style lang="scss">
@import "@/style/common.scss";
@import "@/style/material-dashboard.min.css";
</style>
<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: sans-serif, "Hiragino Sans GB","PingFang SC","Helvetica Neue", Helvetica, 
    "Microsoft YaHei", "微软雅黑", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #111;
}
</style>

