import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/optimized-image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { Game } from "@/types"

interface RecentlyViewedStripProps {
  games: Game[]
  onClear: () => void
}

export function RecentlyViewedStrip({ games, onClear }: RecentlyViewedStripProps) {
  if (games.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Recently Viewed
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-xs text-muted-foreground"
        >
          <Trash2 className="mr-1 h-3 w-3" />
          Clear
        </Button>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0"
            >
              <Link
                to={`/game/${game.id}`}
                className="group block w-36 sm:w-44"
              >
                <div className="overflow-hidden rounded-lg border transition-all group-hover:border-primary/50 group-hover:shadow-md">
                  <OptimizedImage
                    src={game.thumbnail}
                    alt={game.title}
                    className="aspect-video w-full"
                  />
                  <div className="p-2">
                    <p className="line-clamp-1 text-xs font-medium group-hover:text-primary transition-colors">
                      {game.title}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  )
}
