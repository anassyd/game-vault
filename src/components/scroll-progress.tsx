import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollProgress } from "@/hooks/use-scroll-progress"

export function ScrollProgress() {
  const { progress } = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
      <motion.div
        className="h-full bg-primary origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}

export function BackToTop() {
  const { showBackToTop, scrollToTop } = useScrollProgress()

  return (
    <AnimatePresence>
      {showBackToTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-20 right-4 z-50 md:bottom-8"
        >
          <Button
            size="icon"
            onClick={scrollToTop}
            className="h-10 w-10 rounded-full shadow-lg"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
