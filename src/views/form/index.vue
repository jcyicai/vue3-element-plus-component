<template>
  <div>
    <JcForm label-width="100px" :options="options"></JcForm>
  </div>
</template>

<script lang="ts" setup>
import { FormOptions } from '@/components/Form/src/types/types.ts'

const options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur',
      },
      {
        min: 2,
        max: 6,
        required: true,
        message: '用户名在2-6之间',
        trigger: 'blur',
      },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      },
      {
        min: 6,
        max: 15,
        required: true,
        message: '密码在6-15之间',
        trigger: 'blur',
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
]
</script>

<style lang="scss" scoped></style>
