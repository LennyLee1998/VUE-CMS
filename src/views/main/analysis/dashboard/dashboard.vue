<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item">
        <el-col :span="6" :xs="24" :sm="12">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间部分的图标 -->
    <el-row :gutter="10">
      <el-col :span="8">
        <chart-card>
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card>
          <map-echart :map-data="showAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card>
          <rose-echart :rose-data="showcategoryGoodsSale" />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card>
          <line-echart :labels="showLineGoodsSale.labels" :values="showLineGoodsSale.values" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart
            :labels="showcategoryGoodsFavor.labels"
            :values="showcategoryGoodsFavor.values"
          />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { storeToRefs } from "pinia";
import CountCard from "./cpns/count-card.vue";
import ChartCard from "./cpns/chart-card.vue";
import useAnalysisStore from "@/stores/modules/main/analysis";
import {
  PieEchart,
  LineEchart,
  RoseEchart,
  BarEchart,
  MapEchart
} from "@/components/page-echarts/index";
import { computed } from "vue";
// 1.发起数据的请求
const analysisStore = useAnalysisStore();
analysisStore.fetchAnalysisDataAction();
// 2.从store获取数据
const { amountList, categoryGoodsCount, categoryGoodsSale, categoryGoodsFavor, addressSale } =
  storeToRefs(analysisStore);

const showGoodsCategoryCount = computed(() => {
  return categoryGoodsCount.value.map((item) => {
    return { value: item.goodsCount, name: item.name };
  });
});
const showcategoryGoodsSale = computed(() => {
  return categoryGoodsSale.value.map((item) => ({
    value: item.goodsCount,
    name: item.name
  }));
});

const showLineGoodsSale = computed(() => {
  const labels = categoryGoodsSale.value.map((item) => item.name);
  const values = categoryGoodsSale.value.map((item) => item.goodsCount);
  return { labels, values };
});
const showcategoryGoodsFavor = computed(() => {
  const labels = categoryGoodsFavor.value.map((item) => item.name);
  const values = categoryGoodsFavor.value.map((item) => item.goodsFavor);
  return { labels, values };
});

const showAddressSale = computed(() => {
  return addressSale.value.map((item) => ({
    value: item.count,
    name: item.address
  }));
});
</script>

<style scoped>
.dashboard {
}
.el-row {
  margin-bottom: 10px;
}

.el-col {
  margin-top: 10px;
}
</style>
