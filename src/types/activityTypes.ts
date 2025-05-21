export interface ActivityList {
  id: string
  serial_number: string
  part_number: string
  level: string
  tag: string | null
  completed_to: string | null
  completed_date: Date
  top_tool: string
  location: string
}
