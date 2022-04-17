<template>
  <div id="findMusicBody">
    <div class="content_banner">
      <cascade></cascade>
    </div>

    <div class="content">
      <content-left></content-left>
      <content-right></content-right>
    </div>
  </div>
</template>

<script>
import Cascade from "./cascade/cascade.vue";
import contentLeft from "./contentLeft/contentLeft.vue";
import contentRight from "./contentRight/contentright.vue";
export default {
  name: "findMusicBody",
  components: {
    Cascade,
    contentLeft,
    contentRight,
  },
};
</script>
<style scoped>
.content_banner {
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