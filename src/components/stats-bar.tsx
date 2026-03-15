import { motion } from "framer-motion"
import { Gamepad2, Monitor, Tag, TrendingUp } from "lucide-react"
import type { Game } from "@/types"

interface StatsBarProps {
  total: number
  games: Game[]
}

export function StatsBar({ total, games }: StatsBarProps) {
  const uniqueGenres = new Set(games.map((g) => g.genre)).size
  const pcCount = games.filter((g) =>
    g.platform.toLowerCase().includes("windows")
  ).length
  const browserCount = games.filter((g) =>
    g.platform.toLowerCase().includes("browser")
  ).length

  const stats = [
    { icon: Gamepad2, label: "Total Games", value: total },
    { icon: Tag, label: "Genres", value: uniqueGenres },
    { icon: Monitor, label: "PC Games", value: pcCount },
    { icon: TrendingUp, label: "Browser", value: browserCount },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 rounded-xl border bg-card p-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <stat.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
