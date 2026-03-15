import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, Monitor, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"
import { FavoriteButton } from "@/components/favorite-button"
import type { Game } from "@/types"

interface GameListItemProps {
  game: Game
  index: number
}

export function GameListItem({ game, index }: GameListItemProps) {
  const releaseDate = game.release_date
    ? new Date(game.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBA"

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link to={`/game/${game.id}`} className="group block">
        <div className="flex gap-4 overflow-hidden rounded-xl border bg-card p-3 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30">
          <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-48">
            <OptimizedImage
              src={game.thumbnail}
              alt={game.title}
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between py-1">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-1 text-base font-semibold group-hover:text-primary transition-colors sm:text-lg">
                  {game.title}
                </h3>
                <FavoriteButton game={game} size="sm" />
              </div>
              <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                {game.short_description}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                {game.genre}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {releaseDate}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Monitor className="h-3 w-3" />
                {game.platform}
              </span>
              <span className="hidden text-xs text-muted-foreground sm:flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                {game.developer}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
