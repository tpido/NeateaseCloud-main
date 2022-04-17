<template>
  <div id="subNavBar">
    <div class="left">
      <slot name="left"></slot>
    </div>

    <div class="center">
      <slot name="center" class="center"></slot>
    </div>

    <div class="right">
      <slot name="right" class="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "subNavBar",
};
</script>
<style scoped>
#subNavBar {
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #b1281e;
}

.left {
  display: flex;
}

.center {
  flex: 1;
}

.right {
  display: flex;
}
</style>