const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭在写代码的时候我们出现的eslint提示
  lintOnSave: false,
})
