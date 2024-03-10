import cmsRequest from "@/service";

export function postUsersListData(queryInfo: any) {
  return cmsRequest.post({
    url: `/users/list`,
    data: queryInfo
  });
}

export function deleteUser(id: number) {
  return cmsRequest.delete({
    url: `/users/${id}`
  });
}

export function newUser(userInfo: any) {
  return cmsRequest.post({
    url: "/users",
    data: userInfo
  });
}

export function editUser(userInfo: any) {
  return cmsRequest.patch({
    url: `/users/${userInfo.id}`,
    data: userInfo
  });
}

//针对页面
export function postPageListData(pageName: string, queryInfo: any) {
  return cmsRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  });
}

export function deletePage(pageName: string, id: number) {
  return cmsRequest.delete({
    url: `/${pageName}/${id}`
  });
}

export function newPage(pageName: string, userInfo: any) {
  return cmsRequest.post({
    url: `/${pageName}`,
    data: userInfo
  });
}

export function editPage(pageName: string, userInfo: any) {
  return cmsRequest.patch({
    url: `/${pageName}/${userInfo.id}`,
    data: userInfo
  });
}
