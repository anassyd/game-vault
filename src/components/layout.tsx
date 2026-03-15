import { Outlet } from "react-router-dom"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { ScrollProgress, BackToTop } from "@/components/scroll-progress"

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <Outlet />
      </main>
      <BackToTop />
      <MobileNav />
    </div>
  )
}
