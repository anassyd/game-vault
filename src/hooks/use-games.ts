import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import type { Game, GameFilters } from "@/types"
import { fetchGames } from "@/api"

const PAGE_SIZE = 20

interface UseGamesReturn {
  games: Game[]
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
  reset: () => void
  total: number
}

function filterBySearch(games: Game[], search: string): Game[] {
  const q = search.toLowerCase()
  return games.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.short_description.toLowerCase().includes(q) ||
      g.genre.toLowerCase().includes(q) ||
      g.developer.toLowerCase().includes(q) ||
      g.publisher.toLowerCase().includes(q)
  )
}

export function useGames(filters: GameFilters): UseGamesReturn {
  const [allGames, setAllGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const abortRef = useRef<AbortController | null>(null)

  const filtersKey = JSON.stringify({
    category: filters.category,
    platform: filters.platform,
    sortBy: filters.sortBy,
  })

  useEffect(() => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)
    setPage(1)

    fetchGames(filters)
      .then((data: Game[]) => {
        if (controller.signal.aborted) return
        setAllGames(Array.isArray(data) ? data : [])
      })
      .catch((err: Error) => {
        if (controller.signal.aborted) return
        setError(err.message)
        setAllGames([])
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [filtersKey])

  const filtered = useMemo(() => {
    if (filters.search) return filterBySearch(allGames, filters.search)
    return allGames
  }, [allGames, filters.search])

  const displayed = useMemo(
    () => filtered.slice(0, page * PAGE_SIZE),
    [filtered, page]
  )

  const hasMore = displayed.length < filtered.length

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage((p) => p + 1)
    }
  }, [hasMore, loading])

  const reset = useCallback(() => {
    setAllGames([])
    setPage(1)
    setError(null)
  }, [])

  return {
    games: displayed,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    total: filtered.length,
  }
}
