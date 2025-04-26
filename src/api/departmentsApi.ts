import type { Department } from '@/types/referenceTypes'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchDepartments = async (): Promise<Department[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/departments/`)
  if (!response.ok) {
    throw new Error('Failed to fetch departments')
  }
  return response.json()
}
