<template>
	<div class="header">
		<span @click="toggle">
			<el-icon v-if="collapse"><Expand /></el-icon>
			<el-icon v-else><Fold /></el-icon>
		</span>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	collapse: boolean
}>()

const emits = defineEmits(['update:collapse'])

const toggle = () => {
	emits('update:collapse', !props.collapse)
}
</script>

<style lang="scss" scoped>
.header {
	height: 60px;
	padding: 0 20px;
	display: flex;
	align-items: center;
	cursor: pointer;
}
</style>
