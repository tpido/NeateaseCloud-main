<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view></router-view>
    <audio-player></audio-player>
  </div>
</template>

<script>
import audioPlayer from "./components/common/audioplayer/audioplayer.vue";
import topBar from "./components/common/topBar.vue";
export default {
  name: "App",
  components: {
    topBar,
    audioPlayer,
  },
};
</script>

<style>
#app {
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
