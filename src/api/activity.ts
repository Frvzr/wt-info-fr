import type { Activity } from '@/types/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchActivity(): Promise<Activity[]> {
  const response = await fetch(`${API_BASE_URL}/activity`)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных')
  }
  const data = await response.json()
  console.log('Fetched assets:', data)
  return data
}

export async function fetchActivityById(id: string): Promise<Activity> {
  const response = await fetch(`${API_BASE_URL}/activity/${id}`)
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных с ID ${id}`)
  }
  return await response.json()
}
