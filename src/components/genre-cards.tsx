import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import type { FilterOption } from "@/types"

const GENRE_GRADIENTS: Record<string, string> = {
  mmorpg: "from-violet-600 to-purple-900",
  shooter: "from-red-600 to-orange-900",
  strategy: "from-emerald-600 to-teal-900",
  moba: "from-blue-600 to-indigo-900",
  racing: "from-amber-500 to-orange-800",
  sports: "from-green-500 to-emerald-800",
  "battle-royale": "from-rose-600 to-pink-900",
  fantasy: "from-purple-500 to-indigo-800",
  "sci-fi": "from-cyan-500 to-blue-900",
  horror: "from-gray-700 to-gray-950",
  action: "from-orange-500 to-red-800",
  "action-rpg": "from-amber-600 to-red-900",
  fighting: "from-red-500 to-rose-900",
  card: "from-yellow-500 to-amber-800",
  sandbox: "from-lime-500 to-green-800",
  anime: "from-pink-500 to-fuchsia-800",
}

function getGradient(value: string): string {
  return GENRE_GRADIENTS[value] || "from-slate-600 to-slate-900"
}

interface GenreCardsProps {
  genres: FilterOption[]
  onSelect: (genre: string) => void
}

export function GenreCards({ genres, onSelect }: GenreCardsProps) {
  const navigate = useNavigate()
  const featured = genres.slice(0, 8)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Browse by Genre</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {featured.map((genre, i) => (
          <motion.button
            key={genre.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => {
              onSelect(genre.value)
              navigate("/")
            }}
            className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${getGradient(genre.value)} p-5 text-left transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative text-sm font-semibold text-white sm:text-base">
              {genre.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
