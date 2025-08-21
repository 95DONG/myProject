<template>
  <div class="svg-parser-container">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 左侧：上传区域和预览 -->
      <div class="space-y-6">
        <!-- 上传区域 -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">

          <!-- 拖放区域 -->
          <div
            @click="triggerFileSelect"
            :class="['drop-area', { active: isDragging }]"
            class="rounded-lg p-8 text-center mb-4 cursor-pointer"
          >
            <i class="fa fa-file-image-o text-5xl text-gray-400 mb-3"></i>
            <p class="text-gray-600 mb-2">拖放SVG文件到此处，或</p>
            <label class="inline-block bg-primary text-white py-2 px-6 rounded-md cursor-pointer hover:bg-primary/90 transition-colors">
              <i class="fa fa-folder-open mr-1"></i>选择文件
              <input
                type="file"
                ref="fileInput"
                accept=".svg"
                class="hidden"
                @change="handleFileChange"
              >
            </label>
          </div>

          <!-- 文件信息 -->
          <div v-if="selectedFile" class="flex items-center p-3 bg-gray-50 rounded-md">
            <i class="fa fa-file-text-o text-primary mr-3"></i>
            <div class="flex-1">
              <p class="font-medium text-gray-800 truncate">{{ selectedFile.name }}</p>
              <p class="text-sm text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
            </div>
            <button @click="resetUpload" class="text-gray-400 hover:text-red-500 transition-colors">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>

        <!-- 预览区域 -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <i class="fa fa-eye text-primary mr-2"></i>SVG预览
          </h2>

          <div class="flex justify-center items-center min-h-[300px] bg-gray-50 rounded-md p-4">
            <div v-if="!svgContent" class="text-center text-gray-400">
              <i class="fa fa-picture-o text-4xl mb-3"></i>
              <p>上传SVG文件后在此预览</p>
            </div>

            <div v-else-if="previewError" class="text-center text-red-500">
              <i class="fa fa-exclamation-triangle text-4xl mb-3"></i>
              <p>无法预览此SVG文件</p>
            </div>

            <div v-else class="max-w-full max-h-[300px]" v-html="svgContent"></div>
          </div>
        </div>
      </div>

      <!-- 右侧：代码显示和操作 -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <i class="fa fa-code text-primary mr-2"></i>SVG代码
        </h2>

        <div class="mb-4">
          <div class="flex flex-wrap justify-between items-center mb-2 gap-2">
            <p class="text-gray-600">解析后的SVG代码：</p>
            <div class="flex gap-2">
              <button
                @click="copyToClipboard"
                :disabled="!svgContent"
                class="py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors flex items-center"
              >
                <i class="fa fa-copy mr-1"></i>复制
              </button>
              <button
                @click="downloadSvg"
                :disabled="!svgContent"
                class="py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors flex items-center"
              >
                <i class="fa fa-download mr-1"></i>下载
              </button>
              <button
                @click="formatSvgCode"
                :disabled="!svgContent"
                class="py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors flex items-center"
              >
                <i class="fa fa-indent mr-1"></i>格式化
              </button>
            </div>
          </div>

          <div class="relative">
            <pre class="code-block bg-gray-50 p-4 rounded-md border border-gray-200 h-[500px] overflow-auto text-sm text-gray-800">
              {{ displayCode }}
            </pre>
            <div v-if="showCopyNotification" class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300 animate-fade-in-out">
              已复制
            </div>
          </div>
        </div>

        <!-- 代码信息 -->
        <div v-if="svgContent" class="p-3 bg-gray-50 rounded-md text-sm text-gray-600">
          <div class="flex justify-between">
            <span><i class="fa fa-tag mr-1"></i>标签数量：{{ tagCount }}</span>
            <span><i class="fa fa-file-code-o mr-1"></i>代码长度：{{ svgContent.length }}字符</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SvgParser',
  data() {
    return {
      selectedFile: null,
      svgContent: '',
      displayCode: '',
      isDragging: false,
      previewError: false,
      showCopyNotification: false,
      tagCount: 0
    }
  },
  methods: {
    // 处理拖放事件
    handleDragEnter(e) {
      e.preventDefault();
      e.stopPropagation();
      this.isDragging = true;
    },

    handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
    },

    handleDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      // 检查是否完全离开拖放区域
      if (e.relatedTarget && !this.$el.contains(e.relatedTarget)) {
        this.isDragging = false;
      }
    },

    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.isDragging = false;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.handleFile(e.dataTransfer.files[0]);
      }
    },

    // 触发文件选择
    triggerFileSelect() {
      this.$refs.fileInput.click();
    },

    // 处理文件选择
    handleFileChange(e) {
      console.log(e)
      if (e.target.files && e.target.files.length > 0) {
        this.handleFile(e.target.files[0]);
      }
    },

    // 处理上传的文件
    handleFile(file) {
      // 验证文件类型
      if (!file.type.match('image/svg+xml') && !file.name.endsWith('.svg')) {
        this.$notify.error({
          title: '错误',
          message: '请上传SVG格式的文件'
        });
        return;
      }

      this.selectedFile = file;
      this.previewError = false;

      // 读取文件内容
      const reader = new FileReader();

      reader.onload = (e) => {
        console.log(e)
        try {
          this.svgContent = e.target.result;
          this.displayCode = this.svgContent;

          // 分析SVG代码
          this.analyzeSvgCode(this.svgContent);

          // 尝试预览（如果解析失败会触发error）
          this.$nextTick(() => {
            const svgElement = this.$el.querySelector('.max-w-full svg');
            if (svgElement) {
              // 确保SVG正确显示
              if (!svgElement.getAttribute('width')) {
                svgElement.setAttribute('width', '100%');
              }
              if (!svgElement.getAttribute('height')) {
                svgElement.setAttribute('height', '100%');
              }
            } else {
              this.previewError = true;
            }
          });
        } catch (err) {
          console.error('解析SVG失败:', err);
          this.previewError = true;
          this.$notify.error({
            title: '解析失败',
            message: '无法解析SVG文件，请检查文件格式'
          });
        }
      };

      reader.onerror = () => {
        this.$notify.error({
          title: '读取失败',
          message: '读取文件时发生错误，请重试'
        });
      };

      // 以文本形式读取文件
      reader.readAsText(file);
    },

    // 重置上传
    resetUpload() {
      this.selectedFile = null;
      this.svgContent = '';
      this.displayCode = '';
      this.previewError = false;
      this.tagCount = 0;
      // 清空文件输入
      this.$refs.fileInput.value = '';
    },

    // 格式化文件大小
    formatFileSize(bytes) {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / 1048576).toFixed(1)} MB`;
    },

    // 格式化SVG代码
    formatSvgCode() {
      if (!this.svgContent) return;

      let formatted = '';
      let indent = '';
      const indentSize = 2;

      // 替换标签之间的空格
      let xml = this.svgContent.replace(/></g, '>\n<');

      // 分割成行
      const lines = xml.split('\n');

      lines.forEach(line => {
        const trimmedLine = line.trim();

        // 处理结束标签
        if (trimmedLine.startsWith('</')) {
          indent = indent.substring(indentSize);
        }

        // 添加缩进和行内容
        formatted += indent + trimmedLine + '\n';

        // 处理开始标签（非自闭合）
        if (trimmedLine.startsWith('<') && !trimmedLine.startsWith('</') && !trimmedLine.endsWith('/>')) {
          indent += ' '.repeat(indentSize);
        }
      });

      this.displayCode = formatted.trim();
    },

    // 复制到剪贴板
    copyToClipboard() {
      if (!this.displayCode) return;

      navigator.clipboard.writeText(this.displayCode)
        .then(() => {
          this.showCopyNotification = true;
          setTimeout(() => {
            this.showCopyNotification = false;
          }, 2000);
        })
        .catch(err => {
          console.error('复制失败:', err);
          this.$notify.error({
            title: '复制失败',
            message: '无法复制到剪贴板，请手动复制'
          });
        });
    },

    // 下载SVG文件
    downloadSvg() {
      if (!this.svgContent) return;

      const blob = new Blob([this.svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.selectedFile ? this.selectedFile.name : 'parsed-svg.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    // 分析SVG代码信息
    analyzeSvgCode(svgText) {
      // 简单的标签计数
      const tagMatch = svgText.match(/<[^!][^>]*>/g);
      this.tagCount = tagMatch ? tagMatch.length : 0;
    },
    removeSpecificAttributes(svgStr) {
      // 创建DOMParser解析SVG字符串
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgStr, 'image/svg+xml');

      // 1. 处理svg根标签
      const svgElement = svgDoc.querySelector('svg');
      if (svgElement) {
          // 需要删除的属性列表
          const attrsToRemove = ['width', 'height', 'fill'];

          // 遍历并删除属性
          attrsToRemove.forEach(attr => {
              if (svgElement.hasAttribute(attr)) {
                  svgElement.removeAttribute(attr);
              }
              // 处理可能的命名空间属性
              if (svgElement.hasAttributeNS(null, attr)) {
                  svgElement.removeAttributeNS(null, attr);
              }
          });
      }

      // 2. 处理所有path标签
      const pathElements = svgDoc.querySelectorAll('path');
      pathElements.forEach(path => {
          const attrsToRemove = ['width', 'height', 'fill'];

          attrsToRemove.forEach(attr => {
              if (path.hasAttribute(attr)) {
                  path.removeAttribute(attr);
              }
              if (path.hasAttributeNS(null, attr)) {
                  path.removeAttributeNS(null, attr);
              }
          });

          // 额外处理fill-opacity（如果需要）
          if (path.hasAttribute('fill-opacity')) {
              path.removeAttribute('fill-opacity');
          }
      });

      // 将处理后的SVG转换回字符串
      const serializer = new XMLSerializer();
      let result = serializer.serializeToString(svgDoc);

      // 最后用正则确保没有遗漏（针对这两种标签）
      result = result
          // 处理svg标签中的属性
          .replace(/<svg([^>]*)\s+width="[^"]*"/g, '<svg$1')
          .replace(/<svg([^>]*)\s+height="[^"]*"/g, '<svg$1')
          .replace(/<svg([^>]*)\s+fill="[^"]*"/g, '<svg$1')
          // 处理path标签中的属性
          .replace(/<path([^>]*)\s+width="[^"]*"/g, '<path$1')
          .replace(/<path([^>]*)\s+height="[^"]*"/g, '<path$1')
          .replace(/<path([^>]*)\s+fill="[^"]*"/g, '<path$1')
          // 清理可能的连续空格
          .replace(/\s+/g, ' ')
          .replace(/>\s+</g, '><');

      return result;
    },
    removeSvgAttributes(svgCode) {
      // 创建DOMParser解析SVG
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgCode, 'image/svg+xml');
      // 获取所有元素
      const allElements = svgDoc.getElementsByTagName ('*');

      // 遍历所有元素处理属性
      Array.from (allElements).forEach (element => {
        const tagName = element.tagName.toLowerCase ();

        if (tagName === 'rect') {
          //rect 标签：只删除 fill 相关属性
          const rectAttrsToRemove = ['fill', 'fill-opacity'];
          rectAttrsToRemove.forEach (attr => {
            if (element.hasAttribute (attr)) {
              element.removeAttribute (attr);
            }
            if (element.hasAttributeNS (null, attr)) {
              element.removeAttributeNS (null, attr);
            }
          });
        } else {
          // 其他标签：删除 width、height、fill 相关属性
          const otherAttrsToRemove = ['width', 'height', 'fill', 'fill-opacity'];
          otherAttrsToRemove.forEach (attr => {
            if (element.hasAttribute (attr)) {
              element.removeAttribute (attr);
            }
            if (element.hasAttributeNS (null, attr)) {
              element.removeAttributeNS (null, attr);
            }
          });
        }
      });

      // 将处理后的 SVG 转换回字符串
      const serializer = new XMLSerializer ();
      return serializer.serializeToString (svgDoc);

    }


  },
  mounted() {
    // 注册全局拖拽事件处理
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      document.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });
    // 测试代码
const originalSvg = `
<svg width="100" height="100" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="10" fill="#000"/>
    <rect x="0" y="70" width="100" height="10" fill="#000"/>
    <text x="50" y="45" font-family="Arial" font-size="30" font-weight="900"
   line-height="60" text-anchor="middle" fill="#000">SVG</text>
</svg>`;

// 处理SVG
const processedSvg = this.removeSpecificAttributes(originalSvg);
const processedSvg1 = this.removeSvgAttributes(originalSvg)
// 输出结果
console.log('处理后的SVG代码:');
console.log(processedSvg1);

  },
  watch:{}
}
</script>

<style scoped>
.svg-parser-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.drop-area {
  border: 2px dashed #cbd5e1;
  transition: all 0.3s ease;
}

.drop-area.active {
  border-color: #4f46e5;
  background-color: rgba(79, 70, 229, 0.05);
}

.code-block {
  font-family: 'Consolas', 'Monaco', monospace;
  line-height: 1.6;

  white-space: pre-wrap;
}

/* 动画效果 */
@keyframes fade-in-out {
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

.animate-fade-in-out {
  animation: fade-in-out 2s ease-in-out;
}
</style>
