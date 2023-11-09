<template>
  <div class="notice-list-tabs-item">
    <el-tabs>
      <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
        <el-scrollbar max-height="300px">
          <div
            class="list-item"
            @click="handleItemClick(subItem, subIndex)"
            v-for="(subItem, subIndex) in item.content"
            :key="subIndex"
          >
            <div class="avatar" v-if="subItem.avatar">
              <el-avatar size="default" :src="subItem.avatar" />
            </div>
            <div class="content">
              <div v-if="subItem.title" class="title">
                <div>{{ subItem.title }}</div>
                <el-tag size="small" v-if="subItem.tag" :type="subItem.tagType">{{ subItem.tag }}</el-tag>
              </div>
              <div class="time" v-if="subItem.desc">{{ subItem.desc }}</div>
              <div class="time" v-if="subItem.time">{{ subItem.time }}</div>
            </div>
          </div>
          <div class="list-action">
            <div class="a-item" v-for="(item, index) in actions" :key="index" @click="handleActionClick(item, index)">
              <div class="a-icon">
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
              </div>
              <div class="a-text">{{ item.text }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import type { ListOptions, ActionOptions, ListItem } from './types'
interface noticeListProps {
  // 列表内容
  list: ListOptions[]
  // 操作内容
  actions?: ActionOptions[]
}
const props = withDefaults(defineProps<noticeListProps>(), {
  list: () => [],
  actions: () => []
})

const emits = defineEmits(['itemClick', 'actionClick'])

// 列表点击
const handleItemClick = (item: ListItem, index: number) => {
  emits('itemClick', { item, index })
}

// 按钮点击
const handleActionClick = (item: ActionOptions, index: number) => {
  emits('actionClick', { item, index })
}
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 20px 12px;
  &:hover {
    background-color: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}

.list-action {
  line-height: 40px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .a-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #eee;
    cursor: pointer;
    &:first-child {
      border-left: 0;
    }
    .el-icon {
      vertical-align: -2px;
      margin-right: 4px;
    }
  }
}
</style>
