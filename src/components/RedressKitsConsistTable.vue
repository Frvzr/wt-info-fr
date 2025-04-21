<template>
  <v-data-table :group-by="groupBy" :headers="headers" :items="redressKitsConsist" item-value="item" hide-default-footer>
    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
      <tr>
        <td :colspan="columns.length">
          <div class="d-flex align-center">
            <v-btn :icon="isGroupOpen(item) ? '$expand' : '$next'" color="medium-emphasis" density="comfortable" size="small" variant="outlined" @click="toggleGroup(item)"></v-btn>

            <span class="ms-4">{{ item.value }}</span>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRedressKitStore } from '@/store/modules/redressKitStore'

const groupBy = [{ key: 'redress_kit', order: 'asc' }, { key: 'revision', order: 'asc' }]
const redressKitStore = useRedressKitStore()
const redressKitsConsist = computed(() => redressKitStore.redressKitConsist)

const headers = [
  { title: 'item', value: 'item' },
  { title: 'quantity', value: 'quantity' },
  { title: 'revision', value: 'revision' },
]
onMounted(() => {
  redressKitStore.loadRedressKitConsist()
})
</script>
