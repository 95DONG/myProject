<template>
  <div>
    <!-- 内容区 -->
    <div style="height: 300px; width: 700px">
      <!-- 表格 -->
      <div class="table">
        <!-- 表头 -->
        <div class="table-header right">
          <div
            v-for="(item_th, index_th) in thList"
            :key="index_th"
            class="table-header-item"
          >
            <span class="title">{{ item_th.title }}</span>
          </div>
        </div>

        <!--数据 -->
        <div
          class="table-body right"
          id="tableBody"
          @scroll="resLisScroll"
          ref="tableBody"
        >
          <div
            class="table-body-row"
            v-for="(item_tr, index_tr) in data11"
            :key="index_tr"
          >
            <div
              class="table-body-row-item"
              style="justify-content: center"
              v-for="item in Object.keys(item_tr)"
              :key="item"
            >
              {{ item_tr[item] }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div
      style="display: flex; width: 700px; height: 300px; overflow: auto"
      class="right"
    >
      <!-- 一列 -->
      <div
        :style="{ 'min-width': row.width }"
        v-for="(row, rowIndx) in headerData"
        :key="rowIndx"
      >
        <div
          :class="itemIndex > 0 ? 'tableBody' : 'tableHeader'"
          v-for="(item, itemIndex) in row.row"
          :key="itemIndex"
        >
          {{ item.headerTitle ? item.headerTitle : item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 数据
      data11: [
        {
          comname2: '贵州',
          addAgent: 136,
          addAgentRate: '26.8%',
          preium: '1,005.0',
          premiumRate: '143.6%',
        },
        {
          comname2: '辽宁',
          addAgent: 201,
          addAgentRate: '100.5%',
          preium: '805.8',
          premiumRate: '71.1%',
        },
        {
          comname2: '四川',

          addAgent: 27,
          addAgentRate: '13.5%',
          preium: '769.2',
          premiumRate: '100.9%',
        },
        {
          comname2: '江西',

          addAgent: 306,
          addAgentRate: '102%',
          preium: '748.8',
          premiumRate: '213.9%',
        },
        {
          comname2: '云南',

          addAgent: 42,
          addAgentRate: '8%',
          preium: '643.0',
          premiumRate: '213.6%',
        },
        {
          comname2: '福建',

          addAgent: 45,
          addAgentRate: '9.7%',
          preium: '514.5',
          premiumRate: '93.5%',
        },
        {
          comname2: '河南',

          addAgent: 26,
          addAgentRate: '26%',
          preium: '512.1',
          premiumRate: '88.3%',
        },
        {
          comname2: '安徽',

          addAgent: 1,
          addAgentRate: '0.3%',
          preium: '398.7',
          premiumRate: '102.2%',
        },
        {
          comname2: '甘肃',

          addAgent: 43,
          addAgentRate: '10.4%',
          preium: '393.6',
          premiumRate: '69.3%',
        },
        {
          comname2: '陕西',

          addAgent: 52,
          addAgentRate: '12.3%',
          preium: '374.5',
          premiumRate: '46.8%',
        },
        {
          comname2: '湖南',

          addAgent: 53,
          addAgentRate: '10.2%',
          preium: '356.5',
          premiumRate: '45%',
        },
        {
          comname2: '海南',

          addAgent: 36,
          addAgentRate: '12.8%',
          preium: '341.3',
          premiumRate: '103.7%',
        },
        {
          comname2: '湖北',

          addAgent: 25,
          addAgentRate: '6.5%',
          preium: '336.5',
          premiumRate: '98.1%',
        },
        {
          comname2: '青岛',

          addAgent: 10,
          addAgentRate: '6.7%',
          preium: '289.0',
          premiumRate: '111.1%',
        },
        {
          comname2: '黑龙江',

          addAgent: 5,
          addAgentRate: '2.2%',
          preium: '286.2',
          premiumRate: '54%',
        },
        {
          comname2: '广东',

          addAgent: 17,
          addAgentRate: '3.5%',
          preium: '265.9',
          premiumRate: '57.8%',
        },
        {
          comname2: '重庆',

          addAgent: 46,
          addAgentRate: '31.3%',
          preium: '240.6',
          premiumRate: '88.5%',
        },
        {
          comname2: '江苏',

          addAgent: 40,
          addAgentRate: '9.6%',
          preium: '238.2',
          premiumRate: '34%',
        },
        {
          comname2: '山西',

          addAgent: 178,
          addAgentRate: '57.6%',
          preium: '214.9',
          premiumRate: '75.1%',
        },
        {
          comname2: '新疆',

          addAgent: 13,
          addAgentRate: '130%',
          preium: '189.1',
          premiumRate: '370.8%',
        },
        {
          comname2: '青海',

          addAgent: 6,
          addAgentRate: '3.9%',
          preium: '152.1',
          premiumRate: '257.8%',
        },
        {
          comname2: '宁夏',

          addAgent: 7,
          addAgentRate: '2.5%',
          preium: '144.1',
          premiumRate: '87.9%',
        },
        {
          comname2: '广西',

          addAgent: 0,
          addAgentRate: '0%',
          preium: '108.7',
          premiumRate: '63.9%',
        },
        {
          comname2: '宁波',

          addAgent: 8,
          addAgentRate: '14.3%',
          preium: '106.8',
          premiumRate: '113.6%',
        },
        {
          comname2: '天津',

          addAgent: 16,
          addAgentRate: '7.8%',
          preium: '96.0',
          premiumRate: '68.6%',
        },
        {
          comname2: '苏州',

          addAgent: 0,
          addAgentRate: '0%',
          preium: '21.2',
          premiumRate: '0%',
        },
        {
          comname2: '厦门',

          addAgent: 0,
          addAgentRate: '0%',
          preium: '0.2',
          premiumRate: '0.4%',
        },
        {
          comname2: '深圳',

          addAgent: 0,
          addAgentRate: '0%',
          preium: '0.0',
          premiumRate: '0%',
        },
        {
          comname2: '无锡',

          addAgent: 0,
          addAgentRate: '0%',
          preium: '0.0',
          premiumRate: '0%',
        },
        {
          comname2: '上海',

          addAgent: 0,
          addAgentRate: '0%',
          preium: '0.0',
          premiumRate: '0%',
        },
        {
          comname2: '北京',

          addAgent: 0,
          addAgentRate: '0%',
          preium: '0.0',
          premiumRate: '0%',
        },
      ],
      totalData: [
        {
          comname2: '合计',
          addAgent: 2864,
          addAgentRate: '29.7%',
          preium: '16,474.7',
          premiumRate: '94.9%',
        },
      ],
      // 表头列表
      thList: [
        {
          title: '机构',
          isSort: false,
        },
        {
          title: '保费',
          isSort: true,// 是否进行排序
          backgroundColor: '#fdeeee', // 是否单独显示背景颜色
          sortField: 'addAgent',// 排序字段
        },
        {
          title: '达成率',
          isSort: true,
          backgroundColor: '#fdeeee',
          sortField: 'addAgentRate',
        },
        {
          title: '新增代理人',
          isSort: true,
          sortField: 'preium',
        },
        {
          title: '代理人达成率',
          isSort: true,
          sortField: 'premiumRate',
        },
      ],
      headerData: [
        { width: "150px", row: [{ headerTitle: '表头1' }, { title: '第一行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }, { title: '第二行1' }] },
        { width: "150px", row: [{ title: '表头1' }, { title: '第一行1' }, { title: '第二行1' }] },
        { width: "150px", row: [{ title: '表头1' }, { title: '第一行1' }, { title: '第二行1' }] },
        { width: "150px", row: [{ title: '表头1' }, { title: '第一行1' }, { title: '第二行1' }] },
        { width: "150px", row: [{ title: '表头1' }, { title: '第一行1' }, { title: '第二行1' }] },
        { width: "112px", row: [{ title: '表头2' }, { title: '第一行2' }, { title: '第二行2' }] },
        { width: "90px", row: [{ title: '表头3', }, { title: '第一行3' }, { title: '第二行3' }] },
      ]
    };
  },
  created () {


  },
  methods: {
    resLisScroll () {
      let toTop = this.$refs.tableBody.scrollLeft;
      document.getElementsByClassName("table-header")[0].scrollTo(toTop, 0)
    }
  },
};
</script>
<style scoped >
/*表格相关样式*/
.table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* 表头 */
.table-header {
  display: flex;
  height: 50px;
  overflow: hidden;
}
.table-body {
  flex: 1;
  overflow-y: auto;
}
/* 表格内容行 */
.table-body-row {
  height: 40px;
  display: flex;
  margin-top: 6px;
}
/* 整体每一项通用样式 */
.table-header-item,
.table-body-row-item {
  min-width: 150px !important;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
/* 表头每一项 */
.table-header-item {
  justify-content: center;
}
/* 内容每一项 */
.table-body-row-item {
  padding: 0px 6px;
  background-color: rgba(247, 248, 250, 1);
}
.title {
  color: #333;
}
.right::-webkit-scrollbar {
  width: 0px;
}
</style>
<style scoped>
.tableBody {
  background-color: rgb(197, 203, 214) !important;
  margin-top: 6px;
  height: 30px;
}
.tableHeader {
  background-color: rgba(43, 129, 209, 0.1) !important;
  height: 40px;
}
.tableBody,
.tableHeader {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

