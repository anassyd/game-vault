import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import type { Screenshot } from "@/types"

interface ScreenshotGalleryProps {
  screenshots: Screenshot[]
  gameName: string
}

export function ScreenshotGallery({
  screenshots,
  gameName,
}: ScreenshotGalleryProps) {
  const [current, setCurrent] = useState(0)

  if (screenshots.length === 0) return null

  const next = () =>
    setCurrent((prev) => (prev + 1) % screenshots.length)
  const prev = () =>
    setCurrent((prev) => (prev - 1 + screenshots.length) % screenshots.length)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Screenshots</h2>
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <OptimizedImage
              src={screenshots[current].image}
              alt={`${gameName} screenshot ${current + 1}`}
              className="aspect-video w-full rounded-xl"
            />
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {screenshots.map((ss, i) => (
          <button
            key={ss.id}
            onClick={() => setCurrent(i)}
            className={`overflow-hidden rounded-lg border-2 transition-all ${
              i === current ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <OptimizedImage
              src={ss.image}
              alt={`Thumbnail ${i + 1}`}
              className="aspect-video w-full"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
