import { useRef, useEffect, useCallback } from "react"
import { useInView } from "react-intersection-observer"
import { GameCard } from "@/components/game-card"
import { GameListItem } from "@/components/game-list-item"
import { GameGridSkeleton } from "@/components/skeletons"
import { ErrorState } from "@/components/error-state"
import { EmptyState } from "@/components/empty-state"
import type { ViewMode } from "@/components/view-toggle"
import type { Game } from "@/types"

interface GameGridProps {
  games: Game[]
  loading: boolean
  error: string | null
  hasMore: boolean
  onLoadMore: () => void
  onRetry?: () => void
  viewMode?: ViewMode
}

export function GameGrid({
  games,
  loading,
  error,
  hasMore,
  onLoadMore,
  onRetry,
  viewMode = "grid",
}: GameGridProps) {
  const { ref, inView } = useInView({ threshold: 0 })
  const loadMoreRef = useRef(onLoadMore)

  useEffect(() => {
    loadMoreRef.current = onLoadMore
  }, [onLoadMore])

  const handleLoadMore = useCallback(() => {
    loadMoreRef.current()
  }, [])

  useEffect(() => {
    if (inView && hasMore && !loading) {
      handleLoadMore()
    }
  }, [inView, hasMore, loading, handleLoadMore])

  if (error && games.length === 0) {
    return <ErrorState message={error} onRetry={onRetry} />
  }

  if (!loading && games.length === 0) {
    return <EmptyState />
  }

  return (
    <div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game, index) => (
            <GameCard key={game.id} game={game} index={index % 20} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {games.map((game, index) => (
            <GameListItem key={game.id} game={game} index={index % 20} />
          ))}
        </div>
      )}
      {loading && <div className="mt-6"><GameGridSkeleton count={8} /></div>}
      {hasMore && !loading && (
        <div ref={ref} className="h-20" />
      )}
    </div>
  )
}
