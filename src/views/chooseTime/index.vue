<template>
	<div>
		<ChooseTime :startOptions="startOptions" @startChange="handleStartChange" @endChange="handleEndChange"></ChooseTime>
		<br />
		<!-- 添加disableToday 可以选择今日之前的数据 -->
		<ChooseDate
			:startOptions="startOptions"
			:disableToday="false"
			@startChange="handleStartDateChange"
			@endChange="handleEndDateChange"
		></ChooseDate>
		<br />
		<ChooseDate @startChange="handleStartDateChange" @endChange="handleEndDateChange"></ChooseDate>
	</div>
</template>

<script lang="ts" setup>
interface EndValue {
	startTime: string
	endTime: string
}

interface EndDateValue {
	startDate: Date
	endDate: Date
}

const handleStartChange = (val: string) => {
	console.log(val)
}

const handleEndChange = (val: EndValue) => {
	console.log(val)
}

const startOptions = {
	/* size: 'large',
	clearable: false, */
}

const handleStartDateChange = (val: Date) => {
	console.log(val)
}

const handleEndDateChange = (val: EndDateValue) => {
	console.log(val)
}
</script>

<style lang="scss" scoped></style>
