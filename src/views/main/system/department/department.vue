<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from "./cpns/page-search.vue";
import PageContent from "./cpns/page-content.vue";
import PageModal from "./cpns/page-modal.vue";
import { ref } from "vue";
const contentRef = ref<InstanceType<typeof PageContent>>();
const modalRef = ref<InstanceType<typeof PageModal>>();
function handleQueryClick(searchForm: any) {
  contentRef.value?.fetchPageListData(searchForm);
}
function handleResetClick() {
  contentRef.value?.fetchPageListData();
}
function handleNewClick() {
  modalRef.value?.setFormVisible();
}
function handleEditClick(rowInfo: any) {
  modalRef.value?.setFormVisible(false, rowInfo);
}
</script>

<style scoped>
.department {
}
</style>
