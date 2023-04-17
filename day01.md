1.Vue-cli :脚手架初始化项目
使用：node + webpack + 淘宝镜像


node_modules文件夹：项目文件依赖
public文件夹：一般放置一些静态资源（图片），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动的打包到dist文件夹中。
src文件夹（程序员源代码文件夹）：

    assets文件夹：一般是放置静态资源（一般放置多个组件共用的静态资源），需要注意的是放置在assets文件夹里面静态资源，在webpack打包的时候，webpack会把静态资源当做一个模块，打包到JS文件里面

    components文件夹：一般放置的是非路由组件（全局组件）

    APP.vue:唯一的根组件

    main.js文件：是入口文件

babel.config.js:配置文件（babel相关）

package.json文件：认为项目‘身份证’ 记录项目的版本信息 项目中的那些依赖

pack-lock.json:缓存性文件

README.md文件：项目的说明性文件


3.项目路由的分析
vue-router
前端所谓路由：kv键值对
key:URL（地址栏中的路径）
value:相应的路由组件
注意：项目上中下结构

路由组件：
Home 首页路由组件、Search路由组件、login登录路由组件、Register注册路由组件

非路由组件：
Header、
Footer[在首页、搜索页] ，但是在登录
|注册|页面是没有

4.完成非路由组件Header与Footer业务
在项目中，不在以HTML+CSS为主，主要搞业务、逻辑
在开发项目的时候：
1：书写静态页面（HTML+CSS）
2：拆分组件
3:获取服务器的数据动态展示
4：完成相应的动态业务逻辑

注意1：创建组件的时候，组件结构+组件的样式+图片资源

注意2：咱们项目采用的less样式，浏览器不识别less样式 只需要通过less less-loader[5版本]进行处理less 把less样式变为css样式 浏览器才可以识别

注意3：如果想让组件识别less 就需要在style中标注lang= "less"

4使用组件的步骤
创建或者定义
引入该组件
注册
使用

5路由组件的创建
    vue-roter
    路由组件分为四个：Home、Search、Login、Resigter
    components文件夹：经常放置非路由组件（全局组件）
    -pages/views/文件夹：放置路由组件

5.1配置路由
    一般我们配置的路由会放置在router中

5.2 路由组件和非路由组件的区别
1. 路由组件一般放置在pages|views文件中，非路由组件一般放置在components文件夹中
2. 路由组件一般需要在router文件夹中注册（使用的即为组件的名字） ，非路由组件在使用的时候，一般是以标签的形式使用 
3.注册玩路由不管是路由组件还是非路由组件，它们身上都有$route、$router属性

$route:一般获取路由信息【路径、query、prams参数等等 】
$router:一般进行编程式导航进行路由跳转【push|replace】

5.3路由的跳转
路由的跳转有两种形式：
    声明式导航router-link，可以进行路由的跳转
    编程式导航push|replace，可以进行路由跳转

    编程式导航：声明式导航能做的，编程式导航都能做
    但是编程式导航处了进行进行路由跳转，还可以做一些其他的业务逻辑


6-Footer组件的显示与隐藏
显示或隐藏组件：v-if|v-show
Footer组件在Home、Search组件的时候显示
Footer组件在登录和注册的时候进行隐藏

6.1 我们可以根据组件身上的$route获取当前路由的信息 通过路由路径判断Footer的显示与隐藏
6.2 配置的路由的时候，我们可以给路由添加路由的元信息【meta】，路由需要配置对象，他的key不能乱写


7)路由传参
7.1路由的跳转方式 
声明式导航：router-link（务必写to守护星）可以实现路由的跳转
编程式导航：利用的是组件实例$router.push|repalce方法，可以实现路由的跳转（书写一些自己的业务）

7.2:路由传参 参数的几种写法
parms参数：属于路径当中的一部分 需要注意在配置路由的时候 需要站位
query参数 不属于路径中的一部分 类似于ajax中的queryString /home?k=v&kv=,不需要站位


8)路由传参相关的面试题
1.路由传参（对象写法）path是否可以可以和params参数结合一起使用
2.如何指定params参数传参和不传参
3.params参数可以传递也可以不传递，但传递的参数是空字符串，如何解决
4.路由组件能否传递props数据