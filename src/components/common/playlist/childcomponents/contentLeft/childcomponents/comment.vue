<template>
  <div id="comment">
    <!-- 导航区域 -->
    <sub-nav-bar class="navBar">
      <div slot="left" class="left">
        <p>评论</p>
        <span>共{{ commentlist.total }}条评论</span>
      </div>
    </sub-nav-bar>

    <!-- 热门评论 -->
    <div class="hotComment" v-show="hotComments !== undefined">
      <!-- 表头 -->
      <div class="title">
        <p>热门评论</p>
        <hr />
      </div>
      <!-- 热门评论内容 -->
      <div
        class="hotComment_item"
        :style="{
          borderBottom: index === hotComments.length - 1 ? 'none' : '',
        }"
        v-for="(item, index) in hotComments"
        :key="index"
      >
        <!-- 头像区域 -->
        <div class="head">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <!-- 右边内容区域 -->
        <div class="content">
          <a href="#" :title="item.user.nickname">{{ item.user.nickname }}</a>
          ：{{ item.content }}
          <!-- 回复区域 -->
          <div class="beReplied" v-if="item.beReplied.length !== 0">
            <a href="#">{{ item.beReplied[0].user.nickname }}</a>
            ：{{ item.beReplied[0].content }}
          </div>
          <!-- 底部区域 -->
          <div class="rp">
            <div class="rp_left">
              {{ $moment(item.time).format("YYYY年MM月DD日") }}
            </div>
            <div class="rp_right">
              <a href="#">({{ item.likedCount }})</a>
              <span>|</span>
              <a href="#">回复</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最新评论 -->
    <div class="newComments">
      <div class="title">
        <p>最新评论({{ commentlist.total }})</p>
        <hr />
      </div>
      <!-- 最新评论内容 -->
      <div
        class="hotComment_item"
        :style="{
          borderBottom: index === newComments.length - 1 ? 'none' : '',
        }"
        v-for="(item, index) in newComments"
        :key="index"
      >
        <!-- 头像区域 -->
        <div class="head">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <!-- 右边内容区域 -->
        <div class="content">
          <a href="#" :title="item.user.nickname">{{ item.user.nickname }}</a>
          ：{{ item.content }}
          <!-- 回复区域 -->
          <div class="beReplied" v-if="item.beReplied.length !== 0">
            <a href="#">{{ item.beReplied[0].user.nickname }}</a>
            ：{{ item.beReplied[0].content }}
          </div>
          <!-- 底部区域 -->
          <div class="rp">
            <div class="rp_left">
              {{ $moment(item.time).format("YYYY年MM月DD日") }}
            </div>
            <div class="rp_right">
              <a href="#">({{ item.likedCount }})</a>
              <span>|</span>
              <a href="#">回复</a>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页器区域 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="commentlist.total"
        :page-size="20"
        @current-change="pagenumChange"
      >
      </el-pagination>
    </div>
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
      //热门评论
      hotComments: [],
      //最新评论
      newComments: [],
      //当前评论页数
      pagenum: "",
    };
  },

  methods: {
    async getcommentDetailed(pagenum = 1) {
      const { data: res } = await this.$http.get("/comment/playlist", {
        params: {
          id: this.$route.params.id,
          offset: (pagenum - 1) * 20,
        },
      });
      this.commentlist = res;
      this.hotComments = res.hotComments;
      this.newComments = res.comments;
      console.log(this.hotComments);
      // console.log(this.newComments);
      // console.log(this.commentlist);
    },

    pagenumChange(val) {
      this.getcommentDetailed(val);
    },
  },

  computed: {
    newCommentsLength() {
      return this.commentlist.total - this.hotComments.length;
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

.title {
  margin-top: 30px;
}

.title p {
  font-size: 13px;
  font-weight: 600;
}

.hotComment_item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}

.head {
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

.head img {
  width: 50px;
  height: 50px;
}

.content {
  flex: 1;
  font-size: 12px;
}

.content a {
  vertical-align: top;
  font-size: 12px;
  text-decoration: none;
}
.content a:hover {
  text-decoration: underline;
}

.beReplied {
  position: relative;
  margin-top: 10px;
  padding: 8px 19px;
  line-height: 20px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid #dedede;
}

.beReplied::before {
  content: "";
  position: absolute;
  z-index: 11;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: dashed dashed dashed dashed;
  border-color: transparent transparent #dedede transparent;
  left: 21px;
  top: -10px;
}
.beReplied::after {
  content: "";
  position: absolute;
  z-index: 12;
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: dashed dashed solid dashed;
  border-color: transparent transparent #f0f0f0 transparent;
  left: 22px;
  top: -8px;
}

.rp {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  vertical-align: bottom;
}

.rp_left {
  color: #999;
}

.rp_right > a {
  color: black;
}

.rp_right > span {
  padding: 0 8px;
}

.el-pagination {
  text-align: center;
}
</style>