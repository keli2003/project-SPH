1)交易页面完成（商品清单）
动态展示服务器的数据

2）提交订单
支付静态组件完成
点击提交订单的按钮 需要象服务器发送请求【把支付的信息给服务器】
不使用vuex, 在main.js文件中统一引入API文件夹 这样全局都可以使用API里面的请求函数

3）获取支付信息（不在使用Vuex）
不要在生命周期函数中使用async函数
获取支付信息

4）elementUI+按需引入

elementUI按需引入 