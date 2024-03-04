<template>
  <div class="header-breadcrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumb">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/stores/modules/login";
import { mapPathToBreadcrumb } from "@/utils/map-menus";
import { computed } from "vue";
import { useRoute } from "vue-router";
const { userMenus } = useLoginStore();
const route = useRoute();
const breadcrumb = computed(() => {
  return mapPathToBreadcrumb(route.path, userMenus);
});
</script>

<style lang="less" scoped></style>
