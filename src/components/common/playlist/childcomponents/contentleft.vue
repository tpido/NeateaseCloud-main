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

          <!-- 按钮区域 -->
          <div class="button"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contentleft",
  props: {
    playlist: {
      type: Object,
      default() {
        return {};
      },
    },
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
  /* background-color: blue; */
  border-right: 2px solid #e3e3e3;
  height: 100%;
  width: 710px;
}

.content {
  display: flex;
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
</style>