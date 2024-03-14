<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">
        <span class="leader"> aa{{ scope.row[scope.prop] }} </span>
      </template>
      <template #parent="scope">bb{{ scope.row[scope.prop] }}</template>
    </page-content>
    <page-modal :modal-config="newModalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageSearch from "@/components/page-search/page-search.vue";
import PageContent from "@/components/page-content/page-content.vue";
import PageModal from "@/components/page-modal/page-modal.vue";
import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";
import useMainStore from "@/stores/modules/main/main";
import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";

const newModalConfig = computed(() => {
  const { departmentList } = useMainStore();
  const depOptions = departmentList.map((item) => ({
    label: item.name,
    value: item.parentId
  }));
  modalConfig.formItems.forEach((item) => {
    if (item.prop === "parentId") {
      item.options?.push(...depOptions);
    }
  });
  return modalConfig;
});

const { contentRef, handleQueryClick, handleResetClick } = usePageContent();
const { modalRef, handleEditClick, handleNewClick } = usePageModal();
</script>

<style scoped>
.department {
  .leader {
    color: red;
  }
}
</style>
