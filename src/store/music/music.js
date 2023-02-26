import { reqSong } from "@/network";
const music = {
  state: {
    //当前播放的音乐
    currentMusic: {},
    //播放列表歌曲
    musicList: [],
  },

  mutations: {
    //设置当前播放音乐
    setCurrentMusic(state, payload) {
      state.currentMusic = payload.songs[0];
    },
    //添加到音乐列表
    addToMusicList(state, payload) {
      //判断是否存在（不存在再插入）
      // let isExist = false;
      // for (let index = 0; index < state.musicList.length; index++) {
      //   if (state.musicList[index].name === payload.songs[0].name) {
      //     isExist = true;
      //     break;
      //   }
      // }
      // if (isExist === false) state.musicList.push(payload.songs[0]);

      let index = state.musicList.findIndex(
        (item) => item.name === payload.songs[0].name
      );
      if (index === -1) state.musicList.push(payload.songs[0]);
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
