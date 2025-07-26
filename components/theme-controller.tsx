"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

const DARK_THEME_PATHS = ["/"]

export function ThemeController({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname()
  const forceDarkTheme = DARK_THEME_PATHS.includes(pathname)

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      forcedTheme={forceDarkTheme ? "dark" : undefined}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
