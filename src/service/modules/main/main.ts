import cmsRequest from "@/service";

export function postDepartmentList(queryInfo = {}) {
  return cmsRequest.post({
    url: "/department/list",
    data: queryInfo
  });
}

export function postRoleList(queryInfo = {}) {
  return cmsRequest.post({
    url: "/role/list",
    data: queryInfo
  });
}

export function postEntireMenus() {
  return cmsRequest.post({
    url: "/menu/list"
  });
}
