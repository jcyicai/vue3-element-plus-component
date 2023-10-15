<template>
	<div>
		<choose-area @change="handleAreaChange"></choose-area>
	</div>
</template>

<script lang="ts" setup>
const handleAreaChange = (val: any) => {
	console.log(val)
}
</script>

<style lang="scss" scoped></style>
