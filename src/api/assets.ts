import type { Asset } from '@/types/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchAsset(): Promise<Asset[]> {
  const response = await fetch(`${API_BASE_URL}/assets`)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке предметов')
  }
  const data = await response.json()
  console.log('Fetched assets:', data)
  return data
}

export async function fetchItemById(id: number): Promise<Asset> {
  const response = await fetch(`${API_BASE_URL}/assets/${id}`)
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке предмета с ID ${id}`)
  }
  return await response.json()
}
