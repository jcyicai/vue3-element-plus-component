<template>
  <div>
    <JcCalendar :events="events"></JcCalendar>
  </div>
</template>

<script lang="ts" setup>
import { EventItem } from '@/components/calendar/src/types.ts'

const events: EventItem[] = [
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
]
</script>

<style lang="scss" scoped></style>
