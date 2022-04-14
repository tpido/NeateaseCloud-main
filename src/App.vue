<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import topBar from "./components/common/topBar.vue";
export default {
  name: "App",
  components: {
    topBar,
  },
};
</script>

<style>
</style>
