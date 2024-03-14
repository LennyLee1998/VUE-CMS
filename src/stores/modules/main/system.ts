import {
  deletePage,
  deleteUser,
  editPage,
  editUser,
  newPage,
  newUser,
  postPageListData,
  postUsersListData
} from "@/service/modules/main/system";
import { defineStore } from "pinia";
import useMainStore from "./main";

interface Istate {
  usersList: any[];
  totalCount: number;
  pageList: any[];
  pageTotalCount: number;
}

const useSystemStore = defineStore("system", {
  state: (): Istate => ({
    usersList: [],
    totalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListDataAction(queryInfo: any) {
      const usersRes = await postUsersListData(queryInfo);
      const { totalCount, list } = usersRes.data;
      this.totalCount = totalCount;
      this.usersList = list;
    },
    async deleteUserAction(id: number) {
      const deleteRes = await deleteUser(id);
      console.log(deleteRes);
      this.postUserListDataAction({ offset: 0, size: 10 });
    },
    async newUserAction(userInfo: any) {
      const newRes = await newUser(userInfo);
      console.log(newRes);
      this.postUserListDataAction({ offset: 0, size: 10 });
    },
    async editUserAction(userInfo: any) {
      const editRes = await editUser(userInfo);
      console.log(editRes);
      this.postUserListDataAction({ offset: 0, size: 10 });
    },

    // 针对页面的
    async postPageListDataAction(pageName: string, queryInfo: any) {
      const pageRes: any = await postPageListData(pageName, queryInfo);
      const { totalCount, list } = pageRes.data;
      this.pageTotalCount = totalCount;
      this.pageList = list;
    },
    async deletePageAction(pageName: string, id: number) {
      const deleteRes = await deletePage(pageName, id);
      console.log(deleteRes);
      this.postPageListDataAction(pageName, { offset: 0, size: 10 });
      const mainStore = useMainStore();
      mainStore.fetchAllListAction();
    },
    async newPageAction(pageName: string, userInfo: any) {
      const newRes = await newPage(pageName, userInfo);
      console.log(newRes);
      this.postPageListDataAction(pageName, { offset: 0, size: 10 });

      const mainStore = useMainStore();
      mainStore.fetchAllListAction();
    },
    async editPageAction(pageName: string, userInfo: any) {
      const editRes = await editPage(pageName, userInfo);
      console.log(editRes);
      this.postPageListDataAction(pageName, { offset: 0, size: 10 });
      const mainStore = useMainStore();
      mainStore.fetchAllListAction();
    }
  }
});

export default useSystemStore;
