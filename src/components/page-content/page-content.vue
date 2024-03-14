<template>
  <div class="user-content">
    <div class="top">
      <h3 class="title">{{ contentConfig.header?.title ?? "数据列表" }}</h3>
      <el-button
        @click="newClickHandle"
        type="primary"
        v-auth="`system:${contentConfig.pageName}:create`"
      >
        <span class="text">{{ contentConfig.header?.btnTitle ?? "新建数据" }}</span>
      </el-button>
    </div>
    <el-table
      ref="tableRef"
      :data="pageList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      v-bind="contentConfig.childrenTree"
    >
      <template v-for="item in contentConfig.tableItems" :key="item.prop">
        <template v-if="item.type === 'timer'">
          <el-table-column v-bind="item" align="center">
            <template #default="scope">
              {{ formatTime(scope.row[item.prop]) }}
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'handler'">
          <el-table-column v-bind="item" align="center">
            <template #default="scope">
              <div class="btn">
                <el-button
                  type="primary"
                  text
                  icon="Edit"
                  size="small"
                  @click="editClickHandle(scope.row)"
                  v-auth="`system:${contentConfig.pageName}:update`"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  text
                  icon="Delete"
                  size="small"
                  @click="deleteClickHandle(scope.row.id)"
                  v-auth="`system:${contentConfig.pageName}:delete`"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'custom'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'state'">
          <el-table-column v-bind="item" align="center">
            <template #default="scope">
              <el-button type="primary" plain size="small">{{
                scope.row.enable ? "启用" : "禁用"
              }}</el-button>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column v-bind="item" align="center" />
        </template>
      </template>
    </el-table>
    <div class="pagination" v-if="contentConfig.pageName !== 'menu'">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from "@/stores/modules/main/system";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { formatTime } from "@/utils/format";
interface IProps {
  contentConfig: {
    header?: {
      title?: string;
      btnTitle?: string;
    };
    pageName: string;
    tableItems: any[];
    childrenTree?: any;
  };
}
const props = defineProps<IProps>();
const emit = defineEmits(["newClick", "editClick"]);

const currentPage = ref(1);
const pageSize = ref(10);
const systemStore = useSystemStore();
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === "deletePageAction" || name === "editPageAction" || name === "newPageAction") {
      currentPage.value = 1;
    }
  });
});

fetchPageListData();
const { pageList, pageTotalCount } = storeToRefs(systemStore);
function handleSizeChange() {
  fetchPageListData();
}
function handleCurrentChange() {
  fetchPageListData();
}
function fetchPageListData(searchForm?: any) {
  const offset = (currentPage.value - 1) * pageSize.value;
  const size = pageSize.value;
  systemStore.postPageListDataAction(props.contentConfig.pageName, { offset, size, ...searchForm });
}

function editClickHandle(rowInfo: any) {
  emit("editClick", rowInfo);
}
function deleteClickHandle(id: number) {
  systemStore.deletePageAction(props.contentConfig.pageName, id);
}

function newClickHandle() {
  console.log("newClickHandle");
  emit("newClick");
}
function handleSelectionChange() {
  console.log("handleSelectionChange");
}

defineExpose({ fetchPageListData });
</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      font-size: 22px;
    }
  }
  .btn {
    display: flex;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
.el-table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    padding: 5px 8px;
    margin-left: 0;
  }
}
</style>
