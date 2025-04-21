import type {RedressKit, RedressKitConsist} from '@/types/redressKitTypes'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_BASE__URL_ITEM_V1 = '/api/v1/redress-kits'

export const fetchRedressKits = async (): Promise<RedressKit[]> => {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}/`)
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных`)
  }
  const data = await response.json()
  return data
}

export const fetchRedressKitConsist = async (): Promise<RedressKitConsist[]> => {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}/consist/`)
  if (!response.ok) throw new Error('Item not found')
  return await response.json()
}

export const fetchRedressKitConsistById = async (id: string): Promise<RedressKitConsist> => {
  const response = await fetch(`${API_BASE_URL}${API_BASE__URL_ITEM_V1}/consist/${id}`)
  if (!response.ok) throw new Error('Item not found')
  return await response.json()
}
