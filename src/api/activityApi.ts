import type { ActivityList } from '@/types/activityTypes'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchActivity(): Promise<ActivityList[]> {
  const response = await fetch(`${API_BASE_URL}/redress/history`)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных')
  }
  const data = await response.json()
  console.log('Fetched assets:', data)
  return data
}

export async function fetchActivityByAsset(id: string): Promise<ActivityList[]> {
  const response = await fetch(`${API_BASE_URL}/redress/history/${id}`)
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных с ID ${id}`)
  }
  return await response.json()
}
