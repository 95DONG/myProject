import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/echarts/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    meta: { title: "首页" },

    component: home
  },
  {
    path: '/changeNumber',
    name: 'changeNumber',
    meta: { title: "倒计时" },
    component: () => import('../views/lowCode/changeNumber.vue'),
  },
  {
    path: '/setter', name: '',
    meta: { title: "工具" },
    redirect: "coupon",
    children: [
      {
        path: 'coupon',
        name: 'coupon',
        meta: { title: "打孔标签" },
        component: () => import('../views/coupon/coupon.vue')
      },
      {
        path: 'exportTable',
        name: 'exportTable',
        meta: { title: "表格数据导入" },
        component: () => import('../views/lowCode/exportTable.vue')
      }
    ]
  },
  {
    path: '/', name: '',
    meta: { title: "日期类" },
    children: [
      {
        path: 'datePicker',
        name: 'datePicker',
        meta: { title: "时间选择器" },
        component: () => import('../views/lowCode/datePicker.vue'),

      },
      {
        path: 'calendar',
        name: 'calendar',
        meta: { title: "日历切换" },
        component: () => import('../views/lowCode/calendar.vue')
      },
    ]
  },
  {
    path: '/computedTable',
    name: 'computedTable',
    meta: { title: "表格计算" },
    component: () => import('../views/lowCode/computedTable.vue')
  },
  {
    path: '/tree',
    name: 'tree',
    meta: { title: "树组件" },
    component: () => import('../views/lowCode/tree.vue')
  },
  {
    path: '/tabs',
    name: 'tabs',
    meta: { title: "tabs切换" },
    component: () => import('../views/lowCode/tabs.vue')
  },
  {
    path: '/consoleTable',
    name: 'consoleTable',
    meta: { title: "组卷管理" },
    component: () => import('../views/table/consoleTable.vue')
  },
  {
    path: '/step',
    name: 'step',
    meta: { title: "手动表格" },
    component: () => import('../views/lowCode/step.vue')
  },
  {
    path: '/testNumber',
    name: 'testNumber',
    meta: { title: "选择树" },
    component: () => import('../views/lowCode/testNumber.vue')
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
