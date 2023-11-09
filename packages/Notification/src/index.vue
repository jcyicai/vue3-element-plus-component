<template>
  <el-popover placement="bottom" :width="300" trigger="click" popper-class="notice-popover">
    <template #reference>
      <el-badge style="cursor: pointer" :value="value" :max="max" :is-dot="isDot">
        <el-icon><component :is="icon" /></el-icon>
      </el-badge>
    </template>
    <template #default><slot></slot></template>
  </el-popover>
</template>

<script lang="ts" setup>
interface notificationProps {
  // 显示的图标
  icon?: string
  // 通知数量
  value?: string | number
  // 最大值
  max?: number
  // 是否显示小圆点
  isDot?: boolean
}
const props = withDefaults(defineProps<notificationProps>(), {
  icon: 'Bell',
  value: '',
  isDot: false
})
</script>
