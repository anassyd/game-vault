import { useEffect } from "react"

interface ShortcutHandlers {
  onSearchFocus?: () => void
  onToggleTheme?: () => void
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable

      if (e.key === "/" && !isInput) {
        e.preventDefault()
        handlers.onSearchFocus?.()
      }

      if (e.key === "d" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handlers.onToggleTheme?.()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handlers])
}
