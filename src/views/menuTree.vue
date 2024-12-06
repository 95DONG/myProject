<template>
  <el-submenu
    v-if="menu.children && menu.children.length > 0"
    popper-class="popper_menu"
    :index="menu.path"
    :popper-append-to-body="true"
  >
    <template slot="title">
      <div class="mulu" :style="title18 ? 'fontSize:18px;' : 'fontSize:16px;'">
        <i
          :class="menu.icon"
          style="
            margin-right: 5px;
            display: inline-block;
            width: 24px;
            text-align: center;
          "
        ></i>
        <span>{{ menu.meta.title }}</span>
      </div>
    </template>
    <template v-for="child in menu.children">
      <menu-tree
        v-if="child.children && child.children.length > 0"
        :menu="child"
        :key="child.path"
      ></menu-tree>
      <el-menu-item
        v-else
        :index="child.path"
        :key="child.path"
        style="margin-left: 10px"
        >{{ child.path }}</el-menu-item
      >
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'menu-tree',
  props: {
    menu: {},
    title18: {
      default: false
    }
  }
}
</script>

<style scoped>
.mulu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.mulu > span {
  flex: 1;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 12px;
}
</style>
