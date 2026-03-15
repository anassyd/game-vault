import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { GameGrid } from "@/components/game-grid"
import { fetchLatestGames } from "@/api"
import type { Game } from "@/types"

const PAGE_SIZE = 20

export function LatestPage() {
  const [allGames, setAllGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    fetchLatestGames()
      .then((data) => setAllGames(Array.isArray(data) ? data : []))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const displayed = useMemo(
    () => allGames.slice(0, page * PAGE_SIZE),
    [allGames, page]
  )

  const hasMore = displayed.length < allGames.length

  const loadMore = () => {
    if (!loading && hasMore) setPage((p) => p + 1)
  }

  const retry = () => {
    setError(null)
    setAllGames([])
    setPage(1)
    setLoading(true)
    fetchLatestGames()
      .then((data) => setAllGames(Array.isArray(data) ? data : []))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Latest Releases</h1>
        <p className="mt-1 text-muted-foreground">
          Most recently released free-to-play games
        </p>
      </div>
      <GameGrid
        games={displayed}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onRetry={retry}
      />
    </motion.div>
  )
}
