import type { Category } from '@/types/referenceTypes'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/categories/`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  return await response.json()
}
