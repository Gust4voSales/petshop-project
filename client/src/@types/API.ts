export type APIError = {
  name: string
  message: string
}

export type PaginationParams = {
  page?: number
  pageSize?: number
}

export type SortingParams = {
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type PaginatedResponse = {
  meta: {
    page: number,
    total: number,
    lastPage: number,
    pageSize: number
  }
}