"use client"

import React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export const Meteors = ({
  number,
  className,
}: {
  number?: number
  className?: string
}) => {
  const meteors = new Array(number || 20).fill(true)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((_, idx) => {
        const meteorCount = number || 20
        const position = idx * (800 / meteorCount) - 400
        const delay = (idx % 5) + 1
        const duration = (idx % 3) + 5

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute z-[2] h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-white shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: "-40px",
              left: position + "px",
              animationDelay: delay + "s",
              animationDuration: duration + "s",
            }}
          ></span>
        )
      })}
    </motion.div>
  )
}
