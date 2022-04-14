<template>
  <div id="toplist">
    <!-- 导航区域 -->
    <sub-nav-bar>
      <div slot="left" class="left">
        <i class="el-icon-s-help red"></i>
        <p>榜单</p>
      </div>

      <div slot="right" class="right">
        <p>更多</p>
        <img src="@/assets/img/to right.svg" alt="" />
      </div>
    </sub-nav-bar>

    <!-- 榜单区域 -->
    <div class="body">
      <div
        v-for="(item, index) in 3"
        :key="index"
        :class="{ first: index === 0 }"
      >
        <!-- 顶部区域 -->
        <div class="top">
          <img :src="Toplistimg[index]" />
          <div class="info">
            <p>{{ ToplistName[index] }}</p>
            <a href="" title="播放" class="play"></a>
            <a href="" title="收藏" class="collect"></a>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="list">
          <ul>
            <li
              class="list_item"
              :class="{ grey: index2 % 2 === 0 }"
              v-for="(item, index2) in ToplistData[index]"
              :key="index2"
            >
              <span :class="{ redone: index2 < 3 }">{{ index2 + 1 }}</span>
              <a href="" :title="item.name" class="item_name">
                {{ item.name }}
              </a>

              <!-- icon图标区域 -->
              <div class="icon_wrapper">
                <div class="icon">
                  <a href="" class="play_item" title="播放"></a>
                  <a href="" title="添加到播放列表" class="add_item"></a>
                  <a href="" title="收藏" class="collect_item"></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subNavBar from "@/components/common/subNavBar.vue";
export default {
  name: "toplist",
  components: {
    subNavBar,
  },
  created() {
    this.getToplist();
  },
  data() {
    return {
      // 热榜的id(用来获取歌单id用的)
      ToplistId: [],
      //   热榜图片
      Toplistimg: [],
      //热榜名字
      ToplistName: [],
      //热榜数据
      ToplistData: [],
    };
  },

  methods: {
    //获取榜单数据
    async getToplist() {
      const { data: res } = await this.$http.get("/toplist");
      for (let index = 0; index < 3; index++) {
        this.ToplistId.push(res.list[index].id);
        this.Toplistimg.push(res.list[index].coverImgUrl);
        this.ToplistName.push(res.list[index].name);
        await this.getplaylist(this.ToplistId[index]);
        // console.log(this.ToplistName);
      }
    },

    //获取歌单数据
    async getplaylist(ToplistId) {
      const { data: res } = await this.$http.get(
        `/playlist/detail?id=${ToplistId}`
      );
      // console.log(res.playlist.tracks);
      this.ToplistData.push(res.playlist.tracks.slice(0, 10));
      console.log(this.ToplistData);
    },
  },
};
</script> 
<style scoped>
#toplist {
  margin-top: 40px;
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

.body {
  border-top: 1px solid #d2d2d2;
  border-bottom: 1px solid #d2d2d2;
  background-color: rgba(0, 0, 0, 0.02);
  width: 730px;
  height: 472px;
  margin-top: 20px;

  display: flex;
}

.body > div {
  border-right: 1px solid #d2d2d2;
  flex: 1;
}

.first {
  border-left: 1px solid #d2d2d2;
}

.top {
  height: 100px;
  padding: 20px 0 0 19px;
  display: flex;
}

.top img {
  margin-right: 7px;
  display: block;
  height: 80px;
  width: 80px;
}

.top p {
  font-weight: 600;
  margin-top: 5px;
  font-size: 14px;
}

.info {
  position: relative;
}

.play {
  position: absolute;
  top: 27px;
  background: url("@/assets/index.png");
  width: 22px;
  height: 22px;
  background-position: -267px -205px;
}

.play:hover {
  background: url("@/assets/index.png");
  width: 22px;
  height: 22px;
  background-position: -267px -235px;
}

.collect {
  position: absolute;
  top: 29px;
  left: 30px;
  background: url("@/assets/index.png");
  width: 20px;
  height: 19px;
  background-position: -300px -207px;
}

.collect:hover {
  background: url("@/assets/index.png");
  width: 20px;
  height: 19px;
  background-position: -300px -237px;
}

.list ul {
  padding-left: 0;
}

.list .list_item {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  padding-left: 25px;
  /* width: 100%; */
  list-style: none;
}

.grey {
  background-color: rgba(0, 0, 0, 0.05);
}
.list_item span {
  display: inline-block;
  font-size: 15px;
  width: 35px;
  text-align: center;
}

.list_item .item_name {
  /* width: 100px; */
  flex: 1;
  width: 0;
  color: black;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list_item a:hover {
  text-decoration: underline;
}

.redone {
  color: #c10d0c;
}

.list_item:hover .icon_wrapper {
  display: block;
}

.icon_wrapper {
  display: none;
}

.icon {
  /* visibility: hidden; */
  position: relative;
  height: 32px;
  width: 71px;
  display: flex;
  align-items: center;
}

.play_item {
  /* display: none; */
  position: absolute;
  left: 0;
  background: url("@/assets/index.png");
  width: 17px;
  height: 17px;
  background-position: -267px -268px;
}

.play_item:hover {
  background: url("@/assets/index.png");
  width: 17px;
  height: 17px;
  background-position: -267px -288px;
}

.add_item {
  position: absolute;
  left: 24px;
  background: url("@/assets/icon.png");
  width: 13px;
  height: 13px;
  background-position: 0 -700px;
}

.add_item:hover {
  background: url("@/assets/icon.png");
  width: 13px;
  height: 13px;
  background-position: -22px -700px;
}

.collect_item {
  background: url("@/assets/index.png");
  position: absolute;
  right: 8px;
  background-position: -297px -268px;
  width: 17px;
  height: 17px;
}
</style>