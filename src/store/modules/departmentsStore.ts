import { defineStore } from 'pinia'
import { fetchDepartments } from '@/api/departmentsApi'
import type { Department } from '@/types/referenceTypes'

export const useDepartmentStore = defineStore('departments', {
  state: () => ({
    departments: [] as Department[],
    currentDepartment: null as Department | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async loadDepartments() {
      this.loading = true
      this.error = null
      try {
        this.departments = await fetchDepartments()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load Departments'
      } finally {
        this.loading = false
      }
    },
  },
})
