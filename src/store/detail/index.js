import { reqGoodsInfo } from "@/api";
import { reqGetCart } from "@/api";
import { getUUID } from "@/utils/uuid_token"

const actions = {
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    // 加入购物车的请求
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 执行结果返回就是一个Promise
        let result = await reqGetCart(skuId, skuNum);
        if (result.code == 200) {
            return "ok"
        }
        else {
            // 失败返回错误，
            return Promise.reject(new Error('faile'))
        }
    }
};
const mutations = {
    GETGOODINFO(state, data) {
        state.goodInfo = data;
    }
};
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
};
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        // console.log(state.goodInfo.skuInfo);
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}