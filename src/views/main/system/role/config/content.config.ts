const contentConfig = {
  header: {
    title: "角色列表",
    btnTitle: "新建角色"
  },
  pageName: "role",
  tableItems: [
    {
      type: "selection",
      width: "80"
    },
    {
      type: "index",
      width: "80",
      label: "序号"
    },
    {
      type: "normal",
      width: "150",
      prop: "name",
      label: "角色名称"
    },
    {
      type: "normal",
      width: "150",
      prop: "intro",
      label: "权限介绍"
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
