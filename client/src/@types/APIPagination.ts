export type PaginationParams = {
  page?: number
  pageSize?: number
}

export type PaginatedResponse = {
  meta: {
    page: number,
    total: number,
    lastPage: number,
    pageSize: number
  }
}