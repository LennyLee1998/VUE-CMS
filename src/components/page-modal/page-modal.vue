<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <el-form :model="form" size="large" label-width="80">
        <template v-for="item in modalConfig.formItems" :key="item.props">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input v-model="form[item.prop]" :placeholder="item.placeholder" />
            </template>
            <template v-if="item.type === 'select'">
              <el-select v-model="form[item.prop]" :placeholder="item.placeholder">
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
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

interface IProps {
  modalConfig: {
    pageName: string;
    header: {
      newTitle: string;
      editTitle: string;
    };
    formItems: any[];
  };
  otherInfo?: any;
}
const props = defineProps<IProps>();

const dialogVisible = ref(false);

const initialForm: any = {};
for (const item of props.modalConfig.formItems) {
  if (item.prop) initialForm[item.prop] = "";
}
const form = reactive(initialForm);

const isNewRef = ref(true);
const systemStore = useSystemStore();
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
  let infoData = props.otherInfo ? { ...form, ...props.otherInfo } : { ...form };
  if (isNewRef.value) {
    systemStore.newPageAction(props.modalConfig.pageName, { ...infoData });
  } else {
    systemStore.editPageAction(props.modalConfig.pageName, { ...infoData, id: currentId.value });
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
