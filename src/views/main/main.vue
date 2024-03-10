<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '210px' : '60px'">
        <MainMenu :isFold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <MainHeader @fold-change="changeFold" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from "@/components/main-menu/main-menu.vue";
import MainHeader from "@/components/main-header/main-header.vue";
import { ref } from "vue";
import useMainStore from "@/stores/modules/main/main";

const isCollapse = ref(true);
function changeFold(isFold: boolean) {
  isCollapse.value = isFold;
}

const mainStore = useMainStore();
mainStore.fetchAllListAction();
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background-color: #001529;
  overflow: hidden;
  transition: width 400ms ease;
}
.el-header {
  background-color: #fff;
  height: 50px;
}
.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
