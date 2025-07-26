"use client"

import React, { ReactNode, useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

interface Wrapper3DProps {
  children: ReactNode
  damping?: number
  swiftness?: number
  mass?: number
  maxRotation?: number
  translateZ?: number
  perspective?: boolean
  className?: string
}

export function Wrapper3D({
  children,
  damping = 20,
  swiftness = 80,
  mass = 1.5,
  maxRotation = 100,
  translateZ = 75,
  perspective = true,
  className,
}: Wrapper3DProps) {
  const halfMaxRotation = maxRotation / 2

  const refMotionDiv = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, {
    damping: damping,
    stiffness: swiftness,
    mass: mass,
  })

  const ySpring = useSpring(y, {
    damping: damping,
    stiffness: swiftness,
    mass: mass,
  })

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!refMotionDiv.current) return

    const rect = refMotionDiv.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const rX = ((mouseY / rect.height) * maxRotation - halfMaxRotation) * -1
    const rY = (mouseX / rect.width) * maxRotation - halfMaxRotation

    x.set(rX)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={refMotionDiv}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        transform,
        ...(perspective && { perspective: "1000px" }),
      }}
      className={cn(className)}
    >
      <div
        style={{
          transform: `translateZ(${translateZ}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
