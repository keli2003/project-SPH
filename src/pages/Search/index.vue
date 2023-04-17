<template>
  <div>
    <!-- <h1>params参数---{{ $route.params.keyword }}==={{ keyword, }}==={{ a }}</h1>
    <h1>query参数---{{ $route.query.k }}</h1> -->
  </div>
</template>

<script>
export default {
  name: "Search",
  // 路由组件是可以传递props参数的
  props: ["keyword", "a", "b"],
};
</script>

<style>
</style>