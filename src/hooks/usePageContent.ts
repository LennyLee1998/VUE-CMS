import { ref } from "vue";
import type PageContent from "@/components/page-content/page-content.vue";


function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>();
  function handleQueryClick(searchForm: any) {
    contentRef.value?.fetchPageListData(searchForm);
  }
  function handleResetClick() {
    contentRef.value?.fetchPageListData();
  }

  return { contentRef, handleQueryClick, handleResetClick };
}

export default usePageContent;
