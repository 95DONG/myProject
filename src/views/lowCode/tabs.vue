<template>
  <div>
    <div class="content">
      <div class="box" :style="{ width: width ? width : '' }">
        <div id="example1" class="list-group" style="display: flex">
          <div
            class="list-group-item"
            v-for="(item, index) in showList"
            :key="item.id"
            @click="itemHander(index)"
            :style="{
              color: activeIndex === index ? '#4b9cfb' : '#333',
            }"
          >
            <!-- :style="{
                backgroundColor: activeIndex === index ? '#fff !important' : '',
              }" -->
            <div class="title">
              <div class="name">
                {{ item.name }}
                <span v-if="item.isChange" class="is_change"></span>
              </div>
              <i
                class="el-icon-close"
                :style="{
                  color: activeIndex === index ? '' : '',
                }"
              ></i>
              <i
                class="el-icon-close"
                @click="close(item)"
                :style="{
                  color: activeIndex === index ? '' : '',
                }"
              ></i>
            </div>
            <el-divider direction="vertical"></el-divider>
          </div>
        </div>
        <div class="newTag" style="min-width: 190px">
          <el-popover placement="bottom" width="200" trigger="hover">
            <div slot="reference">新开页面</div>
            <div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span>页面</span>
                <el-button
                  @click="dialogVisibleAdd = true"
                  icon="el-icon-plus"
                  size="mini"
                  type="primary"
                  >新建</el-button
                >
              </div>
            </div>
          </el-popover>
        </div>
      </div>
      <el-dropdown
        v-if="moreList.length > 0"
        @command="handleCommand"
        style="min-width: 50px; border: 1px solid #333"
      >
        <span class="el-dropdown-link">
          更多
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in moreList"
            :key="item.id"
            :command="item"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="false">
      <svg
        @click="dialogVisible = true"
        style="cursor: pointer"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="none"
        version="1.1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <defs>
          <clipPath id="master_svg0_2775_24008">
            <rect
              x="2.4000000953674316"
              y="2.4000000953674316"
              width="19.200000762939453"
              height="19.200000762939453"
              rx="0"
            />
          </clipPath>
        </defs>
        <g>
          <g>
            <ellipse
              cx="11.999999046325684"
              cy="12"
              rx="11.999999046325684"
              ry="12"
              fill="#EDEEF5"
              fill-opacity="1"
            />
          </g>
          <g clip-path="url(#master_svg0_2775_24008)">
            <g>
              <path
                d="M15.200024509429932,16.000001621246337L15.200024509429932,15.200001621246338L12.800024509429932,15.200001621246338L12.800024509429932,12.800001621246338L15.200024509429932,12.800001621246338L15.200024509429932,14.400001621246338L16.80002450942993,14.400001621246338L16.80002450942993,16.000001621246337L16.00002450942993,16.000001621246337L16.00002450942993,17.60000162124634L14.400024509429931,17.60000162124634L14.400024509429931,19.200001621246336L12.800024509429932,19.200001621246336L12.800024509429932,16.800001621246338L14.400024509429931,16.800001621246338L14.400024509429931,16.000001621246337L15.200024509429932,16.000001621246337ZM19.20002450942993,19.200001621246336L16.00002450942993,19.200001621246336L16.00002450942993,17.60000162124634L17.600024509429932,17.60000162124634L17.600024509429932,16.000001621246337L19.20002450942993,16.000001621246337L19.20002450942993,19.200001621246336ZM4.800024509429932,4.800001621246338L11.200024509429932,4.800001621246338L11.200024509429932,11.200001621246338L4.800024509429932,11.200001621246338L4.800024509429932,4.800001621246338ZM12.800024509429932,4.800001621246338L19.20002450942993,4.800001621246338L19.20002450942993,11.200001621246338L12.800024509429932,11.200001621246338L12.800024509429932,4.800001621246338ZM4.800024509429932,12.800001621246338L11.200024509429932,12.800001621246338L11.200024509429932,19.200001621246336L4.800024509429932,19.200001621246336L4.800024509429932,12.800001621246338ZM16.80002450942993,12.800001621246338L19.20002450942993,12.800001621246338L19.20002450942993,14.400001621246338L16.80002450942993,14.400001621246338L16.80002450942993,12.800001621246338ZM7.200024509429932,7.200001621246338L7.200024509429932,8.800001621246338L8.800024509429932,8.800001621246338L8.800024509429932,7.200001621246338L7.200024509429932,7.200001621246338ZM7.200024509429932,15.200001621246338L7.200024509429932,16.800001621246338L8.800024509429932,16.800001621246338L8.800024509429932,15.200001621246338L7.200024509429932,15.200001621246338ZM15.200024509429932,7.200001621246338L15.200024509429932,8.800001621246338L16.80002450942993,8.800001621246338L16.80002450942993,7.200001621246338L15.200024509429932,7.200001621246338Z"
                fill="#6C8AB6"
                fill-opacity="1"
              />
            </g>
          </g>
        </g>
      </svg>
      <el-button @click="dialogVisible = true">弹窗</el-button>
      <el-dialog title="系统支持" :visible.sync="dialogVisible" width="50%">
        <!-- <div slot="title" style="display: flex">系统支持</div> -->

        <div>
          <div style="color: #333; font-size: 26px">
            如遇系统异常，请使用浙政钉扫描任一二维码进行反馈
          </div>
          <div
            style="
              display: flex;
              justify-content: space-evenly;
              padding: 30px 20px;
            "
          >
            <img
              src="../../assets/1.png"
              alt=""
              style="width: 200px; height: 200px"
            />
            <img
              src="../../assets/1.png"
              alt=""
              style="width: 200px; height: 200px"
            />
          </div>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
          style="display: flex; justify-content: center"
        >
          <el-button style="color: #333; font-weight: 700; margin-right: 30px"
            >操作手册下载</el-button
          >
          <el-button
            @click="dialogVisible = false"
            style="width: 125px; color: #333; font-weight: 700"
            >关闭</el-button
          >
        </div>
      </el-dialog>
    </div>
    <el-dialog title="新建页面" :visible.sync="dialogVisibleAdd" width="30%">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="页面代码">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="页面名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="页面类型">
            <el-select
              v-model="form.type"
              placeholder="请选择活动区域"
              style="width: 340px"
            >
              <el-option label="页面" value="yemian"></el-option>
              <el-option label="业务卡片" value="yewukapian"></el-option>
              <el-option label="组件" value="zujian"></el-option>
              <el-option label="部件" value="bujian"></el-option>
              <el-option label="页面模板" value="yemianmoban"></el-option>
              <el-option label="卡片模板" value="kapianmoban"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="页面类型">
            <el-cascader
              style="width: 340px"
              v-model="form.address"
              :options="options"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleAdd = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div></div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  data () {
    return {
      dialogVisible: false,
      dialogVisibleAdd: true,
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
      }],
      form: {
        name: "",
        code: "",
        type: "页面",
        address: ""
      },
      //原始数据
      list: [
        { id: "123564wew", name: 'xxx页面', isChange: false },
        { id: "123w564wew", name: 'item页面这是一个真的页面这是一个真的页面', isChange: true },
        { id: "12356e4wew", name: '测试页面', isChange: true },
        { id: "123v564wew", name: '这是一个假的页面', isChange: false },
        { id: "12b3564wew", name: '这是一个真的页面', isChange: true },
        { id: "1235624wew", name: '又是一个标题啊啊啊啊啊222', isChange: false }
      ],
      activeIndex: 0,
      // 展示数据
      showList: [
        { id: "123564wew", name: 'xxx页面', isChange: false },
        { id: "123w564wew", name: 'item页面这是一个真的页面这是一个真的页面', isChange: true },
        { id: "12356e4wew", name: '测试页面', isChange: true },
        { id: "123v564wew", name: '这是一个假的页面', isChange: false },
        { id: "12b3564wew", name: '这是一个真的页面', isChange: true },
        { id: "1235624wew", name: '又是一个标题啊啊啊啊啊222', isChange: false }
      ],
      // 设置盒子最大宽度
      width: null,
      // 更多
      moreList: [],
      // 新增位置
      count: 0
    }
  },
  mounted () {
    this.listDrop()
    this.getNumber()
    // 监听屏幕宽度和高度变化
    window.addEventListener('resize', this.getNumber, true)

  },
  created () {
  },
  methods: {
    //适配宽度
    getNumber () {
      // 算剩余空间容纳几个标签
      let box = document.getElementsByClassName("content")[0].clientWidth
      let listGroupItem = document.getElementsByClassName("list-group-item") && document.getElementsByClassName("list-group-item")[0].offsetWidth
      let contentWidth = Math.floor((box - 190) / listGroupItem) < 2 ? 2 : Math.floor((box - 190) / listGroupItem)

      this.showList = this.list.slice(0, contentWidth)
      this.count = contentWidth
      this.moreList = this.list.slice(contentWidth)
      this.width = (this.showList.length + 1) * 190 + 'px'
    },
    // 拖拽监听
    listDrop () {
      let _this = this
      let a = new Sortable(document.getElementById('example1'), {
        animation: 150,
        // 拖拽时预览图样式
        ghostClass: 'blue-background-class',
        onUpdate: function ({ newIndex, oldIndex }) {
          //拖拽结束重新渲染
          // 被移动元素 先删后增
          const currRow = _this.list.splice(oldIndex, 1)[0]
          _this.list.splice(newIndex, 0, currRow);
          _this.getNumber()
        }
      })
    },
    changeItem () {
      console.log(3333);
    },
    //点击事件
    itemHander (index) {
      this.activeIndex = index
    },
    // 关闭事件
    close (item) {
      this.list = this.list.filter(el => el.id != item.id)
      console.log(this.list);
      this.getNumber()
    },
    //下拉选择器点击事件 && 新增
    handleCommand (command, add) {
      if (add === 'add') {
        this.list.unshift({
          id: this.guid(),
          name: "新建页面"
        })
        this.$nextTick(() => {

          this.activeIndex = 0
        })
      } else {
        console.log('切换')
        // 改变最后一项
        this.showList[this.showList.length - 1] = command
        let arrId = []
        let arrItem = []
        let arr1 = [...this.showList, ...this.list]
        arr1.forEach(item => {
          if (!arrId.includes(item.id)) {
            arrItem.push(item)
            arrId.push(item.id)
          }
        })
        this.list = arrItem
      }

      this.getNumber()
    },
    //随机id
    guid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  },
  // 销毁监听
  beforeDestroy () {
    window.removeEventListener('resize', this.getNumber);
  },

}
</script>

<style scoped lang="less">
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box {
  display: flex;
  border: 1px solid rgba(111, 111, 111, 0.5);
  border-radius: 3px;
  box-sizing: border-box;
  min-width: 570px;
  overflow: hidden;
  .blue-background-class {
    background-color: #ffffff !important;
  }
  .list-group-item,
  .newTag {
    width: 190px;
    height: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .copy {
    width: 164px;
    height: 100%;
    background-color: #fff;
    border: 1px solid #4b9cfb;
    border-radius: 3px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 1200ms;
    z-index: 99;
  }
  .is_change {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 0;
    right: 0;
  }
  .name {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
  }
  .el-icon-close {
    opacity: 0;
    min-width: 20px;
  }
  .title {
    height: 100%;
    padding: 0 8px;
    display: flex;
    justify-content: center;
    flex: 1;
    overflow: hidden;
    align-items: center;
    position: relative;
  }
  .list-group-item:hover .copy {
    opacity: 1;
  }
  .list-group-item:hover .title,
  .newTag:hover .title {
    background-color: #4b9cfb;
    color: #fff;
  }
  .list-group-item:hover .el-icon-close {
    opacity: 1;
  }
  .el-divider--vertical {
    margin: 0;
  }
}
</style>
