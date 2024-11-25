<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "consoleTable",
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    console.table(this.tableData);
    console.warn('333');
    console.error('222');
  },
  methods: {
    //使用递归实现深拷贝
    deepClone (obj) {
      //判断拷贝的obj是对象还是数组
      var objClone = Array.isArray(obj) ? [] : {}
      if (obj && typeof obj === "object") { //obj不能为空，并且是对象或者是数组 因为null也是object
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === "object") { //obj里面属性值不为空并且还是对象，进行深度拷贝
              objClone[key] = deepClone(obj[key]) //递归进行深度的拷贝
            } else {
              objClone[key] = obj[key] //直接拷贝
            }
          }
        }
      }
      return objClone;
    }
  }
}
</script>
