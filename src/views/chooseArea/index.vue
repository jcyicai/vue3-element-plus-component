<template>
  <div>
    <ChooseArea @change="handleAreaChange"></ChooseArea>
  </div>
</template>

<script lang="ts" setup>
const handleAreaChange = (val: any) => {
  console.log(val)
}
</script>
