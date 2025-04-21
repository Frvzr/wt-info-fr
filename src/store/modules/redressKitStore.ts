import {defineStore} from 'pinia'
import {fetchRedressKits, fetchRedressKitConsistById, fetchRedressKitConsist} from '@/api/redressKitApi'
import type {RedressKit, RedressKitConsist, RedressKitConsistById} from '@/types/redressKitTypes'

const sessionStorageHelper = {
  get(key: string): any | null {
    try {
      const redressKit = sessionStorage.getRedressKit(key)
      return redressKit ? JSON.parse(redressKit) : null
    } catch (error) {
      console.error(`Error reading from sessionStorage (key: ${key}):`, error)
      this.remove(key)
      return null
    }
  },

  set(key: string, value: any): boolean {
    try {
      sessionStorage.setRedressKit(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing to sessionStorage (key: ${key}):`, error)

      // Попробуем освободить место, удаляя старые данные
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('Storage quota exceeded, attempting to free space...')
        this.clearMatchingKeys(key)

        // Повторная попытка после очистки
        try {
          sessionStorage.setRedressKit(key, JSON.stringify(value))
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
      sessionStorage.removeRedressKit(key)
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

export const useRedressKitStore = defineStore('redressKit', {
  state: () => ({
    redressKits: [] as RedressKit[],
    redressKitConsist: [] as RedressKitConsist[],
    redressKitConsistById: [] as RedressKitConsistById[],
    currentItem: null as RedressKit| null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async loadRedressKits() {
      this.loading = true
      this.error = null
      try {
        const data = await fetchRedressKits()
        this.redressKits = data
        sessionStorageHelper.set('items', this.redressKits)
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      }
      finally {
        this.loading = false
      }
    },
    async loadRedressKitConsist() {
      this.loading = true
      this.error = null
      try {
        const data= await fetchRedressKitConsist()
        this.redressKitConsist = data
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      }
      finally {
        this.loading = false
      }
    },
    async getRedressKitConsistById(id: string) {
          this.loading = true
          this.error = null

          try {
            // Сначала проверяем кешированные items
            const cachedItem = this.redressKits.find((redressKit) => redressKit.id === id)

            if (cachedItem) {
              this.currentItem = cachedItem
            } else {
              // Если нет в кеше, загружаем с сервера
              this.currentRedressKitConsist = await fetchRedressKitConsistById(id)

              // Обновляем кеш, если получили данные
              if (this.currentItem) {
                const updatedItems = [...this.redressKits.filter((redressKit) => redressKit.id !== id), this.currentItem]
                sessionStorageHelper.set('items', updatedItems)
              }
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to load redress kit'
            this.error = errorMessage
            console.error(`Error loading item ${id}:`, error)
          } finally {
            this.loading = false
          }
        },
        clearCache() {
          try {
            sessionStorageHelper.remove('items')
            this.redressKits = []
            console.log('Items cache cleared')
          } catch (error) {
            console.error('Error clearing cache:', error)
          }
        },
    },
  }
)
