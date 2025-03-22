import { defineStore } from 'pinia'
import type { TableItem, FilterCondition } from '@/types/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface TableState {
  data: TableItem[]
  columnFilters: Record<string, FilterCondition[]>
}

export const useTableStore = defineStore('table', {
  state: (): TableState => ({
    data: [],
    columnFilters: {},
  }),
  actions: {
    async fetchData() {
      // Пример загрузки данных из API
      this.data = await fetch(`${API_BASE_URL}/itemscat`).then((res) => res.json())
    },
    setColumnFilter(field: string, filters: FilterCondition[]) {
      this.columnFilters[field] = filters
    },
  },
})
