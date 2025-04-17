<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon> &nbsp;
      Item List
      <v-spacer></v-spacer>
      <v-text-field v-model="globalSearch" density="compact" label="Search" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>

    <v-data-table :items="filteredItems" :headers="processedHeaders" item-value="id" show-select items-per-page="25" fixed-header multi-sort>
      <!-- Кастомный заголовок с кнопкой фильтра -->
      <template v-slot:header="{ header }">
        <th v-if="header.key === 'data-table-select'">
          <!-- Индикатор фильтров -->
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" :color="hasActiveFilters ? 'primary' : 'medium-emphasis'" icon="mdi-filter" size="small"></v-icon>
            </template>
            <span>Active filters: {{ activeFilterCount }}</span>
          </v-tooltip>
        </th>
        <th v-else>
          <div class="d-flex align-center">
            {{ header.title }}

            <!-- Кнопка фильтра (только для сортируемых столбцов) -->
            <v-btn v-if="header.sortable" icon variant="text" size="x-small" @click.stop="openFilterDialog(header)" class="ml-1">
              <v-icon :color="columnFilters[header.key]?.length ? 'primary' : 'medium-emphasis'" size="small">
                mdi-filter
              </v-icon>
            </v-btn>
          </div>
        </th>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-btn class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Create" border @click="add"></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>
          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
        </div>
      </template>
    </v-data-table>

    <!-- Filter Dialog -->
    <v-dialog v-model="filterDialog" max-width="500">
      <v-card>
        <v-card-title>Filter by {{ currentFilterTitle }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="filterSearch" density="compact" label="Search in filters" prepend-inner-icon="mdi-magnify" variant="outlined" class="mb-4" @input="updateFilteredOptions"></v-text-field>

          <v-virtual-scroll :items="filteredOptions" height="300" item-height="50">
            <template v-slot:default="{ item }">
              <v-checkbox v-model="selectedFilters" :label="item" :value="item" density="comfortable" hide-details></v-checkbox>
            </template>
          </v-virtual-scroll>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="selectAll">Select All</v-btn>
          <v-btn variant="text" @click="clearSelection">Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="applyFilters">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useItemStore } from '@/store/modules/items'

const globalSearch = ref('')
const itemsStore = useItemStore()
const items = computed(() => itemsStore.items)

const headers = [
  { title: 'Item No.', key: 'item', sortable: true },
  { title: 'Description', key: 'item_description', sortable: true },
  { title: 'Category', key: 'category', sortable: true },
  { title: 'Group', key: 'group', sortable: true },
  { title: 'Source', key: 'source', sortable: true },
  { title: 'Operation', key: 'operation', sortable: true },
  { title: 'Department', key: 'department', sortable: true },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

// Фильтрация
const filterDialog = ref(false)
const currentFilterKey = ref('')
const currentFilterTitle = ref('')
const selectedFilters = ref<string[]>([])
const filterSearch = ref('')
const columnFilters = ref<Record<string, string[]>>({})
const filteredOptions = ref<string[]>([])

const processedHeaders = computed(() => {
  return headers.map(header => ({
    ...header,
    class: columnFilters.value[header.key]?.length ? 'active-filter-column' : ''
  }))
})

const openFilterDialog = (header: any) => {
  if (!header.sortable) return

  currentFilterKey.value = header.key
  currentFilterTitle.value = header.title
  selectedFilters.value = columnFilters.value[header.key] || []
  filterSearch.value = ''
  updateFilteredOptions()
  filterDialog.value = true
}

const updateFilteredOptions = () => {
  const options = getUniqueValuesForColumn(currentFilterKey.value)

  if (!filterSearch.value) {
    filteredOptions.value = options
    return
  }

  filteredOptions.value = options.filter(option =>
    option.toLowerCase().includes(filterSearch.value.toLowerCase())
  )
}

const getUniqueValuesForColumn = (columnKey: string) => {
  const uniqueValues = new Set<string>()
  items.value.forEach(item => {
    const value = item[columnKey]
    if (value !== undefined && value !== null) {
      uniqueValues.add(String(value))
    }
  })
  return Array.from(uniqueValues).sort()
}

const applyFilters = () => {
  if (selectedFilters.value.length > 0) {
    columnFilters.value = {
      ...columnFilters.value,
      [currentFilterKey.value]: selectedFilters.value
    }
  } else {
    const { [currentFilterKey.value]: _, ...rest } = columnFilters.value
    columnFilters.value = rest
  }
  filterDialog.value = false
}

const selectAll = () => {
  selectedFilters.value = [...filteredOptions.value]
}

const clearSelection = () => {
  selectedFilters.value = []
}

const hasActiveFilters = computed(() => {
  return Object.keys(columnFilters.value).length > 0
})

const activeFilterCount = computed(() => {
  return Object.values(columnFilters.value).reduce((acc, curr) => acc + curr.length, 0)
})

// Комбинированная фильтрация
const filteredItems = computed(() => {
  let result = items.value

  // Применяем глобальный поиск
  if (globalSearch.value) {
    const searchTerm = globalSearch.value.toLowerCase()
    result = result.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm)
      )
    )
  }

  // Применяем фильтры по столбцам
  if (hasActiveFilters.value) {
    result = result.filter(item => {
      return Object.entries(columnFilters.value).every(([key, values]) => {
        if (!values || values.length === 0) return true
        return values.includes(String(item[key]))
      })
    })
  }

  return result
})

onMounted(() => {
  itemsStore.fetchItemsWithCategories()
})

// Методы для CRUD операций
const add = () => {
  // Реализация добавления
}

const edit = (id: string) => {
  // Реализация редактирования
}

const remove = (id: string) => {
  // Реализация удаления
}
</script>

<style>
.active-filter-column {
  background-color: rgba(25, 118, 210, 0.08);
}
</style>
