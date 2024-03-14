import type { IModalConfig } from "@/components/page-modal/type";

const modalConfig: IModalConfig = {
  pageName: "users",
  header: {
    newTitle: "新建用户",
    editTitle: "编辑用户"
  },
  formItems: [
    {
      type: "input",
      label: "用户名",
      prop: "name",
      placeholder: "请输入用户名",
      initialValue: "aaa"
    },
    {
      type: "input",
      label: "真实姓名",
      prop: "realname",
      placeholder: "请输入真实姓名"
    },
    {
      type: "input",
      label: "密码",
      prop: "password",
      placeholder: "请输入密码"
    },
    {
      type: "input",
      label: "手机号码",
      prop: "cellphone",
      placeholder: "请输入手机号码"
    },
    {
      type: "select",
      label: "选择角色",
      prop: "roleId",
      placeholder: "请选择角色",
      options: []
    },
    {
      type: "select",
      label: "选择部门",
      prop: "departmentId",
      placeholder: "请选择部门",
      options: []
    }
  ]
};

export default modalConfig;
