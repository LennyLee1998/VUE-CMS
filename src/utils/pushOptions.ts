function pushOptions(allData: any[], prop: string, modalConfig: any) {
  const data = allData.map((item) => {
    return { label: item.name, value: item.id };
  });
  for (const item of modalConfig.formItems) {
    // debugger
    if (item.prop === prop) {
      if (item.options.length !== 0) {
        item.options = [];
      }
      item.options?.push(...data);
    }
  }
}

export default pushOptions
