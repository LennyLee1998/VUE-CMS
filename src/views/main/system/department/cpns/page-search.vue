<template>
  <div class="user-search">
    <el-form :model="form" size="large" label-width="80px" ref="searchFormRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入查询的部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="form.leader" placeholder="请输入查询的领导名" />
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
  leader: "",
  parentId: ""
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
