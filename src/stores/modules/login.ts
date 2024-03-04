import { defineStore } from "pinia";
import type { IAccount } from "@/types";
import { ElMessage } from "element-plus";

import { accountLoginRequest, getMenubyRoleId, getRoleIdByUserId } from "@/service/modules/login";
import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN } from "@/global/constant";
import router from "@/router";
import { mapMenusToRoutes } from "@/utils/map-menus";

interface ILoginStore {
  token: string;
  name: string;
  userMenus: any;
}

const useLoginStore = defineStore("login", {
  state: (): ILoginStore => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    name: localCache.getCache("name") ?? "",
    userMenus: localCache.getCache("userMenus") ?? []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 1.登录获取token信息
      const loginRes = await accountLoginRequest(account);

      if (loginRes.code !== 0) {
        ElMessage.error(loginRes?.response?.data || loginRes?.message);
      } else {
        // 1.获取用户id
        const token = loginRes.data.token;
        const name = loginRes.data.name;
        const userId = loginRes.data.id;
        this.token = token;
        // 2.进行本地缓存
        localCache.setCache(LOGIN_TOKEN, token);
        localCache.setCache("name", name);

        // 2.获取角色id
        const roleRes = await getRoleIdByUserId(userId);

        const roleId = roleRes.data.id;
        const menuRes = await getMenubyRoleId(roleId);
        const userMenus = menuRes.data;
        this.userMenus = userMenus;
        localCache.setCache("userMenus", userMenus);

        const routes = mapMenusToRoutes(userMenus);

        routes.forEach((route) => {
          router.addRoute("main", route);
        });

        // 3.页面跳转
        router.push("/main");
      }
    },

    loadLocalCacheAction() {
      const routes = mapMenusToRoutes(this.userMenus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    }
  }
});

export default useLoginStore;
