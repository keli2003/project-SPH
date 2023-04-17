import { reqCategoryList } from "@/api"

// Home模块下的小仓库
const state = {
    // state默认的初始值别乱写  服务器返回的是什么类型 就写什么类型【根据接口返回值初始化】
    categoryList: [],
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    }
}
const actions = {
    //通过API接口函数调用 向服务器发送请求 获取里面的数据
    // async 和await 可以直接返回成功的回调函数
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        console.log(result);
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}