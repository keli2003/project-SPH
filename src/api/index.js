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