import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { fetchGames } from "@/api"

export function RandomGameButton() {
  const navigate = useNavigate()
  const [spinning, setSpinning] = useState(false)

  const pickRandom = useCallback(async () => {
    if (spinning) return
    setSpinning(true)
    try {
      const games = await fetchGames()
      if (games.length > 0) {
        const random = games[Math.floor(Math.random() * games.length)]
        navigate(`/game/${random.id}`)
      }
    } catch {
      // silently fail
    } finally {
      setSpinning(false)
    }
  }, [navigate, spinning])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={pickRandom}
          disabled={spinning}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={spinning ? "spinning" : "idle"}
              animate={spinning ? { rotate: 360 } : { rotate: 0 }}
              transition={
                spinning
                  ? { duration: 0.6, repeat: Infinity, ease: "linear" }
                  : {}
              }
            >
              <Shuffle className="h-5 w-5" />
            </motion.div>
          </AnimatePresence>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Random game</TooltipContent>
    </Tooltip>
  )
}
