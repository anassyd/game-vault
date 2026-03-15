import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"
import { FavoriteButton } from "@/components/favorite-button"
import type { Game } from "@/types"

interface FeaturedHeroProps {
  games: Game[]
}

export function FeaturedHero({ games }: FeaturedHeroProps) {
  const [current, setCurrent] = useState(0)
  const featured = games.slice(0, 5)

  useEffect(() => {
    if (featured.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [featured.length])

  if (featured.length === 0) return null

  const game = featured[current]

  const next = () => setCurrent((prev) => (prev + 1) % featured.length)
  const prev = () =>
    setCurrent((prev) => (prev - 1 + featured.length) % featured.length)

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={game.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[21/9] w-full sm:aspect-[2.5/1]"
        >
          <OptimizedImage
            src={game.thumbnail}
            alt={game.title}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={game.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-medium uppercase tracking-wider text-yellow-400">
                Featured
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {game.title}
            </h2>
            <p className="line-clamp-2 max-w-xl text-sm text-white/80 sm:text-base">
              {game.short_description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
                {game.genre}
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                {game.platform}
              </Badge>
              <div className="ml-auto flex items-center gap-2">
                <FavoriteButton
                  game={game}
                  size="md"
                  className="text-white hover:text-white"
                />
                <Button asChild size="sm" className="rounded-full">
                  <Link to={`/game/${game.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {featured.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 h-9 w-9 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 h-9 w-9 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <div className="absolute bottom-3 right-5 flex gap-1.5 sm:right-8">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
