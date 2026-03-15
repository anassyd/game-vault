import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GameCard } from "@/components/game-card"
import { GameListItem } from "@/components/game-list-item"
import { ViewToggle, type ViewMode } from "@/components/view-toggle"
import { useFavorites } from "@/lib/favorites"
import { useDebounce } from "@/hooks"

export function FavoritesPage() {
  const { favorites, clearFavorites, count } = useFavorites()
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    if (!debouncedSearch) return favorites
    const q = debouncedSearch.toLowerCase()
    return favorites.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        g.developer.toLowerCase().includes(q)
    )
  }, [favorites, debouncedSearch])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            My Favorites
          </h1>
          <p className="mt-1 text-muted-foreground">
            {count === 0
              ? "No favorites yet - start adding games you love"
              : `${count} game${count !== 1 ? "s" : ""} saved`}
          </p>
        </div>
        {count > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFavorites}
            className="gap-2 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            Clear all
          </Button>
        )}
      </div>

      {count > 0 && (
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search favorites..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>
      )}

      {count === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="h-16 w-16 text-muted-foreground/30" />
          </motion.div>
          <h3 className="text-lg font-semibold text-muted-foreground">
            Your favorites list is empty
          </h3>
          <p className="max-w-sm text-center text-sm text-muted-foreground">
            Click the heart icon on any game to save it here for quick access
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          No favorites matching your search
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {filtered.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((game, i) => (
              <GameListItem key={game.id} game={game} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
