<template>
  <div class="page-component__scroll">
    <el-button type="primary" @click="changeNum" style="margin-left: 50px"
      >变化</el-button
    >
    <el-input v-model.number="num" type="number"></el-input>
    <!-- 盒子 -->
    <div
      style="
        width: 30px;
        border: 1px solid #e6e6e6;
        height: 30px;
        position: relative;
      "
    >
      <div
        :style="'position: absolute; top: ' + testTop + 'px; transition: 200ms'"
      >
        <div
          v-for="n in numberItem"
          :key="n"
          style="
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          {{ n }}
        </div>
      </div>
    </div>
    <el-backtop
      target=".page-component__scroll .el-scrollbar__wrap"
      :bottom="100"
    >
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transition: '2000ms',
      numberItem: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ',', '.', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ',', '.', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ',', '.'],
      testTop: -30
    };
  },
  created () {
  },
  watch: {
  },
  methods: {
    changeNum () {
      this.handelerChange = true
      this.num += 16
      this.testTop -= 30

    },
  }
};
</script>

<style scoped>
.bigBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.itemBox {
  width: 20px;
  height: 30px;
  border: 1px solid #333;
  position: relative;
  overflow: hidden;
}
.item {
  display: flex;
  flex-direction: column;
  position: absolute;
  /* transition: 2000ms; */
  top: 0px;
}
.item div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 30px;
}
</style>
