import { defineStore } from 'pinia'
import {
  fetchItemsWithCategories,
  createItem,
  updateItem,
  fetchItemInfoById,
  fetchItemById,
} from '@/api/itemsApi'
import type { Item, ItemWithCategory, ItemCreate, ItemUpdate } from '@/types/itemsTypes'

export const useItemStore = defineStore('items', {
  state: () => ({
    items: [] as ItemWithCategory[],
    currentItem: null as ItemWithCategory | null,
    editedItem: null as Item | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadItems() {
      this.loading = true
      try {
        const data = await fetchItemsWithCategories()
        this.items = data
      } catch (error) {
        this.handleError(error, 'Failed to load items')
      } finally {
        this.loading = false
      }
    },

    async getItemInfoById(id: string) {
      this.loading = true
      try {
        const data = await fetchItemInfoById(id)
        this.currentItem = data
      } catch (error) {
        this.handleError(error, 'Failed to load items')
      } finally {
        this.loading = false
      }
    },

    async getItem(id: string) {
      this.loading = true
      try {
        const data = await fetchItemById(id)
        this.editedItem = data
      } catch (error) {
        this.handleError(error, 'Failed to load items')
      } finally {
        this.loading = false
      }
    },
    async createItem(itemData: ItemCreate) {
      this.loading = true
      try {
        const newItem = await createItem(itemData)
        this.items.push(newItem)
        return newItem
      } finally {
        this.loading = false
      }
    },

    async updateItem(id: string, itemData: ItemUpdate) {
      this.loading = true
      try {
        const updatedItem = await updateItem(id, itemData)

        this.editedItem = updatedItem

        return updatedItem
      } catch (error) {
        this.handleError(error, 'Failed to update item')
        throw error
      } finally {
        this.loading = false
      }
    },
    handleError(error: unknown, defaultMessage: string) {
      this.error = error instanceof Error ? error.message : defaultMessage
      console.error(error)
    },
  }
})
