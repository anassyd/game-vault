import { useState, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { SearchFilters } from "@/components/search-filters"
import { GameGrid } from "@/components/game-grid"
import { FeaturedHero } from "@/components/featured-hero"
import { GenreCards } from "@/components/genre-cards"
import { StatsBar } from "@/components/stats-bar"
import { RecentlyViewedStrip } from "@/components/recently-viewed"
import { ViewToggle, type ViewMode } from "@/components/view-toggle"
import { useGames, useDebounce } from "@/hooks"
import { useRecentlyViewed } from "@/hooks/use-recently-viewed"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useFilterOptions } from "@/hooks"
import { useTheme } from "@/lib/theme"

export function DiscoverPage() {
  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("")
  const [platform, setPlatform] = useState("")
  const [ordering, setOrdering] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { genres } = useFilterOptions()
  const { toggleTheme } = useTheme()

  const debouncedSearch = useDebounce(search, 400)

  const filters = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      category: genre || undefined,
      platform: platform || undefined,
      sortBy: ordering || "relevance",
    }),
    [debouncedSearch, genre, platform, ordering]
  )

  const { games, loading, error, hasMore, loadMore, reset, total } = useGames(filters)
  const { recentlyViewed, clearHistory } = useRecentlyViewed()

  useKeyboardShortcuts({
    onSearchFocus: () => searchInputRef.current?.focus(),
    onToggleTheme: toggleTheme,
  })

  const clearFilters = () => {
    setSearch("")
    setGenre("")
    setPlatform("")
    setOrdering("")
  }

  const hasFilters = !!(debouncedSearch || genre || platform || ordering)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {!hasFilters && !loading && games.length > 0 && (
        <FeaturedHero games={games} />
      )}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Discover Games</h1>
        <p className="mt-1 text-muted-foreground">
          Browse and explore free-to-play games
          {!loading && total > 0 && ` \u2014 ${total} games found`}
          <span className="ml-2 hidden text-xs sm:inline">
            Press <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">/</kbd> to search
          </span>
        </p>
      </div>

      {!hasFilters && !loading && games.length > 0 && (
        <StatsBar total={total} games={games} />
      )}

      <RecentlyViewedStrip games={recentlyViewed} onClear={clearHistory} />

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <SearchFilters
            search={search}
            genre={genre}
            platform={platform}
            ordering={ordering}
            onSearchChange={setSearch}
            onGenreChange={setGenre}
            onPlatformChange={setPlatform}
            onOrderingChange={setOrdering}
            onClearFilters={clearFilters}
            searchRef={searchInputRef}
          />
        </div>
        <ViewToggle mode={viewMode} onChange={setViewMode} />
      </div>

      {!hasFilters && !loading && (
        <GenreCards genres={genres} onSelect={setGenre} />
      )}

      <GameGrid
        games={games}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onRetry={reset}
        viewMode={viewMode}
      />
    </motion.div>
  )
}
