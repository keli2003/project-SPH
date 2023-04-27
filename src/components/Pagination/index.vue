<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: paheNo == 1 }"
    >
  
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button 
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
       v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 父组件传递给子组件的参数 当前的页码、每一页展示多少条数据、数据总共的个数、连续的页码
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页码的起始数字和最后的数字[连续页码的数字：至少是5]
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this;
      // 先定义两个变量存储起始数字和结束数字
      let start = 0;
      let end = 0;

      //连续页面至少是5
      // 不正常现象：【总页数没有连续页码多】
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象【连续页码大于总页数】
        // 其实数字
        start = pageNo - parseInt(continues / 2);
        // 结束数字
        end = pageNo + parseInt(continues / 2);

        // 判断一下 [数字不能是0或者是负数]
        // 约束起始 非正常情况【pageNo:1、2】
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 约束结束 非正常条件【pageNo:32、33】
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #f40;
      color: #fff;
    }
  }
}
</style>
