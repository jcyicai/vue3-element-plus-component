<template>
  <div>
    <JcTable
      :options="options"
      :data="tableData"
      :loading="loading"
      isEditRow
      v-model:editRowIndex="editRowIndex"
      element-loading-text="加载中..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(122, 122, 122, 0.8)"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      pagination
      @confirm="handleCheckIconClick"
      @cancel="handleCloseIconClick"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #date="{ scope }">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
      <template #name="{ scope }">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
      <!--  <template #editCell="{ scope }">
        <div style="display: flex">
          <el-button size="small" type="primary" @click="handleConfirm(scope)">确认</el-button>
          <el-button size="small" type="danger" @click="handleCancel(scope)">取消</el-button>
        </div>
      </template> -->
      <template #action="{ scope }">
        <el-button size="small" type="primary" @click="handleEdit(scope)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope)">删除</el-button>
      </template>
      <template #editRow="{ scope }">
        <el-button size="small" type="primary" @click="handleConfirm(scope)">确认</el-button>
        <el-button size="small" type="danger" @click="handleCancel(scope)">取消</el-button>
      </template>
    </JcTable>
  </div>
</template>

<script lang="ts" setup>
import { TableOptions } from '@/components/Table/src/types'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
// 表格配置
const options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date',
    editable: true,
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name',
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center',
    editable: true,
  },
  {
    label: '操作',
    align: 'center',
    action: true,
  },
]
// 表格数据
const tableData = ref<any[]>([])
// loading
const loading = ref<boolean>(false)
// 编辑标识
const editRowIndex = ref<string>('')

// 页码
const currentPage = ref<number>(1)
// 页数
const pageSize = ref<number>(10)
// 总数
const total = ref<number>(0)

const getTableData = () => {
  loading.value = true
  axios
    .post('/api/list', {
      current: currentPage.value,
      pageSize: pageSize.value,
    })
    .then((res: any) => {
      tableData.value = res.data.data.rows
      total.value = res.data.data.total
      loading.value = false
    })
}

onMounted(() => {
  getTableData()
})

// 条数改变
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getTableData()
}
// 页数改变
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getTableData()
}

// 编辑按钮 点击
const handleEdit = (scope: any) => {
  editRowIndex.value = 'edit'
}

const handleDelete = (scope: any) => {}

const handleCheckIconClick = (scope: any) => {
  console.log(scope)
}

const handleCloseIconClick = (scope: any) => {
  console.log(scope)
}

const handleConfirm = (scope: any) => {
  console.log(scope)
}

const handleCancel = (scope: any) => {
  console.log(scope)
}
</script>


