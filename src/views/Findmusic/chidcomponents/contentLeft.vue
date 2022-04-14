<template>
  <div id="contentLeft">
    <hot-recommend></hot-recommend>
    <recman-playlist></recman-playlist>
    <new-disk></new-disk>
    <top-list></top-list>
  </div>
</template>

<script>
import hotRecommend from "./contentleftCP/hotrecommend.vue";
import recmanPlaylist from "./contentleftCP/recmanplaylist.vue";
import newDisk from "./contentleftCP/newdisk.vue";
import topList from "./contentleftCP/toplist.vue";
export default {
  name: "",
  components: {
    hotRecommend,
    recmanPlaylist,
    newDisk,
    topList,
  },
};
</script>
<style scoped>
#contentLeft {
  padding: 4px 15px;
  height: 1425px;
  width: 729px;
}
</style>