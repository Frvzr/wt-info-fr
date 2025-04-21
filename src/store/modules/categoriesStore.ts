import { defineStore } from 'pinia'
import { fetchCategories } from '@/api/categoriesApi'
import type { Category } from '@/types/referenceTypes'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[],
    currentCategory: null as Category | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadCategories() {
      this.loading = true
      this.error = null
      try {
        this.categories = await fetchCategories()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load categories'
      } finally {
        this.loading = false
      }
    },
  },
})
