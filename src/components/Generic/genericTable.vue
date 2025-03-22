<template>
  <div>
    <v-text-field v-model="searchText" label="Global Search" class="mb-4" clearable></v-text-field>

    <v-data-table
      :headers="processedHeaders"
      :items="filteredItems"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      multi-sort
      :items-per-page="10"
      class="elevation-1"
    >
      <template
        v-for="header in processedHeaders"
        #[`header.${header.value}`]="{ header: vuetifyHeader }"
      >
        <div v-if="vuetifyHeader" class="d-flex flex-column">
          <span>{{ vuetifyHeader.title }}</span>
          <ColumnFilter
            v-if="header.filterable"
            :type="header.type"
            @update-filter="(value) => updateFilter(header.value, value)"
          />
        </div>
      </template>

      <template #[`item.name`]="{ item }">
        <router-link :to="`/detail/${item.id}`">{{ item.name }}</router-link>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTableStore } from '@/store/tableStore'
import ColumnFilter from '@/components/Generic/ColumnFilter.vue'
import type { FilterCondition, ColumnConfig, TableItem } from '@/types/types'

interface Props {
  items: TableItem[]
  columns: ColumnConfig[]
}
const props = defineProps<Props>()

interface ProcessedHeader {
  title: string
  value: string
  filterable?: boolean
  type?: 'text' | 'number' | 'date'
}

const emit = defineEmits(['refresh'])

const router = useRouter()
const tableStore = useTableStore()
const { columnFilters } = storeToRefs(tableStore)

const searchText = ref<string>('')
const sortBy = ref<string[]>([])
const sortDesc = ref<boolean[]>([])

const processedHeaders = computed<ProcessedHeader[]>(() =>
  props.columns
    .filter((col) => col?.field) // Фильтруем некорректные колонки
    .map((col) => ({
      title: col.label || col.field, // Используем field как fallback
      value: col.field,
      filterable: col.filterable,
      type: col.type,
    })),
)

const filteredItems = computed(() => {
  return props.items.filter((item) => {
    const searchMatch =
      !searchText.value ||
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchText.value.toLowerCase()),
      )

    const columnMatch = Object.entries(columnFilters.value).every(([field, conditions]) =>
      applyColumnFilter(
        item[field],
        conditions,
        props.columns.find((c) => c.field === field)?.type,
      ),
    )

    return searchMatch && columnMatch
  })
})

function applyColumnFilter(
  value: unknown,
  conditions: FilterCondition[],
  type?: ColumnConfig['type'],
): boolean {
  return conditions.every((condition) => {
    const strValue = String(value)
    const numValue = Number(value)
    const conditionValue = type === 'number' ? Number(condition.value) : condition.value

    switch (condition.operator) {
      case 'contains':
        return strValue.includes(condition.value)
      case 'equals':
        return type === 'number' ? numValue === conditionValue : strValue === condition.value
      case 'gt':
        return numValue > conditionValue
      case 'lt':
        return numValue < conditionValue
      default:
        return true
    }
  })
}

function updateFilter(field: string, filters: FilterCondition[]) {
  tableStore.setColumnFilter(field, filters)
}
</script>
