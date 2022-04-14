<template>
  <div id="playlist">
    <content-left :playlist="playlistDetail.playlist"></content-left>
    <content-right></content-right>
  </div>
</template>

<script>
import contentRight from "./childcomponents/contentright.vue";
import contentLeft from "./childcomponents/contentleft.vue";
export default {
  name: "playlist",
  created() {
    this.getplaylistDetail();
  },

  data() {
    return {
      playlistDetail: {},
    };
  },
  methods: {
    async getplaylistDetail() {
      const { data: res } = await this.$http.get("/playlist/detail", {
        params: { id: this.$route.params.id },
      });
      this.playlistDetail = res;
      console.log(this.playlistDetail);
    },
  },
  components: {
    contentLeft,
    contentRight,
  },
};
</script>
<style scoped>
#playlist {
  border: 1px solid #d3d3d3;
  display: flex;
  /* background-color: pink; */
  margin: 0 auto;
  width: 982px;
}
</style>