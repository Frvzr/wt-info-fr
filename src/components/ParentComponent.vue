<template>
  <GenericTable :items="tableData" :columns="columnsConfig" @refresh="loadData" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTableStore } from '@/store/tableStore'
import GenericTable from '@/components/Generic/genericTable.vue'
import type { ColumnConfig } from '@/types/types'

const tableStore = useTableStore()
const { data: tableData } = storeToRefs(tableStore)
console.log(tableData)

const columnsConfig: ColumnConfig[] = [
  { label: 'Name', field: 'item_name', filterable: true, type: 'text' },
  { label: 'Category', field: 'category_name', filterable: true, type: 'text' },
  { label: 'Description', field: 'item_description', filterable: true, type: 'text' },
  { label: 'Actions', field: 'actions', filterable: false },
]

const loadData = () => {
  tableStore.fetchData()
}

// Загружаем данные при монтировании
loadData()
</script>
