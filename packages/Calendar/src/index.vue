<template>
  <FullCalendar ref="calendar" :options="calendarOptions">
    <template #eventContent="arg">
      <slot name="eventContent" :arg="arg"></slot>
    </template>
  </FullCalendar>
</template>

<script lang="ts" setup>
import FullCalendar from '@fullcalendar/vue3'
import type { Calendar, EventClickArg, EventContentArg } from '@fullcalendar/core'
import daygrid from '@fullcalendar/daygrid'
import interaction, { type DateClickArg } from '@fullcalendar/interaction'
import zhCnLocale from '@fullcalendar/core/locales/zh-cn'
import type { EventItem } from './types'
import { onMounted, ref, computed } from 'vue'

interface calendarProps {
  // 语言
  locale?: string
  // 视图模式
  initialView?: string
  // 按钮文字
  buttonText?: object
  // 头部配置
  headerToolbar?: object
  // 底部工具栏
  footerToolbar?: object
  // 事件源
  events?: EventItem[]
  // 日历显示结束时间  日程 就会显示 开始-结束 时间
  displayEventEnd?: boolean
}

const props = withDefaults(defineProps<calendarProps>(), {
  local: 'zh-cn',
  initialView: 'dayGridMonth',
  buttonText: () => {
    return {
      today: '今天',
      month: '月',
      week: '周',
      day: '日',
      prevYear: '上一年',
      nextYear: '下一年',
      prev: '上一月',
      next: '下一月'
    }
  },
  headerToolbar: () => {
    return {
      start: 'title',
      center: '',
      end: 'prev today next'
    }
  },
  footerToolbar: () => {
    return {}
  },
  events: () => [],
  displayEventEnd: false
})

// 分发事件
const emits = defineEmits(['dateClick', 'eventClick'])

// 日历实例
const calendar = ref<Calendar>()
// 日历配置
const calendarOptions: any = computed(() => {
  return {
    plugins: [daygrid, interaction],
    locales: [zhCnLocale],
    locale: props.locale,
    initialView: props.initialView,
    buttonText: props.buttonText,
    headerToolbar: props.headerToolbar,
    footerToolbar: props.footerToolbar,
    /* eventSources: [
    {
      // 渲染日历的事件
      //events: props.events,
      events(e, callback) {
        if (props.events.length) callback(props.events)
        else callback([])
      },
    },
  ], */
    events: props.events,
    // 点击日历的某一天
    dateClick(info: DateClickArg) {
      emits('dateClick', info)
    },
    // 信息块点击
    eventClick(info: EventClickArg) {
      emits('eventClick', info)
    },
    displayEventEnd: props.displayEventEnd,
    eventContent(arg: EventContentArg) {
      console.log(arg)
    }
  }
})

/* 渲染日历
const renderCalendar = () => {
  const el = document.getElementById('calendar')
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygrid, interaction],
      local: props.local,
      initialView: props.initialView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
    })

    calendar.value.render()
  }
} */

onMounted(() => {
  //renderCalendar()
})
</script>
