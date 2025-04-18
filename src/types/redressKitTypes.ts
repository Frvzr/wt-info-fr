export interface RedressKits {
  id: string
  name: string
  descritpion: string
  level: string
  actual_revision: string
}

export interface RedressKitsConsist {
  id: string
  redress_kit: string
  description: string
  level: string
  revision: string
  quantity: number
}
