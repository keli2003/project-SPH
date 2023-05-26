<template>
  <div id="app">
    <!-- 自定义指令的使用 -->
    <!-- <h1 v-upper="msg"></h1> -->
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>

    <!-- 在Home、Search显示，在登录和注册的时候进行隐藏 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

export default {
  name: "App",
  data() {
    return {
      msg: "abc",
    };
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知Vuex发请求 获取数据 存储于仓库之中
    // 派发一个actions || 获取商品分类的三级联动的数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
