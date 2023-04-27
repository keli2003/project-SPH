<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread ：面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 点击品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 添加自定义事件 子=>父传递参数 -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 使用声明式导航跳转到详情页并带入该产品的id -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",

  components: {
    SearchSelector,
  },
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级分类的id
        category1Id: "",
        // 二级分类的id
        category2Id: "",
        // 三级分类的id
        category3Id: "",
        // 分类的名字
        categoryName: "",
        // 搜索关键字
        keyword: "",
        // 排序 初始值应该是综合降序
        order: "1:desc",
        // 分页器。代表是第几页
        pageNo: 1,
        // 当前页数显示的数据
        pageSize: 5,
        // 平台售卖的属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 在组件挂载之前执行一次【先与mounted之前】
  beforeMount() {
    // 合并参数
    // 复杂写法
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;
    // 简单写法
    // 在发送请求之前，把接口需要传递的参数 进行整理（服务器请求之前，整理好数据 ，服务器就会返回查询的数据）
    // Object.assign(this.searchParams, this.$route.query, this.$route.params);
    this.getArgument();
  },
  mounted() {
    // 在发请求之前带给服务器参数【searchParams参数发生变化有数值给服务器】
    this.getData();
  },
  computed: {
    // mapGetters里面的写法，传递的是数据 因为Getters计算属性是没有划分模块的
    ...mapGetters(["goodsList", "attrsList", "trademarkList"]),

    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    // 升序
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    // 降序
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },

    // 获取search下的总共多少条数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 向服务器发送请求获取search数据（根据参数不同返回不同数据进行展示）
    // 把请求封装为函数 ，如果使用的时候进行调用
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    getArgument() {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
    },
    getEmpty() {
      // 带给服务器的参数可有可无,如果属性值为空的字符段还是会把相应的字段返回给服务器，
      // 如果把相应的字段变为undefined 就不会把该字段返回给服务器
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    // 删除分类的面包屑
    removeCategoryName() {
      //在这里我们把服务器给的参数置空，我们还需要重新向服务器发送请求
      // 带给服务器的参数可有可无,如果属性值为空的字符段还是会把相应的字段返回给服务器，
      // 如果把相应的字段变为undefined 就不会把该字段返回给服务器 减少宽带的使用
      this.searchParams.categoryName = undefined;
      this.getEmpty();
      this.getData();
      // 地址栏需要修改 使用路由跳转 （自己跳自己 删除的是query参数）
      // 判断是否有传入的params参数 如果路由中存在params参数 不应该删除 路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字的面包屑
    removeKeyword() {
      // 给服务器带的参数searchParams的keyword参数置空
      this.searchParams.keyword = undefined;
      // 再次发送请求
      this.getData();
      // 通知兄弟组件header清除关键字
      this.$bus.$emit("clear");

      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //自定义事件回调
    trademarkInfo(trademark) {
      // 整理品牌的参数 品牌id:品牌名称
      console.log("我是父组件", trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发送请求获取相应数据
      this.getData();
    },
    // 删除品牌的面包屑
    removeTrademark() {
      // 将品牌信息置空
      this.searchParams.trademark = undefined;
      // 再次发送请求
      this.getData();
    },
    //收集平台属性的回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      // ["属性Id:属性名：属性值"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      // 再次发送请求
      this.getData();
    },
    // 删除平台售卖的属性
    removeAttr(index) {
      // 再次整理参数
      this.searchParams.props.splice(index, 1);
      // 再次发送请求
      this.getData();
    },
    // 排序
    changeOrder(flag) {
      // flag形参 他是一个标记 代表用户点击的是综合还是价格
      let orginOrder = this.searchParams.order;
      // 获取起始的状态
      let orginFlag = this.searchParams.order.split(":")[0];
      let orginSort = this.searchParams.order.split(":")[1];

      //创建一个新的属性
      let newOrder = "";
      //点击的一定是综合
      if (flag == orginFlag) {
        newOrder = `${orginFlag}:${orginSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 点击的是价格
        newOrder = `${flag}:${"desc"}`;
      }
      // 将newOrder中的值重新赋值给searchParams
      this.searchParams.order = newOrder;
      // 重新发请求
      this.getData();
    },
    // 自定义事件回调的函数 -- 获取当前是第几页
    getPageNo(pageNo) {
      //整理服务器带的参数
      this.searchParams.pageNo = pageNo;
      // 再次发送请求
      this.getData();
    },
  },
  // 数据监听：监听组件身上的属性和属性值是否发生变化

  watch: {
    // 监听路由信息，是否发生变化，如果发生变化，就再次请求服务器
    $route(newValue, oldValue) {
      // 再次发送请求之前整理参数
      this.getArgument();
      // console.log(this.searchParams);
      // 在次发送ajax请求
      this.getData();
      // 每一次请求完毕，应该把相应的1、2、3级id置空 让它接收对应的id
      this.getEmpty();
    },
  },
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 12px;
}
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 0px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>