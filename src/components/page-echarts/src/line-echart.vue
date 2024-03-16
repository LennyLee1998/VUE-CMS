<template>
  <div class="line-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEchart from "..";
import type { EChartsOption } from "echarts";
import { computed } from "vue";
interface IProps {
  labels: any[];
  values: any[];
}
const props = defineProps<IProps>();
const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  legend: {},
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: props.labels
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "分类销量统计",
      stack: "总量",
      data: props.values,
      type: "line",
      areaStyle: {},
      emphasis: {
        focus: "series"
      }
    }
  ]
}));
</script>

<style lang="less" scoped></style>
