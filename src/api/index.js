// 统一管理项目接口模块
// 引入二次封装的axios（带有请求，相应拦截器）
import requests from './request'
// 引入mock二次封装的axios
import mockRequest from './mockRequest'

export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

// 获取banner
export const reqGetBannerList = () => mockRequest.get('/banner')
// 获取floor
export const reqFloorList = () => mockRequest.get('/floor')
// 获取搜索数据
// 当前这个接口中的params参数至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: "post", data: params })
// 获取商品详情数据
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" })
// 购物车发请求，将购物车参数存数据库
export const reqGetCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })
// 获取购物车数据库数据
export const reqGetCartList = () => requests({ url: `/cart/cartList`, method: "get" })
// 删除购物车数据
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })
// 修改购物车产品选中状态
export const reqCheckCart = (skuID, isChecked) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: "get" })
// 登录注册时获取验证吗
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })
// 注册
export const reqRegister = (data) => requests({ url: `/user/passport/register`, data, method: "post" })
// 登录
export const reqLogin = (data) => requests({ url: `/user/passport/login`, data, method: "post" })
// 登录后发请求拿到用户名等信息
export const reqGetUser = () => requests({ url: `/user/passport/auth/getUserInfo`, method: "get" })
// 退出登录
export const reqLoginOut = () => requests({ url: `/user/passport/logout`, method: "get" })
// 获取用户地址配送信息
export const reqGetAddress = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: "get" })
// 获取订单页面信息
export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: "get" })
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" })
// 获取订单支付信息
export const reqGetPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })
// 获取支付结果
export const reqGetPayRes = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })
// 获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: "get" })