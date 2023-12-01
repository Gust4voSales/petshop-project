import { SortOptions } from "@app/repositories/utils/sort"

export function getPrismaSorter<T extends string>(sortOptions: SortOptions<T>) {
  if (!sortOptions.sortBy) return undefined

  /* EXAMPLE OF SORTING WITH PRISMA: 
    prisma.user.findMany({
      orderBy: { 
        created_at: 'asc' // The field 'created_at' is our sortBy option, which is a string generic T
      }
    })  
  */
  return {
    [sortOptions.sortBy]: sortOptions.sortOrder ?? 'asc'
  }
}