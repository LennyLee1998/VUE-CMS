<template>
  <div class="main-header">
    <el-icon :size="28" @click="collapseIconHandle">
      <component :is="isFold ? 'Fold' : 'Expand'" />
    </el-icon>
    <div class="header">
      <HeaderBreadcrumb />
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderBreadcrumb from "./cpns/header-breadcrumb.vue";
import HeaderInfo from "./cpns/header-info.vue";
// 自定义事件
const emit = defineEmits(["foldChange"]);
//
const isFold = ref(true);

function collapseIconHandle() {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
}
</script>

<style lang="less" scoped>
.main-header {
  height: 100%;
  display: flex;
  align-items: center;
  .header {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
  }
}
</style>
