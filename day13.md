1)个人中心完成
面试的时候 是否封装过组件、分页器、日历
个人中心当中的：分页器

2)全局守卫

未登录，交易相关（trade）支付相关（pay,paysuccess） 用户中心（center）相关跳转到登录页面


3）路由独享守卫

json和图片是默认暴露的

4）图片懒加载（提升性能）
使用vue-lzaylaod插件

自定义插件：

vee-validate的基本使用 这个是解决用户注册时的表单验证
安装@2版本的

由于main.js文件里面的内容过多，所以创建一个plugins文件夹专门存储插件 

创建validate文件  里面引入vue 和 下载的插件  让后全局使用

在main文件中 直接引入

5）表单验证 使用的是vee-validate插件  在plugins文件夹中存放了了validate文件  里面常见的信息zh-CN 中文

6)路由懒加载

7）项目打包
打包使用npm run build
项目打包后 代码是经过压缩加密的 如果运行时报错 输出错误信息无法
准确得到是哪里的代码出现错误的。
有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错
所以该文件项目不需要是可以去掉的

vue.configs.js配置
productionSourceMap:false



8）购买服务器 配置xsheel xftps 将项目上线

9）反向代理Nginx
nginx配置：
1.xshell进入根目录/etc
2:进入etc目录，这个目录下又有一个nginx目录，进入到这个目录【已经安装过nginx:如果没有安装，需要四五个文件】
3：如果想安装ngnix：yum install ngnix
4:安装完ngnix服务器以后 发现在ngnix目录下，多了一个ngnix.conf文件 在这个文件中进行配置
5：vim ngnix.conf进行编辑 主要添加如下两项
解决第一个问题：
location / {
    root /root/jch/www/shangpinhui/dist
    index index.html;
    try_files $url/ /index.html;
}
解决第二个问题 
location /api{
    proxy_pass http://gmall-h5-api.atguigu.cn
}

6:ngnix服务器跑起来
service nginx start
