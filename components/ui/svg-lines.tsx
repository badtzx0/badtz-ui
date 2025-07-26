"use client"

import { useId } from "react"

import { cn } from "@/lib/utils"

export interface SvgLinesProps {
  className?: string
  path: string
  pathColor?: string
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  viewBox?: string
}

export const SvgLines: React.FC<SvgLinesProps> = ({
  className,
  path,
  duration = 8,
  delay = 2,
  pathColor = "#7876c5",
  pathOpacity = 0.35,
  gradientStartColor = "#7876c5",
  gradientStopColor = "#7876c5",
  viewBox = "0 0 195 200",
}) => {
  const id = useId()
  const cleanId = id.replace(/:/g, "-")

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {/* Static path */}
      <svg
        fill="none"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0"
      >
        <path
          d={path}
          stroke={pathColor}
          strokeWidth="1"
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Animated gradient */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            transparent 20%,
            ${gradientStartColor}4d 25%, 
            ${gradientStopColor} 30%, 
            ${gradientStartColor}4d 35%,
            transparent 40%,
            transparent 100%)`,
          backgroundSize: "300% 100%",
          animation: `flow-gradient ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          mask: `url(#mask-${cleanId})`,
          WebkitMask: `url(#mask-${cleanId})`,
        }}
      >
        <svg
          fill="none"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0"
        >
          <defs>
            <mask id={`mask-${cleanId}`}>
              <path
                d={path}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                fill="none"
              />
            </mask>
          </defs>
        </svg>
      </div>
    </div>
  )
}
