<template>
	<div style="display: flex">
		<div style="margin-right: 20px">
			<el-time-select
				v-model="startTime"
				:placeholder="startPlaceholder"
				:start="startTimeStart"
				:step="startStep"
				:end="startTimeEnd"
				v-bind="$attrs.startOptions"
			/>
		</div>
		<div>
			<el-time-select
				v-model="endTime"
				:min-time="startTime"
				:placeholder="endPlaceholder"
				:start="endTimeStart"
				:step="endStep"
				:end="endTimeEnd"
				:disabled="endTimeDisabled"
				v-bind="$attrs.endOptions"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface chooseTimeProps {
	// 开始时间占位符
	startPlaceholder?: string
	// 开始时间开始选择
	startTimeStart?: string
	// 开始时间的步进
	startStep?: string
	// 开始时间结束选择
	startTimeEnd?: string
	// 结束时间占位符
	endPlaceholder?: string
	// 结束时间开始选择
	endTimeStart?: string
	// 结束时间的步进
	endStep?: string
	// 结束时间结束选择
	endTimeEnd?: string
}
const props = withDefaults(defineProps<chooseTimeProps>(), {
	startPlaceholder: '请选择开始时间',
	startTimeStart: '08:00',
	startStep: '00:30',
	startTimeEnd: '24:00',
	endPlaceholder: '请选择结束时间',
	endTimeStart: '08:00',
	endtStep: '00:30',
	endTimeEnd: '24:00',
})

const emits = defineEmits(['startChange', 'endChange'])

// 开始时间
const startTime = ref<string>('')
// 结束时间
const endTime = ref<string>('')
const endTimeDisabled = ref<boolean>(true)

watch(
	() => startTime.value,
	(val) => {
		if (val === '') {
			endTime.value = ''
			endTimeDisabled.value = true
		} else {
			endTimeDisabled.value = false
			emits('startChange', val)
		}
	}
)

watch(
	() => endTime.value,
	(val) => {
		if (val !== '') {
			emits('endChange', { startTime: startTime.value, endTime: val })
		}
	}
)
</script>

<style lang="scss" scoped></style>
