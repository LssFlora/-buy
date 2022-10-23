import { reqGetCode, reqRegister, reqLogin, reqGetUser, reqLoginOut } from "@/api"
import VueXAlong from 'vuex-along'
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
        }
    },
    // 注册
    async register({ commit }, { phone, password, code }) {
        let result = await reqRegister({ phone, password, code })
        if (result.code == 200) {
            return "ok"
        }
    },
    // 登录
    async login({ commit }, { phone, password }) {
        let result = await reqLogin({ phone, password });
        // console.log(result.data.token);
        if (result.code == 200) {
            // setLocalToken(result.data.token)
            commit("LOGIN", result.data.token)
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 登录后发请求拿信息
    async getUserInfo({ commit }) {
        let result = await reqGetUser()
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
        }
    },
    // 退出登录
    async loginOut({ commit }) {
        console.log(333);
        let result = await reqLoginOut();
        if (result.code == 200) {
            console.log(444);
            commit("LOGINOUT")
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations = {
    GETCODE(state, data) {
        state.code = data
    },
    LOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, data) {
        state.userInfo = data
    },
    LOGINOUT(state) {
        state.code = "";
        state.userInfo = {};
        state.token = ""
    }
}
const state = {
    code: "",
    userInfo: "",
    token: ""
}
const getters = {
}
export default {
    actions,
    mutations,
    state,
    getters
}