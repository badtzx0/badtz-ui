"use client"

import React, { CSSProperties, memo } from "react"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  duration?: number
  lightColor?: string
  borderWidth?: number
  className?: string
  [key: string]: unknown
}

function BorderBeamComponent({
  duration = 2,
  lightColor = "#FAFAFA",
  borderWidth = 1,
  className,
  ...props
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        `absolute inset-0 z-0 h-full w-full rounded-[inherit]`,
        className
      )}
      style={{
        border: `${borderWidth}px solid rgba(255, 255, 255, 0.1)`,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          mask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: `${borderWidth}px`,
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 aspect-square w-full"
          style={
            {
              background: `conic-gradient(from 0deg at 50% 50%, transparent 270deg, ${lightColor} 1turn, transparent 361deg)`,
              animation: `border-beam-rotate ${duration}s linear infinite`,
              willChange: "transform",
            } as CSSProperties
          }
        />
      </div>
    </div>
  )
}

export const BorderBeam = memo(BorderBeamComponent)
