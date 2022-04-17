<template>
  <div id="playlist">
    <content-left
      :playlist="playlistDetail.playlist"
      :songsDetail="songsDetail"
    ></content-left>
    <content-right></content-right>
  </div>
</template>

<script>
import contentRight from "./childcomponents/contentright.vue";
import contentLeft from "./childcomponents/contentLeft/contentleft.vue";
export default {
  name: "playlist",
  created() {
    this.getplaylistDetail();
  },

  data() {
    return {
      playlistDetail: {},
      // 获取歌单详情的id
      s: "",
      //歌单详情数据
      songsDetail: [],
    };
  },
  methods: {
    async getplaylistDetail() {
      const { data: res } = await this.$http.get("/playlist/detail", {
        params: { id: this.$route.params.id },
      });
      this.playlistDetail = res;
      //介绍省略信息
      this.playlistDetail.playlist.descless =
        res.playlist.description
          .replace(/\n/g, "<br>")
          .slice(0, res.playlist.description.length / 2) + "...";
      //介绍的详细信息
      this.playlistDetail.playlist.descMore = res.playlist.description.replace(
        /\n/g,
        "<br>"
      );

      let privilegesLength = this.playlistDetail.privileges.length;
      this.playlistDetail.privileges.forEach((item, index) => {
        if (index < privilegesLength - 1) {
          this.s += item.id + ",";
        } else {
          this.s += item.id;
        }
      });
      this.getsongsDetailed(this.s);
      console.log(this.playlistDetail);
    },
    //获取歌单的详细信息
    async getsongsDetailed(s) {
      const { data: res } = await this.$http.get("/song/detail", {
        params: {
          ids: s,
        },
      });
      this.songsDetail = res.songs;
      console.log(this.songsDetail);
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