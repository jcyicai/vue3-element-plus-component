<template>
  <FullCalendar ref="calendar" :options="calendarOptions"></FullCalendar>
</template>

<script lang="ts" setup>
import FullCalendar from '@fullcalendar/vue3'
//import { EventClickArg, EventContentArg } from '@fullcalendar/core'
import daygrid from '@fullcalendar/daygrid'
import interaction, { DateClickArg } from '@fullcalendar/interaction'
import zhCnLocale from '@fullcalendar/core/locales/zh-cn'
import { EventItem } from './types.ts'
import { onMounted, ref } from 'vue'

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
      next: '下一月',
    }
  },
  headerToolbar: () => {
    return {
      start: 'title',
      center: '',
      end: 'prev today next',
    }
  },
  footerToolbar: () => {},
  events: () => [],
})

const emits = defineEmits(['date-click'])

// 日历实例
const calendar = ref<Calendar>()
// 日历配置
const calendarOptions = ref<any>({
  plugins: [daygrid, interaction],
  locales: [zhCnLocale],
  locale: props.locale,
  initialView: props.initialView,
  buttonText: props.buttonText,
  headerToolbar: props.headerToolbar,
  footerToolbar: props.footerToolbar,
  eventSources: [
    {
      // 渲染日历的事件
      //events: props.events,
      events(e, callback) {
        if (props.events.length) callback(props.events)
        else callback([])
      },
    },
  ],
  // 点击日历的某一天
  dateClick(info: DateClickArg) {
    console.log(info)
    emits('date-click', info)
  },
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

<style lang="scss" scoped></style>
