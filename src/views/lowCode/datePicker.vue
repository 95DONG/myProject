<template>
  <div>
    <el-date-picker
      v-model="value1"
      :picker-options="pickerOptions1"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期"
      @change="changeValue"
    >
    </el-date-picker>
    <el-date-picker
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions2"
    >
    </el-date-picker>
    <div id="box">333</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 屏幕宽度
      screenWidth: window.innerWidth,
      // 屏幕高度
      screenHeight: window.innerHeight,
      value1: "",
      value2: "",
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
      },
      pickerOptions2: {
        disabledDate: this.disabledDate
      }
    }
  },
  created () {
  },
  mounted () {
    var toolBox = document.getElementById('box').getBoundingClientRect();
    // console.log(toolBox)
    // 监听屏幕宽度和高度变化
    window.addEventListener('resize', this.handleResize, true)
  },
  methods: {
    changeValue (time) {
      // this.disabledDate(time)
    },
    disabledDate (time) {
      let timeNow = this.value1
      let arr = timeNow.split('-')
      arr[1] = arr[1] - 1
      // console.log(arr)
      return time.getTime() > Date.UTC(...arr)
    },
    handleResize () {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      // console.log(window.innerWidth, window.innerHeight)
    },
  },
  // 销毁监听
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize);
  },

}
</script>

<style>
</style>
