import { Link, useLocation } from "react-router-dom"
import { Compass, Clock, TrendingUp, Heart } from "lucide-react"
import { useFavorites } from "@/lib/favorites"
import { cn } from "@/lib/utils"

const ITEMS = [
  { path: "/", label: "Discover", icon: Compass },
  { path: "/latest", label: "Latest", icon: Clock },
  { path: "/popular", label: "Popular", icon: TrendingUp },
  { path: "/favorites", label: "Favorites", icon: Heart },
]

export function MobileNav() {
  const { pathname } = useLocation()
  const { count } = useFavorites()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/90 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around py-2">
        {ITEMS.map((item) => {
          const active = pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center gap-1 px-3 py-1 text-xs",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.path === "/favorites" && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </div>
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
