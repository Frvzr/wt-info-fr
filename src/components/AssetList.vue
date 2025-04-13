<template>
  <v-card>
    <v-data-table :items="assets" :headers="headers" item-value="id" show-select>
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
      <template v-slot:[`asset.actions`]="{ asset }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(asset.id)"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(asset.id)"></v-icon>
        </div>
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
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]
onMounted(() => {
  assetsStore.loadAsset()
})
</script>
