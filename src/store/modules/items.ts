import { defineStore } from 'pinia'
import type { Item } from '@/types/types'
import { fetchItems, fetchItemWithCategory } from '@/api/items'

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as Item[],
  }),
  actions: {
    async loadItems() {
      try {
        this.items = await fetchItems()
      } catch (error) {
        console.error('Ошибка при загрузке предметов:', error)
      }
    },
    async loadItemsWithCategory() {
      try {
        this.items = await fetchItemWithCategory()
      } catch (error) {
        console.error('Ошибка при загрузке предметов:', error)
      }
    },
  },
})
