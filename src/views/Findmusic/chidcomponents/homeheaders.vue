<template>
  <div id="homeheaders">
    <div class="header">
      <div class="header-conter">
        <a href=""><span>推荐</span></a>
        <a href=""><span>排行榜</span></a>
        <a href=""><span>歌单</span></a>
        <a href=""><span>主播电台</span></a>
        <a href=""><span>歌手</span></a>
        <a href=""><span>新碟上架</span></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeheaders",
};
</script>
<style scoped>
.header {
  height: 35px;
  background-color: rgb(194, 12, 12);
}

.header-conter {
  margin: auto;
  height: 100%;
  width: 653px;
  display: flex;
  align-items: center;
}

.header a {
  text-decoration: none;
  color: white;
}

.header-conter span {
  font-size: 14px;
  border-radius: 7px;
  padding: 0 30px;
}

.header-conter span:hover {
  background-color: #8e1f16;
}
</style>