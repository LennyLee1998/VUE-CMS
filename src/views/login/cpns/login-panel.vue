<template>
  <div class="login-panel">
    <h1 class="title">利源后台管理系统</h1>
    <el-tabs v-model="activeName" type="border-card" class="tabs" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span class="tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span class="text">账号登录</span>
          </span>
        </template>
        <PanelAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="tabs-label">
            <el-icon><Cellphone /></el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <PanelPhone />
      </el-tab-pane>
    </el-tabs>
    <div class="pwd">
      <el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login-btn">
      <el-button type="primary" size="large" @click="loginBtnClickHandle">立即登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import PanelAccount from "./panel-account.vue";
import PanelPhone from "./panel-phone.vue";
import { localCache } from "@/utils/cache";

const isKeepPwd = ref<boolean>(localCache.getCache("isKeepPwd") ?? true);

watch(isKeepPwd, (newValue) => {
  console.log(newValue);
  localCache.setCache("isKeepPwd", newValue);
});

const activeName = ref("account");

const accountRef = ref<InstanceType<typeof PanelAccount>>();
const loginBtnClickHandle = () => {
  if (activeName.value === "account") {
    accountRef.value?.loginAction(isKeepPwd.value);
  }
};
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  padding-bottom: 150px;
  text-align: center;
  .title {
    margin-bottom: 15px;
  }
  .tabs {
    .tabs-label {
      display: flex;
      align-items: center;
      .text {
        margin-left: 5px;
      }
    }
  }
  .pwd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;

    .el-button {
      width: 100%;
    }
  }
}
</style>
