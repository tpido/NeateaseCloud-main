<template>
  <div id="cascade">
    <el-carousel indicator-position="outside" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "cascade",
  data() {
    return {
      bannerList: [],
    };
  },
  created() {
    this.getbannerlist();
  },

  methods: {
    async getbannerlist() {
      const { data: res } = await this.$http.get("/banner");
      this.bannerList = res.banners;
    },
  },
};
</script>
<style scoped>
img {
  width: 100%;
}
</style>