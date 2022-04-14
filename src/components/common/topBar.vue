<template>
  <div id="topBar">
    <div class="content">
      <!-- 图标区域 -->
      <h1 class="icon"></h1>

      <!-- 选择区域 -->
      <div class="select">
        <ul>
          <li :class="{ selected: isActive === 1 }" @click="findMusic()">
            发现音乐
          </li>
          <li :class="{ selected: isActive === 2 }" @click="mymusic()">
            我的音乐
          </li>
          <li :class="{ selected: isActive === 3 }" @click="myfocus()">关注</li>
          <li :class="{ selected: isActive === 4 }" @click="shop()">商城</li>
          <li :class="{ selected: isActive === 5 }" @click="musicmaker()">
            音乐人
          </li>
          <li :class="{ selected: isActive === 6 }" @click="downloadapp()">
            下载客户端
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topBar",
  data() {
    return {
      isActive: 1,

      path: "",
    };
  },
  methods: {
    findMusic() {
      this.$router.push("/findmusic");
      this.isActive = 1;
    },

    mymusic() {
      this.$router.push("/mymusic");
      this.isActive = 2;
    },

    myfocus() {
      this.$router.push("/myfocus");
      this.isActive = 3;
    },

    shop() {
      this.$router.push("/shop");
      this.isActive = 4;
    },
    musicmaker() {
      this.$router.push("/musicmaker");
      this.isActive = 5;
    },
    downloadapp() {
      this.$router.push("/downloadapp");
      this.isActive = 6;
    },
  },
};
</script>
<style scoped>
#topBar {
  background-color: #242424;
  height: 69px;
}

.content {
  width: 1100px;
  margin: 0 auto;
}

.icon {
  margin: 0;
  line-height: 69px;
  float: left;
  padding-right: 20px;
  background: url("@/assets/topbar.png");
  width: 158px;
  height: 69px;
}

.select {
  float: left;
  height: 100%;
  /* display: flex; */
  /* align-items: center; */
}

.select ul {
  margin: 0;
  list-style: none;
  color: #ccc;
  float: left;
}

.select ul li {
  float: left;
  height: 100%;
  line-height: 69px;
  padding: 0 19px;
}

.selected {
  position: relative;
  background-color: #000;
  color: white;
}

.selected::before {
  content: "";
  position: absolute;
  top: 62px;
  left: 40%;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid rgb(194, 12, 12);
}
</style>