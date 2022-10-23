// 对axios进行二次封装
// 引入
import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"

// 创建axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时会自动加上这一段
    baseURL: "/mock",
    // 设置请求超时时间
    timeout: 5000
});
// 设置请求拦截器：在发请求前，请求拦截器可以检测到，使在请求发出前做一些事情
requests.interceptors.request.use((config) => {
    // 要做的事
    nProgress.start();
    return config
});

// 设置响应拦截器
requests.interceptors.response.use(
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，做一些事情
    (res) => {
        nProgress.done();
        return res.data
    },
    // 失败的回调函数
    (error) => {
        return Promise.reject(new Error('faile'));
    }
)
// 对外暴露
export default requests;