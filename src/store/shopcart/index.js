import { reqGetCartList, reqDeleteCart, reqCheckCart } from "@/api";
const actions = {
    // 拿到购物车数据
    async getCartList({ commit }) {
        let result = await reqGetCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
            // sessionStorage.setItem("CARTLIST", JSON.stringify(result.data))
        } else {
            Promise.reject(new Error('faile'))
        }
    },
    // 删除单个购物车商品
    async deleteCart({ commit }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code == 200) {
            console.log("ok");
        } else {
            console.log("no");
        }
    },
    // 修改购物车商品勾选状态
    async checkCart({ commit }, { skuId, isChecked }) {
        let result = await reqCheckCart(skuId, isChecked);
        if (result.code == 200) {
            return "ok"
        } else {
            return "err"
        }
    },
    // 删除全部选中的商品
    async deleteAllChecked({ dispatch, getters }) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(cart => {
            let promise = cart.isChecked == 1 ? dispatch("deleteCart", cart.skuId) : ''
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    // 通过全选按钮使所有商品状态统一
    async changeAllCart({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach((cart) => {
            // console.log(cart.isChecked);
            // console.log(cart.isChecked != isChecked);
            if (cart.isChecked != isChecked) {
                let promise = dispatch("checkCart", { skuId: cart.skuId, isChecked: isChecked });
                promiseAll.push(promise)
            }
        })
        return Promise.all(promiseAll)
    }
};
const mutations = {
    GETCARTLIST(state, data) {
        state.cartList = data;
    },
};
const state = {
    cartList: []
};
const getters = {
    cartList(state) {
        // console.log(state.cartList[0]);
        return state.cartList[0] || {}
    },
    // // 得到数据库真正数据
    // cartInfoList(state) {
    //     // console.log(state.cartList[0].cartInfoList);
    //     // console.log(JSON.parse(sessionStorage.getItem("CARTLIST"))[0].cartInfoList);
    //     return state.cartList[0].cartInfoList || {}
    //     // return state.cartList[0].cartInfoList || JSON.parse(sessionStorage.getItem("CARTLIST"))[0].cartInfoList
    // }
}
export default {
    actions,
    mutations,
    state,
    getters
}