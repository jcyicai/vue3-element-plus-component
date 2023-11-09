<template>
  <div>
    <el-button type="primary" @click="handleClick">open</el-button>
    <ModalForm
      v-model:visible="visible"
      width="50%"
      title="编辑用户"
      :options="options"
      :on-change="handleChange"
      :on-success="handleSuccess"
      isScroll
    >
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="font-size: 12px; color: #ccc">jpg/png files with a size less than 500KB.</div>
      </template>
      <template #footer="{ form }">
        <el-button @click="handleCancel(form)">取消</el-button>
        <el-button type="primary" @click="handleConfirm(form)">确认</el-button>
      </template>
    </ModalForm>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormOptions, FormInstance } from '@/components/Form/src/types/types'
import { ElMessage } from 'element-plus'

const visible = ref<boolean>(false)
const options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        required: true,
        message: '用户名在2-6之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 15,
        required: true,
        message: '密码在6-15之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      showPassword: true,
      clearable: true
    }
  },
  {
    type: 'select',
    value: '',
    label: '职位',
    placeholder: '请选择职位',
    prop: 'role',
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    attrs: {
      clearable: true,
      style: { width: '100%' }
    },
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    label: '爱好',
    prop: 'like',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '排球',
        value: '3'
      }
    ]
  },
  {
    type: 'radio-group',
    value: '',
    label: '性别',
    prop: 'gender',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male'
      },
      {
        type: 'radio',
        label: '女',
        value: 'female'
      },
      {
        type: 'radio',
        label: '保密',
        value: 'not'
      }
    ]
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      multiple: true,
      limit: 2
    },
    rules: [
      {
        required: true,
        message: '文件不能为空',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'editor',
    value: '',
    label: '描述',
    prop: 'desc',
    placeholder: '请输入描述',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur'
      }
    ]
  }
]

const handleClick = () => {
  visible.value = true
}

const handleCancel = (form: FormInstance) => {
  form.resetFields()
  visible.value = false
}

const handleConfirm = async (form: FormInstance) => {
  const valid = await form.validate()
  const formData = form.getData()
  //validate((valid: any) => {
  if (valid) {
    console.log(formData)
    ElMessage.success('验证成功')
    visible.value = false
  } else {
    ElMessage.error('验证失败')
  }
  //})
}

const handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}

const handleChange = (val: any) => {
  console.log('on-change')
  console.log(val)
}
</script>
