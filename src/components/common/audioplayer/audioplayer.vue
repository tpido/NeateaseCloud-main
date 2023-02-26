<template>
  <div
    id="audioplayer"
    ref="audioplayer"
    @mouseenter="displayPlayer()"
    @mouseleave="hiddenPlayer()"
  >
    <audio
      :src="currentMusicUrl"
      autoplay
      ref="music"
      @canplay="getDuration()"
      @timeupdate="getCurrentDuration()"
    ></audio>
    <div class="playerwrapper">
      <!-- 按钮区域 -->
      <div class="btns">
        <div class="prev" title="上一首歌曲"></div>
        <!-- 是否播放按钮 -->
        <div
          class="play"
          :title="isPlay ? '播放' : '暂停'"
          @click="Play()"
          :class="{ play_active: isPlay }"
        ></div>
        <div class="next" title="下一首歌曲"></div>
      </div>

      <!-- 歌曲照片区域 -->
      <div class="songPic">
        <img :src="currentMusic.al.picUrl" />
        <div class="mask"></div>
      </div>

      <!-- 滚动条区域 -->
      <div>
        <div class="player">
          <div class="musicName" :title="currentMusic.name">
            {{ currentMusic.name }}
          </div>
          <div class="author">{{ currentMusic.ar[0].name }}</div>
        </div>
        <el-slider
          v-model="musicCurrentDuration"
          :max="musicDuration"
          :show-tooltip="false"
          @change="changeMusicDuration()"
          @mousedown.native="isChange = true"
          @mouseup.native="isChange = false"
        ></el-slider>
      </div>

      <!-- 时间区域 -->
      <div class="time">
        <span class="currentTime">{{ musicCurrentDuration | Timeformat }}</span
        >/
        <span class="fullTime">{{ musicDuration | Timeformat }}</span>
      </div>

      <!-- 音量区域 -->
      <div class="volume">
        <div
          class="novolume_btn"
          title="音量"
          @click="isDisplayVol = !isDisplayVol"
          :class="{ volume_btn: Volvalue !== 0 }"
        ></div>
        <div class="ControlBar" v-show="isDisplayVol">
          <el-slider
            vertical
            height="92px"
            class="VolControlBar"
            v-model="Volvalue"
            :max="100"
            @input="changeVolume"
          ></el-slider>
          <div class="VolControlBarBac"></div>
        </div>
      </div>

      <!-- 播放列表区域 -->
      <div
        class="playDetailed"
        title="播放列表"
        @click="isDisplaylist = !isDisplaylist"
      >
        <div class="playlistnum">
          {{ this.$store.state.music.musicList.length }}
        </div>
      </div>
    </div>

    <!-- 锁头区域 -->
    <div class="locker_place">
      <div
        class="locker_icon"
        @click="isUnclock = !isUnclock"
        :class="{ unclock_icon: isUnclock === true }"
      ></div>
    </div>

    <!-- 播放详情区域 -->
    <player-list
      :isDisplay="isDisplaylist"
      :musicName="currentMusic.name"
      :musicLyric="currentMusicLyric"
      :musicCurrentTime="musicCurrentDuration"
      :isPlay="isPlay"
    ></player-list>
  </div>
</template>

<script>
import { reqSongUrl, reqLyric } from "@/network/index";
import Lyric from "lyric-parser";
import playerList from "./childcpns/playerlist.vue";
export default {
  name: "audioplayer",
  components: {
    playerList,
  },
  data() {
    return {
      //是否播放
      isPlay: true,
      //歌曲总时长
      musicDuration: 0,
      //歌曲当前时长
      musicCurrentDuration: 0,
      //歌曲时间是否改变
      isChange: false,
      //控制音量面板的显示与隐藏
      isDisplayVol: false,
      //音量大小
      Volvalue: 50,
      //是否锁定下方音乐栏
      isUnclock: false,

      timer: null,
      //当前音乐数据
      currentMusic: {},
      //当前音乐的url地址
      currentMusicUrl: "",
      //当前音乐的歌词
      currentMusicLyric: {},
      //是否显示playerlist
      isDisplaylist: false,
    };
  },
  methods: {
    //展开播放器
    displayPlayer() {
      clearTimeout(this.timer);
      this.$refs.audioplayer.style.bottom = "0px";
    },
    //隐藏播放器
    hiddenPlayer() {
      if (this.isUnclock === true) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$refs.audioplayer.style.bottom = "-43px";
          this.isDisplayVol = false;
        }, 3000);
      }
    },

    //开始暂停播放
    Play() {
      if (!this.isPlay) {
        this.$refs.music.play();
        this.isPlay = true;
      } else {
        this.$refs.music.pause();
        this.isPlay = false;
      }
    },
    //获取歌曲的总时长
    getDuration() {
      this.musicDuration = parseInt(this.$refs.music.duration);
    },
    //获取歌曲当前时长
    getCurrentDuration() {
      if (this.isChange === true) return;
      this.musicCurrentDuration = this.$refs.music.currentTime;
    },

    //拖拽slide改变音乐当前播放时间
    changeMusicDuration() {
      this.$refs.music.currentTime = this.musicCurrentDuration;
    },
    //改变音量大小
    changeVolume() {
      this.$refs.music.volume = this.Volvalue / 100;
    },

    //获取音乐的url地址
    async getMusicUrl(id) {
      const { data: res } = await reqSongUrl(id);
      this.currentMusicUrl = res.data[0].url;
    },

    //获取音乐的歌词
    async getMusicLyric(id) {
      const { data: res } = await reqLyric(id);
      // console.log(res.lrc.lyric);
      this.currentMusicLyric = new Lyric(res.lrc.lyric);
      console.log(this.currentMusicLyric);
    },
  },

  computed: {
    getCurrentMusic() {
      return this.$store.state.music.currentMusic;
    },
    //获取歌曲列表
    getMusicList() {
      return this.$store.state.music.musicList;
    },
  },

  watch: {
    // 监听音乐栏是否锁住
    isUnclock(newval) {
      if (newval === true) {
        this.timer = setTimeout(() => {
          this.$refs.audioplayer.style.bottom = "-43px";
        }, 3000);
      } else {
        if (this.timer) clearTimeout(this.timer);
        this.$refs.audioplayer.style.bottom = "0px";
      }
    },

    //监听当前音乐
    async getCurrentMusic() {
      this.currentMusic = this.getCurrentMusic;
      await this.getMusicUrl(this.currentMusic.id);
      await this.getMusicLyric(this.currentMusic.id);
      this.$refs.music.currentTime = 0;
      this.isPlay = true;
      //点击歌曲显示播放栏
      this.$refs.audioplayer.style.bottom = "0px";
      this.hiddenPlayer();
    },

    getMusicList(newval) {
      console.log(newval);
    },
  },
};
</script>

<style lang="less" scoped>
#audioplayer {
  position: fixed;
  z-index: 995;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: url("@/assets/playbar.png") repeat-x 0 0;
  transition: all 0.5s;
}

.playerwrapper {
  position: relative;
  width: 950px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.btns {
  position: relative;
  width: 117px;
  height: 100%;
}

.prev {
  position: absolute;
  z-index: 999;
  width: 28px;
  height: 28px;
  top: 55%;
  transform: translate(0, -50%);
  background: url("@/assets/playbar.png") no-repeat 0px -131px;
  &:hover {
    background: url("@/assets/playbar.png") no-repeat -32px -131px;
    cursor: pointer;
  }
}

.play {
  position: absolute;
  z-index: 999;
  width: 33px;
  height: 33px;
  top: 55%;
  transform: translate(0, -50%);
  left: 40px;
  background: url("@/assets/playbar.png") no-repeat -2px -206px;
  &:hover {
    cursor: pointer;
  }
}

.play_active {
  background: url("@/assets/playbar.png") no-repeat -2px -166px;
}

.next {
  position: absolute;
  z-index: 999;
  width: 28px;
  height: 28px;
  top: 55%;
  transform: translate(0, -50%);
  right: 0;
  background: url("@/assets/playbar.png") no-repeat -82px -131px;
  &:hover {
    background: url("@/assets/playbar.png") no-repeat -111px -131px;
    cursor: pointer;
  }
}

.songPic {
  position: relative;
  width: 34px;
  height: 34px;
  top: 3px;
  margin-left: 16px;
  img {
    width: 100%;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    background: url("@/assets/playbar.png") no-repeat 0px -80px;
  }
}

.player {
  font-size: 12px;
  position: relative;
  left: 30px;
  top: 10px;
  color: #fff;
  display: flex;
  .musicName {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .author {
    margin-left: 22px;
    color: #666;
  }
}

.el-slider {
  margin-left: 20px;
  width: 400px;
  /deep/ .el-slider__bar {
    background-color: #b6291f !important;
  }
  /deep/ .el-slider__button {
    border: 2px solid #b6291f;
  }
}

.time {
  position: relative;
  top: 8px;
  margin-left: 15px;
  font-size: 12px;
  color: #797979;
}

.volume {
  display: inline-block;
  width: 10px;
  height: 16px;
  margin-left: 30px;
  margin-right: 30px;
  position: relative;
  .el-slider {
    /deep/ .el-slider__button {
      width: 10px;
      height: 10px;
    }
  }

  .ControlBar {
    .VolControlBarBac {
      height: 109px;
      width: 32px;
      top: -119px;
      right: -11px;
      position: absolute;
      background: url("@/assets/playbar.png") no-repeat 0px -503px;
    }
    .VolControlBar {
      z-index: 99;
      position: absolute;
      top: -108px;
      left: -34px;
    }
  }

  .novolume_btn {
    position: relative;
    top: 4px;
    width: 10px;
    height: 16px;
    background: url("@/assets/playbar.png") no-repeat -111px -73px;
    &:hover {
      background: url("@/assets/playbar.png") no-repeat -133px -73px;
      cursor: pointer;
    }
  }

  .volume_btn {
    width: 20px;
    height: 20px;
    background: url("@/assets/playbar.png") no-repeat -5px -252px;
    &:hover {
      background: url("@/assets/playbar.png") no-repeat -34px -252px;
    }
  }
}

.locker_place {
  position: absolute;
  width: 67px;
  height: 61px;
  background: url("@/assets/playbar.png") no-repeat 0 -386px;
  right: 0px;
  top: -9px;
  .locker_icon {
    position: absolute;
    width: 10px;
    height: 12px;
    background: url("@/assets/playbar.png") no-repeat -103px -383px;
    left: 20px;
    top: 2px;
    &:hover {
      background-position: -103px -403px;
    }
  }
  .unclock_icon {
    width: 14px;
    height: 14px;
    background: url("@/assets/playbar.png") no-repeat -82px -383px;
    &:hover {
      background-position: -82px -403px;
    }
  }
}

.playDetailed {
  position: relative;
  width: 55px;
  height: 23px;
  background: url("@/assets/playbar.png") no-repeat -45px -71px;
  top: 5px;
  color: #666;
  font-size: 12px;
  &:hover {
    background-position: -45px -101px;
    cursor: pointer;
  }
  .playlistnum {
    position: absolute;
    top: 2px;
    left: 30px;
  }
}
</style>
