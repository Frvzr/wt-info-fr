import { defineStore } from 'pinia'
import { fetchOperations } from '@/api/operationsApi'
import type { Operation } from '@/types/referenceTypes'

export const useOperationStore = defineStore('operations', {
  state: () => ({
    operations: [] as Operation[],
    currentOperation: null as Operation | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async loadOperations() {
      this.loading = true
      this.error = null
      try {
        this.operations = await fetchOperations()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load Operation'
      } finally {
        this.loading = false
      }
    },
  },
})
