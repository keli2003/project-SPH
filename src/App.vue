<template>
  <div id="app">
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
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>
