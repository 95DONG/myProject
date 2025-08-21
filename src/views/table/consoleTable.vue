<template>
  <div class="drawing-tool-container">

    <!-- <div class="toolbar">
      <button
        class="btn btn-clear"
        @click="clearAllBoxes"
        :disabled="boxes.length === 0"
      >
        <i class="fa fa-trash-o"></i> 清除所有
      </button>
      <button
        class="btn btn-delete"
        @click="deleteSelectedBox"
        :disabled="!selectedBoxId"
      >
        <i class="fa fa-times"></i> 删除选中
      </button>
      <div class="info">
        <span>框数量: {{ boxes.length }}</span>
        <span v-if="selectedBoxId">选中: {{ getSelectedBoxName() }}</span>
        <span v-else>未选中任何框</span>
      </div>
    </div> -->

    <!-- 画图区域 -->
    <div class="canvas-container" :style="{height:height}">
      <img
        src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        alt=""
        class="imgClass"
        id="imgClass"
        @load="handleImageLoad"
      >
      <!-- 新增：图片加载完成事件 -->
      <div
        id="drawingCanvas"
        class="drawing-canvas"
        @mousedown="startDrawing"
        @mousemove="handleMouseMove"
        @mouseup="endDrawing"
        @mouseleave="endDrawing"
        @click="deselectBox"
        @contextmenu.prevent="hideContextMenu"
      >
        <!-- 画布提示 -->
        <div class="canvas-hint" v-if="boxes.length === 0 && !isDrawing">
          <i class="fa fa-paint-brush"></i>
          <p>点击并拖动绘制矩形框（支持任意方向）</p>
        </div>

        <!-- 动态生成的框 -->
        <div
          v-for="box in boxes"
          :key="box.id"
          class="drawing-box"
          :class="{
            'selected': box.id === selectedBoxId,
            'drawing': box.id === currentDrawingId
          }"
          :style="getBoxStyle(box)"
          @mousedown.stop="startDragging(box, $event)"
          @click.stop="selectBox(box.id)"
          @contextmenu.stop.prevent="showContextMenu(box, $event)"
        >
          <div class="box-name">{{ box.name }}</div>

          <!-- 框的控制手柄 -->
          <div
            v-if="box.id === selectedBoxId"
            class="resize-handle top-left"
            @mousedown.stop="startResizing(box, 'top-left', $event)"
          ></div>
          <div
            v-if="box.id === selectedBoxId"
            class="resize-handle top-right"
            @mousedown.stop="startResizing(box, 'top-right', $event)"
          ></div>
          <div
            v-if="box.id === selectedBoxId"
            class="resize-handle bottom-left"
            @mousedown.stop="startResizing(box, 'bottom-left', $event)"
          ></div>
          <div
            v-if="box.id === selectedBoxId"
            class="resize-handle bottom-right"
            @mousedown.stop="startResizing(box, 'bottom-right', $event)"
          ></div>
        </div>
      </div>
    </div>

    <!-- 右键菜单 -->
    <div
      v-if="showMenu"
      class="context-menu"
      :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
    >
      <div class="menu-item" @click="renameBox">
        <i class="el-icon-edit"></i> 重命名
      </div>
      <div class="menu-item" @click="deleteFromMenu">
        <i class="el-icon-delete"></i> 删除
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      boxes: [],
      selectedBoxId: null,
      isDrawing: false,
      currentDrawingId: null,
      drawStart: { x: 0, y: 0 },
      isDragging: false,
      draggingBox: null,
      dragOffset: { x: 0, y: 0 },
      isResizing: false,
      resizingBox: null,
      resizeDirection: '',
      canvas: null,
      canvasRect: null,
      animationFrameId: null,
      showMenu: false,
      menuTop: 0,
      menuLeft: 0,
      currentMenuBox: null,
      showRenameDialog: false,
      newBoxName: '',
      height: '500px',
      imageLoaded: false  // 新增：图片加载状态标记
    }
  },

  mounted () {
    this.canvas = document.getElementById('drawingCanvas')
    this.updateCanvasRect()

    window.addEventListener('resize', this.updateCanvasRect)

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.context-menu') && !e.target.closest('.drawing-box')) {
        this.hideContextMenu()
      }
    })
    // 注释掉原有的超时设置高度方式
    // setTimeout(() => {
    //   this.height = document.getElementById('imgClass').offsetHeight + 'px'
    // }, 100)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.updateCanvasRect)
    document.removeEventListener('click', () => this.hideContextMenu())
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  },

  methods: {
    // 已完成矩形框的类名
    getBoxClass(box){
      let name = "drawing-box"
      if(box.id === this.selectedBoxId) name = name + ' selected'
      if(box.id === this.currentDrawingId) name = name + ' drawing'
      return name
    },
    // 新增：图片加载完成处理
    handleImageLoad() {
      this.imageLoaded = true
      this.height = document.getElementById('imgClass').offsetHeight + 'px'
      this.updateCanvasRect()
    },

    getSelectedBoxName () {
      const box = this.boxes.find(b => b.id === this.selectedBoxId)
      return box ? this.getBoxName(box) : ''
    },

    getBoxName (box) {
      if (!box) return '未知'
      return box.name ? box.name.trim() : '未命名'
    },

    updateCanvasRect () {
      if (this.canvas) {
        this.canvasRect = this.canvas.getBoundingClientRect()
      }
    },

    // 新增：像素转百分比
    pxToPercent(px, axis = 'x') {
      const size = axis === 'x' ? this.canvasRect.width : this.canvasRect.height
      if (size === 0) return 0
      return (px / size) * 100
    },

    // 新增：百分比转像素
    percentToPx(percent, axis = 'x') {
      const size = axis === 'x' ? this.canvasRect.width : this.canvasRect.height
      return (percent / 100) * size
    },

    // 修改：获取框的样式，使用百分比
    getBoxStyle (box) {
      return {
        left: `${box.x}%`,    // 原为 transform: translate(${box.x}px, ${box.y}px)
        top: `${box.y}%`,
        width: `${box.width}%`,
        height: `${box.height}%`,
        transform: 'none'     // 移除transform
      }
    },

    // 修改：开始绘制逻辑
    startDrawing (e) {
      // 忽略右键点击和未加载完成的图片
      if (e.button === 2 || !this.imageLoaded) return

      this.updateCanvasRect()

      // 计算相对于画布的坐标（像素）
      const x = e.clientX - this.canvasRect.left
      const y = e.clientY - this.canvasRect.top

      this.drawStart = { x, y }

      const boxId = `box-${Date.now()}`

      // 创建新框（存储百分比坐标）
      const newBox = {
        id: boxId,
        x: this.pxToPercent(x, 'x'),  // 原为 x
        y: this.pxToPercent(y, 'y'),  // 原为 y
        width: 0,
        height: 0
      }
      this.$set(newBox, 'name', '右击修改名称')
      this.boxes.push(newBox)

      this.isDrawing = true
      this.currentDrawingId = boxId
      this.selectedBoxId = boxId

      this.hideContextMenu()
    },

    // 修改：绘制过程逻辑
    draw (currentX, currentY) {
      if (!this.isDrawing || !this.currentDrawingId || !this.imageLoaded) return

      const currentBox = this.boxes.find(box => box.id === this.currentDrawingId)
      if (!currentBox) return

      // 计算最小和最大像素坐标
      const minX = Math.min(this.drawStart.x, currentX)
      const minY = Math.min(this.drawStart.y, currentY)
      const maxX = Math.max(this.drawStart.x, currentX)
      const maxY = Math.max(this.drawStart.y, currentY)

      // 转换为百分比
      const x = this.pxToPercent(minX, 'x')
      const y = this.pxToPercent(minY, 'y')
      const width = this.pxToPercent(maxX - minX, 'x')
      const height = this.pxToPercent(maxY - minY, 'y')

      // 只在有明显变化时才更新
      const minChange = 0.1  // 百分比最小变化值，原为1像素
      if (Math.abs(width - currentBox.width) < minChange &&
          Math.abs(height - currentBox.height) < minChange &&
          Math.abs(x - currentBox.x) < minChange &&
          Math.abs(y - currentBox.y) < minChange) {
        return
      }

      this.$set(currentBox, 'x', x)
      this.$set(currentBox, 'y', y)
      this.$set(currentBox, 'width', Math.max(0.5, width))  // 最小0.5%，原为5像素
      this.$set(currentBox, 'height', Math.max(0.5, height))
    },

    endDrawing () {
      if (!this.isDrawing) return

      this.isDrawing = false

      // 检查最后绘制的框是否有效
      const currentBox = this.boxes.find(box => box.id === this.currentDrawingId)
      if (currentBox && (currentBox.width < 0.5 || currentBox.height < 0.5)) {  // 改为0.5%
        this.boxes = this.boxes.filter(box => box.id !== this.currentDrawingId)
        this.selectedBoxId = null
      }

      this.currentDrawingId = null
      this.drawStart = { x: 0, y: 0 }
    },

    selectBox (boxId) {
      this.selectedBoxId = boxId
      this.hideContextMenu()
    },

    deselectBox () {
      if (!this.isDragging && !this.isResizing) {
        this.selectedBoxId = null
      }
    },

    // 修改：开始拖拽逻辑
    startDragging (box, e) {
      if (e.button === 2 || !this.imageLoaded) return  // 增加图片加载检查

      this.selectedBoxId = box.id
      this.isDragging = true
      this.draggingBox = box

      // 计算鼠标在框内的偏移量（像素）
      const boxXPx = this.percentToPx(box.x, 'x')  // 新增转换
      const boxYPx = this.percentToPx(box.y, 'y')  // 新增转换

      this.dragOffset.x = e.clientX - (this.canvasRect.left + boxXPx)
      this.dragOffset.y = e.clientY - (this.canvasRect.top + boxYPx)

      e.stopPropagation()
      e.preventDefault()
      this.hideContextMenu()
    },

    handleMouseMove (e) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
      }

      this.animationFrameId = requestAnimationFrame(() => {
        if (!this.imageLoaded) return  // 增加图片加载检查

        this.updateCanvasRect()
        const currentX = e.clientX - this.canvasRect.left
        const currentY = e.clientY - this.canvasRect.top

        if (this.isDrawing) {
          this.draw(currentX, currentY)
        } else if (this.isDragging && this.draggingBox) {
          this.drag(currentX, currentY)
        } else if (this.isResizing && this.resizingBox) {
          this.resizeBox(currentX, currentY)
        }
      })
    },

    // 修改：拖拽逻辑
    drag (currentX, currentY) {
      // 计算新像素位置
      const newX = currentX - this.dragOffset.x
      const newY = currentY - this.dragOffset.y

      // 边界检查（像素）
      const boxWidthPx = this.percentToPx(this.draggingBox.width, 'x')  // 新增转换
      const boxHeightPx = this.percentToPx(this.draggingBox.height, 'y')  // 新增转换

      const boundedX = Math.max(0, Math.min(newX, this.canvasRect.width - boxWidthPx))
      const boundedY = Math.max(0, Math.min(newY, this.canvasRect.height - boxHeightPx))

      // 转换为百分比
      const newXPercent = this.pxToPercent(boundedX, 'x')
      const newYPercent = this.pxToPercent(boundedY, 'y')

      // 只在位置变化明显时才更新
      if (Math.abs(newXPercent - this.draggingBox.x) > 0.1 ||  // 改为百分比变化
          Math.abs(newYPercent - this.draggingBox.y) > 0.1) {
        this.$set(this.draggingBox, 'x', newXPercent)
        this.$set(this.draggingBox, 'y', newYPercent)
      }
    },

    handleMouseUp () {
      this.isDragging = false
      this.draggingBox = null
      this.isResizing = false
      this.resizingBox = null
      this.resizeDirection = ''

      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
        this.animationFrameId = null
      }
    },

    // 修改：开始调整大小逻辑
    startResizing (box, direction, e) {
      if (e.button === 2 || !this.imageLoaded) return  // 增加图片加载检查

      this.selectedBoxId = box.id
      this.isResizing = true
      this.resizingBox = box
      this.resizeDirection = direction

      e.stopPropagation()
      e.preventDefault()
      this.hideContextMenu()
    },

    // 修改：调整框的大小逻辑
    resizeBox (currentX, currentY) {
      if (!this.resizingBox || !this.resizeDirection) return

      const box = this.resizingBox
      // 转换当前框属性为像素
      const boxXPx = this.percentToPx(box.x, 'x')
      const boxYPx = this.percentToPx(box.y, 'y')
      const boxWidthPx = this.percentToPx(box.width, 'x')
      const boxHeightPx = this.percentToPx(box.height, 'y')

      // 根据不同方向调整大小（像素计算）
      let newXPx = boxXPx
      let newYPx = boxYPx
      let newWidthPx = boxWidthPx
      let newHeightPx = boxHeightPx

      switch (this.resizeDirection) {
        case 'bottom-right':
          newWidthPx = Math.max(5, currentX - boxXPx)
          newHeightPx = Math.max(5, currentY - boxYPx)
          break

        case 'bottom-left':
          newWidthPx = Math.max(5, boxXPx + boxWidthPx - currentX)
          newXPx = boxXPx + boxWidthPx - newWidthPx
          newHeightPx = Math.max(5, currentY - boxYPx)
          break

        case 'top-right':
          newWidthPx = Math.max(5, currentX - boxXPx)
          newHeightPx = Math.max(5, boxYPx + boxHeightPx - currentY)
          newYPx = boxYPx + boxHeightPx - newHeightPx
          break

        case 'top-left':
          newWidthPx = Math.max(5, boxXPx + boxWidthPx - currentX)
          newXPx = boxXPx + boxWidthPx - newWidthPx
          newHeightPx = Math.max(5, boxYPx + boxHeightPx - currentY)
          newYPx = boxYPx + boxHeightPx - newHeightPx
          break
      }

      // 确保框不会移出画布
      newXPx = Math.max(0, newXPx)
      newYPx = Math.max(0, newYPx)
      newWidthPx = Math.min(newWidthPx, this.canvasRect.width - newXPx)
      newHeightPx = Math.min(newHeightPx, this.canvasRect.height - newYPx)

      // 转换回百分比并更新
      this.$set(box, 'x', this.pxToPercent(newXPx, 'x'))
      this.$set(box, 'y', this.pxToPercent(newYPx, 'y'))
      this.$set(box, 'width', this.pxToPercent(newWidthPx, 'x'))
      this.$set(box, 'height', this.pxToPercent(newHeightPx, 'y'))
    },

    // 以下方法未做修改
    deleteSelectedBox () {
      if (!this.selectedBoxId) return

      this.boxes = this.boxes.filter(box => box.id !== this.selectedBoxId)
      this.selectedBoxId = null
    },

    clearAllBoxes () {
      this.boxes = []
      this.selectedBoxId = null
    },

    showContextMenu (box, e) {
      console.log('显示右键菜单')

      this.selectedBoxId = box.id
      this.currentMenuBox = box

      this.menuTop = e.clientY
      this.menuLeft = e.clientX

      this.showMenu = true
    },

    hideContextMenu () {
      this.showMenu = false
    },

    deleteFromMenu () {
      if (this.currentMenuBox) {
        this.boxes = this.boxes.filter(box => box.id !== this.currentMenuBox.id)
        this.selectedBoxId = null
        this.hideContextMenu()
      }
    },

    renameBox () {
      if (this.currentMenuBox) {
        this.newBoxName = this.currentMenuBox.name || ''
        this.hideContextMenu()

        this.$nextTick(() => {
          if (this.$refs.renameInput) {
            this.$refs.renameInput.focus()
          }
        })
        this.$prompt ('', '重命名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:this.newBoxName
        }).then(({ value }) => {
          this.newBoxName = value
          this.confirmRename()

        }).catch(() => {
         this.cancelRename ()
        });
      }
    },

    confirmRename () {
      console.log('重命名后的数据:', this.currentMenuBox)
      if (this.currentMenuBox) {
        const newName = this.newBoxName.trim()

        this.currentMenuBox.name = newName

        const boxIndex = this.boxes.findIndex(box => box.id === this.currentMenuBox.id)
        if (boxIndex !== -1) {
          const updatedBox = { ...this.boxes[boxIndex], name: newName }
          this.boxes.splice(boxIndex, 1, updatedBox)
          this.boxes = [...this.boxes]
        }
      }

      this.showRenameDialog = false
      this.newBoxName = ''
    },

    cancelRename () {
      this.showRenameDialog = false
      this.newBoxName = ''
    }
  },

  created () {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    // 注释掉原有的设置高度方式
    // this.$nextTick(() => {
    //   console.log('offsetHeight', document.getElementById('imgClass').offsetHeight)
    //   this.height = document.getElementById('imgClass').offsetHeight + 'px'
    // })
  }
}
</script>

<style scoped>
/* 样式未做修改，保持原样 */
.drawing-tool-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-clear {
  background-color: #f5f5f5;
  color: #333;
}

.btn-clear:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover:not(:disabled) {
  background-color: #d32f2f;
}

.info {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 14px;
}
.canvas-container{
  position: relative;
  width: 100%;
  height: 600px;
}
.imgClass{
  width: 100%;
}

.drawing-canvas {
  width: 100%;
  height: 100%;
  background-color: rgba(249, 249, 249,0.2);
  border: 2px dashed #ccc;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: border-color 0.3s;
}

.drawing-canvas:hover {
  border-color: #666;
}

.canvas-hint {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  pointer-events: none;
}

.canvas-hint i {
  font-size: 48px;
  margin-bottom: 15px;
  opacity: 0.5;
}

.drawing-box {
  position: absolute;  /* 保持绝对定位 */
  border: 2px solid #42b983;
  background-color: rgba(66, 185, 131, 0.1);
  box-sizing: border-box;
  transition: all 0.05s ease;
  will-change: left, top, width, height;  /* 更新为百分比相关属性 */
}

.drawing-box.selected {
  border-color: #1890ff;
  background-color: rgba(24, 144, 255, 0.15);
  z-index: 10;
}

.drawing-box.drawing {
  border-style: dashed;
}

.box-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 12px;
  color: #e74c3c;
  padding: 0 4px;
  border-radius: 2px;
  white-space: nowrap;
}

.resize-handle {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: white;
  border: 1px solid #3498db;
  border-radius: 6px;
  z-index: 20;
  touch-action: none;
}

.top-left {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}

.top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}

.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}

.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
}

.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  z-index: 1000;
  min-width: 120px;
}

.menu-item {
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item i {
  font-size: 14px;
  color: #666;
}
</style>
