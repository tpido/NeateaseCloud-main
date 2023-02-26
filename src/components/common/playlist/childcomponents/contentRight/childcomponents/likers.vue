<template>
  <div id="likers">
    <div class="title">喜欢这个歌单的人</div>
    <div class="img">
      <div
        v-for="(item, index) in subscribers"
        :title="item.nickname"
        class="img_item"
      >
        <img :src="item.avatarUrl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "likers",
  props: {
    subscribers: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  watch: {
    subscribers(newvalue) {
      console.log(newvalue);
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 12px;
  color: #333;
  font-weight: 700;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.img {
  display: flex;
  flex-wrap: wrap;
  margin-left: -13px;
}

.img_item {
  padding: 0 0 13px 13px;
  width: 18%;
}

.img_item:hover {
  cursor: pointer;
}

img {
  width: 100%;
}
</style>
