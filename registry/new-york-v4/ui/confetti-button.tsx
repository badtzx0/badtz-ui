"use client"

import React, { MouseEventHandler, ReactNode, useRef } from "react"
import confetti from "canvas-confetti"

import { cn } from "@/lib/utils"

interface ConfettiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: ReactNode
  angle?: number
  particleCount?: number
  startVelocity?: number
  spread?: number
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function ConfettiButton({
  className,
  children,
  angle = 90,
  particleCount = 75,
  startVelocity = 35,
  spread = 70,
  onClick,
  ...props
}: ConfettiButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      confetti({
        particleCount,
        startVelocity,
        angle,
        spread,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      })
    }
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium whitespace-nowrap text-black transition-colors duration-300 hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
