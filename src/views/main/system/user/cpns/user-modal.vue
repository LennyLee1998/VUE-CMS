<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <el-form :model="form" size="large" label-width="80">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="form.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="isNewRef">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="form.cellphone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <template v-for="item in roleList">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="form.departmentId" placeholder="请选择部门">
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
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
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
    systemStore.newUserAction({ ...form });
  } else {
    systemStore.editUserAction({ ...form, id: currentId.value });
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
