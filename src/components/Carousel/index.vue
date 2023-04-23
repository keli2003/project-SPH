<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      // watch一开始监听不到list 因为这个数据没有发生变化 （数据是父组件给的 给过来的是一个对象 对象中存在了需要的数据）
      // 立即监听 不管数据有没有发生变化 我都监听一次
      immediate: true,
      handler() {
        // 监听的数据已经有了 但是v-for动态渲染结构我们还是没有办法确定 因此需要使用nextTick
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            autoplay: true, //自动播放轮播图
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 开分页器按钮，按钮也可以电动，进行轮播图的更换
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
// 给轮播图的按钮设置显示与隐藏
.center {
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
  &:hover {
    .swiper-button-next,
    .swiper-button-prev {
      display: block;
    }
  }
}
.floorBanner {
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
  &:hover {
    .swiper-button-next,
    .swiper-button-prev {
      display: block;
    }
  }
}
</style>