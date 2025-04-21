import { defineStore } from 'pinia'
import { fetchGroups } from '@/api/groupsApi'
import type { Group } from '@/types/referenceTypes'

export const useGroupStore = defineStore('groups', {
  state: () => ({
    groups: [] as Group[],
    currentGroup: null as Group | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async loadGroups() {
      this.loading = true
      this.error = null
      try {
        this.groups = await fetchGroups()
      } catch (err) {
         this.error = err instanceof Error ? err.message : 'Failed to load groups'
      } finally {
        this.loading = false
      }
   },
  },
})
