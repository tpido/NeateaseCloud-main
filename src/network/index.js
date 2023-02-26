import { request } from "./request";

//请求歌曲详情
export const reqSong = (id) =>
  request({ method: "GET", url: `/song/detail?ids=${id}` });

// 获取歌曲的url地址
export const reqSongUrl = (id) =>
  request({ method: "GET", url: `/song/url?id=${id}` });

//获取歌曲歌词
export const reqLyric = (id) =>
  request({ method: "GET", url: `/lyric?id=${id}` });
