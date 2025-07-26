"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"

function ThemeWrapper({
  children,
  container,
}: {
  children: React.ReactNode
  container?: string
}) {
  const searchParams = useSearchParams()
  const theme = searchParams.get("theme")

  const applyTheme = React.useCallback((newTheme: string) => {
    if (newTheme && typeof window !== "undefined") {
      Array.from(document.body.classList).forEach((className) => {
        if (className.startsWith("theme-")) {
          document.body.classList.remove(className)
        }
      })
      document.body.classList.add(`theme-${newTheme}`)
    }
  }, [])

  React.useEffect(() => {
    if (theme) {
      applyTheme(theme)
    }
  }, [theme, applyTheme])

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "THEME_CHANGE") {
        applyTheme(event.data.theme)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [applyTheme])

  const finalClassName = cn("bg-background theme-container", container)

  return <div className={finalClassName}>{children}</div>
}

export function ClientThemeWrapper({
  children,
  container,
}: {
  children: React.ReactNode
  container?: string
}) {
  return (
    <React.Suspense
      fallback={
        <div className={cn("bg-background theme-container", container)}>
          {children}
        </div>
      }
    >
      <ThemeWrapper container={container}>{children}</ThemeWrapper>
    </React.Suspense>
  )
}
