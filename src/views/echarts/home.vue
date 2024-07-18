<template>
  <div class="home">
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.getChart()
  },
  methods: {
    getChart () {
      // 基于准备好的dom，初始化echarts实例
      console.log(document.getElementById('main'), this.$echarts)
      var myChart = this.$echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '首页'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
      // 给window添加resize监听事件，当平怒尺寸发生变化时重置
      window.addEventListener("resize", () => {
        myChart.resize();
      })

    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#main {
  width: 100%;
  height: 100%;
}
</style>
