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
  pieData: IEchartValueType[];
}
const props = defineProps<IProps>();
const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "item"
  },
  legend: {
    orient: "horizontal",
    left: "left"
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "50%",
      buttom: "-15%",
      center: ["50%", "50%"],
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
}));
</script>

<style lang="less" scoped></style>
