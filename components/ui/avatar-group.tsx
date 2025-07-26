"use client"

import * as React from "react"
import { motion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

type AvatarProps = {
  children: React.ReactNode
  zIndex: number
  transition: Transition
  translate: string | number
}

function AvatarContainer({
  children,
  zIndex,
  transition,
  translate,
}: AvatarProps) {
  return (
    <motion.div
      data-slot="avatar-container"
      initial="initial"
      whileHover="hover"
      whileTap="hover"
      className="relative"
      style={{ zIndex }}
    >
      <motion.div
        variants={{
          initial: { translateY: 0 },
          hover: { translateY: translate },
        }}
        transition={transition}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

type AvatarGroupProps = Omit<React.ComponentProps<"div">, "translate"> & {
  children: React.ReactElement[]
  transition?: Transition
  invertOverlap?: boolean
  translate?: string | number
}

function AvatarGroup({
  ref,
  children,
  className,
  transition = { type: "spring", stiffness: 300, damping: 17 },
  invertOverlap = false,
  translate = "-30%",
  ...props
}: AvatarGroupProps) {
  return (
    <div
      ref={ref}
      data-slot="avatar-group"
      className={cn("flex h-8 flex-row items-center -space-x-2", className)}
      {...props}
    >
      {children?.map((child, index) => (
        <AvatarContainer
          key={index}
          zIndex={
            invertOverlap ? React.Children.count(children) - index : index
          }
          transition={transition}
          translate={translate}
        >
          {child}
        </AvatarContainer>
      ))}
    </div>
  )
}

export { AvatarGroup, type AvatarGroupProps }
