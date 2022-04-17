<template>
  <div id="contentleft">
    <div class="content">
      <!-- 顶部区域 -->
      <div class="top">
        <!-- 图片区域 -->
        <div class="coverimg"><img :src="playlist.coverImgUrl" alt="" /></div>
        <!-- 信息区域 -->
        <div class="info">
          <div class="hd_title">
            <i class="icon"></i>
            <p>{{ playlist.name }}</p>
          </div>
          <!-- 作者区域 -->
          <div class="creator">
            <!-- 作者头像 -->
            <span class="creator_avator">
              <img :src="playlist.creator.avatarUrl" alt="" />
            </span>
            <a href="#" class="creator_name">{{ playlist.creator.nickname }}</a>
            <span class="createTime">{{ changecreateTime }}创建</span>
          </div>

          <!-- 按钮区域(之后再做) -->
          <div class="button"></div>

          <!-- 标签区域 -->
          <div class="tag">
            <span>标签:</span>
            <span v-for="item in playlist.tags" class="tags_item">
              {{ item }}</span
            >
          </div>

          <!-- 介绍区域 -->
          <div class="introduction">
            <!-- 省略内容 -->
            <div class="descLess" v-if="isMore === false">
              <b>介绍: </b>
              <span v-html="playlist.descless"></span>
              <div class="pulling">
                <a @click="isMore = true">更多</a>
                <img src="@/assets/img/down.svg" alt="" />
              </div>
            </div>

            <!-- 详细内容 -->
            <div class="descMore" v-if="isMore === true">
              <b>介绍: </b>
              <span v-html="playlist.descMore"></span>
              <div class="pulling">
                <a @click="isMore = false">收起</a>
                <img src="@/assets/img/up.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 歌曲列表区域 -->
      <songs-list :playlist="playlist" :songsDetail="songsDetail"></songs-list>
      <!-- 评论区域 -->
      <comment></comment>
    </div>
  </div>
</template>

<script>
import comment from "./childcomponents/comment.vue";
import songsList from "./childcomponents/songslist.vue";
export default {
  name: "contentleft",
  components: {
    songsList,
    comment,
  },
  props: {
    playlist: {
      type: Object,
      default() {
        return {};
      },
    },

    songsDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      isMore: false,
    };
  },

  computed: {
    changecreateTime() {
      return this.$moment(this.playlist.createTime).format("YYYY-MM-DD");
    },
  },
};
</script>
<style scoped>
#contentleft {
  border-right: 2px solid #e3e3e3;
  height: 100%;
  width: 710px;
}

.content {
  padding: 47px 30px 40px 39px;
}

.top {
  display: flex;
}

.coverimg {
  border: 1px solid #d3d3d3;
  margin-right: 25px;
  width: 208px;
  height: 208px;
}

.coverimg img {
  padding: 5px;
  width: 200px;
  height: 200px;
}

.info {
  position: relative;
}

.hd_title {
  display: flex;
  flex-wrap: nowrap;
}

.hd_title i {
  float: left;
  top: 6px;
  background: url("@/assets/iconall2.png");
  width: 54px;
  height: 24px;
  background-position: 0 -463px;
}

.hd_title p {
  margin-left: 5px;
}

.creator {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.creator_avator {
  display: block;
  width: 35px;
  height: 35px;
}

.creator_avator img {
  width: 100%;
}

.creator_name {
  margin-left: 15px;
  font-size: 12px;
  color: #0c73c2;
  text-decoration: none;
}

.creator_name:hover {
  text-decoration: underline;
}

.createTime {
  font-size: 12px;
  color: #999;
  margin-left: 5px;
}

.tag {
  margin-top: 25px;
  font-size: 12px;
  color: #666666;
}

.tags_item {
  border: 1px solid #d1d1d1;
  background-color: #f7f7f7;
  margin: 0 10px;
  padding: 2px 10px;
  border-radius: 10px;
}

.introduction {
  margin-top: 8px;
}

.introduction b {
  font-size: 12px;
}

.introduction span {
  width: 408px;
  font-size: 12px;
}

.introduction a {
  font-size: 12px;
  color: black;
  text-decoration: none;
}

.introduction a:hover {
  text-decoration: underline;
}

.pulling {
  display: flex;
  justify-content: flex-end;
}

.pulling img {
  height: 15.5px;
}

.descLess {
  width: 408px;
}

.descMore {
  width: 408px;
}
</style>