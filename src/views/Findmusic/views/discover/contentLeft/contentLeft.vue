<template>
  <div id="contentLeft">
    <hot-recommend></hot-recommend>
    <recman-playlist></recman-playlist>
    <new-disk></new-disk>
    <top-list></top-list>
  </div>
</template>

<script>
import hotRecommend from "./childcomponents/hotrecommend.vue";
import recmanPlaylist from "./childcomponents/recmanplaylist.vue";
import newDisk from "./childcomponents/newdisk.vue";
import topList from "./childcomponents/toplist.vue";
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