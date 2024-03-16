<template>
  <div class="line-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEchart from "..";
import type { EChartsOption } from "echarts";
import { computed } from "vue";
interface IEchartValueType {
  value: number;
  name: string;
}
interface IProps {
  roseData: IEchartValueType[];
}
const props = defineProps<IProps>();
const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "item"
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: "Nightingale Chart",
      type: "pie",
      radius: [10, 120],
      center: ["50%", "50%"],
      bottom: "-15%",
      roseType: "area",
      itemStyle: {
        borderRadius: 8
      },
      label: {
        show: false // 隐藏标签
      },
      data: props.roseData
    }
  ]
}));
</script>

<style lang="less" scoped></style>
