import { postDepartmentList, postRoleList } from "@/service/modules/main/main";
import { defineStore } from "pinia";
interface IMainState {
  departmentList: any[];
  roleList: any[];
}
const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    departmentList: [],
    roleList: []
  }),
  actions: {
    async fetchAllListAction() {
      const [res1, res2] = await Promise.all([postDepartmentList(), postRoleList()]);
      const [departmentRes, roleRes] = await Promise.all([
        postDepartmentList({ offset: 0, size: res1.data.totalCount }),
        postRoleList({ offset: 0, size: res2.data.totalCount })
      ]);
      this.departmentList = departmentRes.data.list;
      this.roleList = roleRes.data.list;
    }
  }
});

export default useMainStore;
