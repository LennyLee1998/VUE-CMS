import useLoginStore from "@/stores/modules/login";

function usePermissions(auth: string) {
  const { permissions } = useLoginStore();
  return permissions.includes(auth);
}
export default usePermissions;
