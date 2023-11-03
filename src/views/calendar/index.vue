<template>
  <div>
    <JcCalendar
      :events="events"
      displayEventEnd
      @dateClick="handleDateClick"
      @eventClick="handleEventClick"
    >
      <template #eventContent="{ arg }">
        <div v-html="renderEventContent(arg)"></div>
      </template>
    </JcCalendar>
  </div>
</template>

<script lang="ts" setup>
import { EventItem } from '@/components/Calendar/src/types'
import { DateClickArg } from '@fullcalendar/interaction'
import { EventClickArg, EventContentArg } from '@fullcalendar/core'
import { ref } from 'vue'

const events = ref<EventItem[]>([
  {
    title: '购物',
    start: '2023-11-11 08:00',
    end: '2023-11-11 12:00',
    editable: true,
  },
  {
    title: '代码',
    start: '2023-11-12 10:00',
    end: '2023-11-12 16:00',
  },
])

// 日期点击
const handleDateClick = (info: DateClickArg) => {
  events.value.push({
    start: info.dateStr + ' 12:00',
    end: info.dateStr + ' 18:00',
    title: '学习',
  })
}

// 日程事件点击
const handleEventClick = (info: EventClickArg) => {
  //console.log(info)
}

// 日程内容自定义
const renderEventContent = (arg: EventContentArg) => {
  const timeTextArr = arg.timeText.split(' - ')
  const start = timeTextArr[0].replace('上午', '').replace('下午', '').replace('时', '')
  const end = timeTextArr[1].replace('上午', '').replace('下午', '').replace('时', '')
  return `
         <img src="src/assets/logo.png" style="width:20px;height:20px;">
         <div>开始时间: ${start}</div>
         <div>结束时间: ${end}</div>
         <div>标题: ${arg.event._def.title}</div>
        `
}
</script>

<style lang="scss" scoped></style>
