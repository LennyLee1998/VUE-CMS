import { defineStore } from "pinia";
import type { IAccount } from "@/types";
import { accountLoginRequest, getMenubyRoleId, getRoleIdByUserId } from "@/service/modules/login";
import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN } from "@/global/constant";
import router from "@/router";
import { ElMessage } from "element-plus";

interface ILoginStore {
  token: string,
  userMenus: any
}

const useLoginStore = defineStore("login", {
  state: (): ILoginStore => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    userMenus: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 1.登录获取token信息
      const loginRes = await accountLoginRequest(account);
      console.log(loginRes);
      if (loginRes.code !== 0) {
        ElMessage.error(loginRes?.response?.data || loginRes?.message);
      } else {
        const token = loginRes.data.token;
        const userId = loginRes.data.id;
        this.token = token;
        // 2.进行本地缓存
        localCache.setCache(LOGIN_TOKEN, token);

        const roleRes = await getRoleIdByUserId(userId);
        console.log(roleRes);
        const roleId = roleRes.data.id;
        const menuRes = await getMenubyRoleId(roleId);
        this.userMenus = menuRes.data
        // 3.页面跳转
        router.push("/main");
      }
    }
  }
});

export default useLoginStore;
