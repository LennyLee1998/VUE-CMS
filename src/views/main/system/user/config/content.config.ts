const contentConfig = {
  header: {
    title: "用户列表",
    btnTitle: "新建用户"
  },
  pageName: "users",
  tableItems: [
    {
      type: "selection",
      width: "60"
    },
    {
      type: "index",
      width: "60",
      label: "序号"
    },
    {
      type: "normal",
      width: "150",
      prop: "name",
      label: "用户名"
    },
    {
      type: "normal",
      width: "150",
      prop: "realname",
      label: "真实姓名"
    },
    {
      type: "normal",
      width: "150",
      prop: "cellphone",
      label: "手机号码"
    },
    {
      type: "state",
      label: "状态",
      prop: "enable",
      width: "100px"
    },
    {
      type: "timer",
      prop: "createAt",
      label: "创建时间"
    },
    {
      type: "timer",
      prop: "updateAt",
      label: "更新时间"
    },
    {
      type: "handler",
      label: "操作",
      width: "150px"
    }
  ]
};

export default contentConfig;
