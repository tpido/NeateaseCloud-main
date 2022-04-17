<template>
  <div id="comment">
    <sub-nav-bar class="navBar">
      <div slot="left" class="left">
        <p>评论</p>
        <span>共{{ commentlist.total }}条评论</span>
      </div>
    </sub-nav-bar>
  </div>
</template>

<script>
import subNavBar from "@/components/common/subNavBar.vue";
export default {
  name: "comment",
  components: {
    subNavBar,
  },
  created() {
    this.getcommentDetailed();
  },
  data() {
    return {
      //评论数据
      commentlist: {},
    };
  },

  methods: {
    async getcommentDetailed() {
      const { data: res } = await this.$http.get("/comment/playlist", {
        params: {
          id: this.$route.params.id,
        },
      });
      this.commentlist = res;
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
</style>