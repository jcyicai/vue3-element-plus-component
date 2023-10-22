<template>
	<div>
		<div class="item">
			<JcNotification :value="50">
				<template #default
					><NoticeList
						:list="list"
						:actions="actions"
						@itemClick="handleItemClick"
						@actionClick="handleActionClick"
					></NoticeList
				></template>
			</JcNotification>
		</div>
		<!-- <div class="item">
			<CuiNotification :value="50" :max="30"></CuiNotification>
		</div>
		<div class="item">
			<CuiNotification :value="50" :max="30" isDot></CuiNotification>
		</div>
		<div class="item">
			<CuiNotification :value="50" icon="ChatRound"></CuiNotification>
		</div> -->
	</div>
</template>

<script lang="ts" setup>
import { list, actions } from './data'

const handleItemClick = (val: any) => {
	console.log(val)
}

const handleActionClick = (val: any) => {
	console.log(val)
}
</script>

<style lang="scss" scoped>
.item {
	padding: 14px 0;
}
</style>
