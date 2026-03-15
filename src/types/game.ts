export interface Screenshot {
  id: number
  image: string
}

export interface SystemRequirements {
  os: string
  processor: string
  memory: string
  graphics: string
  storage: string
}

export interface Game {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

export interface GameDetails extends Game {
  status: string
  description: string
  minimum_system_requirements: SystemRequirements | null
  screenshots: Screenshot[]
}

export interface GameFilters {
  search?: string
  category?: string
  platform?: string
  sortBy?: string
  page?: number
  pageSize?: number
}

export interface FilterOption {
  value: string
  label: string
}

