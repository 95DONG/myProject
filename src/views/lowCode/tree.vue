<template>
  <div>
    <div class="block" id="block">
      <div style="flex: 1; width: 200px; display: flex">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-tree
          class="myTree"
          v-if="showTree"
          default-expand-all
          draggable
          highlight-current
          ref="tree"
          node-key="id"
          :data="data"
          :current-node-key="current"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-drop="handleDrop"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <div class="itemTree">
              <span
                >{{ node.label
                }}<span
                  v-if="data.interactive"
                  style="
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: red;
                  "
                >
                </span
              ></span>
              <span class="btn">
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(node, data)"
                >
                  复制
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >
                  删除
                </el-button>
              </span>
            </div>
          </span>
        </el-tree>
        <el-tree
          class="myTree"
          default-expand-all
          draggable
          highlight-current
          ref="tree"
          node-key="id"
          :data="flatData1"
          :current-node-key="current"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-drop="handleDrop"
          :props="defaultProps1"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <div class="itemTree">
              <span
                >{{ node.label
                }}<span
                  style="
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: red;
                  "
                >
                </span
              ></span>
              <span class="btn">
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(node, data)"
                >
                  复制
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >
                  删除
                </el-button>
              </span>
            </div>
          </span>
        </el-tree>
      </div>
      <el-button type="primary" @click="changeCity" style="width: 200px"
        >按钮</el-button
      >
    </div>
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange"
    ></el-cascader>
    <el-button @click="printBtn">打印</el-button>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }} + '这是一个'</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "tsetPopover",
  data () {
    const data = [{
      id: 132323,
      name: '浙江省',
      children: [
        {
          id: 4,
          label: '杭州市',
          children: [{
            id: 9,
            label: '拱墅区',
            interactive: true
          }, {
            id: 10,
            label: '西湖区'
          }]
        }, {
          id: 2,
          label: '宁波市',
          children: [{
            id: 5,
            label: '江北区'
          }, {
            id: 6,
            label: '镇海区'
          }]
        }, {
          id: 3,
          label: '温州市',
          children: [
            {
              id: 33,
              label: '鹿城区',
              highlight: true,
              children: [{
                id: 74,
                label: '一个街道'
              }, {
                id: 85,
                label: '两个街道'
              }]
            },
            {
              id: 7,
              label: '龙湾区',
              children: [{
                id: 741,
                label: '一个街道'
              }, {
                id: 851,
                label: '二个街道'
              }]
            }, {
              id: 8,
              label: '洞头区'
            }]
        }]
    }
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      data2: JSON.parse(JSON.stringify(data)),
      filterText: '',
      showTree: true,
      current: 4,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultProps1: {
        children: 'children',
        label: 'c_month'
      },
      ids: [],
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
      flatData1: [
        {
          "c_year": 2024,
          "c_month": 8,
          "year": 2024,
          "month": 8
        },
        {
          "c_year": 2024,
          "c_month": 7,
          "year": 2024,
          "month": 7
        },
        {
          "c_year": 2024,
          "c_month": 6,
          "year": 2024,
          "month": 6
        },
        {
          "c_year": 2025,
          "c_month": 6,
          "year": 2025,
          "month": 6
        }
      ],
      mapData: [
        {
          "fiscal_year": "2024",
          "month": 1,
          "mof_div_code": "33",
          "mof_div_name": "浙江省",
          "hzb": "month",
          "zzb": "value1,value2",
          "zzb_num": 2,
          "zzb_unit": "收入进度 %,序时进度 %",
          "value1": 14.65,
          "value1_unit": "%",
          "value2": 8.33,
          "value2_unit": "%"
        },
        {
          "fiscal_year": "2024",
          "month": 2,
          "mof_div_code": "33",
          "mof_div_name": "浙江省",
          "hzb": "month",
          "zzb": "value1,value2",
          "zzb_num": 2,
          "zzb_unit": "收入进度 %,序时进度 %",
          "value1": 23.65,
          "value1_unit": "%",
          "value2": 16.67,
          "value2_unit": "%"
        },
        {
          "fiscal_year": "2024",
          "month": 3,
          "mof_div_code": "33",
          "mof_div_name": "浙江省",
          "hzb": "month",
          "zzb": "value1,value2",
          "zzb_num": 2,
          "zzb_unit": "收入进度 %,序时进度 %",
          "value1": 35.42,
          "value1_unit": "%",
          "value2": 25,
          "value2_unit": "%"
        },
        {
          "fiscal_year": "2024",
          "month": 4,
          "mof_div_code": "33",
          "mof_div_name": "浙江省",
          "hzb": "month",
          "zzb": "value1,value2",
          "zzb_num": 2,
          "zzb_unit": "收入进度 %,序时进度 %",
          "value1": 45.01,
          "value1_unit": "%",
          "value2": 33.33,
          "value2_unit": "%"
        },
        {
          "fiscal_year": "2024",
          "month": 5,
          "mof_div_code": "33",
          "mof_div_name": "浙江省",
          "hzb": "month",
          "zzb": "value1,value2",
          "zzb_num": 2,
          "zzb_unit": "收入进度 %,序时进度 %",
          "value1": 51.58,
          "value1_unit": "%",
          "value2": 41.67,
          "value2_unit": "%"
        },
        {
          "fiscal_year": "2024",
          "month": 6,
          "mof_div_code": "33",
          "mof_div_name": "浙江省",
          "hzb": "month",
          "zzb": "value1,value2",
          "zzb_num": 2,
          "zzb_unit": "收入进度 %,序时进度 %",
          "value1": 60.96,
          "value1_unit": "%",
          "value2": 50,
          "value2_unit": "%"
        }
      ],
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  created () {
    this.convertToTree()
    this.current = 4
    let currentCity = {
      id: 4,
      label: '杭州市',
      children: [{
        id: 9,
        label: '拱墅区'
      }, {
        id: 10,
        label: '西湖区'
      }]
    }
    this.handleNodeClick(currentCity)
  },
  methods: {
    printBtn () {
      //（1）首先获得元素的html内容（这里建议如果有样式最好是用内联样式的方式）
      var newstr = document.getElementById("block").innerHTML;//得到需要打印的元素HTML
      console.log(newstr);

      //（2）保存当前页面的整个html，因为window.print()打印操作是打印当前页的所有内容，所以先将当前页面保存起来，之后便于恢复。
      var oldstr = document.body.innerHTML;//保存当前页面的HTML

      //（3）把当前页面替换为打印内容HTML
      document.body.innerHTML = newstr;

      //（4）执行打印操作
      window.print();

      //（5）还原当前页面
      document.body.innerHTML = oldstr;
    },
    //  生成树结构
    convertToTree () {
      let treeData = []
      this.flatData1.forEach(item => {
        console.log(Array.from(new Set(treeData.map(el => el.value))), "111");

        if (treeData.length > 0 && Array.from(new Set(treeData.map(el => el.value))).includes(item.year)) {

        } else {
          treeData.push({ value: item.year, children: [] })
        }
      })
      treeData.forEach(el => {
        this.flatData1.forEach(item => {
          if (item.year === el.value) {
            el.children.push({ value: item.month, year: item.year })
          }
        })
      })
      console.log(treeData);
      return treeData
    },

    //改变选中态
    changeCity () {
      this.current = 33
      this.showTree = false
      this.$nextTick(() => {
        this.showTree = true
      })
      let currentCity = {
        id: 33,
        label: '鹿城区',
        children: [{
          id: 74,
          label: '一个街道'
        }, {
          id: 85,
          label: '两个街道'
        }]
      }
      this.handleNodeClick(currentCity)
      this.setScrollTop(currentCity)
    },
    renderContent (h, { node }) {
      // console.log(node)
      return h('span', {
        // 自定义class类名
        class: 'custom-node',
        // 设置样式(样式权限仅次于 !important，可能会覆盖掉原有定义的其他选择器样式)
        style: {
          color: node.id === this.topId ? 'red' : 'black',
          fontWeight: node.isLeaf ? 'bold' : 'normal'
        }
      }, node.label);
    },
    //
    handleNodeClick (node) {
      // console.log(node);
      // 搜索点击定位 清空
      this.filterText = ''
      // 设置选中节点高亮
      this.setcurrent(node)

      const nodeItem = this.$refs.tree.getNode(node)
      this.ids = []
      this.getIds(nodeItem)

    },
    getIds (nodeItem) {
      this.ids.unshift(nodeItem.data.id)
      if (nodeItem.parent && nodeItem.parent.data.id) {
        this.getIds(nodeItem.parent)
        scope.row.gjjzz == 0 ? '空编' : scope.row.gjjzz == 1 ? '缺编' : scope.row.gjjzz == 2 ? '满编' : '超编'
      }
    },
    setcurrent (node) {
      setTimeout(() => {
        // 移除高亮
        var table = document.getElementById("is-parent")
        if (table) {
          table.removeAttribute("id")
        }

        //拿到选中的节点元素如果有值则获取当前元素的父元素的同级元素添加一个id然后设置这个id的样式,要在每次设置之前先在上面清除上一次设置属性的id
        let parentEle = document.getElementsByClassName('is-current')[0]
        if (node.children) {
          // is-current在父节点上
          parentEle.setAttribute('id', 'is-parent')
        } else {
          // is-current在自己的上
          parentEle.parentNode.parentNode.setAttribute('id', 'is-parent')
        }
      }, 10)
    },
    setScrollTop (node) {
      // 设置选中定位
      setTimeout(() => {
        var container = document.querySelector('.block')
        let parent = node.children ? document.getElementsByClassName("is-current")[0].getBoundingClientRect() : document.getElementsByClassName("is-current")[0].parentNode.parentNode.getBoundingClientRect()
        container.scrollTop += parent.top - container.getBoundingClientRect().top
        // console.log(parent.top, container.getBoundingClientRect(), container.scrollTop);

      }, 10);
    },
    //方案一
    getrigDetail (data, node) {
      if (this.paramsId.companyId !== data.companyId) {
        const parentEle = document.getElementById('is-current')
        if (parentEle) {
          parentEle.setAttribute('id', '')
        }
      }

      this.paramsId.companyId = data.companyId
      this.paramsId.projectId = data.projectId
      this.$nextTick(() => {
        //判断node有值并且点击的是二级节点
        if (node && node.level === 2) {
          let parentEle = document.getElementsByClassName('is-current')[0] //拿到选中的节点元素如果有值则获取当前元素的父元素的同级元素添加一个id然后设置这个id的样式,要在每次设置之前先在上面清除上一次设置属性的id
          if (parentEle) {
            parentEle.parentNode.previousSibling.setAttribute('id', 'is-current')
          }
        }
      })
    },
    append (node, data) {
      // console.log(node, data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      const newChild = { ...data, id: this.generateRandom() };
      children.splice(index + 1, 0, newChild)
    },
    generateRandom () {
      return Math.random().toString(16).slice(2);
    },
    remove (node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      // console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    }
  },

}
</script>

<style scoped>
>>> .el-carousel__container {
  height: 400px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<style scoped>
/* 容器样式 */
.block {
  height: 100%;
  display: flex;
  flex-direction: column;
}
/*树节点样式 */
.custom-tree-node {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
/* 选中节点 父节点样式 */
>>> #is-parent {
  background-color: #edeff1;
}

::v-deep
  .myTree.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__conten {
  color: red !important;
  background-color: blue !important;
}
::v-deep .el-tree-node.is-current > .el-tree-node__content {
  background-color: #c5e2ff;
}
.itemTree {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.itemTree:hover .btn {
  opacity: 1;
}
.btn {
  opacity: 0;
}
</style>
