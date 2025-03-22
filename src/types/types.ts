export interface Item {
  id: number
  name: string
  description: string
  category: string
}

export interface ServiceDetails {
  details: string
}

export interface TableItem {
  id: string | number
  [key: string]: unknown
}

export interface ColumnConfig {
  label: string
  field: string
  filterable?: boolean
  type?: 'text' | 'number' | 'date'
}

export type OperatorType = 'contains' | 'equals' | 'gt' | 'lt'

export interface FilterCondition {
  operator: OperatorType
  value: string
}
