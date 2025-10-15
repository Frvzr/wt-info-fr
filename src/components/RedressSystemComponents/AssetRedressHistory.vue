<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useActivityStore } from '@/store/modules/activityStore'

const activityStore = useActivityStore()
const redressHistory = computed(() => activityStore.activityById)

onMounted(() => activityStore.getRedressHistoryByAsset('06ad3622-0837-4d22-8f7e-c57663a5de55'))

const headers = [
  { title: 'Complete', key: 'status' },
  { title: 'Saved On', key: 'assigned_date' },
  { title: 'Checked Out On', key: 'completed_date' },
  { title: 'Checked Out By', key: 'completed_to' },
  { title: 'Level', key: 'level' },
]
</script>
<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="redressHistory"
      density="compact"
      class="elevation-0"
      hide-default-footer
    ></v-data-table>
  </div>
</template>
<style scoped></style>
