<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件委托 -->
      <div @mouseleave="leaveShow()" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类  -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{
                        c2.categoryName
                      }}</router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{
                          c3.categoryName
                        }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入节流模块
import throttle from "lodash/throttle";
export default {
  data() {
    return {
      // 存储用户移上那个一级菜单
      currentIndex: -1,
      show: true,
    };
  },
  name: "TypeNav",
  //组件挂载完毕，可以向服务器发送请求
  mounted() {
    // 当组件挂载成功，使show变为false
    // 判断当前路由组件是否为Home,如果是就显示 如果不是就隐藏
    if (this.$route.path != "/Home") {
      this.show = false;
    } else {
      this.show = true;
    }
  },
  computed: {
    ...mapState({
      //右侧是一个函数 当使用计算属性的时候 他会立即执行一次
      // 注入一个参数state 即是大仓库中的数据
      categoryList: (state) => {
        // console.log(state.home.state);
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // throttle回调函数不能使用箭头函数 ，this的指向问题
    changeIndex: throttle(function (index) {
      // 鼠标移入某一个一级菜单显示的对应索引值
      this.currentIndex = index;
      // 正常情况（用户过慢）：鼠标计入，每一个一级分类，都会触发鼠标进入事件
      // 非正常情况（用户操作很快）：本身全部的一级分类应该触发鼠标进入事件，但是经过测试 只有部分h3触发
      // 用户行为过快：导致浏览器反应不过来，如果当前回调函数中有一些大量的业务 有可能出现卡顿的现象
    }, 50),
    leaveShow() {
      // 一级分类鼠标移除的事件回调
      this.currentIndex = -1;
      if (this.$route.path != "/Home") {
        this.show = false;
      }
    },
    goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      // 利用事件委派存在一些问题：1：点击一定是a标签 2：如何获取参数【一级、二级、三级分类的产品的名字、id】
      // this.$router.push("/search");

      // 获取到当前出发这个事件的节点
      let node = event.target;

      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        // 整理完参数
        // 判断：如果路由跳转的时候 带有params参数 捎带参数传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 动态给location配置对象添加query属性
          location.query = query;
          // 路由进行跳转
          this.$router.push(location);
        }
        //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
      }
    },
    // 当鼠标移入的时候，让商品列表进行展示
    enterShow() {
      if (this.$route.path != "/Home") {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    a {
      &:hover {
        text-decoration: none;
      }
    }
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        // 第一种解决方案 使用style样式
        // .item:hover {
        //   background-color: skyblue;
        // }
        // 第二种解决方案 使用添加类名
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始的状态（进入）
    .sort-enter,
    .sort-leave-to {
      height: 0px;
    }
    // 过渡动画结束的状态
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    // 定义动画的时间、速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>