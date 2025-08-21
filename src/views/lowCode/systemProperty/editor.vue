<template>
  <div>
    <!-- 行面板 -->
    <div>
      <!-- 启用+属性名 -->
      <el-checkbox v-model="enable"></el-checkbox>
      <!-- 编辑器切换 -->
      <el-dropdown>
        <!-- 触发对象 -->
        <div class="bt">
          <!-- 图标 -->
          <i :class="editorIcon"></i>
          <!-- 下标 -->
          <i class="el-icon-caret-bottom"></i>
        </div>
        <!-- 弹出菜单 -->
        <el-dropdown-menu slot="dropdown">
          <!-- 菜单项 -->
          <el-dropdown-item
            v-for="(item, index) in enabledEditors"
            :key="index"
            :icon="item.icon"
            :command="item.value"
            >{{ item.label }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 打开JSON编辑器 -->
      <div v-if="['array', 'object'].includes(editor)">
        <el-button type="text" size="mini" @click="editJson"
          >打开JSON编辑器</el-button
        >
      </div>
      <!-- 选择器 -->
      <el-select v-if="editor == 'enum'" v-model="strValue">
        <el-option></el-option>
      </el-select>
      <!-- 数字编辑器 -->
      <el-input-number
        v-if="editor == 'number'"
        :step="1"
        controlsPosition="right"
        size="mini"
        @change="change"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    prop: String,
    label: {
      type: String,
      default: "属性名"
    },
    type: {
      type: String,
      // "boolean", "number", "slider", "meterage", "string", "text", "html",
      // "object", "array", "matrix", "objects", "color", "enum", "function"
      default: "string"
    },
    editors: Array,
    units: {
      type: Array,
      default: ["px", "pt", "em", "%"]
    },
    options: Array
  },
  data () {
    return {
      editorMap: {
        "boolean": { "icon": "el-icon-check", "label": "布尔值 Boolean" },
        "number": { "icon": "el-icon-sort", "label": "数字 Number" },
        "slider": { "icon": "el-icon-s-operation", "label": "滑块 Slider" },
        "meterage": { "icon": "el-icon-news", "label": "计量值 Meterage" },
        "string": { "icon": "el-icon-document", "label": "字符串 String" },
        "color": { "icon": "el-icon-news", "label": "颜色 Color" },
        "enum": { "icon": "el-icon-news", "label": "枚举 Enum" },
        "text": { "icon": "el-icon-document-copy", "label": "文本 Text" },
        "html": { "icon": "el-icon-monitor", "label": "富文本 Html" },
        "object": { "icon": "el-icon-coin", "label": "对象 JSON" },
        "array": { "icon": "el-icon-coin", "label": "数组 JSON" },
        "matrix": { "icon": "el-icon-files", "label": "数据表格 CSV" },
        "objects": { "icon": "el-icon-files", "label": "对象数组 CSV+HRow" },
        "variable": { "icon": "el-icon-share", "label": "变量 Variable" },
        "expression": { "icon": "el-icon-set-up", "label": "表达式 Expression" },
        "function": { "icon": "el-icon-cpu", "label": "函数 Function" }
      },
      editor: "meterage",
      enable: false,
      numValue: undefined,
      strValue: "",
      boolValue: false,
      objValue: null
    }
  },
  computed: {
    value () {
      return this.$app.getPathProperty({ _vm: this }, this.prop)
    },
    readonly () {
      return ["object", "array", "html"].includes(this.editor)
    },
    editorIcon () {
      return this.editorMap[this.editor].icon
    },
    enabledEditors () {
      let names = []
      if (this.editors) {
        names = this.editors
      } else {
        // "boolean", "number", "meterage", "string", "text", "html",
        // "object", "array", "matrix", "objects", "color", "enum", "variable", "function"
        switch (this.type) {
          case "meterage":
          case "color":
            names = [this.type, "string", "variable", "expression"]
            break
          case "matrix":
          case "objects":
            names = ["array", this.type, "variable", "expression"]
            break
          case "function":
            names = ["variable", "function"]
            break
          case "variable":
            names = ["variable", "expression"]
            break
          default:
            names = [this.type, "variable", "expression"]
        }
      }
      return names.map(type => {
        let editor = this.editorMap[type]
        editor.value = type
        return editor
      })
    }
  },
  watch: {
    data: {
      handler: "init",
      immediate: true
    },
    prop: "init"
  },
  methods: {
    init () {
      let val = this.value, type = this.type, valType = typeof val
      if (val !== undefined) {
        this.enable = true
        if (valType == "boolean") {
          this.editor = "boolean"
          this.boolValue = val
        } else if (valType == "number") {
          this.editor = type == "slider" ? "slider" : "number"
          this.numValue = val
        } else if (valType == "string") {
          if (val.length > 1 && val[1] == ":") {
            this.editor = {
              v: "variable",
              e: "expression",
              m: "matrix",
              o: "objects",
              f: "function"
            }[val[0]]
            this.strValue = val.substring(2)
          } else {
            if (type == "meterage" && !/^-?(\d+\.)?\d+[%a-zA-Z]+$/g.test(val)) {
              this.editor = "string"
            } else {
              this.editor = type
            }
            this.strValue = val
          }
        } else {
          this.editor = Array.isArray(val) ? "array" : "object"
          this.strValue = JSON.stringify(val, null, 2)
          this.objValue = val
        }
      } else {
        this.enable = false
        if (type == "boolean") {
          this.boolValue = false
        } else if (type == "number") {
          this.numValue = undefined
        } else if (type == "string") {
          this.strValue = ""
        } else {
          this.strValue = ""
          this.objValue = undefined
        }
        this.editor = type == "matrix" || type == "objects" ? "array" : type
      }
    },
    enabled (val) {
      if (val) {
        this.resetProperty()
      } else {
        console.log("del", this.prop)
        this.$app.delPathProperty({ _vm: this }, this.prop)
      }
    },
    resetProperty () {
      // 设置值
      let oldVal
      let pre = {
        variable: "v:",
        expression: "e:",
        matrix: "m:",
        objects: "o:",
        "function": "f:"
      }[this.editor]
      if (pre) {
        oldVal = pre + this.strValue
      } else if (this.editor == "boolean") {
        oldVal = this.boolValue
      } else if (this.editor == "number") {
        oldVal = this.numValue
      } else if (this.editor == "array" || this.editor == "object") {
        oldVal = this.objValue
      } else {
        oldVal = this.strValue
      }
      console.log(`reset ${this.prop}`, oldVal, typeof oldVal)
      this.$app.setPathProperty({ _vm: this }, this.prop, oldVal)
    },
    setEditor (editor) {
      this.editor = editor
      this.resetProperty()
    },
    change (val) {
      val = val != undefined ? val : ''
      if (typeof val == "string") {
        val = val.trim()
      }
      let pre = {
        variable: "v:",
        expression: "e:",
        matrix: "m:",
        objects: "o:",
        "function": "f:"
      }[this.editor]
      if (pre) {
        val = pre + val
      }
      console.log(`set ${this.prop}`, val, typeof val)
      this.enable = true
      this.$app.setPathProperty({ _vm: this }, this.prop, val)
      //this.$forceUpdate()
    },
    editJson () {
      this.$dialog(
        {
          width: "60%",
          top: "47px",
          title: "Json编辑器",
          appendToBody: true,
          closeOnClickModal: false,
          noBindOptions: true
        },
        "UIBlock",
        {
          code: "system-json-editor",
          json: this.objValue
        }
      ).then(({ json, code }) => {
        this.strValue = code
        this.objValue = json
        this.enable = true
        this.$app.setPathProperty({ _vm: this }, this.prop, json)
      });
    },
    editHtml () {
      this.$dialog(
        {
          width: "60%",
          top: "47px",
          title: "富文本编辑器",
          appendToBody: true,
          closeOnClickModal: false,
          noBindOptions: true
        },
        "UIBlock",
        {
          code: "system-html-editor",
          html: this.strValue
        }
      ).then((html) => {
        this.strValue = html
        this.enable = true
        this.$app.setPathProperty({ _vm: this }, this.prop, html)
      });
    }
  }
}

</script>

<style>
.el-icon-caret-bottom {
  -webkit-text-stroke: 1px white;
  transform-origin: bottom right;
  transform: scale(0.8);
  right: 0;
  bottom: 0;
  position: absolute;
}
.bt:hover {
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
}
</style>
