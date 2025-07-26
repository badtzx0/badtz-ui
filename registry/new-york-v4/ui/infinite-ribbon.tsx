import * as React from "react"

import { cn } from "@/lib/utils"

interface InfiniteRibbonProps {
  repeat?: number
  duration?: number
  reverse?: boolean
  rotation?: number
  children: React.ReactNode
  className?: string
}

export function InfiniteRibbon({
  repeat = 5,
  duration = 10,
  reverse = false,
  rotation = 0,
  children,
  className,
}: InfiniteRibbonProps) {
  const animationClass = reverse
    ? "animate-infinite-ribbon-reverse"
    : "animate-infinite-ribbon"

  return (
    <div
      className={cn(
        "max-w-full overflow-hidden bg-zinc-100 py-1 text-lg text-black dark:bg-zinc-800 dark:text-white",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className={cn("flex whitespace-nowrap", animationClass)}
        style={{ "--ribbon-duration": `${duration}s` } as React.CSSProperties}
      >
        {Array.from({ length: repeat }, (_, index) => (
          <span key={index} className="mr-8 inline-block select-none">
            {children}
          </span>
        ))}
      </div>
    </div>
  )
}
