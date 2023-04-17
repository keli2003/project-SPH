// 当前这个模块，API进行统一管理
import https from "./request";

// 三级联动接口
// api/product/getBaseCategoryList get请求 无参数
// 发请求：axios 发送请求返回结果是Promise对象
export const reqCategoryList = () => https({ url: '/product/getBaseCategoryList', method: 'get' });