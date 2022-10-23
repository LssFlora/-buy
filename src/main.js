import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入三级菜单全局组件
import TypeNav from '@/components/TypeNav'
// 引入轮播图全局组件
import Carousel from '@/components/Carousel'
// 引入分页器全局组件
import Pagination from '@/components/Pagination'
// 测试
import { reqCategoryList } from '@/api'
// 引入仓库
import store from '@/store'
// 引入mock模拟数据 使其执行一次（只需要执行一次）
import '@/mock/mockServe';
// 引入swiper样式
import 'swiper/css/swiper.css'
// 引入所有api请求
import * as API from "@/api"
// 引入elementui
import { Button, Select, MessageBox } from 'element-ui';
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入懒加载图片
import loadimage from "@/assets/images/lazyload.jpg"


import 'element-ui/lib/theme-chalk/index.css';


reqCategoryList();

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(MessageBox.name, MessageBox)
// 注册element组件
Vue.use(Button)
Vue.use(Select)
// 注册MessageBox需要用到的$alert
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 注册懒加载插件
Vue.use(VueLazyload, {
  loading: loadimage,
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由：写法kv一致，省略v
  router,
  store,
  beforeCreate() {
    // 全局事件总线
    // $bus
    Vue.prototype.$bus = this
    // 将所有api请求函数统一暴露一次，之后在各组件中不用再单独引入请求函数
    Vue.prototype.$API = API
  }
}).$mount('#app')
