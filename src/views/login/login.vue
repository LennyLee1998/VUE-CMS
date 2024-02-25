<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from "./cpns/login-panel.vue";
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/login-bg.svg");
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
