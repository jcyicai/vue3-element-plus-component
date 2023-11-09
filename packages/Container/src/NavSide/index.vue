<template>
  <JcMenu :collapse="collapse" :data="data" router :default-active="$route.path"></JcMenu>
</template>

<script lang="ts" setup>
const props = defineProps<{
  collapse: boolean
}>()

const data = [
  {
    icon: 'HomeFilled',
    name: '首页',
    index: '/'
  },
  {
    icon: 'Check',
    name: '图标选择器',
    index: '/chooseIcon'
  },
  {
    icon: 'Location',
    name: '省市区选择',
    index: '/chooseArea'
  },
  {
    icon: 'Sort',
    name: '趋势标记',
    index: '/trend'
  },
  {
    icon: 'Timer',
    name: '时间选择',
    index: '/chooseTime'
  },
  {
    icon: 'Bell',
    name: '消息通知',
    index: '/notification'
  },
  {
    icon: 'TurnOff',
    name: '城市选择',
    index: '/chooseCity'
  },
  {
    icon: 'Operation',
    name: '进度条',
    index: '/progress'
  },
  {
    icon: 'ScaleToOriginal',
    name: '日历',
    index: '/calendar'
  },
  {
    icon: 'Tickets',
    name: '表单',
    index: '/form'
  },
  {
    icon: 'ChatLineSquare',
    name: '弹出框表单',
    index: '/modalForm'
  },
  {
    icon: 'Grid',
    name: '表格',
    index: '/table'
  },
  {
    icon: 'Menu',
    name: '导航菜单',
    index: '/menu'
  }
]
</script>
