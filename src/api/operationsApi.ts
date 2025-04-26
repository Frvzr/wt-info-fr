import type { Operation } from '@/types/referenceTypes'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchOperations = async (): Promise<Operation[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/operations/`)
  if (!response.ok) {
    throw new Error('Failed to fetch operations')
  }
  return response.json()
}
