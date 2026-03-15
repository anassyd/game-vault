import type { FilterOption } from "@/types"
import { getGenreOptions, getPlatformOptions, getSortOptions } from "@/api"

interface UseFilterOptionsReturn {
  genres: FilterOption[]
  platforms: FilterOption[]
  sortOptions: FilterOption[]
}

export function useFilterOptions(): UseFilterOptionsReturn {
  return {
    genres: getGenreOptions(),
    platforms: getPlatformOptions(),
    sortOptions: getSortOptions(),
  }
}
