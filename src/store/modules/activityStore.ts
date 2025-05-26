import { defineStore } from 'pinia'
import type { ActivityList, RedressActivity } from '@/types/activityTypes'
import { fetchActivity, fetchActivityByAsset, fetchActivityByUSer } from '@/api/activityApi'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activity: [] as ActivityList[],
    activityById: [] as RedressActivity[],
    activityByUser: [] as RedressActivity[],
    loading: false,
  }),
  actions: {
    async loadActivity() {
      try {
        this.loading = true
        this.activity = await fetchActivity()
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      } finally {
        this.loading = false
      }
    },

    async getRedressHistoryByAsset(id: string) {
      this.loading = true
      try {
        const activityById = await fetchActivityByAsset(id)
      } catch (error) {
        console.log('Ошибка при загрузке данных:', error)
      } finally {
        this.loading = false
      }
    },

    async getRedressByUser(id: string) {
      this.loading = true
      try {
        const activityByUser = await fetchActivityByUSer(id)
      } catch (error) {
        console.log('Ошибка при загрузке данных:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
