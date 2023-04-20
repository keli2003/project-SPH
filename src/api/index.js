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