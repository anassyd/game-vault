import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useFavorites } from "@/lib/favorites"
import { cn } from "@/lib/utils"
import type { Game } from "@/types"

interface FavoriteButtonProps {
  game: Game
  size?: "sm" | "md"
  className?: string
}

export function FavoriteButton({
  game,
  size = "sm",
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(game.id)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite(game)
          }}
          className={cn(
            "transition-all",
            size === "sm" ? "h-8 w-8" : "h-10 w-10",
            className
          )}
        >
          <motion.div
            animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Heart
              className={cn(
                "transition-colors",
                size === "sm" ? "h-4 w-4" : "h-5 w-5",
                active
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:text-red-400"
              )}
            />
          </motion.div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {active ? "Remove from favorites" : "Add to favorites"}
      </TooltipContent>
    </Tooltip>
  )
}
