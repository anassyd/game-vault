import { useState, useEffect } from "react"
import type { GameDetails } from "@/types"
import { fetchGameDetails } from "@/api"

interface UseGameDetailReturn {
  game: GameDetails | null
  loading: boolean
  error: string | null
}

export function useGameDetail(id: number): UseGameDetailReturn {
  const [game, setGame] = useState<GameDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchGameDetails(id)
      .then((details) => {
        setGame(details)
      })
      .catch((err: Error) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return { game, loading, error }
}
