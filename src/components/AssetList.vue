<template>
  <v-card>
    <v-data-table :items="assets" :headers="headers" item-value="id">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>
            Asset List
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Create" border @click="add"></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item="{ item }">
        <tr :class="`status-${item.status.toLowerCase()}`">
          <td>{{ item.serial_number }}</td>
          <td>{{ item.part_number }}</td>
          <td>{{ item.description }}</td>
          <td>
            <v-chip :color="getStatusColor(item.status)" small>
              {{ item.status }}
            </v-chip>
          </td>
          <td class="text-right">
            <div class="d-flex ga-2 justify-end">
              <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>
              <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAssetStore } from '@/store/modules/assets'

const assetsStore = useAssetStore()
const assets = computed(() => assetsStore.assets)

const headers = [
  { title: 'Serial number', value: 'serial_number' },
  { title: 'Part number', value: 'part_number' },
  { title: 'Description', value: 'description' },
  { title: 'Status', value: 'status' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'green': return 'success'
    case 'yellow': return 'warning'
    case 'red': return 'error'
    default: return 'grey'
  }
}

onMounted(() => {
  assetsStore.loadAsset()
})
</script>
