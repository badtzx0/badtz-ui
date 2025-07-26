"use client"

import React, { CSSProperties, ReactNode, useEffect, useState } from "react"
import { stagger, useAnimate } from "motion/react"

import { cn } from "@/lib/utils"

interface StaggerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: ReactNode
  duration?: number
  staggerDelay?: number
  height?: number
}

export function StaggerButton({
  className,
  children,
  duration = 0.2,
  staggerDelay = 0.05,
  height = 26,
  ...props
}: StaggerButtonProps) {
  const [scope, animate] = useAnimate()
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const onMouseEnter = () => {
    setIsHovered(true)
  }

  const onMouseLeave = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    if (isHovered) {
      animate([
        [
          ".letter",
          {
            rotateX: 90,
          },
          { duration, delay: stagger(staggerDelay) },
        ],
        [
          ".letter::after",
          {
            rotateX: 90,
          },
          { duration, delay: stagger(staggerDelay) },
        ],
      ])
    } else {
      animate([
        [
          ".letter",
          {
            rotateX: 0,
          },
          { duration, delay: stagger(staggerDelay) },
        ],
        [
          ".letter::after",
          {
            rotateX: -90,
          },
          { duration, delay: stagger(staggerDelay) },
        ],
      ])
    }
  }, [isHovered, animate, duration, staggerDelay])

  const lettersArray = children?.toString().split("") || []

  return (
    <div
      ref={scope}
      style={
        {
          "--height": `${height}px`,
          perspective: "1000px",
        } as CSSProperties
      }
    >
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          "relative inline-flex h-10 items-center justify-center gap-2 rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium whitespace-nowrap text-black transition-colors disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-900 dark:text-white [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          className
        )}
        {...props}
      >
        <span className="sr-only">{children}</span>
        <span
          aria-hidden
          className="relative flex h-[--height] items-center justify-center overflow-hidden"
        >
          {lettersArray.map((letter, index) => (
            <span
              style={{
                transformStyle: "preserve-3d",
                transition: `transform cubic-bezier(0.3, 0.65, 0.4, 1)`,
              }}
              data-letter={letter}
              key={`${letter}-${index}`}
              className="letter inline-block h-[--height] leading-[--height]"
            >
              <span className="opacity-0">{letter === " " ? " " : letter}</span>
            </span>
          ))}
          <style jsx>{`
            .letter::before {
              content: attr(data-letter);
              position: absolute;
              left: 0;
              top: 0;
              transform: rotateX(0deg) translateZ(calc(var(--height) / 2));
            }
            .letter::after {
              content: attr(data-letter);
              position: absolute;
              left: 0;
              top: 0;
              transform: rotateX(-90deg) translateZ(calc(var(--height) / 2));
            }
          `}</style>
        </span>
      </button>
    </div>
  )
}
