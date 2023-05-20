// 对于axios进行二次封装
import axios from "axios";

// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css'
// start进度条开始  done进度条消失
import store from "@/store";



// 1.利用axios对象的方法create 去创建一个axios实例
// 2.request就是axios我们进行配置一下
const https = axios.create({
    // 配置对象
    // 基础路径 发送请求的时候 路径当中会出现api
    baseURL: "/api",
    // 代表请求超时的时间5s
    timeout: 5000
})

// 请求拦截器：在发送请求的时候 请求拦截器可以拦截到 可以在请求之前做一些事情

// 请求头
https.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start()

    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段（userTempId）
        config.headers.userTempId = store.state.detail.uuid_token
    }

    // 需要携带token给服务器 给请求头设置token
    if (store.state.User.token) {
        config.headers.token = store.state.User.token
    }
    // config：配置对象，里面有一个非常重要的属性 headers 请求头
    return config


})

// 响应拦截器

https.interceptors.response.use((res) => {

    // 进度条消失
    nprogress.done()
    // 成功的回调函数 服务器响应数据回来以后 响应拦截器可以检测到  可以做一些业务逻辑
    return res.data

}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

export default https;