<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useActivityStore } from '@/store/modules/activityStore'

const activityStore = useActivityStore()
const myRedress = computed(() => activityStore.activityByUser)

onMounted(() => activityStore.getRedressByUser('RU152'))

const headers = [
  { title: 'Complete', key: 'status' },
  { title: 'Checked Out On', key: 'completed_date' },
  { title: 'Saved On', key: 'assigned_date' },
  { title: 'Level', key: 'level' },
  { title: 'Part Number', key: 'Serial Number' },
]
</script>
<template>
  <v-data-table
    :headers="headers"
    :items="myRedress"
    density="compact"
    class="elevation-0"
  ></v-data-table>
</template>
<style scoped></style>
