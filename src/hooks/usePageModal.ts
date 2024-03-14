import type PageModal from "@/components/page-modal/page-modal.vue";
import { ref } from "vue";
type EditFnType = (data: any) => void;
type NewFnType = () => void;
function usePageModal(editCallback?: EditFnType, newCallback: NewFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>();
  function handleNewClick() {
    modalRef.value?.setFormVisible();
    if (newCallback) newCallback();
  }
  function handleEditClick(rowInfo: any) {
    modalRef.value?.setFormVisible(false, rowInfo);
    if (editCallback) editCallback(rowInfo);
  }

  return { modalRef, handleNewClick, handleEditClick };
}

export default usePageModal;
