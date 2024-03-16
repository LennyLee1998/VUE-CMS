<template>
  <div class="pie-echart">
    <div ref="baseChartRef" style="height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref, watchEffect } from "vue";
import type { EChartsOption } from "echarts";
import { throttle } from "underscore";
import ChinaJSON from "../data/china.json";
interface IProps {
  option: EChartsOption;
}
const props = defineProps<IProps>();

echarts.registerMap("china", ChinaJSON);
const baseChartRef = ref();
onMounted(() => {
  const baseChart = echarts.init(baseChartRef.value);
  watchEffect(() => {
    baseChart.setOption(props.option);
  });

  window.addEventListener(
    "resize",
    throttle(function () {
      baseChart.resize();
    }, 100)
  );
});
</script>

<style lang="less" scoped></style>
