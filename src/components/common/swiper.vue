<template>
  <div id="swiper">
    <swiper ref="mySwiper" :options="swiperOptions" autoplay class="swiper">
      <slot></slot>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "",
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        autoplay: true, // 自动轮播
        speed: 1000, // 轮播速度
        slidesPerView: 5,
        spaceBetween: 30,
        // nextButton: ".111",
        // prevButton: "",
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {},
        // Some Swiper option/callback...
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
};
</script>
<style scoped>
#swiper {
  width: 100%;
}

.swiper {
  overflow: hidden;
  padding: 0 15px;
}

.red {
  background-color: red;
}

img {
  width: 100%;
}

#swiper .swiper-button-next {
  position: absolute;
  right: -5px;
  top: 57px;
  background-image: url("@/assets/img/next.svg");
}

#swiper .swiper-button-prev {
  position: absolute;
  width: 15px;
  height: 20px;
  left: -1px;
  top: 70px;
  background-image: url("@/assets/img/pre.svg");
}
</style>