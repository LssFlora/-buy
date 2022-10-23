import { reqGetAddress, reqOrderInfo } from "@/api"
const actions = {
    async getAddress({ commit }) {
        let result = await reqGetAddress();
        if (result.code == 200) {
            commit("GETADDRESS", result.data)
            return "ok"
        }
    },
    // 获得结算的订单信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit("GETORDERINFO", result.data)
            return "ok"
        }
    }
}
const mutations = {
    // 拿配送地址
    GETADDRESS(state, data) {
        state.address = data

    },
    // 拿计算订单信息
    GETORDERINFO(state, data) {
        state.orderInfo = data
    }

}
const state = {
    address: [],
    orderInfo: ""
}
const getters = {
    orderDetail(state) {
        return state.orderInfo.detailArrayList || []
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}