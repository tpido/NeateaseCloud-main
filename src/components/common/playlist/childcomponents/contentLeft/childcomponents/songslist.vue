<template>
  <div id="songslist">
    <!-- 导航区域 -->
    <sub-nav-bar class="navBar">
      <div slot="left" class="left">
        <p>歌曲列表</p>
        <span>{{ playlist.trackCount }}首歌</span>
      </div>

      <div slot="right" class="right">
        <p>播放 ：</p>
        <p class="playCount">{{ playlist.playCount }}</p>
        <p>次</p>
      </div>
    </sub-nav-bar>

    <div class="songsTitle">
      <span class="w1"></span>
      <span class="w2">歌曲标题</span>
      <span class="w3">时长</span>
      <span class="w4">歌手</span>
      <span class="w5">专辑</span>
    </div>

    <div class="songscontent">
      <div
        class="songscontent_item"
        v-for="(item, index) in songsDetail"
        :key="index"
        :class="{ grey: index % 2 === 0 }"
      >
        <span class="w1 add">{{ index + 1 }}</span>
        <span class="w2 add alias" :title="item.name">
          {{ item.name }}
          <span v-show="item.alia[0]"> {{ "-" + item.alia[0] }}</span>
        </span>
        <span class="w3 add">{{ min(item.dt) + ":" + sec(item.dt) }}</span>
        <span :title="item.ar[0].name" class="w4 add alias item_name">{{
          item.ar[0].name
        }}</span>
        <span :title="item.al.name" class="w5 add">{{ item.al.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import subNavBar from "@/components/common/subNavBar.vue";
export default {
  name: "songslist",
  components: {
    subNavBar,
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

  methods: {
    min(dt) {
      if (dt / 60000 < 10) {
        return "0" + parseInt(dt / 60000);
      }
      return parseInt(dt / 60000);
    },

    sec(dt) {
      let x = parseInt(dt / 60000);
      let y = parseInt(dt / 1000 - x * 60);
      if (y < 10) return "0" + y;
      else return y;
    },
  },
};
</script>
<style scoped>
.navBar {
  margin-top: 20px;
}
.left {
  display: flex;
  align-items: center;
}

.left p {
  font-size: 20px;
}

.left span {
  margin: 9px 0 0 20px;
  color: #666;
  font-size: 12px;
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

.playCount {
  padding-right: 5px;
  color: #c20c0c;
  font-weight: 700;
}

.songsTitle {
  display: flex;
  color: #666;
  font-size: 12px;
  height: 39px;
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  box-shadow: 0px 2px 2px #ccc;
}

.songscontent {
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
}

.songscontent_item {
  display: flex;
  color: #666;
  font-size: 12px;
  height: 30px;
  /* border: 1px solid #666; */
}

.songscontent_item span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.w1,
.w2,
.w3,
.w4,
.w5 {
  padding: 8px 10px;
  display: inline-block;
  border-right: 1px solid #c4c4c4;
}

.w1 {
  width: 40px;
}

.w2 {
  width: 220px;
}

.w3 {
  width: 77px;
}

.w4 {
  width: 80px;
}

.w5 {
  flex: 1;
}

.add {
  border: none;
}

.grey {
  background-color: rgba(0, 0, 0, 0.05);
}

.alias {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.item_name:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>