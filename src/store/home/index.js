// home模块的小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
const actions = {
    // 通过API里的接口函数调用，向服务器发起请求，获取数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code >= 200 && result.code < 300) {
            commit("CATEGORYLIST", result.data)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
const state = {
    // state中数据默认初始值类型一定要和服务器返回类型匹配
    categoryList: [],
    bannerList: [],
    floorList: []
};
const getters = {};
export default {
    actions,
    mutations,
    state,
    getters
}
