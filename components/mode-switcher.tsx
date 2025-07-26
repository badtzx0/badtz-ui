"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

import { useMetaColor } from "@/hooks/use-meta-color"
import { Button } from "@/components/ui/button"

const DARK_THEME_PATHS = ["/"]

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const { setMetaColor, metaColor } = useMetaColor()
  const pathname = usePathname()

  const isForced = DARK_THEME_PATHS.includes(pathname)

  React.useEffect(() => {
    setMetaColor(metaColor)
  }, [metaColor, setMetaColor])

  const toggleTheme = React.useCallback(() => {
    if (isForced) return
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme, isForced])

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`group/toggle text-foreground/80 extend-touch-target hover:bg-muted size-8 h-[30px] w-[30px] ${isForced ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={toggleTheme}
      disabled={isForced}
      title={isForced ? "Theme locked on this page" : "Toggle theme"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-9 1.732a8 8 0 0 0 4.001 14.928l-.001 -16a8 8 0 0 0 -4 1.072" />
      </svg>
      <span className="sr-only">
        {isForced ? "Theme locked" : "Toggle theme"}
      </span>
    </Button>
  )
}
