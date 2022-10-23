import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const actions = {
    async getSearchList({ commit }, params) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const state = {
    searchList: {}
};
// 计算属性
// 在项目中getters得到主要作用是：简化仓库中的数据，将来用数据更方便
const getters = {
    // 假如没网时，state.searchList.goodsList值为undefined
    goodsList(state) {//state是默认参数，表示当前仓库state
        return state.searchList.goodsList
    },
    attrsList(state) {
        return state.searchList.attrsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    }
};
export default {
    actions,
    mutations,
    state,
    getters
}
