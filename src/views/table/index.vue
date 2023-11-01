<template>
  <div>
    <JcTable :options="options" :data="data"></JcTable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TableOptions } from '@/components/Table/src/types'

const options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center',
  },
]

const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="scss" scoped></style>
