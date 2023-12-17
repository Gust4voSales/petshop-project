import { SortingParams } from "@/@types/API";
import { SortingState } from "@tanstack/react-table";

export function parseSortingStateToSortingParams(sortingState: SortingState): SortingParams {
  if (sortingState.length === 0) {
    return {
      sortBy: undefined,
      sortOrder: undefined
    }
  }
  return {
    sortBy: sortingState[0].id,
    sortOrder: sortingState[0].desc ? "desc" : "asc"
  }
}