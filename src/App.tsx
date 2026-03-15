import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "@/components/layout"
import { GameGridSkeleton } from "@/components/skeletons"

const DiscoverPage = lazy(() =>
  import("@/pages/discover").then((m) => ({ default: m.DiscoverPage }))
)
const LatestPage = lazy(() =>
  import("@/pages/latest").then((m) => ({ default: m.LatestPage }))
)
const PopularPage = lazy(() =>
  import("@/pages/upcoming").then((m) => ({ default: m.PopularPage }))
)
const FavoritesPage = lazy(() =>
  import("@/pages/favorites").then((m) => ({ default: m.FavoritesPage }))
)
const GameDetailPage = lazy(() =>
  import("@/pages/game-detail").then((m) => ({ default: m.GameDetailPage }))
)

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<GameGridSkeleton count={12} />}>{children}</Suspense>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <SuspenseWrapper>
            <DiscoverPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/latest",
        element: (
          <SuspenseWrapper>
            <LatestPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/popular",
        element: (
          <SuspenseWrapper>
            <PopularPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/favorites",
        element: (
          <SuspenseWrapper>
            <FavoritesPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/game/:id",
        element: (
          <SuspenseWrapper>
            <GameDetailPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
