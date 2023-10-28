<template>
	<div>
		<JcProgress :percentage="60" isAnimation />
		<JcProgress :percentage="100" status="success" />
		<JcProgress type="circle" :percentage="25" />
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
