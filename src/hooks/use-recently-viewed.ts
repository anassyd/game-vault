import { useState, useEffect, useCallback } from "react"
import type { Game } from "@/types"

const STORAGE_KEY = "game-vault-recently-viewed"
const MAX_ITEMS = 20

function load(): Game[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(games: Game[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<Game[]>(load)

  useEffect(() => {
    save(items)
  }, [items])

  const addGame = useCallback((game: Game) => {
    setItems((prev) => {
      const filtered = prev.filter((g) => g.id !== game.id)
      return [game, ...filtered].slice(0, MAX_ITEMS)
    })
  }, [])

  const clearHistory = useCallback(() => {
    setItems([])
  }, [])

  return { recentlyViewed: items, addGame, clearHistory }
}
