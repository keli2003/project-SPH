// 当前这个模块，API进行统一管理
// 引入二次封装的axios进行（请求拦截器、响应拦截器）
import https from "./request";
import mockRequests from './mockAjax'
// 三级联动接口
// api/product/getBaseCategoryList get请求 无参数
// 发请求：axios 发送请求返回结果是Promise对象
// 当前这个函数只需要把服务器的数据返回
export const reqCategoryList = () => https({ url: '/product/getBaseCategoryList', method: 'get' });

// 获取banner(首页轮播图的接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor')

// 获取搜索search的数据 请求的方式是post  地址：/api/list
// 请求需要带参数
/* 
    请求示例
    {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 当前这个接口 给服务器传递参数params 至少是一个空对象
export const reqGetSearchInfo = (data) => https({
  url: '/list',
  method: 'post',
  data: data
})

// 获取产品信息的接口
export const reqGoodsInfo = (skuId) => https({ url: `/item/${skuId}`, method: 'get' });

// 讲产品添加到购物车中，（获取某一个产品的个数）
export const reqAddOrUpdateShopCar = (skuId, skuNum) => https({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表数据接口
export const reqCartList = () => https({ url: '/cart/cartList', method: 'get' })

// 删除购物车产品的接口
export const reqDeleteCartById = (skuId) => https({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改产品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => https({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码的接口
export const reqGetCode = (phone) => https({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//获取用户注册的接口
export const reqUserRegister = (data) => https({ url: `/user/passport/register`, data, method: 'post' })

// 获取用户登录的接口
export const reqUserLogin = (data) => https({ url: `user/passport/login`, data, method: 'post' })

//获取用户登录的信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => https({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录
export const reqLogout = () => https({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息的接口
export const reqAddress = () => https({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取商品订单交易接口
export const reqOrder = () => https({ url: '/order/auth/trade', method: 'get' })

//提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => https({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 查询支付信息
export const reqPayInfo = (orderId) => https({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取支付订单的状态
export const reqPayStatus = (orderId) => https({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取订单列表 
// /api/order/auth/{page}/{limit} get请求
export const reqMyOrderList = (page, limit) => https({ url: `order/auth/${page}/${limit}`, method: 'get' })