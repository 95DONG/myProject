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
        <el-aside width="300px" style="border-right: 1px solid #e6e6e6">
          <el-menu router :default-active="$route.path" @select="selectChange">
            <template v-for="menu in menuRoutes">
              <menu-tree
                v-if="menu.children && menu.children.length > 0"
                :key="menu.name"
                :menu="menu"
              ></menu-tree>
              <el-menu-item v-else :index="menu.path" :key="menu.name">{{
                menu.meta.title
              }}</el-menu-item>
            </template>
          </el-menu>

          <!-- <el-menu router :default-active="$route.path" @select="selectChange">
            <template v-for="menu in menuRoutes">
              <el-submenu
                v-if="menu.children && menu.children.length > 0"
                :key="menu.path"
                :index="menu.path"
              >
                <template slot="title">
                  {{ menu.meta.title }}
                </template>
                <el-menu-item
                  :index="child.path"
                  v-for="child in menu.children"
                  :key="child.path"
                >
                  {{ child.meta.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="menu.path" :key="menu.path">{{
                menu.meta.title
              }}</el-menu-item>
            </template>
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
