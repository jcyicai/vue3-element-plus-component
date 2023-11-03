<template>
	<el-popover v-model:visible="visible" placement="bottom-start" :width="450" trigger="click">
		<template #reference>
			<div class="city-select-container">
				<div class="text-item">{{ result }}</div>
				<div class="icon-item">
					<el-icon :class="{ rotate: visible }"><ArrowDown /></el-icon>
				</div>
			</div>
		</template>
		<div class="city-main">
			<el-row>
				<el-col :span="9">
					<el-radio-group v-model="radioValue">
						<el-radio-button label="按城市" />
						<el-radio-button label="按省份" /> </el-radio-group
				></el-col>
				<el-col :span="15">
					<el-select
						v-model="selectValue"
						filterable
						placeholder="请搜索城市"
						:filter-method="handleSelectFilterMethod"
						@change="handleSelectChange"
					>
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-col>
			</el-row>
			<template v-if="radioValue === '按城市'">
				<div class="city-content">
					<!-- 城市字母 -->
					<div
						@click="handleLetterClick(item)"
						class="city-item"
						v-for="(item, index) in Object.keys(cities)"
						:key="index"
					>
						{{ item }}
					</div>
				</div>
				<el-scrollbar max-height="300px">
					<template v-for="(value, key) in cities" :key="key">
						<el-row style="margin-bottom: 10px" :id="key">
							<el-col :span="2">{{ key }}：</el-col>
							<el-col :span="22" class="city-name">
								<div
									@click="handleCityNameClick(item)"
									class="city-name-item"
									v-for="item in value"
									:key="item.id"
								>
									{{ item.name }}
								</div>
							</el-col>
						</el-row>
					</template>
				</el-scrollbar>
			</template>
			<template v-else>
				<div class="province-content">
					<!-- 城市字母 -->
					<div
						@click="handleLetterClick(item)"
						class="province-item"
						v-for="(item, index) in Object.keys(provinces)"
						:key="index"
					>
						{{ item }}
					</div>
				</div>
				<el-scrollbar max-height="300px">
					<template v-for="(item, index) in Object.values(provinces)" :key="index">
						<template v-for="(item1, index1) in item" :key="index1">
							<el-row style="margin-bottom: 10px" :id="item1.id">
								<el-col :span="4">{{ item1.name }}：</el-col>
								<el-col :span="20" class="province-name">
									<div
										@click="handleProvinceNameClick(item2)"
										class="province-name-item"
										v-for="(item2, index2) in item1.data"
										:key="index2"
									>
										{{ item2 }}
									</div>
								</el-col>
							</el-row>
						</template>
					</template>
				</el-scrollbar>
			</template>
		</div>
	</el-popover>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import city from '../lib/city'
import { CityItem } from './types'
import province from '../lib/province.json'

const emits = defineEmits(['changeCity', 'changeProvince'])

// 最终选择结果
const result = ref<string>('请选择')
// 控制弹出层显示
const visible = ref<boolean>(false)
// 单选框 按城市 按省份
const radioValue = ref<string>('按城市')
// 下拉框值
const selectValue = ref<string>('')

// 下拉框显示城市数据
const options = ref<CityItem[]>([])
// 所有的城市数据
const cities = ref(city.cities)
// 所有省份数据
const provinces = ref(province)
// 所有处理后的城市数据
const allCity = ref<CityItem[]>([])

// 搜索输入框的值
const searchValue = ref<string>('')

// 城市名点击
const handleCityNameClick = (item: CityItem) => {
	// 赋值
	result.value = item.name
	// 关闭弹出层
	visible.value = false
	// 派发
	emits('changeCity', item)
}

// 省份名点击
const handleProvinceNameClick = (item: string) => {
	// 赋值
	result.value = item
	// 关闭弹出层
	visible.value = false
	// 派发
	emits('changeProvince', item)
}

// 城市 省份 字母点击
// 不推荐使用锚点，否在改变路由
const handleLetterClick = (item: string) => {
	const el = document.getElementById(item)
	if (el) {
		// 滚到指定位置
		el.scrollIntoView()
	}
}

// 下拉框过滤
const handleSelectFilterMethod = (val: string) => {
	searchValue.value = val
	const values = Object.values(cities.value).flat(2)
	if (!val) {
		options.value = values
	} else {
		if (radioValue.value === '按城市') {
			// 中文拼音一起过滤
			options.value = values.filter((item) => {
				return item.name.includes(val) || item.spell.includes(val)
			})
		} else {
			// 中文过滤
			options.value = values.filter((item) => {
				return item.name.includes(val)
			})
		}
	}
}

// 下拉框change
const handleSelectChange = (val: number) => {
	const city = allCity.value.find((item) => item.id === val)!
	result.value = city.name
	if (radioValue.value === '按城市') {
		emits('changeCity', city)
	} else {
		emits('changeProvince', city.name)
	}
}

onMounted(() => {
	// 赋值下拉数据
	const values = Object.values(cities.value).flat(2)
	options.value = values
	allCity.value = values
})
</script>

<style lang="scss" scoped>
.city-select-container {
	width: fit-content;
	cursor: pointer;
	display: flex;
	align-items: center;
	.text-item {
		font-size: 14px;
	}
	.icon-item {
		margin-left: 4px;
		// 箭头旋转
		.rotate {
			transform: rotate(180deg);
		}
		.el-icon {
			vertical-align: -2px;
			transition: all 0.25s linear;
		}
	}
}

.city-main {
	.city-content,
	.province-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 10px 0;
		.city-item,
		.province-item {
			padding: 2px 6px;
			text-align: center;
			margin-right: 8px;
			border: 1px solid #eee;
			margin-bottom: 8px;
			cursor: pointer;
		}
	}
}

.city-name,
.province-name {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	.city-name-item,
	.province-name-item {
		margin-right: 6px;
		margin-bottom: 6px;
		cursor: pointer;
	}
}
</style>
