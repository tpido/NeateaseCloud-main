<template>
  <div id="playerlist" ref="playerlist" style="display: none">
    <!-- title区域 -->
    <div class="listhd">
      <p class="playlist">播放列表({{ musicList.length }})</p>
      <div class="delAll" @click="delAllMusicList()">
        清除全部
        <span class="delAll_icn"></span>
      </div>
      <p class="lytitle">{{ musicName }}</p>
      <span class="close_btn" @click="isDisplaylist()"></span>
    </div>

    <div class="listbd">
      <!-- 歌曲列表区域 -->
      <div class="listbdc_wrapper">
        <div
          class="listbdc"
          v-for="(item, index) in musicList"
          :key="index"
          @click="playCurrentMusic(item.id)"
        >
          <!-- 播放图标 -->
          <div
            class="playicn"
            :style="{ visibility: currentIndex === index ? 'visible' : '' }"
          ></div>
          <!-- 歌曲名字 -->
          <div class="listbdc_item_name">{{ item.name }}</div>
          <!-- 歌曲图标 -->
          <div class="icons">
            <span
              class="del"
              title="删除"
              @click.stop="removeMusic(item.id)"
            ></span>
          </div>
          <!-- 歌曲作者 -->
          <div class="author" :title="item.name">{{ item.name }}</div>
          <!-- 歌曲时间 -->
          <div class="musicTime">
            {{ $moment(item.dt).format("mm:ss") }}
          </div>
        </div>
      </div>
      <div class="bline"></div>
      <!-- 歌词区域 -->
      <div class="lyric_wrapper" ref="lyric_wrapper">
        <div class="lyric">
          <p
            v-for="(line, index) in musicLyric.lines"
            :key="index"
            :class="{ active: lyricIndex === index }"
          >
            {{ line.txt }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "playerlist",
  props: {
    //显示歌曲详情
    isDisplay: {
      type: Boolean,
      default: false,
    },
    //音乐的名字
    musicName: String,
    //音乐歌词
    musicLyric: Object,
    //歌曲当前时间
    musicCurrentTime: {
      type: Number,
      default: 0,
    },
    //歌曲是否播放
    isPlay: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      //当前播放到哪一句歌词
      lyricIndex: 0,
      //歌词定时器
      lyricTimer: null,
      //歌曲列表数据
      musicList: [],
      //当前播放音乐的下标
      currentIndex: -1,
    };
  },
  methods: {
    isDisplaylist() {
      this.$refs.playerlist.style.display = "none";
    },
    //当前行是否为正在播放的一行
    islineActive() {
      clearInterval(this.lyricTimer);
      this.lyricTimer = setInterval(() => {
        for (let index = 0; index < this.musicLyric.lines.length; index++) {
          if (
            this.musicLyric.lines[index].time >
            this.musicCurrentTime * 1000
          ) {
            this.lyricIndex = index - 1;
            break;
          }
        }
      }, 200);
    },
    //删除音乐
    removeMusic(id) {
      this.$store.dispatch("removemusic", id);
    },
    //播放音乐
    playCurrentMusic(id) {
      this.$store.dispatch("setCurrentMusic", id);
    },
    //删除所有音乐
    delAllMusicList() {
      this.$store.dispatch("delAllMusicList");
    },
  },

  computed: {
    getMusicList() {
      return this.$store.state.music.musicList;
    },

    getCurrentMusic() {
      return this.$store.state.music.currentMusic;
    },
  },

  watch: {
    isDisplay(newval) {
      if (newval === true) {
        this.$refs.playerlist.style.display = "block";
      } else {
        this.$refs.playerlist.style.display = "none";
      }
    },
    //监听是否播放
    isPlay: {
      handler() {
        this.islineActive();
      },
      immediate: true,
    },
    //监听播放到哪一句歌词
    lyricIndex(newval) {
      if (newval > 3) {
        this.$refs.lyric_wrapper.scrollTop = (newval - 3) * 32;
      }
    },
    //监听音乐当前时间
    musicCurrentTime(newval) {
      if (newval === 0) {
        // （如果时间变为0的歌词到顶部）
        this.$refs.lyric_wrapper.scrollTop = 0;
      }
    },
    // 监听音乐列表数据
    getMusicList: {
      handler(newval) {
        this.musicList = newval;
      },
      immediate: true,
    },

    getCurrentMusic: {
      handler(newval) {
        const index = this.musicList.findIndex(
          (item) => item.name === newval.name
        );
        if (index > -1) this.currentIndex = index;
        else this.currentIndex = this.musicList.length;
        console.log(this.currentIndex);
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
#playerlist {
  position: absolute;
  width: 986px;
  height: 301px;
  bottom: 44px;
  left: 50%;
  transform: translate(-50%);
}

.listhd {
  background: url("@/assets/playlist_bg.png") no-repeat;
  background-position: 0 0;
  position: relative;
  height: 41px;
  .playlist {
    position: absolute;
    text-align: center;
    height: 39px;
    line-height: 39px;
    left: 20px;
    color: #e8e8e8;
    font-size: 12px;
  }
  .delAll {
    position: absolute;
    top: 13px;
    left: 484px;
    color: #e8e8e8;
    font-size: 12px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      .delAll_icn {
        background-position: -51px -20px;
      }
    }
    .delAll_icn {
      position: absolute;
      margin-left: 5px;
      top: 1px;
      height: 16px;
      width: 13px;
      background: url("@/assets/playlist.png") no-repeat -51px 0px;
    }
  }

  .lytitle {
    position: absolute;
    left: 595px;
    top: 0;
    width: 346px;
    text-align: center;
    height: 39px;
    line-height: 39px;
    color: #e8e8e8;
    font-size: 12px;
  }
  .close_btn {
    background: url("@/assets/playlist.png") no-repeat;
    background-position: -195px 9px;
    position: absolute;
    top: 6px;
    right: 8px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}

.listbd {
  position: absolute;
  left: 0;
  top: 41px;
  width: 976px;
  height: 260px;
  padding: 0 5px;
  background: url("@/assets/playlist_bg.png") repeat-y;
  background-position: -1014px 0;
  .listbdc_wrapper {
    position: absolute;
    width: 558px;
    height: 260px;
    overflow-y: scroll;
    z-index: 3;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #868686;
      border-radius: 15px;
    }
    .listbdc {
      display: flex;
      align-items: center;
      width: 100%;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      color: #e8e8e8;
      .playicn {
        visibility: hidden;
        margin-right: 10px;
        width: 10px;
        height: 13px;
        background: url("@/assets/playlist.png") no-repeat -182px 0;
      }
      .listbdc_item_name {
        width: 266px;
        height: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .icons {
        width: 100px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        visibility: hidden;
        .del {
          height: 16px;
          width: 13px;
          background: url("@/assets/playlist.png") no-repeat -51px 0px;
          &:hover {
            cursor: pointer;
            background-position: -51px -20px;
          }
        }
      }
      .author {
        width: 70px;
        height: 100%;
        padding-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          text-decoration: underline;
        }
      }
      .musicTime {
        margin-left: 10px;
        width: 35px;
        height: 100%;
      }
      &:hover {
        background-color: #0f0f0f;
        cursor: pointer;
        .icons {
          visibility: visible;
        }
      }
    }
  }
  .bline {
    position: absolute;
    left: 555px;
    top: -1px;
    z-index: 2;
    width: 9px;
    height: 260px;
    background: #000;
    border-radius: 9px;
  }

  .lyric_wrapper {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 4;
    padding: 20px 0 20px 0;
    margin-bottom: 21px;
    height: 220px;
    width: 420px;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #868686;
      border-radius: 15px;
    }

    .lyric {
      position: absolute;
      right: 26px;
      width: 354px;
      p {
        text-align: center;
        color: #989898;
        line-height: 32px;
        font-size: 12px;
        transition: all 0.3s;
      }
      .active {
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>
