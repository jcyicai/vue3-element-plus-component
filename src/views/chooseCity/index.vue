<template>
	<div>
		<ChooseCity @changeCity="handleCityChange" @changeProvince="handleProvinceChange"></ChooseCity>
	</div>
</template>

<script lang="ts" setup>
import { CityItem } from '@/components/ChooseCity/src/types'

const handleCityChange = (item: CityItem) => {
	console.log(item)
}

const handleProvinceChange = (item: string) => {
	console.log(item)
}
</script>

<style lang="scss" scoped></style>
