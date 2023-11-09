<template>
  <el-table
    v-bind="$attrs"
    :data="tableData"
    v-loading="loading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    :element-loading-background="elementLoadingBackground"
    @row-click="handleRowClick"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
        <template #default="scope">
          <template v-if="scope.row.rowEdit"> <el-input v-model="scope.row[item.prop!]" /></template>
          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEdit">
              <div style="display: flex">
                <el-input v-model="scope.row[item.prop!]" />
                <div @click.stop="handleEditCellClick(scope)">
                  <slot name="editCell" v-if="$slots.editCell" :scope="scope"></slot>
                  <div class="icons" v-else>
                    <el-icon class="check" size="16" @click.stop="handleCheckIconClick(scope)"><check /></el-icon>
                    <el-icon class="close" size="16" @click.stop="handleCloseIconClick(scope)"><close /></el-icon>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop!] }}</span>
              <el-icon size="16" @click.stop="handleEditIconClick(scope)" class="edit-icon" v-if="item.editable"
                ><component :is="editIcon"></component
              ></el-icon>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column :label="actionOptions!.label" :align="actionOptions!.align" :width="actionOptions!.width">
      <template #default="scope">
        <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit"></slot>
        <slot name="action" :scope="scope" v-else></slot>
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination" v-if="pagination" :style="{ justifyContent }">
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableOptions } from './types'
import { ref, computed, onMounted, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'

interface TableProps {
  // 表格配置
  options: TableOptions[]
  // 表格数据
  data: any[]
  // loading
  loading?: boolean
  // 加载文案
  elementLoadingText?: string
  // 加载图标名
  elementLoadingSpinner?: string
  // 加载图标 svg
  elementLoadingSvg?: string
  // svg 配置
  elementLoadingSvgViewBox?: string
  // 加载背景色
  elementLoadingBackground?: string
  // 可编辑单元格显示图标
  editIcon?: string
  // 是否可编辑行
  isEditRow?: boolean
  // 编辑行按钮标识
  editRowIndex?: string
  // 是否显示分页
  pagination?: boolean
  // 分页对齐方式
  paginationAlign?: 'left' | 'center' | 'right'
  // 页数
  currentPage?: number
  // 条数
  pageSize?: number
  // 总数
  total?: number
  // 每页数据选项
  pageSizes?: number[]
}

const props = withDefaults(defineProps<TableProps>(), {
  options: () => [],
  data: () => [],
  loading: false,
  elementLoadingText: '',
  elementLoadingSpinner: '',
  elementLoadingSvg: '',
  elementLoadingBackground: '',
  elementLoadingSvgViewBox: '',
  editIcon: 'Edit',
  isEditRow: false,
  editRowIndex: '',
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizes: () => [10, 20, 30, 40, 50, 100],
  pagination: false,
  paginationAlign: 'right'
})

// 分发事件
const emits = defineEmits(['confirm', 'cancel', 'update:editRowIndex', 'size-change', 'current-change'])

// 当前点击单元格
const currentEdit = ref<string>('')
// 拷贝 表格数据
const tableData = ref<any[]>(cloneDeep(props.data))
// 拷贝 编辑行标识
const cloneEditRowIndex = ref<string>(cloneDeep(props.editRowIndex))
// 过滤 操作列 后的 table配置
const tableOptions = computed(() => props.options.filter(item => !item.action))
// 找出 操作列 数据
const actionOptions = computed(() => props.options.find(item => item.action))
// loading 根据 数据是否为空
//const isLoading = computed(() => !props.data || !props.data.length)
// 分页样式
const justifyContent = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start'
  else if (props.paginationAlign === 'right') return 'flex-end'
  else return 'center'
})

// 编辑图标 点击
const handleEditIconClick = (scope: any) => {
  // 唯一标识
  currentEdit.value = scope.$index + scope.column.id
}

const handleEditCellClick = (scope: any) => {
  currentEdit.value = ''
}

// 勾选图标 点击
const handleCheckIconClick = (scope: any) => {
  emits('confirm', scope)
  currentEdit.value = ''
}
// 关闭图标 点击
const handleCloseIconClick = (scope: any) => {
  emits('cancel', scope)
  currentEdit.value = ''
}
// 行点击
const handleRowClick = (row: any, column: any) => {
  // 操作列
  if (column.label === actionOptions.value!.label) {
    if (props.isEditRow && props.editRowIndex === cloneEditRowIndex.value) {
      // 编辑行的操作
      row.rowEdit = !row.rowEdit
      // 重置其他数据的rowEdit
      tableData.value.forEach(item => {
        if (item !== row) {
          item.rowEdit = false
        }
      })
      // 重置按钮的标识
      if (!row.rowEdit) {
        emits('update:editRowIndex', '')
      }
      // 重置单个单元格先编辑，再点击整行编辑 取消后 未还原问题
      currentEdit.value = ''
    }
  }
}

// 条数改变
const handleSizeChange = (val: number) => {
  emits('size-change', val)
}
// 页数改变
const handleCurrentChange = (val: number) => {
  emits('current-change', val)
}

// 监听表格数据
watch(
  () => props.data,
  val => {
    tableData.value = cloneDeep(val)
    tableData.value.forEach(item => {
      // 是否可编辑状态
      item.rowEdit = false
    })
  },
  { deep: true }
)
// 监听父组件传过来的编辑标识
watch(
  () => props.editRowIndex,
  val => {
    if (val) {
      cloneEditRowIndex.value = val
    }
  }
)

onMounted(() => {
  tableData.value.forEach(item => {
    // 是否可编辑状态
    item.rowEdit = false
  })
})
</script>

<style lang="scss" scoped>
.edit-icon {
  position: relative;
  top: 2px;
  left: 12px;
  cursor: pointer;
}

.icons {
  display: flex;
  .el-icon {
    margin-left: 8px;
    position: relative;
    top: 8px;
    cursor: pointer;
  }

  .check {
    color: red;
  }
  .close {
    color: green;
  }
}

.pagination {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
</style>
