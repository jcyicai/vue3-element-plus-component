<template>
	<router-view></router-view>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@import url(./styles/base.scss);
@import url(./styles/ui.scss);

// 消息通知弹窗 popover 样式重置
.notice-popover {
	padding: 0 !important;
}
</style>
