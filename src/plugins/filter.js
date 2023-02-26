import Vue from "vue";
const Timeformat = (time) => {
  //分钟
  var minute = time / 60;
  var minutes = parseInt(minute);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  //秒
  var second = time % 60;
  var seconds = Math.round(second);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
};

const filterall = {
  Timeformat,
};

Object.keys(filterall).forEach((key) => Vue.filter(key, filterall[key]));

export default {
  Timeformat,
};
