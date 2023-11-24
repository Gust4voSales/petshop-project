import { Paginator, PaginateOptions, PaginatedResult, PaginateFunctionArgs, } from "@app/repositories/utils/pagination";

export const defaultOptions: PaginateOptions = {
  page: 1,
  pageSize: 10
}

export class PrismaPaginator implements Paginator {
  async paginate<T>({ model, args, options }: PaginateFunctionArgs): Promise<PaginatedResult<T>> {
    const page = options?.page || defaultOptions.page
    const pageSize = options?.pageSize || defaultOptions.pageSize

    const skip = page > 0 ? pageSize * (page - 1) : 0;

    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: pageSize,
        skip,
      }),
    ]);

    const lastPage = Math.ceil(total / pageSize);

    return {
      data,
      meta: {
        page,
        total,
        lastPage,
        pageSize,
      },
    };
  }
}