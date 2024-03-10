<template>
  <div class="user-content">
    <div class="top">
      <h3 class="title">部门列表</h3>
      <el-button @click="newClickHandle" type="primary">
        <span class="text">新建部门</span>
      </el-button>
    </div>
    <el-table
      ref="tableRef"
      :data="pageList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column width="60" type="selection" align="center" />
      <el-table-column width="60" type="index" label="序号" align="center" />
      <el-table-column width="150" label="部门名称" prop="name" align="center" />
      <el-table-column width="150" label="部门领导" prop="leader" align="center" />
      <el-table-column width="150" label="上级部门" prop="parentId" align="center" />
      <el-table-column label="创建时间" prop="createAt" align="center">
        <template #default="scope">
          {{ formatTime(scope.row.createAt) }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateAt" align="center">
        <template #default="scope">
          {{ formatTime(scope.row.updateAt) }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="操作" align="center">
        <template #default="scope">
          <div class="btn">
            <el-button
              type="primary"
              text
              icon="Edit"
              size="small"
              @click="editClickHandle(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              text
              icon="Delete"
              size="small"
              @click="deleteClickHandle(scope.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
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
const emit = defineEmits(["newClick", "editClick"]);

const currentPage = ref(1);
const pageSize = ref(10);
const systemStore = useSystemStore();
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
  systemStore.postPageListDataAction("department", { offset, size, ...searchForm });
}

function editClickHandle(rowInfo: any) {
  emit("editClick", rowInfo);
}
function deleteClickHandle(id: number) {
  systemStore.deletePageAction("department", id);
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
