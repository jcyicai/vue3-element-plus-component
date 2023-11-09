<template>
  <div>
    <ChooseIcon title="选择图标" v-model:visible="visible">选择图标</ChooseIcon>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let visible = ref<boolean>(false)
</script>
