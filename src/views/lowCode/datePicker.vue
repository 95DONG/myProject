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
    <el-cascader
      :options="options"
      :props="{ checkStrictly: false }"
      clearable
    ></el-cascader>
    <div id="box">{{ performanceTime }}</div>
    <QuarterPicker
      v-model="performanceTime"
      @change="selectTimeChange"
      outWidth="220"
      size="medium"
    />
  </div>
</template>
<script>
import QuarterPicker from '@/components/quarter-picker'
export default {
  data () {
    return {
      performanceTime: "",
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
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
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
    selectTimeChange (selectTime, obj) {
      console.log(selectTime, obj);

    }
  },
  // 销毁监听
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize);
  },
  components: {
    QuarterPicker
  }

}
</script>

<style>
</style>
