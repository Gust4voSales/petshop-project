export type PaginatedResult<T> = {
  data: T[],
  meta: {
    page: number, // current page
    lastPage: number,
    pageSize: number, // take n items 
    total: number,
  }
}

export type PaginateOptions = { page?: number, pageSize?: number }

export type PaginateFunctionArgs = {
  model: any
  args?: any
  options?: PaginateOptions
}
export abstract class Paginator {
  abstract paginate<T>(args: PaginateFunctionArgs): Promise<PaginatedResult<T>>;
}
