import { reqSong } from "@/network";
const music = {
  state: {
    //当前播放的音乐
    currentMusic: JSON.parse(window.localStorage.getItem("currentMusic")) || {},
    //播放列表歌曲
    musicList: JSON.parse(window.localStorage.getItem("musicList")) || [],
  },

  mutations: {
    //设置当前播放音乐
    setCurrentMusic(state, payload) {
      state.currentMusic = payload.songs[0];
      window.localStorage.setItem(
        "currentMusic",
        JSON.stringify(state.currentMusic)
      );
    },
    //添加到音乐列表
    addToMusicList(state, payload) {
      let index = state.musicList.findIndex(
        (item) => item.name === payload.songs[0].name
      );
      if (index === -1) {
        state.musicList.push(payload.songs[0]);
        window.localStorage.setItem(
          "musicList",
          JSON.stringify(state.musicList)
        );
      }
    },

    //从音乐列表中删除
    removemusic(state, id) {
      let index = state.musicList.findIndex((item) => item.id === id);
      if (index > -1) state.musicList.splice(index, 1);
    },

    //删除音乐列表的所有音乐
    delAllMusicList(state) {
      state.musicList = [];
    },
  },

  actions: {
    async setCurrentMusic(context, id) {
      const { data: res } = await reqSong(id);
      context.commit("setCurrentMusic", res);
    },

    async addToMusicList(context, id) {
      const { data: res } = await reqSong(id);
      context.commit("addToMusicList", res);
    },

    removemusic(context, id) {
      context.commit("removemusic", id);
    },

    delAllMusicList(context) {
      context.commit("delAllMusicList");
    },
  },
};

export default music;
