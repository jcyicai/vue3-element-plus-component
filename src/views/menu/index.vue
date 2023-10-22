<template>
	<el-divider>标准菜单</el-divider>
	<div style="width: 200px">
		<JcMenu :data="data" defaultActive="2"></JcMenu>
	</div>
	<el-divider>递归菜单</el-divider>
	<div style="width: 200px">
		<RecurMenu :data="data1" defaultActive="3-1-1-1"></RecurMenu>
	</div>
</template>

<script lang="ts" setup>
const data = [
	{
		index: '1',
		name: '菜单1',
		icon: 'Document',
	},
	{
		index: '2',
		name: '菜单2',
		icon: 'Document',
	},
	{
		index: '3',
		name: '菜单3',
		icon: 'Document',
		children: [
			{
				index: '3-1',
				name: '菜单3-1',
				icon: 'Document',
			},
			{
				index: '3-2',
				name: '菜单3-2',
				icon: 'Document',
			},
		],
	},
]

const data1 = [
	{
		index: '1',
		name: '菜单1',
		icon: 'Document',
	},
	{
		index: '2',
		name: '菜单2',
		icon: 'Document',
	},
	{
		index: '3',
		name: '菜单3',
		icon: 'Document',
		children: [
			{
				index: '3-1',
				name: '菜单3-1',
				icon: 'Document',
				children: [
					{
						index: '3-1-1',
						name: '菜单3-1-1',
						icon: 'Document',
						children: [
							{
								index: '3-1-1-1',
								name: '菜单3-1-1-1',
								icon: 'Document',
							},
						],
					},
				],
			},
		],
	},
]
</script>

<style lang="scss" scoped></style>
