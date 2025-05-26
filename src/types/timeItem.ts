export type TimeItemType =
  | 'event'
  | 'todo'
  | 'routine'
  | 'deadline'
  | 'period'

export type GroupType =
  | 'flow'
  | 'related'
  | 'dependency'
  | 'custom'

export type GroupLink =
  | {
      groupId: string
      type: 'flow'
      order: number
    }
  | {
      groupId: string
      type: Exclude<GroupType, 'flow'>
    }

export type TimeItem =
  | {
      id: string
      title: string
      type: 'todo'
      checked: boolean
      startDate?: string
      endDate?: string
      repeat?: 'daily' | 'weekly' | 'monthly'
      groups?: GroupLink[]
      note?: string
      createdAt: string
    }
  | {
      id: string
      title: string
      type: Exclude<TimeItemType, 'todo'>
      startDate?: string
      endDate?: string
      repeat?: 'daily' | 'weekly' | 'monthly'
      groups?: GroupLink[]
      note?: string
      createdAt: string
    }

export interface Group {
  id: string
  title: string
  type: GroupType
  description?: string
  createdAt: string
}