<template>
  <div id="newdisk">
    <sub-nav-bar>
      <div slot="left" class="left">
        <i class="el-icon-s-help red"></i>
        <p>新碟上架</p>
      </div>

      <div slot="right" class="right">
        <p>更多</p>
        <img src="@/assets/img/to right.svg" alt="" />
      </div>
    </sub-nav-bar>

    <div class="swiper">
      <div class="swiper_content">
        <swiper1>
          <swiper-slide
            v-for="item in newplaylist"
            :key="item.id"
            class="swiper-slide"
          >
            <!-- 图片区域 -->
            <div class="img">
              <img :src="item.blurPicUrl" alt="" />
              <a href="" class="mask" :title="item.name"></a>
              <a href="" title="播放" class="play"></a>
            </div>

            <!-- 信息内容 -->
            <div class="info">
              <!-- 碟片名字 -->
              <a href="javascript;void(0)" :title="item.name" class="song">
                {{ item.name }}
              </a>
              <!-- 歌手名字 -->
              <div>
                <a
                  href="javascript;void(0)"
                  :title="item.artist.name"
                  class="singer"
                >
                  {{ item.artist.name }}
                </a>
              </div>
            </div>
          </swiper-slide>
        </swiper1>
      </div>
    </div>
  </div>
</template>

<script>
import subNavBar from "@/components/common/subNavBar.vue";
import swiper1 from "@/components/common/swiper.vue";
import { swiperSlide } from "vue-awesome-swiper";
export default {
  name: "newdisk",
  components: {
    subNavBar,
    swiper1,
    swiperSlide,
  },
  created() {
    this.getnewdiskList();
  },

  data() {
    return {
      newplaylist: [],
    };
  },

  methods: {
    async getnewdiskList() {
      const { data: res } = await this.$http.get("/album/newest");
      this.newplaylist = res.albums;
      console.log(this.newplaylist);
    },
  },
};
</script>
<style scoped>
#newdisk {
  margin-top: 50px;
}
.left {
  display: flex;
  align-items: center;
}
.left i {
  position: relative;
  top: 1px;
  margin-right: 10px;
}

.left p {
  font-size: 20px;
}

.red {
  position: relative;
  top: 3px;
  color: #b1281e;
}

.center {
  position: relative;
  justify-content: center;
}

.right {
  align-items: center;
  display: flex;
}

.right p {
  font-size: 10px;
}

.right p:hover {
  cursor: pointer;
  text-decoration: underline;
}

.right img {
  width: 20px;
}

.swiper {
  background-color: rgb(0, 0, 0, 0.04);
  margin-top: 20px;
  border: 1px solid #d3d3d3;
}

.swiper_content {
  border: 1px solid white;
  /* width: 300px; */
  background-color: rgb(0, 0, 0, 0.04);
  padding: 20px 10px;
  height: 150px;
  display: flex;
  align-items: center;
}

.swiper-slide {
  /* text-overflow: ellipsis; */
  color: black;
}

.info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.swiper-slide .mask {
  display: block;
  position: absolute;
  left: 10px;
  top: 8px;
  z-index: 99;
  background: url("@/assets/coverall.png");
  width: 115px;
  height: 100px;
  background-position: 0 -570px;
}

/* .swiper-slide .mask:hover .play {
  visibility: visible;
} */

.img:hover .play {
  visibility: visible;
}

.play {
  z-index: 109;
  visibility: hidden;
  position: absolute;
  right: 1px;
  top: 88px;
  background: url("@/assets/iconall.png");
  width: 21px;
  height: 20px;
  background-position: -1px -86px;
}

.play:hover {
  background: url("@/assets/iconall.png");
  width: 21px;
  height: 20px;
  background-position: -1px -111px;
}

.swiper-slide .song {
  font-size: 12px;
  /* overflow: hidden; */
  white-space: nowrap;
  text-decoration: none;
  color: black;
}

.swiper-slide .singer {
  font-size: 12px;
  text-decoration: none;
  color: black;
}

.song:hover,
.singer:hover {
  text-decoration: underline;
}
img {
  width: 100%;
}
</style>