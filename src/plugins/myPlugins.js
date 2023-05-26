// 对外暴露一个对象
let myPlugins = {}

myPlugins.install = function (Vue, options) {
    // console.log('调用');
    Vue.directive(options.name, (element, params) => {
        // console.log('执行');

        element.innerHTML = params.value.toUpperCase();
    })
}

export default myPlugins