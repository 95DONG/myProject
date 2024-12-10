<template>
  <div>
    <div class="bigBox">
      <div class="itemBox" v-for="(item, index) in showArr" :key="index">
        <div
          class="item"
          :style="{ top: '-' + item * 3 + '0px', transition: transition }"
        >
          <div>0</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>,</div>
          <div>.</div>
          <div>0</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>,</div>
          <div>.</div>
          <div>0</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>,</div>
          <div>.</div>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 12378.15,
      showArr: [12, 12, 12, 22, 12, 22, 12, 12],
      arr: [1, 0, 3, 0, 0, '.', 0, 0],
      arr1: [],
      group: 'balance',
      handelerChange: false,
      transition: '2000ms',
      numberItem: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ',', '.', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ',', '.', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ',', '.'],
      testTop: -30
    };
  },
  created () {
  },
  watch: {
    num (n, o) {
      // console.log(n, o, 'n,o')
      this.group = (n - o) > 0 ? 'up' : 'down'
      this.moveUp(n, o)
    }
  },
  methods: {
    changeNum () {
      this.handelerChange = true
      this.num += 16
      this.testTop -= 30

    },
    getArr (num) {
      return String(num).split('').map((item, index) => {
        // 设置初始位置 放置到中间位置
        return item === ',' ? 22 : item === '.' ? 23 : item * 1 + 12
      })
    },
    moveUp (num, num1) {
      this.arr = this.getArr(num)
      this.arr1 = this.getArr(num1)
      // console.log(this.arr, this.arr1)
      this.showArr = []

      this.arr.forEach((item, index) => {
        // 判断数值是否变大
        this.showArr[index] = this.group === 'up' ? item * 1 + 12 : this.group === 'down' ? item * 1 - 12 : item
      })

      setTimeout(() => {
        this.transition = '0s'
        // 回到中间位置 回到初始值
        this.showArr = this.showArr.map((item) => {
          return this.group === 'up' ? item * 1 - 12 : this.group === 'down' ? item * 1 + 12 : item
        })
        setTimeout(() => {
          this.transition = '2000ms'
        }, 100);
      }, 2000);
    }
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
