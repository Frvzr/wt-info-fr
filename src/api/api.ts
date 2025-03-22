import type { Item } from '@/types/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(`${API_BASE_URL}/items`)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке предметов')
  }
  const data = await response.json()
  console.log('Fetched items:', data)
  return data
}

export async function fetchItemById(id: number): Promise<Item> {
  const response = await fetch(`/api/items/${id}`)
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке предмета с ID ${id}`)
  }
  return await response.json()
}

export async function postServiceDetails(serviceDetails: string): Promise<void> {
  const response = await fetch('/api/service', {
    method: 'POST',
    body: JSON.stringify({ details: serviceDetails }),
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error('Ошибка при отправке данных обслуживания')
  }
}
