<template>
	<div>
		<el-divider>标准</el-divider>
		<div class="flex">
			<div><Trend text="营业额"></Trend></div>
			<div><Trend text="销售额" type="down"></Trend></div>
		</div>
		<el-divider>插槽及翻转图标颜色</el-divider>
		<div class="flex">
			<div><Trend reverseColor>文本插槽</Trend></div>
			<div><Trend text="销售额" type="down" reverseColor downIconColor="#ccc"></Trend></div>
		</div>
		<el-divider>文字颜色自定义</el-divider>
		<div class="flex">
			<div><Trend text="营业额" upTextColor="blue"></Trend></div>
			<div><Trend text="销售额" type="down" downTextColor="yellow"></Trend></div>
		</div>
		<el-divider>图标自定义</el-divider>
		<div class="flex">
			<div><Trend text="营业额" upIcon="ArrowLeft"></Trend></div>
			<div><Trend text="销售额" type="down" downIcon="ArrowRight"></Trend></div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.flex {
	display: flex;
	div {
		margin-right: 10px;
	}
}
</style>
