import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/lib/theme"
import { FavoritesProvider } from "@/lib/favorites"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <TooltipProvider delayDuration={300}>
          <App />
        </TooltipProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>
)
