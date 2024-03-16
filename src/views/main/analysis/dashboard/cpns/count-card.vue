<template>
  <div class="card">
    <el-card>
      <div class="data">
        <div class="title">
          <span>{{ title }}</span>
          <el-tooltip :content="tips" placement="top" effect="light">
            <el-icon><Warning /></el-icon>>
          </el-tooltip>
        </div>
        <div class="content">
          <!-- <span v-if="amount === 'saleroom'">￥</span> -->
          <span class="count" ref="count1Ref">{{ number1 }}</span>
        </div>
        <el-divider />
        <div class="subtitle">
          <span class="count2">
            {{ subtitle }}
          </span>
          <!-- <span v-if="amount === 'saleroom'">￥</span> -->
          <span ref="count2Ref">
            {{ number2 }}
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from "countup.js";
import { onMounted, ref } from "vue";
interface IProps {
  amount?: string;
  title?: string;
  tips?: string;
  number1?: number;
  number2?: number;
  subtitle?: string;
}

// 给可选属性设置默认值
const props = withDefaults(defineProps<IProps>(), {
  title: "商品总销量",
  tips: "所有的商品总销量",
  number1: 509989,
  number2: 509989,
  subtitle: "商品总销量",
  amount: ""
});
const count1Ref = ref<HTMLElement>();
const count2Ref = ref<HTMLElement>();

const countOption = {
  prefix: props.amount === "saleroom" ? "￥" : ""
};
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1, countOption);
  countup1.start();
  const countup2 = new CountUp(count2Ref.value!, props.number2, countOption);
  countup2.start();
});
</script>

<style lang="less" scoped>
.card {
  height: 130px;
  font-size: 14px;
  .el-card {
    height: 100%;
    padding: 0 20px;
    --el-card-padding: 0;
    .data {
      height: 130px;
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 38px;
        color: #00000073;
      }
      .content {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 26px;
      }
      .el-divider--horizontal {
        margin: 0;
      }
      .subtitle {
        height: 38px;
        line-height: 38px;

        .count2 {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
