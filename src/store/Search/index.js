import { reqGetSearchInfo } from "@/api"

// Search模块下的小仓库
const state = {
    // 仓库初始状态是根据获取数据返回的数据格式
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search模块的数据
    async getSearchList({ commit }, params = {}) {
        // 当前这个reqGetSearchInfo这个函数在调用获取数据的时候 至少传递一个参数（空对象）
        // params形参：是当用户派发actions的时候 第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}

// 计算属性 在项目当中 是为了简化数据而生
// 可以把我们将来组件中所需要的数据进行简化 【将来组件使用数据的时候就会变得简单】
const getters = {
    //这里面的state,是当前仓库中的state 并非大仓库中的state
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        //  state.searchList.goodsList如果服务器数据返回归来，就是一个数组
        // 假如网络不给力  state.searchList.goodsList 返回的是一个undefined
        // undefined在我们结构哪里遍历数据的时候会出现错误，因此我们计算属性的值至少给一个空的数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}