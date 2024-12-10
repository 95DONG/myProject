<template>
  <div class="">
    <el-popover
      placement="bottom-start"
      trigger="manual"
      content=""
      :width="outWidth > 200 ? outWidth - 100 : outWidth"
      v-model="showCard"
    >
      <el-input
        slot="reference"
        v-model="showText"
        placeholder="请选择季度"
        clearable
        :size="size"
        :style="{ width: `${outWidth}px` }"
        prefix-icon="el-icon-date"
        readonly
        @click.stop.native="showCard = true"
        class="inInput"
      ></el-input>
      <div>
        <!-- 年份切换 -->
        <div class="yearChangeBox">
          <div>
            <el-button
              icon="el-icon-d-arrow-left"
              type="text"
              style="color: #303133"
              @click="changeYear('prev')"
            ></el-button>
          </div>
          <div class="font-16">{{ showYear }}</div>
          <div>
            <el-button
              icon="el-icon-d-arrow-right"
              type="text"
              style="color: #303133"
              @click="changeYear('next')"
            ></el-button>
          </div>
        </div>

        <!-- 季度切换 -->
        <div class="quarterChangeBox">
          <div
            class="quarterBox"
            v-for="(item, index) in quarterList"
            :key="index"
          >
            <div
              class="quarterItem"
              :class="
                selectedYear == showYear && selectedQuarter == item
                  ? 'selecedQuarterItem'
                  : ''
              "
              @click="changeQuarter(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    outWidth: {
      default: '200'
    },
    size: {
      default: "small"
    }
  },
  model: {
    prop: "value",//定义v-model的值传递给那个prop属性
    event: "change",//定义此事件触发时，自动更新父组件v-model对应的数据
  },
  data () {
    return {
      showCard: false,
      selectTime: "",//当前选中时间，格式为2023Q3

      showYear: null, //展示的年（下拉框）

      selectedYear: null, //被选中的年
      selectedQuarter: "", //被选中的季度

      quarterList: [{ label: "第一季度", value: 1 }, { label: "第二季度", value: 2 }, { label: "第三季度", value: 3 }, { label: "第四季度", value: 4 },]
    }
  },
  computed: {
    //格式化当前选中的时间并展示
    showText () {
      if (!this.selectTime) {
        return ""
      }
      else {
        return this.selectTime;
      }
    }
  },
  mounted () {
    //监听全局按钮的点击
    let that = this
    document.body.addEventListener('click', function () {
      //console.log('点击了body')
      that.showCard = false;
    })
  },
  methods: {
    //切换年份
    changeYear (type = '') {
      if (type == 'next') {
        //时间往前后一年
        this.showYear = this.showYear + 1;
      }
      else if (type == 'prev') {
        //时间往前推一年
        this.showYear = this.showYear - 1;
      }
    },

    //切换季度
    changeQuarter (quarter) {

      this.selectedQuarter = quarter.label;

      this.selectedYear = this.showYear;

      //当前选中时间
      this.selectTime = this.selectedYear + this.selectedQuarter;

      //隐藏季度选择下拉框
      this.showCard = false;

      //通知父组件 返回时间戳
      console.log(this.selectTime, "this.selectTime");

      this.$emit('change', this.selectTime, {
        selectTime: this.selectTime,
        selectedYear: this.selectedYear,
        selectedQuarter: this.selectedQuarter
      });
    }
  },
  watch: {
    value: {
      immediate: true, //immediate如果为true 代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法
      handler: function (value) {
        //如果传入的时间为""，则初始化当前选中时间为""，展示的年为当前年份，被选中的年份为""，被选中的季度为""
        if (!value) {

          this.selectTime = ""; //当前选中时间

          let currentDateTime = new Date();
          this.showYear = currentDateTime.getFullYear();

          this.selectedYear = "";
          this.selectedQuarter = "";

        }
        //如果传入的时间不为""，则初始化当前选中时间为传入的时间，展示的年为传入的时间年份，被选中的年份为传入的时间年份，被选中的季度为传入的时间季度
        else {
          this.selectTime = value;

          this.showYear = Number(value.slice(0, 4));

          this.selectedYear = Number(value.slice(0, 4));
          this.selectedQuarter = value.slice(4, 7);

        }
      }
    }
  }
}
</script>

<style lang='less'>
.yearChangeBox {
  height: 35px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.quarterChangeBox {
  padding: 0 20px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.quarterItem {
  white-space: nowrap;
}
.quarterItem:hover {
  color: #3967fb;
}
.selecedQuarterItem,
.selecedQuarterItem:hover {
  background-color: #3967fb;
  color: #ffffff;
  border-radius: 4px;
}
.inInput {
  cursor: pointer;
}
</style>

