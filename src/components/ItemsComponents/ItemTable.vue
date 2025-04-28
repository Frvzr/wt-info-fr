<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useItemStore } from '@/store/modules/itemsStore'

const itemStore = useItemStore()

// Состояние сортировки
const sortBy = ref([{ key: 'name', order: 'asc' }])

// Загрузка данных при монтировании
onMounted(() => {
  itemStore.loadItems()
})

// Состояние поиска
const globalSearch = ref('')
const columnFilters = ref({
  name: '',
  description: '',
  category: '',
  group: '',
  source: '',
  operation: '',
  department: '',
})

// Заголовки таблицы
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

// Отфильтрованные элементы
const filteredItems = computed(() => {
  if (!itemStore.items) return []

  return itemStore.items.filter((item) => {
    // Глобальный поиск
    if (globalSearch.value) {
      const searchTerm = globalSearch.value.toLowerCase()
      if (
        !Object.values(item).some((val) => val && val.toString().toLowerCase().includes(searchTerm))
      ) {
        return false
      }
    }

    // Фильтрация по столбцам
    for (const [key, value] of Object.entries(columnFilters.value)) {
      if (value) {
        const itemValue = item[key as keyof typeof item] || ''
        if (!itemValue.toString().toLowerCase().includes(value.toLowerCase())) {
          return false
        }
      }
    }

    return true
  })
})

// Данные для отображения (без преобразования null в '—' для корректной сортировки)
const displayItems = computed(() => {
  return filteredItems.value
})
</script>

<template>
  <div class="items-container">
    <!-- Общий поиск -->
    <v-text-field v-model="globalSearch" label="Global Search" prepend-inner-icon="mdi-magnify" variant="outlined" clearable class="mb-4" />

    <!-- Таблица с правильной сортировкой -->
    <v-data-table :headers="headers" :items="displayItems" v-model:sort-by="sortBy" :loading="itemStore.loading" item-key="id" class="elevation-1">
      <!-- Шаблон для заголовков -->
      <template v-slot:header="{ header }">
        <th>
          <div class="header-content">
            <span>{{ header.title }}</span>
            <v-text-field v-if="header.key !== 'actions'" v-model="columnFilters[header.key]" :placeholder="`Filter ${header.title}`" variant="underlined" density="compact" hide-details clearable class="filter-field" />
          </div>
        </th>
      </template>

      <!-- Отображение данных с обработкой null -->
      <template v-slot:item="{ item }">
        <tr>
          <td><strong>{{ item.name || '—' }}</strong></td>
          <td>{{ item.description || '—' }}</td>
          <td>{{ item.category || '—' }}</td>
          <td>{{ item.group || '—' }}</td>
          <td>{{ item.source || '—' }}</td>
          <td>{{ item.operation || '—' }}</td>
          <td>{{ item.department || '—' }}</td>
          <td>
            <v-btn icon="mdi-eye" variant="text" color="info" :to="`/items/${item.id}`" />
            <v-btn icon="mdi-pencil" variant="text" color="warning" :to="`/items/${item.id}/edit`" class="ml-2" />
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
