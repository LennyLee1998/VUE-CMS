<template>
  <div class="user-content">
    <div class="top">
      <h3 class="title">用户列表</h3>
      <el-button @click="newClickHandle" type="primary">
        <span class="text">新建用户</span>
      </el-button>
    </div>
    <el-table
      ref="tableRef"
      :data="usersList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column width="60" type="selection" align="center" />
      <el-table-column width="60" type="index" label="序号" align="center" />
      <el-table-column width="150" label="用户名" prop="name" align="center" />
      <el-table-column width="150" label="真实姓名" prop="realname" align="center" />
      <el-table-column width="150" label="手机号码" prop="cellphone" align="center" />
      <el-table-column width="100" label="状态" prop="enable" align="center">
        <template #default="scope">
          <el-button type="primary" plain size="small">{{
            scope.row.enable ? "启用" : "禁用"
          }}</el-button>
        </template>
      </el-table-column>
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
        :total="totalCount"
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
postNewUserListData();
const { usersList, totalCount } = storeToRefs(systemStore);

function postNewUserListData(searchForm?: any) {
  const offset = (currentPage.value - 1) * pageSize.value;
  const size = pageSize.value;
  systemStore.postUserListDataAction({ offset, size, ...searchForm });
}
function handleSizeChange() {
  postNewUserListData();
}
function handleCurrentChange() {
  postNewUserListData();
}
function editClickHandle(rowInfo: any) {
  emit("editClick", rowInfo);
}
function deleteClickHandle(id: number) {
  systemStore.deleteUserAction(id);
}

function newClickHandle() {
  console.log("newClickHandle");
  emit("newClick");
}
function handleSelectionChange() {
  console.log("handleSelectionChange");
}

defineExpose({ postNewUserListData });
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
