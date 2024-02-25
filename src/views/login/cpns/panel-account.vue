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
        <el-input v-model="accountForm.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { FormRules } from "element-plus";

interface AccountForm {
  name: string;
  password: string;
}
const accountForm = reactive<AccountForm>({
  name: "coderwhy",
  password: ""
});

const accountRules = reactive<FormRules<AccountForm>>({
  name: [
    { required: true, message: "必须输入账号信息~", trigger: "blur" },
    { pattern: /^[a-z0,9]{6, 20}$/, message: "必须是6~20数字或字母组成~", trigger: "blur" }
  ],
  password: [
    { required: true, message: "必须输入密码信息~", trigger: "blur" },
    { pattern: /^[a-z0,9]{3,}$/, message: "必须是3位以上数字或字母组成", trigger: "blur" }
  ]
});
</script>

<style lang="less" scoped></style>
