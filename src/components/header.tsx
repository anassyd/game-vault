import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Gamepad2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { RandomGameButton } from "@/components/random-game-button"
import { useFavorites } from "@/lib/favorites"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { path: "/", label: "Discover" },
  { path: "/latest", label: "Latest" },
  { path: "/popular", label: "Popular" },
  { path: "/favorites", label: "Favorites" },
]

export function Header() {
  const { pathname } = useLocation()
  const { count } = useFavorites()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Gamepad2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">GameVault</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative rounded-md px-4 py-2 text-sm font-medium transition-colors",
                pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {pathname === item.path && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-md bg-accent"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {item.label}
                {item.path === "/favorites" && count > 0 && (
                  <Badge
                    variant="secondary"
                    className="h-5 min-w-5 px-1.5 text-[10px] font-bold"
                  >
                    {count}
                  </Badge>
                )}
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <RandomGameButton />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  )
}
