<template>
  <el-config-provider>
  <div id="app">
    <router-view></router-view>  
  </div>
  </el-config-provider>
</template>

<style lang="scss">
@import "@/style/common.scss";
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

