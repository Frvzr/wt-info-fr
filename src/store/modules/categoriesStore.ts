import { defineStore } from 'pinia'
import { fetchCategories } from '@/api/categoryService'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as Array<{ id: string; name: string }>,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadCategories() {
      this.loading = true
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
