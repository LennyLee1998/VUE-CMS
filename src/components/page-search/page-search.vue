<template>
  <div class="user-search">
    <el-form
      :model="form"
      size="large"
      :label-width="searchConfig.labelWidth ?? '80px'"
      ref="searchFormRef"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.props">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="form[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="form.createAt"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="form[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button @click="resetClickHandle">
        <el-icon class="el-icon--right"><Refresh /></el-icon>
        <span class="text">重置</span>
      </el-button>
      <el-button
        type="primary"
        @click="queryClickHandle"
        v-auth="`system:${searchConfig.pageName}:query`"
      >
        <el-icon class="el-icon--right"><Search /></el-icon>
        <span class="text">查询</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { reactive, ref } from "vue";

interface IProps {
  searchConfig: {
    labelWidth?: string;
    formItems: any[];
    pageName: string;
  };
}
const props = defineProps<IProps>();
const emit = defineEmits(["queryClick", "resetClick"]);
const initialForm: any = {};
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? "";
}
const form = reactive(initialForm);

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
