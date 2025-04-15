import { defineStore } from 'pinia'
import type { Activity } from '@/types/types'
import { fetchActivity } from '@/api/activity'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activity: [] as Activity[],
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
