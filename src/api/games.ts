import { apiClient } from "./client"
import type { Game, GameDetails, GameFilters, FilterOption } from "@/types"

const GENRE_OPTIONS: FilterOption[] = [
  { value: "mmorpg", label: "MMORPG" },
  { value: "shooter", label: "Shooter" },
  { value: "strategy", label: "Strategy" },
  { value: "moba", label: "MOBA" },
  { value: "racing", label: "Racing" },
  { value: "sports", label: "Sports" },
  { value: "social", label: "Social" },
  { value: "sandbox", label: "Sandbox" },
  { value: "open-world", label: "Open World" },
  { value: "survival", label: "Survival" },
  { value: "pvp", label: "PvP" },
  { value: "pve", label: "PvE" },
  { value: "pixel", label: "Pixel" },
  { value: "zombie", label: "Zombie" },
  { value: "turn-based", label: "Turn-Based" },
  { value: "first-person", label: "First Person" },
  { value: "third-person", label: "Third Person" },
  { value: "top-down", label: "Top Down" },
  { value: "tower-defense", label: "Tower Defense" },
  { value: "card", label: "Card Game" },
  { value: "battle-royale", label: "Battle Royale" },
  { value: "mmo", label: "MMO" },
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "fighting", label: "Fighting" },
  { value: "action-rpg", label: "Action RPG" },
  { value: "action", label: "Action" },
  { value: "horror", label: "Horror" },
  { value: "anime", label: "Anime" },
]

const PLATFORM_OPTIONS: FilterOption[] = [
  { value: "pc", label: "PC (Windows)" },
  { value: "browser", label: "Browser" },
]

const SORT_OPTIONS: FilterOption[] = [
  { value: "release-date", label: "Release Date" },
  { value: "popularity", label: "Popularity" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "relevance", label: "Relevance" },
]

export function getGenreOptions(): FilterOption[] {
  return GENRE_OPTIONS
}

export function getPlatformOptions(): FilterOption[] {
  return PLATFORM_OPTIONS
}

export function getSortOptions(): FilterOption[] {
  return SORT_OPTIONS
}

export async function fetchGames(
  filters: GameFilters = {}
): Promise<Game[]> {
  const params: Record<string, string> = {}

  if (filters.category) params.category = filters.category
  if (filters.platform) params.platform = filters.platform
  if (filters.sortBy) params["sort-by"] = filters.sortBy

  const { data } = await apiClient.get<Game[]>("/games", { params })
  return data
}

export async function fetchGameDetails(id: number): Promise<GameDetails> {
  const { data } = await apiClient.get<GameDetails>("/game", {
    params: { id },
  })
  return data
}

export async function fetchGamesByCategory(
  category: string
): Promise<Game[]> {
  const { data } = await apiClient.get<Game[]>("/games", {
    params: { category },
  })
  return data
}

export async function fetchLatestGames(): Promise<Game[]> {
  const { data } = await apiClient.get<Game[]>("/games", {
    params: { "sort-by": "release-date" },
  })
  return data
}

export async function fetchPopularGames(): Promise<Game[]> {
  const { data } = await apiClient.get<Game[]>("/games", {
    params: { "sort-by": "popularity" },
  })
  return data
}
