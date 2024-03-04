<template>
  <div class="main-menu">
    <div class="top">
      <img src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">{{ isFold ? "利源管理系统" : "" }}</h2>
    </div>
    <el-menu
      active-text-color="#fff"
      background-color="#001529"
      class="el-menu"
      :default-active="defaultActive + ''"
      text-color="#b7bdc3"
      :collapse="!isFold"
    >
      <template v-for="menu in userMenus">
        <el-sub-menu :index="menu.id + ''">
          <template #title>
            <el-icon>
              <component :is="menu.icon.split('el-icon-')[1]" />
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="item in menu.children">
            <el-menu-item :index="item.id + ''" @click="menuClickHandle(item.url)">{{
              item.name
            }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import useLoginStore from "@/stores/modules/login";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { mapRouteToMenu } from "@/utils/map-menus";
defineProps({
  isFold: {
    type: Boolean,
    default: true
  }
});

const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;

function menuClickHandle(path: string) {
  router.push(path);
}
const route = useRoute();
mapRouteToMenu(route.path, userMenus);
const defaultActive = computed(() => {
  const menu = mapRouteToMenu(route.path, userMenus);
  return menu.id;
});
</script>

<style lang="less" scoped>
.main-menu {
  .top {
    height: 28px;
    padding: 12px 10px 8px 10px;
    display: flex;
    align-items: center;
    img {
      height: 28px;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      color: #fff;
      white-space: nowrap;
    }
  }
}

.el-menu {
  border-right: none;
  .el-menu-item {
    background-color: #0c2135;
    padding-left: 50px !important;
    &:hover {
      color: #fff;
    }
    &.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
