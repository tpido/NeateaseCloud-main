<template>
  <div id="findmusic">
    <!-- 头部区域 -->
      <home-headers></home-headers>
      <div class="content_banner">
        <cascade></cascade>
      </div>
      
      <div class="content">
        <content-left></content-left>
        <content-right></content-right>
      </div>
    </div>
  </div>
</template>

<script>
import Cascade from "./chidcomponents/cascade.vue";
import contentLeft from "./chidcomponents/contentLeft.vue";
import contentRight from "./chidcomponents/contentright.vue";
import homeHeaders from "./chidcomponents/homeheaders.vue";
export default {
  name: "findMusic",
  components: {
    homeHeaders,
    Cascade,
    contentLeft,
    contentRight,
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