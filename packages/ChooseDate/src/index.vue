<template>
	<div style="display: flex">
		<div style="margin-right: 20px">
			<el-date-picker
				v-model="startDate"
				type="date"
				:placeholder="startPlaceholder"
				:disabled-date="startDisabledDate"
				v-bind="$attrs.startOptions!"
			/>
		</div>
		<div>
			<el-date-picker
				v-model="endDate"
				type="date"
				:placeholder="endPlaceholder"
				:disabled="endDateDisabled"
				:disabled-date="endDisabledDate"
				v-bind="$attrs.endOptions!"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface chooseTimeProps {
	// 开始日期占位符
	startPlaceholder?: string
	// 结束日期占位符
	endPlaceholder?: string
	// 是否禁用选择今天之前的日期
	disableToday?: boolean
}
const props = withDefaults(defineProps<chooseTimeProps>(), {
	startPlaceholder: '请选择开始日期',
	endPlaceholder: '请选择结束日期',
	disableToday: true,
})

const emits = defineEmits(['startChange', 'endChange'])

// 开始日期
const startDate = ref<Date | null>(null)
// 结束日期
const endDate = ref<Date | null>(null)
// 控制结束日期的禁用状态
const endDateDisabled = ref<boolean>(true)

// 禁用开始日期函数
const startDisabledDate = (time: Date) => {
	if (props.disableToday) {
		return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
	}
}

// 禁用结束日期函数
// 开始日期选择后，只能选择开始日期之后的日期(不包含开始日期，所以要加上 1天)
const endDisabledDate = (time: Date) => {
	if (startDate.value) {
		return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24
	}
}

watch(
	() => startDate.value,
	(val) => {
		if (!val) {
			endDate.value = null
			endDateDisabled.value = true
		} else {
			endDateDisabled.value = false
			emits('startChange', val)
		}
	}
)

watch(
	() => endDate.value,
	(val) => {
		if (val) {
			emits('endChange', { startDate: startDate.value, endDate: val })
		}
	}
)
</script>

<style lang="scss" scoped></style>
