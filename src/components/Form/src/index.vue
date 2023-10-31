<template>
  <el-form
    v-if="model"
    :validate-on-rule-change="false"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-if="!item.children || !item.children!.length"
      >
        <component
          v-if="item.type !== 'upload'"
          v-model="model[item.prop!]"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
        ></component>
        <el-upload
          v-else
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
        >
          <slot name="uploadArea"></slot>
          <template #tip>
            <slot name="uploadTip"></slot>
          </template>
        </el-upload>
      </el-form-item>
      <!-- 存在子项 select option -->
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-if="item.children && item.children.length"
      >
        <component
          v-model="model[item.prop!]"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
        >
          <component
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            :is="`el-${subItem.type}`"
            :label="subItem.label"
            :value="subItem.value"
          >
          </component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { FormOptions } from './types/types.ts'
import { ref, onMounted, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep' // 没有全部引入 减少打包体积

interface formProps {
  // 配置
  options: FormOptions[]
  httpRequest?: Function
}

const props = withDefaults(defineProps<formProps>(), {
  options: () => [],
  httpRequest: () => {},
})

const emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'on-exceed',
  'before-upload',
  'before-remove',
])

const model = ref<any>(null)
const rules = ref<any>(null)

// 初始化表单
const initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {}
    let r: any = {}

    props.options.forEach((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules as any
    })

    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

onMounted(() => {
  initForm()
})

// 监听传递进来的 options
watch(
  () => props.options,
  () => {
    initForm()
  },
  { deep: true }
)

// 上传方法
const onPreview = (uploadFile: any) => {
  emits('on-preview', uploadFile)
}
const onRemove = (uploadFile: any, uploadFiles: any) => {
  emits('on-remove', { uploadFile, uploadFiles })
}
const onSuccess = (response: any, uploadFile: any, uploadFiles: any) => {
  emits('on-success', { response, uploadFile, uploadFiles })
}
const onError = (error: any, uploadFile: any, uploadFiles: any) => {
  emits('on-error', { error, uploadFile, uploadFiles })
}
const onProgress = (evt: any, uploadFile: any, uploadFiles: any) => {
  emits('on-progress', { evt, uploadFile, uploadFiles })
}
const onChange = (uploadFile: any, uploadFiles: any) => {
  emits('on-change', { uploadFile, uploadFiles })
}
const onExceed = (files: any, uploadFiles: any) => {
  emits('on-exceed', { files, uploadFiles })
}
const beforeUpload = (rawFile: any) => {
  emits('before-upload', rawFile)
}
const beforeRemove = (uploadFile: any, uploadFiles: any) => {
  emits('before-remove', { uploadFile, uploadFiles })
}
</script>

<style lang="scss" scoped></style>
