import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/echarts/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/changeNumber',
    name: 'changeNumber',
    component: () => import('../views/lowCode/changeNumber.vue')
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('../views/coupon/coupon.vue')
  },
  {
    path: '/datePicker',
    name: 'datePicker',
    component: () => import('../views/lowCode/datePicker.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/lowCode/calendar.vue')
  },
  {
    path: '/computedTable',
    name: 'computedTable',
    component: () => import('../views/lowCode/computedTable.vue')
  },
  ,
  {
    path: '/tree',
    name: 'tree',
    component: () => import('../views/lowCode/tree.vue')
  }, {
    path: '/exportTable',
    name: 'exportTable',
    component: () => import('../views/lowCode/exportTable.vue')
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: () => import('../views/lowCode/tabs.vue')
  },
  {
    path: '/consoleTable',
    name: 'consoleTable',
    component: () => import('../views/table/consoleTable.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
