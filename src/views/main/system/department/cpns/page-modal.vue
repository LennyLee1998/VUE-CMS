<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <el-form :model="form" size="large" label-width="80">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="form.leader" placeholder="请输入部门领导" />
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择上级部门">
            <template v-for="item in departmentList">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmClickHandle"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from "@/stores/modules/main/main";
import useSystemStore from "@/stores/modules/main/system";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

const dialogVisible = ref(false);
const form = reactive<any>({
  name: "",
  leader: "",
  parentId: ""
});

const isNewRef = ref(true);
const systemStore = useSystemStore();

const { departmentList, roleList } = storeToRefs(useMainStore());
const currentId = ref<number>();
function setFormVisible(isNew = true, rowInfo?: any) {
  dialogVisible.value = true;
  isNewRef.value = isNew;
  if (!isNew && rowInfo) {
    for (let key in form) {
      form[key] = rowInfo[key];
    }
    currentId.value = rowInfo.id;
  } else {
    for (let key in form) {
      form[key] = "";
    }
  }
}
function confirmClickHandle() {
  dialogVisible.value = false;
  if (isNewRef.value) {
    systemStore.newPageAction("department", { ...form });
  } else {
    systemStore.editPageAction("department", { ...form, id: currentId.value });
  }
}

defineExpose({ setFormVisible });
</script>

<style lang="less" scoped>
.el-dialog {
  :deep(.el-dialog__body) {
    padding: 25px;
  }
}
.el-form {
  padding: 0 20px;
}
</style>
