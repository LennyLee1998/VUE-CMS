import { LOGIN_TOKEN } from "@/global/constant";
import { localCache } from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/main.vue")
    },
    {
      path: "/:pathMath(.*)",
      component: () => import("@/views/not-found/not-found.vue")
    }
  ]
});

router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN);

  if (to.path !== "/login" && !token) {
    return "/login";
  }
  if (to.path === "/main") {
    return firstMenu?.url;
  }
});

export default router;
