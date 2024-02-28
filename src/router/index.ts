import { LOGIN_TOKEN } from "@/global/constant";
import { localCache } from "@/utils/cache";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue")
    },
    {
      path: "/main",
      component: () => import("@/views/main/main.vue")
    },
    {
      path: "/:pathMath(.*)",
      component: () => import("@/views/not-found/not-found.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localCache.getCache(LOGIN_TOKEN);
  if (to.path === "/login") {
    next();
  } else if (token) {
    next();
  } else {
    next("/login");
  }
});

export default router;
