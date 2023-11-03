<template>
  <el-form
    v-if="model"
    ref="form"
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
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-model="model[item.prop!]"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
        ></component>
        <el-upload
          v-if="item.type === 'upload'"
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
        <div id="editor" v-if="item.type === 'editor'"></div>
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
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { FormOptions, FormInstance } from './types/types'
import { ref, onMounted, watch, nextTick } from 'vue'
import cloneDeep from 'lodash/cloneDeep' // 没有全部引入 减少打包体积
import E from 'wangeditor'

interface formProps {
  // 配置
  options: FormOptions[]
  httpRequest?: () => void
}

const props = withDefaults(defineProps<formProps>(), {
  options: () => [],
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
const form = ref<FormInstance | null>()
const editorInstance = ref()

// 初始化表单
const initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {}
    let r: any = {}

    props.options.forEach((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules as any
      if (item.type === 'editor') {
        // 初始化富文本
        nextTick(() => {
          if (document.getElementById('editor')) {
            const editor = new E('#editor')
            editor.config.placeholder = item.placeholder!
            editor.create()
            // 初始化富文本的内容
            editor.txt.html(item.value)
            editor.config.onchange = (newHtml: string) => {
              model.value[item.prop!] = newHtml
            }
            editorInstance.value = editor
          }
        })
      }
    })

    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

// 验证表单
const validate = () => {
  return form.value!.validate
}

//重置表单
const resetFields = () => {
  form.value!.resetFields()
  // 重置富文本编辑器的内容
  // 获取到富文本的配置项
  if (props.options && props.options.length) {
    const editorItem = props.options.find(item => item.type === 'editor')!
    editorInstance.value.txt.html(editorItem.value)
  }
}

// 获取表单数据
const getData = () => {
  return model.value
}

// 分发组件方法
defineExpose({
  resetFields,
  validate,
  getData,
})

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
const onPreview = (file: File) => {
  emits('on-preview', file)
}
const onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
const onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传成功，给表单项赋值
  const uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }

  emits('on-success', { response, file, fileList })
}
const onError = (error: any, file: File, fileList: FileList) => {
  emits('on-error', { error, file, fileList })
}
const onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
const onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
const onExceed = (files: File[], fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}
const beforeUpload = (file: File) => {
  emits('before-upload', file)
}
const beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
</script>

<style lang="scss" scoped></style>
