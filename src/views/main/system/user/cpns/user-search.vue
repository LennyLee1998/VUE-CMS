<template>
  <div class="user-search">
    <el-form :model="form" size="large" label-width="80px" ref="searchFormRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入查询的用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="form.realname" placeholder="请输入查询的真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="form.cellphone" placeholder="请输入查询的手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="form.enable" placeholder="请输入查询的状态">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="form.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button @click="resetClickHandle">
        <el-icon class="el-icon--right"><Refresh /></el-icon>
        <span class="text">重置</span>
      </el-button>
      <el-button type="primary" @click="queryClickHandle">
        <el-icon class="el-icon--right"><Search /></el-icon>
        <span class="text">查询</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Refresh, Search } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";

import { reactive, ref } from "vue";

const emit = defineEmits(["queryClick", "resetClick"]);
const form = reactive({
  name: "",
  realname: "",
  cellphone: "",
  enable: "",
  createAt: ""
});
// 重置逻辑
const searchFormRef = ref<FormInstance>();
function resetClickHandle() {
  searchFormRef.value?.resetFields();
  emit("resetClick");
}
//
function queryClickHandle() {
  emit("queryClick", { ...form });
}
</script>

<style lang="less" scoped>
.user-search {
  padding: 20px;
  background-color: #fff;
}
.btn {
  text-align: right;
  padding: 0 50px 10px 0;
}
.el-form-item {
  padding: 20px 30px;
  margin-bottom: 0;
}
.el-button {
  height: 36px;
}
</style>
