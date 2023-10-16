<template>
	<div>
		<el-select placeholder="请选择省份" v-model="province" clearable>
			<el-option v-for="item in allAreaData" :key="item.code" :value="item.code" :label="item.name"></el-option>
		</el-select>
		<el-select :disabled="!province" style="margin: 0 10px" placeholder="请选择城市" v-model="city" clearable>
			<el-option v-for="item in cityData" :key="item.code" :value="item.code" :label="item.name"></el-option>
		</el-select>
		<el-select :disabled="!province || !city" placeholder="请选择区域" v-model="area" clearable>
			<el-option v-for="item in areaData" :key="item.code" :value="item.code" :label="item.name"></el-option>
		</el-select>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'

// 省市区接口
export interface AreaItem {
	name: string
	code: string
	children?: AreaItem[]
}

// 派发父组件省市区接口
export interface Data {
	name: string
	code: string
}

// 下拉框选择省份的值
let province = ref<string>('')
// 下拉框选择城市的值
let city = ref<string>('')
// 下拉框选择区域的值
let area = ref<string>('')
// 所有省市区数据
const allAreaData = ref(allAreas)
// 城市下拉框数据
const cityData = ref<AreaItem[]>([])
// 区下拉框数据
const areaData = ref<AreaItem[]>([])

// 分发事件给父组件
const eimits = defineEmits(['change'])

// 省 监听
watch(
	() => province.value,
	(val) => {
		if (val) {
			// ts 中 ! 非空断言  排除变量中的 null 或 undefined
			const cities = allAreaData.value.find((item) => item.code === province.value)!.children!
			cityData.value = cities
		}
		city.value = ''
		area.value = ''
	}
)
// 城市 监听
watch(
	() => city.value,
	(val) => {
		if (val) {
			const areas = cityData.value.find((item) => item.code === city.value)!.children!
			areaData.value = areas
		}
		area.value = ''
	}
)

// 区域 监听
watch(
	() => area.value,
	(val) => {
		if (val) {
			let provinceItem: Data = {
				name: province.value && allAreaData.value.find((item) => item.code === province.value)!.name,
				code: province.value,
			}
			let cityItem: Data = {
				name: city.value && cityData.value.find((item) => item.code === city.value)!.name,
				code: city.value,
			}
			let areaItem: Data = {
				name: val && areaData.value.find((item) => item.code === val)!.name,
				code: val,
			}
			// 派发父组件数据
			eimits('change', {
				province: provinceItem,
				city: cityItem,
				ared: areaItem,
			})
		}
	}
)
</script>

<style lang="scss" scoped></style>
