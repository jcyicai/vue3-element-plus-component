<template>
	<router-view></router-view>
</template>

<script lang="ts" setup></script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
}

// 撑满高度
html,
body,
#app,
.common-layout,
.el-container,
.el-menu {
	height: 100%;
}
</style>
