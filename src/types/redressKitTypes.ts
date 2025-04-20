export interface RedressKit {
  id: string
  name: string
  descritpion?: string | null
  level: string
  actual_revision: string
}

export interface RedressKitConsist {
  id: string
  redress_kit: string
  desc_redress_kit?: string | null
  item: string
  desc_item?: string | null
  revision: string
  quantity: number
}

export interface RedressKitConsistById {
  id: string
  item: string
  desc_item?: string | null
  revision: string
  quantity: number
}
