const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchCategories = async (): Promise<Array<{ id: string; name: string }>> => {
  const response = await fetch('/api/v1/categories')
  if (!response.ok) throw new Error('Failed to fetch categories')
  return await response.json()
}
