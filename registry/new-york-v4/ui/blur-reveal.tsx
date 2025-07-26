"use client"

import * as React from "react"
import { motion, useInView } from "motion/react"

import { cn } from "@/lib/utils"

interface BlurRevealProps {
  className?: string
  children: React.ReactNode
  delay?: number
  duration?: number
}

export function BlurReveal({
  className,
  children,
  delay = 0,
  duration = 1,
}: BlurRevealProps) {
  const spanRef = React.useRef<HTMLSpanElement | null>(null)
  const isInView: boolean = useInView(spanRef, { once: true })

  return (
    <motion.span
      ref={spanRef}
      initial={{ opacity: 0, filter: "blur(10px)", y: "20%" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)", y: "0%" } : {}}
      transition={{ duration: duration, delay: delay }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  )
}
