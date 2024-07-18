<template>
  <div class="zhiban-box">
    <div class="changeMonth">
      <span>
        <span class="el-icon-caret-left" @click="left"> </span>
        <span>{{ defaultYear }}年{{ defaultMonth }}月</span>
        <span class="el-icon-caret-right" @click="right"> </span
      ></span>
      <span @click="goback">回到今天</span>
    </div>

    <!-- 测试 -->
    <div>
      <div
        v-for="(month, monthIndex) in testArr"
        :key="monthIndex"
        style="border: 1px solid #333"
      >
        <div class="week">
          <span v-for="(week, index) in weekday" :key="index">{{ week }}</span>
        </div>
        <div class="day-box">
          <div
            class="day"
            v-for="(rows, rowsIndex) in month.days"
            :key="rowsIndex"
          >
            <span
              v-for="(day, dayIndex) in rows"
              :key="dayIndex"
              :class="[
                'item',
                month.year == currentYear &&
                month.month == currentMonth &&
                day == currentDay
                  ? 'currentDay'
                  : '',
              ]"
              :style="{
                'border-color':
                  month.year == activeYear &&
                  month.month == activeMonth &&
                  rowsIndex === activeRowsIndex &&
                  dayIndex === activeDayIndex &&
                  day
                    ? 'red'
                    : 'transparent',
              }"
              @click="
                changDay(month.year, month.month, day, rowsIndex, dayIndex)
              "
            >
              {{ day }}
            </span>
          </div>
        </div>
      </div>
      <!-- 正常 -->
      <div class="week" v-if="false">
        <span v-for="(week, index) in weekday" :key="index">{{ week }}</span>
      </div>
      <div class="day-box" v-if="false">
        <div class="day" v-for="(row, rowsIndex) in dayArry" :key="rowsIndex">
          <span
            v-for="(day, index) in row"
            :key="index"
            :class="['item', isToday && day === currentDay ? 'currentDay' : '']"
            :style="{
              'border-color':
                rowsIndex === activeRowsIndex && index === activeDayIndex && day
                  ? 'red'
                  : 'transparent',
            }"
            @click="changDay(day, rowsIndex, index)"
          >
            {{ day }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data () {
    return {
      // 初始默认年
      defaultYear: new Date().getFullYear(),
      //初始默认月
      defaultMonth: new Date().getMonth() + 1,
      // 当前年
      currentYear: new Date().getFullYear(),
      //当前月
      currentMonth: new Date().getMonth() + 1,
      //当前日
      currentDay: new Date().getDate(),
      dayArry: [],
      weekday: ["日", "一", "二", "三", "四", "五", "六"],
      //点击当前年
      activeYear: null,
      //点击当前月
      activeMonth: null,
      //点击当前日得索引
      activeDayIndex: null,
      //点击当前行索引
      activeRowsIndex: null,
      // 三月数据
      testArr: [{ year: "", month: "", days: [], }, { year: "", month: "", days: [], }, { year: "", month: "", days: [], },]
    }
  },
  created () {
    this.initCalendar(this.defaultYear, this.defaultMonth)
    this.getThreeMonth()
  },
  computed: {
    isToday () {
      let today = false
      if (this.defaultMonth === new Date().getMonth() + 1 && this.defaultYear === new Date().getFullYear()) {
        today = true
      }
      return today
    }
  },
  methods: {
    //日历数组 日历初始化
    initCalendar (year, month) {
      const now = new Date();
      const firstDay = new Date(year, month - 1, 1);
      const endDay = new Date(
        now.getMonth() === 11
          ? new Date(year + 1, 0, 1).getTime() - 8640000
          : new Date(year, month, 1).getTime() -
          8640000);
      let row = 0;
      let col = firstDay.getDay();
      // console.log(firstDay, col);
      const calendar = [[]];
      let thisDay = 1;
      const end = endDay.getDate(); // 每月最后一天
      while (thisDay <= end) {
        if (col === 7) {
          row++;
          col = 0;
          calendar[row] = [thisDay];
        } else {
          if (thisDay == 1 && col >= 1) {
            for (let j = 0; j <= col; j++) {
              calendar[row][j] = ''
            }
          }
          calendar[row][col] = thisDay;
        }
        thisDay++;
        col++;
      }
      if (calendar[calendar.length - 1].length < 7) {
        var arr = 7 - calendar[calendar.length - 1].length
        for (let index = 0; index < arr; index++) {
          calendar[calendar.length - 1].push("")
        }
      }
      if (year === this.defaultYear, month === this.defaultMonth) this.dayArry = calendar
      return calendar
    },
    // 获取三个月日期
    getThreeMonth () {
      let arr = [-1, 0, 1]
      arr.forEach((item, index) => {
        let month = this.defaultMonth
        let year = this.defaultYear
        month = this.defaultMonth + item;
        if (month < 1) {
          month = 12
          year = this.defaultYear - 1

        } else if (month > 12) {
          month = 1
          year = this.defaultYear + 1
        } else {
          month = this.defaultMonth + item
        }
        // console.log(year, month, "year, month");
        this.testArr[index].days = this.initCalendar(year, month)
        this.testArr[index].year = String(year)
        this.testArr[index].month = String(month)
      })
      // console.log(this.testArr);
    },
    //重新渲染日历表
    createDay (currentYear, currentMonth) {
      var curDate = new Date(currentYear, currentMonth, 0);
      for (var k = 1; k <= curDate.getDate(); k++) {
        this.dayArry.push({ "item": k, "class": "", "ban": "", "txt": "" });
      }
    },
    //重新给周六周日染色
    changeColorWeek (currentYear, currentMonth) {
      var date = new Date(currentYear, currentMonth, 0);
      date.setDate(1);
      //补充月份前面的空位
      if (this.weekday[date.getDay()].id == "7") {
        return false;
      } else {
      }
      //改变周六日颜色
      for (var i = 0; i < this.dayArry.length; i++) {
        if (i % 7 == 0 && i / 7 != 0) {
          this.dayArry[i].class = "defaultWeek";
          this.dayArry[i - 1].class = "defaultWeek";
        }
      }
    },
    left () {
      // this.clear()
      if (this.defaultMonth == 1) {
        this.defaultMonth = 12;
        this.defaultYear--;
        this.dayArry = [];
        // this.createDay(this.defaultYear, this.defaultMonth);
        // this.changeColorWeek(this.defaultYear, this.defaultMonth);
      } else {
        this.defaultMonth--;
        this.dayArry = [];//需要在每次加载新月份的日历时，清空原来的日历列表
        // this.createDay(this.defaultYear, this.defaultMonth);
        // this.changeColorWeek(this.defaultYear, this.defaultMonth);
        //改变按钮颜色
        // document.querySelector(".right > span").style.borderLeft = '6px solid #5a5a5a';
      }
      this.getThreeMonth()
      this.initCalendar(this.defaultYear, this.defaultMonth)
    },
    right () {
      // this.clear()
      if (this.defaultMonth == 12) {
        this.defaultMonth = 1;
        this.defaultYear++;
        this.dayArry = [];
        // this.createDay(this.defaultYear, this.defaultMonth);
      } else {
        this.defaultMonth++;
        this.dayArry = [];
        // this.createDay(this.defaultYear, this.defaultMonth);
        // this.changeColorWeek(this.defaultYear, this.defaultMonth);
        // if (this.defaultMonth == new Date().getMonth() + 1) {
        //   document.querySelector(".right > span").style.borderLeft = '6px solid #b5b5b5';
        // }
      }
      this.getThreeMonth()
      this.initCalendar(this.defaultYear, this.defaultMonth)
    },
    clear () {
      this.activeRowsIndex = null
      this.activeDayIndex = null
    },
    // 点击某一天
    changDay (year, month, day, rowsIndex, dayIndex) {
      this.activeYear = year,
        this.activeMonth = month,
        this.activeRowsIndex = rowsIndex
      this.activeDayIndex = dayIndex
      // console.log(this.activeYear, this.activeMonth, day);

    },
    // 回到今天
    goback () {
      this.defaultMonth = new Date().getMonth() + 1
      this.defaultYear = new Date().getFullYear()
      this.clear()
      this.initCalendar(this.defaultYear, this.defaultMonth)
      this.getThreeMonth()
    }
  }

}
</script>

<style scoped>
.zhiban-box {
  width: 375px;
}
.day-box,
.week {
}
.day,
.week {
  display: flex;
}
.day span,
.week span {
  flex: 1;
}
.item {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-radius: 30%;
  margin: 2px;
}
.currentDay {
  color: #fff;
  border-radius: 30%;
  background-color: rgb(235, 45, 45);
}
.changeMonth {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
