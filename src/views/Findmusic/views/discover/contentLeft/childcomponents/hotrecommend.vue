<template>
  <div id="hotrecommend">
    <sub-nav-bar>
      <div slot="left" class="left">
        <i class="el-icon-s-help red"></i>
        <p>热门推荐</p>
      </div>

      <div class="cateRecommend" slot="center">
        <span>华语</span>
        <span>流行</span>
        <span>摇滚</span>
        <span>民谣</span>
        <span>电子</span>
      </div>

      <div slot="right" class="right">
        <p>更多</p>
        <img src="@/assets/img/to right.svg" alt="" />
      </div>
    </sub-nav-bar>
  </div>
</template>

<script>
import subNavBar from "@/components/common/subNavBar.vue";
export default {
  name: "",
  components: {
    subNavBar,
  },
};
</script>
<style scoped>
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

.center span {
  font-size: 10px;
  color: #666666;
  padding: 0 20px;
  border-left: 1px solid #ccd0db;
}

.center span:hover {
  text-decoration: underline;
  cursor: pointer;
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
}

.right img {
  width: 20px;
}
</style>