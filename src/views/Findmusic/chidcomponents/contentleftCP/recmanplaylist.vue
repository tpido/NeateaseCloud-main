<template>
  <div id="recmanplaylist">
    <div class="recmanplaylist_item" v-for="item in playlist" :key="item.id">
      <a :href="'#/playlist/' + item.id" class="mask"></a>
      <img :src="item.picUrl" />
      <div class="bottom">
        <p>
          {{ changeunits(item.playCount) }}
        </p>
      </div>
      <div class="info">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  async created() {
    const { data: res } = await this.$http.get("/personalized?limit=8");
    this.playlist = res.result;
    console.log(this.playlist);
  },
  data() {
    return {
      //歌单信息
      playlist: [],
    };
  },

  methods: {
    //转化以万为单位
    changeunits(playCount) {
      if (playCount < 100000) return playCount;
      return Math.round(playCount / 10000) + "万";
    },
  },
};
</script>
<style scoped>
#recmanplaylist {
  margin-top: 27px;
  display: flex;
  flex-wrap: wrap;
}

.recmanplaylist_item {
  position: relative;
  padding: 0 13px;
  font-size: 14px;
  padding-bottom: 35px;
  width: 21%;
}

.mask {
  position: absolute;
  width: 153px;
  height: 153px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 200;
}

.mask:hover {
  cursor: pointer;
}

img {
  width: 100%;
}

.bottom {
  font-size: 12px;
  color: #cacaca;
  z-index: 500;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  top: 126px;
  width: 155px;
  height: 27px;
  line-height: 27px;
}

.bottom p {
  font-size: 12px;
  line-height: 27px;
  margin-left: 20px;
}

.bottom p::before {
  position: absolute;
  left: 3px;
  top: 9px;
  content: "";
  background: url("@/assets/iconall.png");
  width: 15px;
  height: 11px;
  background-position: 0 -24px;
}

.bottom p::after {
  position: absolute;
  right: 6px;
  top: 6px;
  content: "";
  background: url("@/assets/iconall.png");
  width: 16px;
  height: 17px;
  background-position: 0 0;
}

.info {
  margin-top: 5px;
  font-size: 14px;
}

.info:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>