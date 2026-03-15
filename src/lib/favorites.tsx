import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import type { Game } from "@/types"

const STORAGE_KEY = "game-vault-favorites"

interface FavoritesContextValue {
  favorites: Game[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (game: Game) => void
  clearFavorites: () => void
  count: number
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
)

function loadFavorites(): Game[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveFavorites(games: Game[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Game[]>(loadFavorites)

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  const isFavorite = useCallback(
    (id: number) => favorites.some((g) => g.id === id),
    [favorites]
  )

  const toggleFavorite = useCallback((game: Game) => {
    setFavorites((prev) => {
      const exists = prev.some((g) => g.id === game.id)
      if (exists) return prev.filter((g) => g.id !== game.id)
      return [game, ...prev]
    })
  }, [])

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  return (
    <FavoritesContext value={{
      favorites,
      isFavorite,
      toggleFavorite,
      clearFavorites,
      count: favorites.length,
    }}>
      {children}
    </FavoritesContext>
  )
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider")
  return ctx
}
