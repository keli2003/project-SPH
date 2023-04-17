<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- 声明式导航务必要有to属性 -->
            <router-link to="/Login">登录</router-link>
            <router-link to="/Resigter" class="registers">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/Home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <!-- 这里跳转到search要做部分业务逻辑，所以使用编程式导航 -->
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    // 点击按钮  向search路由发起跳转
    goSearch() {
      +(
        // 跳转的同时并进行传参  不要忘0记加斜杠   要有占位符params传参
        // 第一种形式 字符串类型
        // this.$router.push('/search/' +this.keyword +'?k='+this.keyword.toUpperCase()),
        // 第二种形式 模板字符串形式  外层就是字符串 ${} 里面就是js语句
        // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
        // 第三种方案  对象的方式  需要在对应路由中加一个name属性
        // this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:222}})
        this.$router.push(
          {
            name: "search",
            params: { keyword: this.keyword || undefined },
            query: { k: this.keyword.toUpperCase() },
          },
          () => {},
          () => {}
        )
      );
    },
  },
  // methods: {
  //   //搜索按钮的回调函数，需要向search路由进行跳转
  //   goSearch() {
  //     //  路由传递参数：
  //     //  第一种：字符串写法形式
  //     // this.$router.push(
  //     //   "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
  //     // );
  //     // 第二中方式：模板字符号写法
  //     // this.$router.push(
  //     //   `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
  //     // );
  //     // 第三种方式 对象的写法
  //     // this.$router.push({
  //     //   name: "search",
  //     //   params: { keyword: this.keyword },
  //     //   query: { k: this.keyword.toUpperCase() },
  //     // });
  //     /* ********************************************************* */
  //     // 面试题
  //     // 1.路由传参（对象写法）path是否可以可以和params参数结合一起使用
  //     // 答：路由传递参数的时候，对象的这种写法可以是name、path形式，但是需要注意的是：path不能和params参数一起使用
  //     // this.$router.push({
  //     //   path: "search",
  //     //   params: { keyword: this.keyword },
  //     //   query: { K: this.keyword.toUpperCase() },
  //     // });
  //     // 2.如何指定params参数传参和不传参
  //     // 如果路由传递params参数的时候，自己没有传入params参数，就会发现一个问题，那就是URL有问题
  //     //  如何指定params参数可传递与不传递 ，我们需要在配置的时候，在占位的后面加上一个问号？【？代表params参数可传递与不传递】
  //     // this.$router.push({
  //     //   name: "serach",
  //     //   query: { k: this.keyword.toUpperCase() },
  //     // });
  //     // 3.params参数可以传递也可以不传递，但传递的参数是空字符串，如何解决
  //     // 使用undefined 解决：params参数可传与不传 或者传递的是空字符串（''）
  //     // this.$router.push({
  //     //   name: "search",
  //     //   params: { keyword: "" || undefined },
  //     //   query: { k: this.keyword.toUpperCase() },
  //     // });
  //     // 4.路由组件能否传递props数据
  //     this.$router.push({
  //       name: "search",
  //       params: { keyword: this.keyword || undefined },
  //       query: { K: this.keyword.toUpperCase() },
  //     });
  //   },
  // },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>