"use client"

import React, { CSSProperties, ReactNode, useEffect, useState } from "react"
import { stagger, useAnimate } from "motion/react"

import { cn } from "@/lib/utils"

interface StaggerTextEffectProps {
  className?: string
  children: ReactNode
  duration?: number
  staggerDelay?: number
  height?: number
}

export function StaggerBlurEffect({
  className,
  children,
  duration = 0.3,
  staggerDelay = 0.05,
  height = 56,
}: StaggerTextEffectProps) {
  const [scope, animate] = useAnimate()
  const [isRotatedUp, setIsRotatedUp] = useState<boolean>(false)

  const onMouseEnter = () => {
    setIsRotatedUp((prev) => !prev)
  }

  useEffect(() => {
    if (isRotatedUp) {
      animate([
        [
          ".letter",
          { rotateX: 80 },
          { duration, delay: stagger(staggerDelay) },
        ],
        [
          ".face-front",
          { filter: "blur(6px)", opacity: 0 },
          { duration, delay: stagger(staggerDelay), at: "<" },
        ],
        [
          ".face-back",
          { filter: "blur(0px)", opacity: 1 },
          { duration, delay: stagger(staggerDelay), at: "<" },
        ],
      ])
    } else {
      animate([
        [".letter", { rotateX: 0 }, { duration, delay: stagger(staggerDelay) }],
        [
          ".face-front",
          { filter: "blur(0px)", opacity: 1 },
          { duration, delay: stagger(staggerDelay), at: "<" },
        ],
        [
          ".face-back",
          { filter: "blur(6px)", opacity: 0 },
          { duration, delay: stagger(staggerDelay), at: "<" },
        ],
      ])
    }
  }, [isRotatedUp, animate, duration, staggerDelay])

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
      onMouseEnter={onMouseEnter}
      className={cn(
        "inline-block cursor-pointer font-semibold tracking-tighter",
        className
      )}
    >
      <span className="sr-only">{children}</span>
      <span
        aria-hidden
        className="relative flex h-[--height] items-center justify-center text-5xl"
      >
        {lettersArray.map((letter, index) => (
          <span
            style={{
              transformStyle: "preserve-3d",
              transition: `transform cubic-bezier(0.3, 0.65, 0.4, 1)`,
              backfaceVisibility: "hidden",
            }}
            data-letter={letter}
            key={`${letter}-${index}`}
            className="letter relative inline-block h-[--height] leading-[--height]"
          >
            <span
              aria-hidden="true"
              className="face face-front absolute inset-0 flex items-center justify-center"
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
            <span
              aria-hidden="true"
              className="face face-back absolute inset-0 flex items-center justify-center"
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
            <span className="opacity-0">
              {letter === " " ? "\u00A0" : letter}
            </span>
          </span>
        ))}
        <style jsx>{`
          .face {
            backface-visibility: hidden;
            transform-style: preserve-3d;
          }
          .face-front {
            transform: rotateX(0deg) translateZ(calc(var(--height) / 2));
          }
          .face-back {
            transform: rotateX(-80deg) translateZ(calc(var(--height) / 2));
            backface-visibility: hidden;
            filter: blur(8px);
            opacity: 0;
          }
        `}</style>
      </span>
    </div>
  )
}
