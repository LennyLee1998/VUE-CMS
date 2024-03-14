<template>
  <div class="role">
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
    />
    <page-modal :modal-config="modalConfig" ref="modalRef" :other-info="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="menuList"
          show-checkbox
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from "@/components/page-search/page-search.vue";
import PageContent from "@/components/page-content/page-content.vue";
import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";
import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";
import useMainStore from "@/stores/modules/main/main";
import { storeToRefs } from "pinia";
import { ref, nextTick } from "vue";
import { ElTree } from "element-plus";
import { mapMenuListToIds } from "@/utils/map-menus";

const { contentRef, handleQueryClick, handleResetClick } = usePageContent();
const { modalRef, handleEditClick, handleNewClick } = usePageModal(editCallback, newCallback);

const { menuList } = storeToRefs(useMainStore());
const otherInfo = ref({});
const treeRef = ref<InstanceType<typeof ElTree>>();
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
  otherInfo.value = { menuList };
}

function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([]);
  });
}
function editCallback(rowInfo: any) {
  const ids = mapMenuListToIds(rowInfo.menuList);
  nextTick(() => {
    treeRef.value?.setCheckedKeys(ids);
  });
}
</script>

<style scoped>
.role {
}
</style>
