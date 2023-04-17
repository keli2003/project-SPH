    1.编程式路由跳转到当前路由（参数不变），多次执行抛出NavigationDuplicated的警告错误？ 
    --路由跳转有两种方式：声明式导航、编程式导航
    --声明式导航没有这类问题，因为vue-router底层已经处理好了
    1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误？
    最新版的vue-router引入promise
    
    1.2通过给push方法传递相应的成功、失败的回调函数 ，可以捕获到当前的错误，这样我们就可以解决
    
    1.3通过底部的代码，我们可以解决这种错误
     this.$router.push(
        {
          name: "search",
          params: { keyword: this.keyword || undefined },
          query: { K: this.keyword.toUpperCase() },
        },
        () => {},
        (error) => {
          console.log(error);
        }
      );

      这种写法：治标不治本 将来在别的组件中push|replace编程式导航还是会有这种错误
    
    1.4
    this:当前组件实例（search）
    this.$router属性：当前的这个属性，属性值VueRouter类的一个实例


    2:Home模块组件拆分
    --静态页面完成
    --拆分出静态组件
    --获取服务器的数据进行展示
    --动态业务

    3:三级联动组件完成
    --由于三级联动 在Home、Search、Detail 把三级联动注册为全局组件
    好处：只需要注册一次 就可以在项目任意地方使用

    4完成静态资源
    HTML+CSS+图片资源

    5POSTMAN测试接口
    --服务器返回的数据code字段是200  代表服务器返回数据成功
    --整个项目 接口前缀都有/api字样

    6.:axios二次封装
    XMLHttpRequest、fetch、JQ、axios
    6.1 为什么需要axios进行二次封装？
    请求拦截器、相应拦截器  响拦截器可以在发送请求前处理一些业务 响应拦截器 当服务器数据返回之后，可以处理一些事情


    6.2在项目当中经常API文件夹【axios】
      接口当中 ：路径都带有/api
      baseURL:"/api"

    7.接口统一管理
    7.1跨域问题
    什么是跨域：协议、端口号、域名 不一致的时候 我们称之为跨域

    跨域的解决方法：JSONP cros 代理服务器

    8 nprogress进度条的使用
    start开始 done结束

    9：vuex状态管理库

    vuex是官方提供一个插件 状态管理库 集中式管理项目中组件共用的数据
    切记 并不是全部项目适用于vuex 如果项目很小 完全不需要vuex 如果项目很大 组件很多 数据很多 数据维护很费劲 Vuex就是不错的选择

    state mutations actions getters modules
    state:仓库管理数据 
    mutations :仓库数据修改的唯一手段
    actions: 处理actions 可以书写自己的业务逻辑 也可以执行处理异步任务
    getters:可以理解为计算属性  用户简化仓库数据 让组件获取数据更为简单

    9.2vuex的基本使用
    npm i vuex@3 安装vuex3版本 创建store文件夹 存放vuex内容 注册插件  使用插件
    9.3 vuex实现模块发开发
    如果项目过大 组件过多 接口也很多 数据也多 可以使用vuex进行模块化开发 
    
    modules:{
      home:{},
      search:{}
    }


    10:完成TypeNav三级联动展示数据业务