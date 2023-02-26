<template>
  <div id="contentright">
    <likers :subscribers="subscribers"></likers>
  </div>
</template>

<script>
import likers from "./childcomponents/likers.vue";
export default {
  name: "contentright",
  created() {},

  components: {
    likers,
  },
  props: {
    subscribers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
#contentright {
  width: 269px;
  height: 100%;
  padding: 20px 40px 40px 30px;
}
</style>
