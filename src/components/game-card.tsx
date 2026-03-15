import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, Monitor } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"
import { FavoriteButton } from "@/components/favorite-button"
import type { Game } from "@/types"

interface GameCardProps {
  game: Game
  index: number
}

export function GameCard({ game, index }: GameCardProps) {
  const releaseDate = game.release_date
    ? new Date(game.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBA"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
    >
      <Link to={`/game/${game.id}`} className="group block">
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="relative aspect-video">
            <OptimizedImage
              src={game.thumbnail}
              alt={game.title}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
              <FavoriteButton
                game={game}
                size="sm"
                className="bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
              />
            </div>
          </div>
          <div className="p-4">
            <h3 className="line-clamp-1 text-lg font-semibold group-hover:text-primary transition-colors">
              {game.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {game.short_description}
            </p>
            <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {releaseDate}
              </span>
              <span className="flex items-center gap-1">
                <Monitor className="h-4 w-4" />
                {game.platform}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs">
                {game.genre}
              </Badge>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {game.developer}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
