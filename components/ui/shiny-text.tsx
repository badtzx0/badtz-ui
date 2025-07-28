"use client"

import { motion } from "motion/react"

export interface ShinyTextProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  width?: number
}

export const ShinyText = ({
  children,
  duration = 2,
  delay = 0,
  width = 20,
}: ShinyTextProps) => {
  return (
    <motion.p
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        repeatDelay: delay,
        ease: "linear",
      }}
      className="text-gradient-safari relative inline-block bg-no-repeat"
      style={{
        backgroundSize: "250% 100%",
        backgroundImage: `
          linear-gradient(
            90deg,
            transparent calc(50% - ${width}px),
            #ffffff 50%,
            transparent calc(50% + ${width}px)
          ),
          linear-gradient(#b5b5b5a4,#b5b5b5a4)
        `,
      }}
    >
      {children}
    </motion.p>
  )
}
