<template>
  <el-table :data="data">
    <template v-for="(item, index) in options" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import { TableOptions } from './types.ts'
import { ref } from 'vue'

interface tableProps {
  // 表格配置
  options: TableOptions[]
  // 表格数据
  data: any[]
}

const props = withDefaults(defineProps<tableProps>(), {
  options: () => [],
  data: () => [],
})
</script>

<style lang="scss" scoped></style>
