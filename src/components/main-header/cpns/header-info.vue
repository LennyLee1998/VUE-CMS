<template>
  <div class="header-info">
    <div class="logo">
      <span class="icon">
        <el-icon :size="20"><Message /></el-icon>
      </span>
      <span class="icon message">
        <el-icon :size="20"><ChatDotRound /></el-icon>
      </span>
      <span class="icon">
        <el-icon :size="20"><Search /></el-icon>
      </span>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="profile">
          <el-avatar
            :size="30"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          >
            <img src="@/assets/img/logo.svg" />
          </el-avatar>
          <div class="name">
            {{ name }}
          </div>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CircleClose" @click="exitSystem">退出系统</el-dropdown-item>
          <el-dropdown-item icon="InfoFilled" divided>个人信息</el-dropdown-item>
          <el-dropdown-item icon="Unlock">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
import router from "@/router";
import useLoginStore from "@/stores/modules/login";
import { localCache } from "@/utils/cache";
import { mapMenusToRoutes } from "@/utils/map-menus";
import { LOGIN_TOKEN } from "@/global/constant";

const loginStore = useLoginStore();
const { name } = loginStore;

function exitSystem() {
  // 对动态路由没作用
  // const routes = mapMenusToRoutes(userMenus);
  // routes.forEach((route: RouteRecordRaw) => {
  //   console.log(route.name);
  //   if (route.name) router.removeRoute(route.name);
  // });
  location.reload();
  localCache.clear();
  router.push("/login");
}
</script>

<style lang="less" scoped>
.header-info {
  // flex: 1;
  display: flex;
  align-items: center;
  .logo {
    display: flex;
    margin-right: 20px;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 35px;
      &:hover {
        background-color: #f2f2f2;
      }
      &.message {
        position: relative;
        &::after {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background-color: red;
          position: absolute;
          right: 3px;
          top: 3px;
        }
      }
    }
  }
  .profile {
    display: flex;
    align-items: center;
    cursor: pointer;
    .name {
      margin-left: 5px;
      font-size: 14px;
      color: #606266;
    }
  }
}

.el-dropdown {
  :focus-visible {
    outline: none !important;
  }
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
