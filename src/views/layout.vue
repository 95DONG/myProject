<!--
 * @Descripttion:
 * @version:
 * @Author: SunHouxuan
 * @Date: 2024-12-09 10:52:34
 * @LastEditors: SunHouxuan
 * @LastEditTime: 2024-12-09 10:58:20
-->
<!--  -->
<template>
  <div class="layout">
    <router-view />
  </div>
</template>

<script>

export default {
  data () {
    //这里存放数据
    return {

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  width: 100%;
  // height: 700px;
  // width: 600px;
}
* {
  margin: 0;
  padding: 0;
}
</style>
