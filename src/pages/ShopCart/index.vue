<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCartChecked && cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn"> 结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 获取个人购物车数据
      this.$store.dispatch("getCartList");
    },
    // 修改产品的个数【添加节流操作】
    handler: throttle(async function (type, disNum, cart) {
      // type区别操作的三个元素
      // disNum 是为了+变化量 1  -变化量 -1 ， input是最终的个数（不是变化的数量）
      // cart是产品的id 操作的是哪个产品
      // console.log("派发actions，通知服务器修改个数", type, disNum, cart);
      // 向服务器发送请求 修改数量
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          // 判断产品个数是否大于1 ，如果大于1就传递给服务器-1 否则就传递给服务器0
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 用户输入最终的量如果是非法的（出现汉字和负数） 带给服务器的数字是零
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 用户输入最终的量如果是小数（取整）  带个服务器的变化的量 是输入的量-本来存在的数量
            parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      //派发actions请求
      try {
        // 代表修改成功
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 再次获取服务器数据进行展示
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),

    // 删除某一个产品的操作
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
        // 删除成功 获取新的数据列表进行展示
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    async updateChecked(cart, event) {
      // 带个服务器的参数isChecked 返回的不是布尔值  而是0|1
      try {
        // 如果修改数据成功 再次获取服务器数据（购物车）
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除全部选中的商品
    async deleteAllCheckedCart() {
      try {
        // 派发actions请求
        await this.$store.dispatch("deleteAllCeheckedCart");
        // 重新刷新购物车列表
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改全部商品的选中状态
    async updateAllCartChecked(event) {
      // console.log(checked);
      try {
        let isChecked = event.target.checked ? "1" : "0";
        // 派发actions请求
        await this.$store.dispatch("updateAllCartIsChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.cartPrice;
      });
      return sum;
    },
    // 判断底部复选框是否选中
    isCartChecked() {
      //购物车里面的数据进行过滤(勾选)，如果勾选的商品与购物车商品总数相等。全选勾选！相反不够！！！
      return (
        this.cartInfoList.filter((item) => item.isChecked == "1").length ===
        this.cartInfoList.length
      );
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
          .price {
            display: block;
            margin-top: 30px;
          }
        }

        .cart-list-con5 {
          width: 17%;
          margin-top: 20px;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;
          margin-top: 20px;
          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>