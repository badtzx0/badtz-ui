"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface GradientSlideButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  colorFrom?: string
  colorTo?: string
}

export function GradientSlideButton({
  children,
  className,
  colorFrom = "#F54900",
  colorTo = "#FF8904",
  ...props
}: GradientSlideButtonProps) {
  return (
    <button
      style={
        {
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        "relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-md bg-neutral-50 px-4 py-2 text-sm font-medium whitespace-nowrap text-black transition-all duration-300 hover:scale-[105%] dark:bg-neutral-800 dark:text-white",
        "before:absolute before:top-0 before:left-[-100%] before:h-full before:w-full before:rounded-[inherit] before:bg-gradient-to-l before:from-[var(--color-from)] before:to-[var(--color-to)] before:transition-all before:duration-200",
        "hover:text-white hover:before:left-0",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}
