const contentConfig = {
  header: {
    title: "部门列表",
    btnTitle: "新建部门"
  },
  pageName: "department",
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
      label: "部门名称"
    },
    {
      type: "normal",
      width: "150",
      prop: "leader",
      label: "部门领导"
    },
    {
      type: "normal",
      width: "150",
      prop: "parentId",
      label: "上级部门"
    },
    {
      type: "custom",
      width: "150",
      prop: "leader",
      label: "部门领导",
      slotName: "leader"
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
