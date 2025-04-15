<template>
  <v-card>
    <v-data-table :items="items" :headers="headers" item-value="id" show-select>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>

            Item List
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Create"
            border
            @click="add"
          ></v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="medium-emphasis"
            icon="mdi-pencil"
            size="small"
            @click="edit(item.id)"
          ></v-icon>

          <v-icon
            color="medium-emphasis"
            icon="mdi-delete"
            size="small"
            @click="remove(item.id)"
          ></v-icon>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useItemsStore } from '@/store/modules/items'

const itemsStore = useItemsStore()
const items = computed(() => itemsStore.items)

const headers = [
  { title: 'Item No.', value: 'item' },
  { title: 'Description', value: 'item_description' },
  { title: 'Category', value: 'category' },
  { title: 'Group', value: 'group' },
  { title: 'Source', value: 'source' },
  { title: 'Operation', value: 'operation' },
  { title: 'Department', value: 'department' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]
onMounted(() => {
  itemsStore.loadItemsWithCategory()
})
</script>
