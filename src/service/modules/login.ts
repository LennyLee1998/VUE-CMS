import type { IAccount } from "@/types";
import cmsRequest from "..";

export function accountLoginRequest(account: IAccount) {
  return cmsRequest.post({
    url: "/login",
    data: account
  });
}

export function getRoleIdByUserId(userId: number) {
  return cmsRequest.get({
    url: `/role/${userId}`
  });
}

export function getMenubyRoleId(roleId: number) {
  return cmsRequest.get({
    url: `/role/${roleId}/menu`
  });
}
