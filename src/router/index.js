import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由配置信息
import routes from "./routes"

// 使用插件
Vue.use(VueRouter)
// 重写VueRouter.prototype身上的push方法
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

// 配置路由
// const router =
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 若有token，即登陆了，则不可以再跳转到登录页面
    if (token) {
        if (to.path == "/login") {
            next("/home")
        } else {
            // 若登录，还需判断是否拿到用户信息才能正常跳转
            // 有信息则正常跳转
            if (name) {
                next()
            } else {
                // 没有信息。重新发请求拿信息
                try {
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    // 发请求拿信息失败说明token失效，则退出重新登录
                    await store.dispatch("loginOut")
                    next("/login")

                }
            }
        }
    } else {
        // 未登录不能去交易、支付、个人中心
        let toPath = to.path;
        if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/paysuccess") != -1 || toPath.indexOf("/center") != -1) {
            next("/login?redirect=" + toPath)
        } else {
            next()
        }
    }
})
export default router