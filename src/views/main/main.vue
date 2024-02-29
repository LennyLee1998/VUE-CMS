<template>
  <div class="main">
    <el-container>
      <el-aside width="210px">
        <MainMenu />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from "@/components/main-menu/main-menu.vue";
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background-color: #001529;
  overflow: hidden;
}
.el-header {
  background-color: blue;
  height: 50px;
}
.el-main {
  background-color: green;
}
</style>
