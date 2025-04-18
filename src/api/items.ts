import type { Item, ItemWithCategory, ItemCreate, ItemUpdate } from '@/types/items'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_BASE__URL_ITEM_V1 = '/api/v1/items/'

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}`)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке предметов')
  }
  const data = await response.json()
  return data
}

export async function fetchItemById(id: number): Promise<Item> {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}${id}`)
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке предмета с ID ${id}`)
  }
  return await response.json()
}

export const fetchItemsWithCategories = async (): Promise<ItemWithCategory[]> => {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}full/`)
  if (!response.ok) throw new Error('Failed to fetch items with categories')
  const data = await response.json()
  return data
}

export const fetchItem = async (id: string): Promise<Item> => {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}${id}`)
  if (!response.ok) throw new Error('Item not found')
  return await response.json()
}

export const createItem = async (item: ItemCreate): Promise<Item> => {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
  if (!response.ok) throw new Error('Failed to create item')
  return await response.json()
}

export const updateItem = async (id: string, item: ItemUpdate): Promise<Item> => {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
  if (!response.ok) throw new Error('Failed to update item')
  return await response.json()
}

export const patchItem = async (id: string, item: Partial<ItemUpdate>): Promise<Item> => {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
  if (!response.ok) throw new Error('Failed to patch item')
  return await response.json()
}
