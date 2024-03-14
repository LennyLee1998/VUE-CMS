<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from "./cpns/user-search.vue";
import UserContent from "./cpns/user-content.vue";
import UserModal from "./cpns/user-modal.vue";
import { ref } from "vue";
const contentRef = ref<InstanceType<typeof UserContent>>();
const modalRef = ref<InstanceType<typeof UserModal>>();
function handleQueryClick(searchForm: any) {
  contentRef.value?.postNewUserListData(searchForm);
}
function handleResetClick() {
  contentRef.value?.postNewUserListData();
}
function handleNewClick() {
  modalRef.value?.setFormVisible();
}
function handleEditClick(rowInfo: any) {
  modalRef.value?.setFormVisible(false, rowInfo);
}
</script>

<style scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
