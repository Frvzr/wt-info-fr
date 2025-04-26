import { defineStore } from 'pinia'
import { fetchSource } from '@/api/sourceApi'
import type { Source } from '@/types/referenceTypes'

export const useSourceStore = defineStore('sources', {
  state: () => ({
    sources: [] as Source[],
    currentSource: null as Source | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async loadSources() {
      this.loading = true
      this.error = null
      try {
        this.sources = await fetchSource()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load sources'
      } finally {
        this.loading = false
      }
    },
  },
})
