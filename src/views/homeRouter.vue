<template>
  <div>
    <el-container style="height: 100vh">
      <el-header>
        <div style="display: flex">
          <div style="font-size: 30px; font-weight: 900; height: 30px">
            LOGO
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="border-right: 1px solid #e6e6e6">
          <el-menu router :default-active="$route.path" @select="selectChange">
            <template v-for="menu in menuRoutes">
              <menu-tree
                v-if="menu.children && menu.children.length > 0"
                :key="menu.path"
                :menu="menu"
              ></menu-tree>
              <el-menu-item v-else :index="menu.path" :key="menu.path">{{
                menu.meta.title
              }}</el-menu-item>
            </template>
          </el-menu>
          <!--
          <el-menu router :default-active="activeIndex">
            <el-menu-item index="/home" v-for="menu in menuRoutes">首页 </el-menu-item>
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-s-platform"></i>低代码</template
              >
              <el-menu-item index="/tree">tree</el-menu-item>
              <el-menu-item index="/datePicker">datePicker</el-menu-item>
              <el-menu-item index="/changeNumber">changeNumber</el-menu-item>
              <el-menu-item index="/calendar">calendar</el-menu-item>
              <el-menu-item index="/computedTable">computedTable</el-menu-item>
              <el-menu-item index="/tabs">tabs</el-menu-item>
              <el-menu-item index="/exportTable">exportTable</el-menu-item>
              <el-menu-item index="/china">china</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-s-platform"></i>图&&表</template
              >
              <el-menu-item index="/coupon">coupon</el-menu-item>
              <el-menu-item index="/consoleTable">consoleTable</el-menu-item>
              <el-menu-item index="/home">表 </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-s-platform"></i>测试</template
              >
              <el-menu-item index="/step">移动端表格</el-menu-item>
              <el-menu-item index="/testNumber">测试数据</el-menu-item>
            </el-submenu>
          </el-menu> -->
        </el-aside>
        <el-main style="height: 100%"> <router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import tabs from './lowCode/tabs.vue'
import MenuTree from './menuTree'
export default {
  name: "homeRouter",
  data () {
    return {
      activeIndex: "/exportTable",
      navs: []
    }
  },
  mounted () {
    let url = window.location.href.split("#")[1]
    this.activeIndex = url
    this.navs = this.$router.options.routes
  },
  computed: {
    // 获取路由配置中的菜单项
    menuRoutes () {
      // 从 Vue Router 实例中获取路由配置
      return this.$router.options.routes
    }
  },
  methods: {
    selectChange (index, indexPath) {
      console.log(index, indexPath);

    }
  },
  components: {
    tabs,
    MenuTree
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-menu {
  border-right: 0px;
}
.el-aside {
  color: #333;
}
</style>
