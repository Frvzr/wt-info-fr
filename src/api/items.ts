import type { Item } from '@/types/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/items/`)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке предметов')
  }
  const data = await response.json()
  console.log('Fetched items:', data)
  return data
}

export async function fetchItemById(id: number): Promise<Item> {
  const response = await fetch(`${API_BASE_URL}/items/${id}`)
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке предмета с ID ${id}`)
  }
  return await response.json()
}

export async function fetchItemWithCategory(): Promise<Item[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/items/full`)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке предметов с категориями')
  }
  return await response.json()
}
