<template>
  <div class="panel-phone">
    <el-form
      ref="ruleFormRef"
      :model="accountForm"
      :rules="accountRules"
      label-width="60px"
      class="accountForm"
      size="large"
      status-icon
    >
      <el-form-item label="手机号" prop="number">
        <el-input v-model="accountForm.number" />
      </el-form-item>
      <div class="code">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="accountForm.code" />
        </el-form-item>
        <el-button type="primary" size="large">获取验证码</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

// 表单验证
interface AccountForm {
  number: string;
  code: string;
}
const accountForm = reactive<AccountForm>({
  number: "",
  code: ""
});

const accountRules = reactive<FormRules<AccountForm>>({
  number: [
    { message: "必须输入账号信息~", trigger: "blur" },
    { pattern: /^[a-z0-9]{6,20}$/, message: "必须是6~20数字或字母组成~", trigger: "blur" }
  ],
  code: [
    { message: "必须输入密码信息~", trigger: "blur" },
    { pattern: /^[a-z0-9]{3,}$/, message: "必须是3位以上数字或字母组成", trigger: "blur" }
  ]
});
</script>

<style lang="less" scoped>
.code {
  display: flex;
  .el-button {
    margin-left: 8px;
  }
}
</style>
