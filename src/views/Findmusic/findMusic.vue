<template>
  <div id="findmusic">
    <!-- 头部区域 -->
    <home-headers></home-headers>
    <!-- 内容区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
import homeHeaders from "./chidcomponents/homeheaders/homeheaders.vue";
export default {
  name: "findMusic",
  components: {
    homeHeaders,
  },
};
</script>
<style scoped>
#findmusic {
  background-color: #f5f5f5;
}

.content_banner {
  /* background-color: white; */
  /* border-left: 2px solid #d3d3d3;
  border-right: 2px solid #d3d3d3; */
  width: 1100px;
  margin: 0 auto;
}

.content {
  /* background-color: white; */
  border-top: 1px solid #d3d3d3;
  border-left: 2px solid #d3d3d3;
  border-right: 2px solid #d3d3d3;
  width: 1100px;
  margin: 0 auto;
  display: flex;
}
</style>