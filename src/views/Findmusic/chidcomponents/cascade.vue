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
  async created() {
    const { data: res } = await this.$http.get("/banner");
    this.bannerList = res.banners;
    console.log(this.bannerList);
  },
};
</script>
<style scoped>
img {
  /* height: 900px; */
  width: 100%;
}
</style>