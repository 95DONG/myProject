<template>
  <div>
    <el-button type="" @click="postData">+ 1</el-button>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      :cell-class-name="cellClassName"
      :header-cell-class-name="headerCellClassName"
      border
      :cell-style="{
        height: '20px',
        'font-size': '12px',
        padding: '0px !important',
      }"
      :header-cell-style="{
        height: '20px',
        'font-size': '12px',
        padding: '0px !important',
      }"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="mof_div_name" label="地区" width="180">
      </el-table-column>
      <el-table-column prop="km_type_mc" label="项目"> </el-table-column>
      <el-table-column prop="" label="一月">
        <el-table-column prop="c_jan_month_amt" label="当月">
          <template slot-scope="scope">
            <el-input
              v-if="getInput(scope)"
              v-model="scope.row.c_jan_month_amt"
              placeholder=""
              type="number"
              size="mini"
              @input="getPublic('c_jan_month_amt', 'upOne')"
            ></el-input>
            <span v-else>{{ getFixed(scope.row.c_jan_month_amt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="c_jan_month_amt_incr" label="增长">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="" label="二月">
        <el-table-column prop="c_feb_month_amt" label="当月">
          <template slot-scope="scope">
            <el-input
              v-if="getInput(scope)"
              v-model.number="scope.row.c_feb_month_amt"
              placeholder=""
              type="number"
              size="mini"
              @input="getPublic('c_feb_month_amt', 'upTwo')"
            ></el-input>
            <span v-else>{{ scope.row.c_feb_month_amt }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="c_feb_month_amt_incr" label="增长">
        </el-table-column>
        <el-table-column prop="c_feb_month_amt_list" label="累计">
        </el-table-column>
        <el-table-column prop="c_feb_month_amt_list_incr" label="增长">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="" label="三月">
        <el-table-column prop="c_mar_month_amt" label="当月">
          <template slot-scope="scope">
            <el-input
              v-if="getInput(scope)"
              v-model="scope.row.c_mar_month_amt"
              placeholder=""
              type="number"
              size="mini"
              @input="getPublic('c_mar_month_amt', 'upTwo')"
            ></el-input>
            <span v-else>{{ scope.row.c_mar_month_amt }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="c_mar_month_amt_incr" label="增长">
        </el-table-column>
        <el-table-column prop="c_mar_month_amt_list" label="累计">
        </el-table-column>
        <el-table-column prop="c_mar_month_amt_list_incr" label="增长">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="" label="四月">
        <el-table-column prop="c_apr_month_amt" label="当月">
          <template slot-scope="scope">
            <el-input
              v-if="getInput(scope)"
              v-model="scope.row.c_apr_month_amt"
              placeholder=""
              type="number"
              size="mini"
              @input="getPublic('c_apr_month_amt', 'upTwo')"
            ></el-input>
            <span v-else>{{ scope.row.c_apr_month_amt }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="c_apr_month_amt_incr" label="增长">
        </el-table-column>
        <el-table-column prop="c_apr_month_amt_list" label="累计">
        </el-table-column>
        <el-table-column prop="c_apr_month_amt_list_incr" label="增长">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import tableData from "./js/tableData";
export default {
  data () {
    return {
      month: 1,
      tableData: [],
      //2023基数
      lastYear: 500
    };
  },
  created () {
    // console.log(tableData);
    this.tableData = tableData
    this.getZero()
  },


  methods: {
    postData () {
      this.month += 1
    },
    // 当月
    getPublic (activeMonth, grop) {
      let C3 = null //  全省一般公共预算收入 = 12+21

      let C12 = null // 小浙江 一般公共预算收入 = 13+22
      let C13 = null // 小浙江 税收收入 = 14+17+18+19

      let C21 = null // 宁波 一般公共预算收入 = 22+29
      let C22 = null // 宁波 税收收入 = 23+26+27+28


      let C4 = null // 全省税收收入 = 13+22

      let C5 = null // 全省 其中：税收征收入库数（含调库） = 14+23
      let C14 = null // 小浙江 税收征收入库数（含调库）
      let C23 = null // 宁波 税收征收入库数（含调库）

      let C6 = null // 全省 税收征收（不含调库) = 15+24
      let C15 = null // 小浙江 税收征收（不含调库)
      let C24 = null // 宁波 税收征收（不含调库)

      let C7 = null // 全省 免抵调库 = 16+25
      let C16 = null // 小浙江 免抵调库
      let C25 = null // 宁波 免抵调库

      let C8 = null // 全省 留抵退税调库 = 17+26
      let C17 = null // 小浙江 留抵退税调库
      let C26 = null // 宁波 留抵退税调库

      let C9 = null // 全省 跨地区所得税 = 18+27
      let C18 = null // 小浙江 跨地区所得税
      let C27 = null // 宁波 跨地区所得税

      let C10 = null // 全省 其他减收：如缓税等 = 19+28
      let C19 = null // 小浙江 其他减收：如缓税等
      let C28 = null // 宁波 其他减收：如缓税等

      let C11 = null // 全省 非税收入 = 20+29
      let C20 = null // 小浙江 非税收入
      let C29 = null // 宁波 非税收入
      this.tableData.forEach((item, index) => {
        // console.log(item[activeMonth], "activeMonth");
        if (item.mof_div_name === "小浙江" && item.km_type_dm === "xzj_qz_sszsrks_hdk") C14 = (Number(item[activeMonth]))
        if (item.mof_div_name === "宁波" && item.km_type_dm === "nb_qz_sszsrks_hdk") C23 = (Number(item[activeMonth]))

        if (item.mof_div_name === "小浙江" && item.km_type_dm === "xzj_qz_swzs_bhdk") C15 = (Number(item[activeMonth]))
        if (item.mof_div_name === "宁波" && item.km_type_dm === "nb_qz_swzs_bhdk") C24 = (Number(item[activeMonth]))

        if (item.mof_div_name === "小浙江" && item.km_type_dm === "xzj_qz_mddk") C16 = (Number(item[activeMonth]))
        if (item.mof_div_name === "宁波" && item.km_type_dm === "nb_qz_mddk") C25 = (Number(item[activeMonth]))

        if (item.mof_div_name === "小浙江" && item.km_type_dm === "xzj_qz_ldtsdk") C17 = (Number(item[activeMonth]))
        if (item.mof_div_name === "宁波" && item.km_type_dm === "nb_qz_ldtsdk") C26 = (Number(item[activeMonth]))

        if (item.mof_div_name === "小浙江" && item.km_type_dm === "xzj_qz_kdqsds") C18 = (Number(item[activeMonth]))
        if (item.mof_div_name === "宁波" && item.km_type_dm === "nb_qz_kdqsds") C27 = (Number(item[activeMonth]))

        if (item.mof_div_name === "小浙江" && item.km_type_dm === "xzj_qz_qt") C19 = (Number(item[activeMonth]))
        if (item.mof_div_name === "宁波" && item.km_type_dm === "nb_qz_qt") C28 = (Number(item[activeMonth]))

        if (item.mof_div_name === "小浙江" && item.km_type_dm === "xzj_fssr") C20 = (Number(item[activeMonth]))
        if (item.mof_div_name === "宁波" && item.km_type_dm === "nb_fssr") C29 = (Number(item[activeMonth]))
      })
      C13 = C14 + C17 + C18 + C19
      C12 = C13 + C20
      C22 = C23 + C26 + C27 + C28
      C21 = C22 + C29

      this.tableData.forEach((item, index) => {
        if (item.mof_div_name === "小浙江" && item.km_type_dm === "xzj_ybggyssr") this.tableData[index][activeMonth] = (C13 + C20)
        if (item.mof_div_name === "小浙江" && item.km_type_dm === "xzj_sssr") this.tableData[index][activeMonth] = (C14 + C17 + C18 + C19)
        if (item.mof_div_name === "宁波" && item.km_type_dm === "nb_ybggyssr") this.tableData[index][activeMonth] = (C22 + C29)
        if (item.mof_div_name === "宁波" && item.km_type_dm === "nb_sssr") this.tableData[index][activeMonth] = (C23 + C26 + C27 + C28)
        if (item.mof_div_name === "浙江省" && item.km_type_dm === "qs_ybggyssr") this.tableData[index][activeMonth] = (C12 + C21)
        if (item.mof_div_name === "浙江省" && item.km_type_dm === "qs_sssr") this.tableData[index][activeMonth] = (C13 + C22)
        if (item.mof_div_name === "浙江省" && item.km_type_dm === "qs_qz_sszsrks_hdk") this.tableData[index][activeMonth] = (C14 + C23)
        if (item.mof_div_name === "浙江省" && item.km_type_dm === "qs_qz_swzs_bhdk") this.tableData[index][activeMonth] = (C15 + C24)
        if (item.mof_div_name === "浙江省" && item.km_type_dm === "qs_qz_mddk") this.tableData[index][activeMonth] = (C16 + C25)
        if (item.mof_div_name === "浙江省" && item.km_type_dm === "qs_qz_ldtsdk") this.tableData[index][activeMonth] = (C17 + C26)
        if (item.mof_div_name === "浙江省" && item.km_type_dm === "qs_qz_kdqsds") this.tableData[index][activeMonth] = (C18 + C27)
        if (item.mof_div_name === "浙江省" && item.km_type_dm === "qs_qz_qt") this.tableData[index][activeMonth] = (C19 + C28)
        if (item.mof_div_name === "浙江省" && item.km_type_dm === "qs_fssr") this.tableData[index][activeMonth] = (C20 + C29)
        let arr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
        arr.forEach((month, monthIndex) => {
          // 当月增长
          if (item['c_' + month + '_month_amt'] > 0 && monthIndex + 1 <= this.month) {
            if (item[month + '_month_amt'] > 0) {
              this.tableData[index]['c_' + month + '_month_amt_incr'] = this.increase(item['c_' + month + '_month_amt'], item[month + '_month_amt']) + '%'
            } else {
              this.tableData[index]['c_' + month + '_month_amt_incr'] = '100%'
            }
          }

          // 累计 c_feb_month_amt_list month = 2
          if (monthIndex === 1 && monthIndex + 1 === this.month) { // 第二个月开始有累计
            item['c_' + month + '_month_amt_list'] = Number(item['c_' + month + '_month_amt']) + Number(item['c_jan_month_amt'])
          }
          if (monthIndex > 1 && monthIndex + 1 === this.month) {
            let a = 0
            for (let last = 0; last <= monthIndex; last++) {
              // 前面每个月相加
              a += Number(item['c_' + arr[monthIndex - last] + '_month_amt'])

            }
            item['c_' + month + '_month_amt_list'] = a // 当前累计值
          }
          // 累计增长 c_feb_month_amt_list_incr c_feb_month_amt_list_incr
          if (monthIndex > 0 && monthIndex + 1 === this.month) {
            if (item[month + '_month_amt_list'] > 0) { // 去年累计
              console.log(monthIndex, item[month + '_month_amt_list'], month, "累计增长");
              // 今年累计增长 = 去年累计 / 今年累计
              this.tableData[index]['c_' + month + '_month_amt_list_incr'] = this.increase(item['c_' + month + '_month_amt_list'], item[month + '_month_amt_list']) + '%'
            } else {
              // 去年没有数据
              this.tableData[index]['c_' + month + '_month_amt_list_incr'] = '100%'
            }
          }

        })
      })

    },
    // 增长
    increase (active, last) {
      return (active * 100 / last - 100).toFixed(2)
    },
    getZero () {
      this.tableData.forEach(obj => {
        for (let item in obj) {
          if (!obj[item]) {
            obj[item] = 0
          }
        }
      })
      // console.log(this.tableData);
    },
    getFixed (num) {
      // console.log(num);
      var x = String(num).indexOf(".") + 1;//得到小数点的位置
      var y = String(num).length - x;//小数点的位数
      if (num) {
        if (x == 0) {
          return Number(num).toFixed(2)
        } else {
          if (y > 0) {
            return Number(num).toFixed(2)
          }
        }
      } else {
        return num
      }
    },
    // 循环数据保存
    saveData () {
      let newData = []
      this.tableData.forEach(item => {
        newData.push({
          "id": item.id,
          "fiscalYear": item.c_fiscalYear,
          "mofDivName": item.mof_div_name,
          "kmTypeDm": item.km_type_dm,
          "kmTypeMc": item.km_type_mc,
          "janMonthAmt": item.c_jan_month_amt,
          "janMonthAmtIncr": item.c_jan_month_amt_incr,
          "febMonthAmt": item.c_feb_month_amt,
          "febMonthAmtIncr": item.c_feb_month_amt_incr,
          "febMonthAmtList": item.c_feb_month_amt_list,
          "febMonthAmtListIncr": item.c_feb_month_amtList_incr,
          "marMonthAmt": item.c_mar_month_amt,
          "marMonthAmtIncr": item.c_mar_month_amt_incr,
          "marMonthAmtList": item.c_mar_month_amt_list,
          "marMonthAmtListIncr": item.c_mar_month_amtList_incr,
          "aprMonthAmt": item.c_apr_month_amt,
          "aprMonthAmtIncr": item.c_apr_month_amt_incr,
          "aprMonthAmtList": item.c_apr_month_amt_list,
          "aprMonthAmtListIncr": item.c_apr_month_amtList_incr,
          "mayMonthAmt": item.c_may_month_amt,
          "mayMonthAmtIncr": item.c_may_month_amt_incr,
          "mayMonthAmtList": item.c_may_month_amt_list,
          "mayMonthAmtListIncr": item.c_may_month_amtList_incr,
          "junMonthAmt": item.c_jun_month_amt,
          "junMonthAmtIncr": item.c_jun_month_amt_incr,
          "junMonthAmtList": item.c_jun_month_amt_list,
          "junMonthAmtListIncr": item.c_jun_month_amtList_incr,
          "julMonthAmt": item.c_jul_month_amt,
          "julMonthAmtIncr": item.c_jul_month_amt_incr,
          "julMonthAmtList": item.c_jul_month_amt_list,
          "julMonthAmtListIncr": item.c_jul_month_amtList_incr,
          "augMonthAmt": item.c_aug_month_amt,
          "augMonthAmtIncr": item.c_aug_month_amt_incr,
          "augMonthAmtList": item.c_aug_month_amt_list,
          "augMonthAmtListIncr": item.c_aug_month_amtList_incr,
          "sepMonthAmt": item.c_sep_month_amt,
          "sepMonthAmtIncr": item.c_sep_month_amt_incr,
          "sepMonthAmtList": item.c_sep_month_amt_list,
          "sepMonthAmtListIncr": item.c_sep_month_amtList_incr,
          "octMonthAmt": item.c_oct_month_amt,
          "octMonthAmtIncr": item.c_oct_month_amt_incr,
          "octMonthAmtList": item.c_oct_month_amt_list,
          "octMonthAmtListIncr": item.c_oct_month_amtList_incr,
          "novMonthAmt": item.c_nov_month_amt,
          "novMonthAmtIncr": item.c_nov_month_amt_incr,
          "novMonthAmtList": item.c_nov_month_amt_list,
          "novMonthAmtListIncr": item.c_nov_month_amtList_incr,
          "decMonthAmt": item.c_dec_month_amt,
          "decMonthAmtIncr": item.c_dec_month_amt_incr,
          "decMonthAmtList": item.c_dec_month_amt_list,
          "decMonthAmtListIncr": item.c_dec_month_amtList_incr
        })
      })
      return newData
    },
    // 列合并
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 9 === 0) {
          return {
            rowspan: 9,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    // 单元格换色
    cellClassName (event) {
      if (event.columnIndex > 1) {
        if (Math.floor(event.columnIndex / 4) % 2 === 0) {
          return "blue"
        } else {
          return "yellow"
        }
      }
    },
    // 表头换色
    headerCellClassName (event) {
      if (event.columnIndex > 1 || event.rowIndex === 1) {
        if (event.rowIndex === 0) {
          if ((event.columnIndex + 2) % 2 === 0) {
            return "blue"
          } else {
            return "yellow"
          }
        } else {
          if (Math.floor((event.columnIndex + 2) / 4) % 2 === 0) {
            return "blue"
          } else {
            return "yellow"
          }
        }
      } else {
        return "white"
      }
    },
    // 输入框显影
    getInput (scope) {
      if (scope.row.mof_div_name === "浙江省") {
        return false
      } else {
        if (scope.row.km_type_dm === "xzj_sssr" || scope.row.km_type_dm === "xzj_ybggyssr" || scope.row.km_type_dm === "nb_sssr" || scope.row.km_type_dm === "nb_ybggyssr") {
          return false
        } else {
          return true
        }
      }
    }
  }
}
</script>

<style scoped>
/deep/ .blue {
  background-color: #d9e1f4 !important;
}

/deep/ .yellow {
  background-color: #fff3ca !important;
}

/deep/ .white {
  background-color: #fff !important;
}
/deep/ .right .el-input__inner {
  text-align: end;
}
</style>
