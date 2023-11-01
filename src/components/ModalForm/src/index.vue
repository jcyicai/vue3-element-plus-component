<template>
  <div :class="{ 'choose-icon-dialog-body-height': isScroll }">
    <el-dialog v-model="dialogVisible" v-bind="$attrs">
      <template #default>
        <JcForm
          ref="form"
          :options="options"
          label-width="100px"
          @on-preview="onPreview"
          @on-remove="onRemove"
          @on-success="onSuccess"
          @on-error="onError"
          @on-progress="onProgress"
          @on-change="onChange"
          @on-exceed="onExceed"
          @before-upload="beforeUpload"
          @before-remove="beforeRemove"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </JcForm>
      </template>
      <template #footer>
        <slot name="footer" :form="form"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { FormOptions } from './types/types.ts'
import { FormInstance } from 'element-plus'

interface modalFormProps {
  // 控制弹出框显示/隐藏
  visible: boolean
  // 表单配置
  options: FormOptions[]
  // 是否当前区域滚动
  isScroll: boolean
  onPreview?: () => void
  onRemove?: () => void
  onSuccess?: () => void
  onError?: () => void
  onProgress?: () => void
  onChange?: () => void
  onExceed?: () => void
  beforeUpload?: () => void
  beforeRemove?: () => void
}

const props = withDefaults(defineProps<modalFormProps>(), {
  visible: false,
  options: () => [],
  isScroll: false,
})

const emits = defineEmits(['update:visible'])

const form = ref<FormInstance | null>()

// 拷贝一份父组件传递过来的visible
let dialogVisible = ref<boolean>(props.visible)

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

<style lang="scss" scoped></style>
