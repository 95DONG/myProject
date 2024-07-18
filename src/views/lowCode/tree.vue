<template>
  <div class="block">
    <div style="flex: 1; width: 200px">
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
    </div>
    <el-button type="primary" @click="changeCity" style="width: 200px"
      >按钮</el-button
    >
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
      filterText: '',
      showTree: true,
      current: 4,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ids: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  created () {
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
