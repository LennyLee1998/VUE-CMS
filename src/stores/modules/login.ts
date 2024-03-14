import { defineStore } from "pinia";
import type { IAccount } from "@/types";
import { ElMessage } from "element-plus";

import { accountLoginRequest, getMenubyRoleId, getUserInfoById } from "@/service/modules/login";
import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN } from "@/global/constant";
import router from "@/router";
import { mapMenusToPermissions, mapMenusToRoutes } from "@/utils/map-menus";

interface ILoginStore {
  token: string;
  name: string;
  userMenus: any;
  permissions: string[];
}

const useLoginStore = defineStore("login", {
  state: (): ILoginStore => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    name: localCache.getCache("name") ?? "",
    userMenus: localCache.getCache("userMenus") ?? [],
    permissions: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 1.登录获取token信息
      const loginRes = await accountLoginRequest(account);
      console.log(loginRes);
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
        const userInfoRes = await getUserInfoById(userId);

        const roleId = userInfoRes.data.role.id;
        const menuRes = await getMenubyRoleId(roleId);
        const userMenus = menuRes.data;
        this.userMenus = userMenus;
        localCache.setCache("userMenus", userMenus);
        const permissions = mapMenusToPermissions(userMenus);
        this.permissions = permissions;

        const routes = mapMenusToRoutes(userMenus);

        routes.forEach((route) => {
          router.addRoute("main", route);
        });

        // 3.页面跳转
        router.push("/main");
      }
    },

    loadLocalCacheAction() {
      const permissions = mapMenusToPermissions(this.userMenus);
      this.permissions = permissions;
      const routes = mapMenusToRoutes(this.userMenus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    }
  }
});

export default useLoginStore;
