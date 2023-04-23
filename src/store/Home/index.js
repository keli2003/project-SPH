import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"


// Home模块下的小仓库
const state = {
    // state默认的初始值别乱写  服务器返回的是什么类型 就写什么类型【根据接口返回值初始化】
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    // floor的数据
    floorList: [],
}
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList

    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
}
const actions = {
    //通过API接口函数调用 向服务器发送请求 获取里面的数据
    // async 和await 可以直接返回成功的回调函数
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("GETCATEGORYLIST", result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {

            commit("GETBANNERLIST", result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
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