<template>
  <el-form :validate-on-rule-change="false" v-bind="$attrs" :model="model" :rules="rules">
    <el-form-item
      :label="item.label"
      :prop="item.prop"
      v-for="(item, index) in options"
      :key="index"
    >
      <component
        v-model="model[item.prop!]"
        v-bind="item.attrs"
        :is="`el-${item.type}`"
      ></component>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { FormOptions } from './types/types.ts'
import { ref, onMounted } from 'vue'
import cloneDeep from 'lodash/cloneDeep' // 没有全部引入 减少打包体积

interface formProps {
  // 配置
  options: FormOptions[]
}
const props = withDefaults(defineProps<formProps>(), {
  options: () => [],
})

const model = ref<any>({})
const rules = ref<any>({})

onMounted(() => {
  let m: any = { username: '', password: '' }
  let r: any = {}

  props.options.forEach((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules as any
  })

  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
})
</script>

<style lang="scss" scoped></style>
