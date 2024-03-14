const contentConfig = {
  header: {
    title: "菜单列表",
    btnTitle: "新建菜单"
  },
  pageName: "menu",
  // 如果想要在这里展开tree就不要加type
  tableItems: [
    {
      width: "150",
      prop: "name",
      label: "菜单名称"
    },
    {
      width: "120",
      prop: "type",
      label: "级别"
    },
    {
      width: "150",
      prop: "url",
      label: "菜单url"
    },
    {
      width: "200",
      prop: "icon",
      label: "菜单icon"
    },
    {
      width: "120",
      prop: "sort",
      label: "排序"
    },
    {
      width: "120",
      prop: "permission",
      label: "权限"
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
  ],
  childrenTree: {
    rowKey: "id",
    treeProps: {
      children: "children"
    }
  }
};

export default contentConfig;
