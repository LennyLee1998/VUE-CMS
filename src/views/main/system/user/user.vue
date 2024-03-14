<template>
  <div class="user">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      ref="contentRef"
    />
    <page-modal :modal-config="newModalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from "@/components/page-search/page-search.vue";
import PageContent from "@/components/page-content/page-content.vue";
import PageModal from "@/components/page-modal/page-modal.vue";
import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";
import { computed } from "vue";
import useMainStore from "@/stores/modules/main/main";
import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";
import pushOptions from "@/utils/pushOptions";
const newModalConfig = computed(() => {
  const { departmentList, roleList } = useMainStore();
  pushOptions(departmentList, "departmentId", modalConfig);
  pushOptions(roleList, "roleId", modalConfig);
  return modalConfig;
});

const { contentRef, handleQueryClick, handleResetClick } = usePageContent();
const { modalRef, handleEditClick, handleNewClick } = usePageModal();
</script>

<style scoped>
.role {
}
</style>
