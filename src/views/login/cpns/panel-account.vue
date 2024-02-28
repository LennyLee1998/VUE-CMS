<template>
  <div class="panel-account">
    <el-form
      ref="ruleFormRef"
      :model="accountForm"
      :rules="accountRules"
      label-width="60px"
      class="accountForm"
      size="large"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

import type { IAccount } from "@/types";
import useLoginStore from "@/stores/modules/login";
import { localCache } from "@/utils/cache";

const accountForm = reactive<IAccount>({
  name: localCache.getCache("name") ?? "coderwhy",
  password: localCache.getCache("password") ?? "123456"
});

const accountRules = reactive<FormRules<IAccount>>({
  name: [
    { required: true, message: "必须输入账号信息~", trigger: "blur" },
    { pattern: /^[a-z0-9]{6,20}$/, message: "必须是6~20数字或字母组成~", trigger: "blur" }
  ],
  password: [
    { required: true, message: "必须输入密码信息~", trigger: "blur" },
    { pattern: /^[a-z0-9]{3,}$/, message: "必须是3位以上数字或字母组成", trigger: "blur" }
  ]
});

// 点击login的函数
const ruleFormRef = ref<FormInstance>();
const loginStore = useLoginStore();
function loginAction(isKeep: boolean) {
  ruleFormRef.value?.validate((valid) => {
    console.log(isKeep);
    if (valid) {
      if (isKeep) {
        localCache.setCache("name", accountForm.name);
        localCache.setCache("password", accountForm.password);
      } else {
        localCache.removeCache("name");
        localCache.removeCache("password");
      }
      loginStore.accountLoginAction({ ...accountForm });
    } else {
      ElMessage.error("请输入正确的格式后再操作");
    }
  });
}

defineExpose({
  loginAction
});
</script>

<style lang="less" scoped></style>
