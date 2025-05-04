<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useItemStore } from '@/store/modules/itemsStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const itemStore = useItemStore()
const deleteDialog = ref(false)
const itemToDelete = ref<string | null>(null)

onMounted(() => itemStore.loadItems())

const globalSearch = ref('')
const selectedFilters = ref<Record<string, string[]>>({
  name: [],
  description: [],
  category: [],
  group: [],
  source: [],
  operation: [],
  department: [],
})

const headers = [
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Description', key: 'description', sortable: true },
  { title: 'Category', key: 'category', sortable: true },
  { title: 'Group', key: 'group', sortable: true },
  { title: 'Source', key: 'source', sortable: true },
  { title: 'Operation', key: 'operation', sortable: true },
  { title: 'Department', key: 'department', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false },
]

const itemData = computed(() => {
  return itemStore.items?.map(item => {
    return headers.reduce((acc, header) => {
      acc[header.key] = String(item[header.key as keyof typeof item] || '')
      return acc
    }, {} as Record<string, string>)
  }) || []
})

const getFilteredOptions = (columnKey: string) => {
  if (!itemData.value.length) return []

  const filteredData = itemData.value.filter(item => {
    for (const [key, values] of Object.entries(selectedFilters.value)) {
      if (key !== columnKey && values.length > 0 && !values.includes(item[key])) {
        return false
      }
    }
    return true
  })

  const uniqueValues = new Set<string>()
  for (const item of filteredData) {
    if (item[columnKey]) uniqueValues.add(item[columnKey])
  }

  return Array.from(uniqueValues).sort()
}

watch(selectedFilters, (newVal, oldVal) => {
  const changedKey = Object.keys(newVal).find(
    key => JSON.stringify(newVal[key]) !== JSON.stringify(oldVal[key])
  )
  if (changedKey) {
    Object.keys(selectedFilters.value).forEach(key => {
      if (key !== changedKey) {
        selectedFilters.value[key] = []
      }
    })
  }
}, { deep: true })

const filteredItems = computed(() => {
  if (!itemStore.items) return []

  return itemStore.items.filter(item => {
    if (globalSearch.value) {
      const searchTerm = globalSearch.value.toLowerCase()
      if (!Object.values(item).some(val =>
        val && String(val).toLowerCase().includes(searchTerm))
      ) return false
    }

    return Object.entries(selectedFilters.value).every(([key, values]) =>
      values.length === 0 ||
      values.includes(String(item[key as keyof typeof item] || ''))
    )
  })
})


const confirmDelete = (id: string) => {
  itemToDelete.value = id
  deleteDialog.value = true
}

const executeDelete = async () => {
  if (!itemToDelete.value) return

  try {
    await itemStore.deleteItem(itemToDelete.value)
    deleteDialog.value = false
  } catch (error) {
    console.error('Delete error:', error)
  }
}

const goToDetail = (itemId: string) => {
  router.push(`/items/${itemId}`)
}

</script>

<template>
  <div class="container">
    <div class="controls">
      <v-text-field v-model="globalSearch" label="Global Search" prepend-inner-icon="mdi-magnify" variant="outlined" clearable class="search-field" />

      <div class="filters">
        <v-autocomplete v-for="header in headers.filter(h => h.key !== 'actions')" :key="header.key" v-model="selectedFilters[header.key]" :items="getFilteredOptions(header.key)" :label="header.title" multiple chips clearable variant="outlined" density="comfortable" :menu-props="{ maxHeight: 400, contentClass: 'fast-menu' }" class="filter" @update:modelValue="() => { }" />
      </div>
    </div>

    <v-data-table :headers="headers" :items="filteredItems" item-value="id" class="data-table">
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="header in headers.filter(h => h.key !== 'actions')" :key="header.key" @click="goToDetail(item.id)" class="clickable-cell">
            {{ item[header.key] || '—' }}
          </td>
          <td class="actions">
            <v-btn icon="mdi-delete" variant="text" color="grey-darken-2" @click="confirmDelete(item.id)" />
            <v-btn icon="mdi-pencil" variant="text" color="grey-darken-1" :to="`/items/${item.id}/edit`" class="ml-2" />
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirm deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this item?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="executeDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
}

.controls {
  margin-bottom: 16px;
}

.search-field {
  margin-bottom: 16px;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .filters {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

.filter {
  min-width: 200px;
  flex: 1;
}

.data-table {
  margin-top: 16px;
}

.clickable-cell {
  cursor: pointer;
}

.clickable-cell:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.actions {
  white-space: nowrap;
}
</style>
