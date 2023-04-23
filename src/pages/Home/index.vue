<template>
  <div>
    <!-- 引入三级联动组件:三级联动组件是全局组件 不需要重新引入 -->
    <TypeNav />
    <!-- 使用引入组件 -->
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- floor这个组件 自己在组件颞部是没有发送请求的 数据时父组件给的 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 引入其余的组件，非路由组件使用的三大步骤：定义 注册 使用
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

import { mapState } from "vuex";
export default {
  name: "Home",
  // 注册其余组件
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 派发actions 获取floor组件中的数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>