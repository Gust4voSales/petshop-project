export type SortOrder = 'asc' | 'desc'

// Example usage: SortOptions<'name' | 'created_at'> = { sortBy: 'name', sortOrder: 'desc' }
export type SortOptions<T extends string> = {
  sortBy?: T
  sortOrder?: SortOrder
}