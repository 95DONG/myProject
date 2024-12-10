<template>
  <div>
    <button @click="$refs.fileInput.click()">导入</button>
    <button
      @click="
        xlsxExport([
          ['name', 'value'],
          ['张三', 12],
          ['李四', 99],
        ])
      "
    >
      导出
    </button>
    <button
      @click="
        xlsxExport([
          {
            id: 1,
            name: '张三',
            money: 99999.99,
            rate: 0.999,
            date: '2023/09/18',
            state: '待处置',
          },
        ])
      "
    >
      导出
    </button>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="xlsxImport"
      accept=".xls,.xlsx"
    />
    <div style="display: flex; box-sizing: border-box; padding: 0 20px">
      <div style="margin-right: 20px; flex: 1">
        <el-input
          id="textarea"
          v-model="value1"
          type="textarea"
          placeholder=""
          :rows="10"
        ></el-input>
        <el-button @click="getObj(value1)">一键复制</el-button>
      </div>
      <div style="flex: 1">
        <el-input
          v-model="value2"
          type="textarea"
          placeholder=""
          :rows="10"
        ></el-input>
        <el-button @click="getObj(value2)">一键复制</el-button>
      </div>
    </div>
  </div>
</template>
<!--  -->
<script>
export default {
  data () {
    return {
      value1: `[{ 'id': 1, 'name': '张三', 'money': 99999.99, 'rate': 0.999, 'date': '2023/09/18', 'state': '待处置' }]`,
      value2: `[{ 'id': 1, 'name': '张三', 'money': 99999.99, 'rate': 0.999, 'date': '2023/09/18', 'state': '待处置' }]`,


    }
  },
  created () {
    this.obj()
  },
  methods: {
    // 导入文件
    xlsxImport (e) {
      if (e.target.files.length === 0) {
        console.log("未选中文件，不进行导入操作");
        return;
      }
      let fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          let data = ev.target.result
          let workbook = XLSX.read(data, {
            type: "binary",
          })
          for (let sheet in workbook.Sheets) {
            this.result = workbook.Sheets[sheet]
            this.importCallback();
            // 只读取第一张表
            break;
          }
        } catch (e) {
          console.warn("文件数据异常");
          return;
        }
      };
      var files = e.target.files;
      fileReader.readAsBinaryString(files[0]);
    },
    importCallback () {
      // 基于getData将导入的数据应用到页面
      // this.code = this.getData('csv')
      let str1 = JSON.stringify(this.getData('csv'))
      this.value1 = str1.replaceAll('],', '],\n\t').replaceAll('[[', '[\n\t[').replaceAll(']]', ']\n]')
      let str2 = JSON.stringify(this.getData('json'))
      this.value2 = str2.replaceAll('},', '},\n\t').replaceAll('[{', '[\n\t{').replaceAll('}]', '}\n]')

    },
    getData (type = 'json') {
      if (type === 'json') {
        return XLSX.utils.sheet_to_json(this.result)
      } else {
        let temp = XLSX.utils.sheet_to_csv(this.result).split('\n')
        temp.forEach((d, i) => {
          temp[i] = temp[i].split(',')
        })
        return temp
      }
    },
    formatData (data) {
      let isArray = data[0].constructor === Array
      if (!isArray) {
        return data
      } else {
        let result = []
        let keys = data[0]
        for (let i = 1; i < data.length; i++) {
          let item = {}
          keys.forEach((key, j) => {
            item[key] = data[i][j]
          })
          result.push(item)
        }
        return result
      }
    },
    //导出文件
    xlsxExport (data, name = "数据") {
      const workBook = XLSX.utils.book_new()
      let exportData = this.formatData(data)
      const workSheet = XLSX.utils.json_to_sheet(exportData)
      XLSX.utils.book_append_sheet(workBook, workSheet, 'sheet')
      XLSX.writeFile(workBook, name + ".xlsx")
    },
    // 一键复制
    copyTextFun (text) {
      if (!text) return false
      textarea.select()
      console.log(navigator.clipboard);
      navigator.clipboard.writeText(text)
      try {
        var successful = document.execCommand('copy')
        if (successful) {
          console.log('成功')
        } else {
          console.log('失败')
        }
      } catch (err) {
        console.log('失败')
      } finally {
        // document.body.removeChild(textarea)
      }
    },
    // 获取
    getText () {
      const clipboard = navigator.clipboard;
      console.log(navigator.clipboard.readText());
    },
    getText1 () {
      const arr = [['姓名', '年龄', '标题'], ['Jane', 30, 'Designer'], ['Mike', 35, 'Manager']];
      let newArr = []
      // arr.forEach((item, index) => {
      //   if (index > 0) {
      //     let obj = {}
      //     item.forEach((inItem, inIndex) => {
      //       obj[arr[0][inIndex]] = inItem
      //     })
      //     newArr.push(obj)
      //   }
      // })
      for (let i = 1; i < arr[0].length; i++) {
        let obj = {}
        arr[i].forEach((item, index) => {
          obj[arr[0][index]] = item
        })
        newArr.push(obj)
      }
      console.log(newArr)
    },
    // 转数组对象
    getObj (arr) {
      console.log(arr.replaceAll('\n', '').replaceAll('\t', ''))
      let selftArr = JSON.parse(arr.replaceAll('\n', '').replaceAll('\t', ''))
      Object.prototype.toString.call(selftArr)
      this.inputArr1 = selftArr
      console.log(selftArr, Object.prototype.toString.call(selftArr), selftArr[1])
      let newArr = []
      for (let i = 1; i < selftArr.length; i++) {
        let obj = {}
        console.log(selftArr[i]);
        selftArr[i].forEach((item, index) => {
          obj[selftArr[0][index]] = item
        })
        newArr.push(obj)
      }
      console.log(newArr)
      this.inputJson = JSON.stringify(newArr).replaceAll('},', '},\n\t').replaceAll('[{', '[\n\t{').replaceAll('}]', '}\n]')
    },
    obj () {
      let obj = [
        { name: "张三", age: 30 },
        { name: "www", age: 'wq' },
        { name: "张sssss三", age: '456' },

      ]
      let arr = []
      arr.push(Object.keys(obj[0]))
      obj.forEach(item => {
        arr.push(Object.values(item))
      })
      console.log(arr);
    }
  }
}
</script>
<style scoped>
</style>


