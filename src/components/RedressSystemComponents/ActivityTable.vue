<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useActivityStore } from '@/store/modules/activityStore'

const activityStore = useActivityStore()
const activity = computed(() => activityStore.activity)

onMounted(() => activityStore.loadActivity())

const headers = [
  { title: 'Serial Number', key: 'serial_number', sortable: true },
  { title: 'Part Number', key: 'part_number', sortable: true },
  { title: 'Service type', key: 'level', sortable: true },
  { title: 'Tag aasigned', key: 'tag', sortable: true },
  { title: 'Alias', key: 'completed_to', sortable: true },
  { title: 'Date', key: 'completed_date', sortable: true },
  { title: 'Top Level', key: 'top_tool', sortable: true },
  { title: 'Location', key: 'location', sortable: true },
]
</script>

<template>
  <div>
    <v-data-table :headers="headers" :items="activity"> </v-data-table>
  </div>
</template>

<style></style>
