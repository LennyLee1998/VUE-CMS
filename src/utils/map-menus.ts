import type { RouteRecordRaw } from "vue-router";

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = [];
  const files: Record<string, any> = import.meta.glob("../router/main/**/*.ts", {
    eager: true
  });
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }
  return localRoutes;
}
export let firstMenu: any = null;
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes();
  const routes: RouteRecordRaw[] = [];
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url);
      // 获取第一个menu
      if (!firstMenu && route) {
        firstMenu = submenu;
      }
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: submenu.url });
        }
        routes.push(route);
      }
    }
  }
  return routes;
}

export function mapRouteToMenu(path: string, userMenus: any) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu;
      }
    }
  }
}

interface IBreadcrumbs {
  name: string;
  path: string;
}
export function mapPathToBreadcrumb(path: string, userMenus: any) {
  const breadcrumb: IBreadcrumbs[] = [];
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumb.push({ name: menu.name, path: menu.url });
        breadcrumb.push({ name: subMenu.name, path: subMenu.url });
      }
    }
  }
  return breadcrumb;
}

// 找最底层的id
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = [];

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children);
      } else {
        ids.push(item.id);
      }
    }
  }
  recurseGetId(menuList);

  return ids;
}

export function mapMenusToPermissions(menus: any[]) {
  const permissions: string[] = [];
  function recurseGetPermissions(menu: any[]) {
    for (const item of menu) {
      if (item.type === 3) {
        permissions.push(item.permission);
      } else {
        recurseGetPermissions(item.children ?? []);
      }
    }
  }
  recurseGetPermissions(menus);
  return permissions;
}
