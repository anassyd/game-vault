import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Globe,
  ExternalLink,
  Monitor,
  Code,
  Building,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { OptimizedImage } from "@/components/optimized-image"
import { ScreenshotGallery } from "@/components/screenshot-gallery"
import { FavoriteButton } from "@/components/favorite-button"
import { ShareButton } from "@/components/share-button"
import { DetailSkeleton } from "@/components/skeletons"
import { ErrorState } from "@/components/error-state"
import { useGameDetail } from "@/hooks"
import { useRecentlyViewed } from "@/hooks/use-recently-viewed"

export function GameDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { game, loading, error } = useGameDetail(Number(id))
  const { addGame } = useRecentlyViewed()

  useEffect(() => {
    if (game) addGame(game)
  }, [game, addGame])

  if (loading) {
    return (
      <div className="space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <DetailSkeleton />
      </div>
    )
  }

  if (error || !game) {
    return <ErrorState message={error || "Game not found"} />
  }

  const releaseDate = game.release_date
    ? new Date(game.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBA"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to games
        </Link>
        <div className="flex items-center gap-2">
          <FavoriteButton game={game} size="md" />
          <ShareButton title={game.title} gameUrl={game.game_url} />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <OptimizedImage
          src={game.thumbnail}
          alt={game.title}
          className="aspect-[21/9] w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            {game.title}
          </motion.h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-4">
            <Badge>{game.genre}</Badge>
            {game.status && (
              <Badge variant="outline">{game.status}</Badge>
            )}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {releaseDate}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Monitor className="h-4 w-4" />
              {game.platform}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="mb-3 text-xl font-semibold">About</h2>
            <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
              {game.description || game.short_description}
            </p>
          </div>

          {game.screenshots && game.screenshots.length > 0 && (
            <ScreenshotGallery
              screenshots={game.screenshots}
              gameName={game.title}
            />
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Code className="h-4 w-4" /> Developer
            </h3>
            <p className="text-muted-foreground">{game.developer}</p>
          </div>

          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Building className="h-4 w-4" /> Publisher
            </h3>
            <p className="text-muted-foreground">{game.publisher}</p>
          </div>

          {game.minimum_system_requirements && (
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="font-semibold">System Requirements</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {game.minimum_system_requirements.os && (
                  <div>
                    <span className="font-medium text-foreground">OS: </span>
                    {game.minimum_system_requirements.os}
                  </div>
                )}
                {game.minimum_system_requirements.processor && (
                  <div>
                    <span className="font-medium text-foreground">Processor: </span>
                    {game.minimum_system_requirements.processor}
                  </div>
                )}
                {game.minimum_system_requirements.memory && (
                  <div>
                    <span className="font-medium text-foreground">Memory: </span>
                    {game.minimum_system_requirements.memory}
                  </div>
                )}
                {game.minimum_system_requirements.graphics && (
                  <div>
                    <span className="font-medium text-foreground">Graphics: </span>
                    {game.minimum_system_requirements.graphics}
                  </div>
                )}
                {game.minimum_system_requirements.storage && (
                  <div>
                    <span className="font-medium text-foreground">Storage: </span>
                    {game.minimum_system_requirements.storage}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="rounded-xl border bg-card p-6 space-y-3">
            <h3 className="font-semibold">Links</h3>
            {game.game_url && (
              <a
                href={game.game_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-4 w-4" /> Play Now
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {game.freetogame_profile_url && (
              <a
                href={game.freetogame_profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-4 w-4" /> FreeToGame Profile
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
