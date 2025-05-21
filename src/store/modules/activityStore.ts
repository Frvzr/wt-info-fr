import { defineStore } from 'pinia'
import type { ActivityList } from '@/types/activityTypes'
import { fetchActivity } from '@/api/activityApi'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activity: [] as ActivityList[],
  }),
  actions: {
    async loadActivity() {
      try {
        this.activity = await fetchActivity()
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      }
    },
  },
})
