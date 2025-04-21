import { defineStore } from 'pinia'
import {
  fetchItems,
  fetchItemsWithCategories,
  fetchItem,
  createItem,
  updateItem,
  patchItem,
} from '@/api/items'
import type { Item, ItemWithCategory, ItemCreate, ItemUpdate } from '@/types/items'

// Вспомогательные функции для работы с sessionStorage
const sessionStorageHelper = {
  get(key: string): any | null {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error reading from sessionStorage (key: ${key}):`, error)
      this.remove(key)
      return null
    }
  },

  set(key: string, value: any): boolean {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing to sessionStorage (key: ${key}):`, error)

      // Попробуем освободить место, удаляя старые данные
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('Storage quota exceeded, attempting to free space...')
        this.clearMatchingKeys(key)

        // Повторная попытка после очистки
        try {
          sessionStorage.setItem(key, JSON.stringify(value))
          return true
        } catch (e) {
          console.error('Failed after storage cleanup:', e)
          return false
        }
      }

      return false
    }
  },

  remove(key: string): void {
    try {
      sessionStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing from sessionStorage (key: ${key}):`, error)
    }
  },

  clearMatchingKeys(prefix: string): void {
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => this.remove(k))
  },
}

export const useItemStore = defineStore('items', {
  state: () => ({
    items: [] as ItemWithCategory[],
    currentItem: null as Item | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadItems() {
      this.loading = true
      this.error = null

      try {
        const data = await fetchItemsWithCategories()
        this.items = data
        sessionStorageHelper.set('items', this.items)
      } catch (error) {
        this.error = 'Failed to load items'
        console.error('Error loading items:', error)
      } finally {
        this.loading = false
      }
    },

    async getItem(id: string) {
      this.loading = true
      this.error = null

      try {
        // Сначала проверяем кешированные items
        const cachedItem = this.items.find((item) => item.id === id)

        if (cachedItem) {
          this.currentItem = cachedItem
        } else {
          // Если нет в кеше, загружаем с сервера
          this.currentItem = await fetchItem(id)

          // Обновляем кеш, если получили данные
          if (this.currentItem) {
            const updatedItems = [...this.items.filter((item) => item.id !== id), this.currentItem]
            sessionStorageHelper.set('items', updatedItems)
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load item'
        this.error = errorMessage
        console.error(`Error loading item ${id}:`, error)
      } finally {
        this.loading = false
      }
    },

    async createItem(itemData: any) {
      this.loading = true
      try {
        const response = await fetch('/api/v1/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData),
        })

        if (!response.ok) throw new Error('Failed to create item')

        const newItem = await response.json()
        this.items.push(newItem)
        return newItem
      } finally {
        this.loading = false
      }
    },

    async updateItem(id: string, itemData: any) {
      this.loading = true
      try {
        const response = await fetch(`/api/v1/items/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData),
        })

        if (!response.ok) throw new Error('Failed to update item')

        const updatedItem = await response.json()
        const index = this.items.findIndex((item) => item.id === id)
        if (index !== -1) {
          this.items[index] = updatedItem
        }
        return updatedItem
      } finally {
        this.loading = false
      }
    },

    clearCache() {
      try {
        sessionStorageHelper.remove('items')
        this.items = []
        console.log('Items cache cleared')
      } catch (error) {
        console.error('Error clearing cache:', error)
      }
    },
  },

  getters: {
    // Геттер для фильтрации
    filteredItems: (state) => {
      return (search: string, filters: Record<string, string>) => {
        let result = [...state.items]

        // Глобальный поиск
        if (search) {
          const searchLower = search.toLowerCase()
          result = result.filter((item) =>
            Object.values(item).some(
              (val) => val && val.toString().toLowerCase().includes(searchLower),
            ),
          )
        }

        // Фильтрация по столбцам
        for (const [key, value] of Object.entries(filters)) {
          if (value) {
            const valueLower = value.toLowerCase()
            result = result.filter((item) => {
              const itemValue = item[key as keyof ItemWithCategory]
              return itemValue && String(itemValue).toLowerCase().includes(valueLower)
            })
          }
        }

        return result
      }
    },
  },
})
