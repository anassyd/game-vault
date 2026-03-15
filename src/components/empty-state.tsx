import { Gamepad2 } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <Gamepad2 className="h-12 w-12 text-muted-foreground" />
      <h3 className="text-lg font-semibold">No games found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search or filters
      </p>
    </div>
  )
}
