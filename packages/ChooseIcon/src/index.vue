<template>
  <el-button @click="handleBtnClick" type="primary">
    <slot></slot>
  </el-button>
  <div class="choose-icon-dialog-body-height">
    <el-dialog :title="title" v-model="dialogVisible">
      <div class="container">
        <div
          v-for="(item, index) in Object.keys(ElementPlusIconsVue)"
          :key="index"
          class="item"
          @click="handleIconClick(item)"
        >
          <div class="text">
            <component :is="item"></component>
          </div>
          <div class="icon">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useCopy } from '../../hooks/useCopy'

interface chooseIconProps {
  // 弹出框标题
  title: string
  // 控制弹出框显示/隐藏
  visible: boolean
}
const props = withDefaults(defineProps<chooseIconProps>(), {
  title: '',
  visible: false
})

const emits = defineEmits(['update:visible'])

// 拷贝一份父组件传递过来的visible
let dialogVisible = ref<boolean>(props.visible)

// 弹窗点击
const handleBtnClick = () => {
  emits('update:visible', !props.visible)
}

// 图标点击复制
const handleIconClick = (item: string) => {
  const text = `<${item} />`
  // 复制文本
  useCopy(text)
  // 关闭弹窗
  dialogVisible.value = false
}

// 监听visible的变化 只能监听第一次的变化
watch(
  () => props.visible,
  val => {
    dialogVisible.value = val
  }
)
// 监听组件内部的dialogVisible变化
watch(
  () => dialogVisible.value,
  val => {
    emits('update:visible', val)
  }
)
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 25%;
  margin-bottom: 40px;
  cursor: pointer;
}

.icon {
  word-break: break-all;
}

svg {
  width: 2em;
  height: 2em;
}
</style>
