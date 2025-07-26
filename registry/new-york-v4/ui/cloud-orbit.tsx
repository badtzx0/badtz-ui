"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface Image {
  url: string
  name: string
}

interface CloudOrbitProps {
  duration?: number
  children?: React.ReactNode
  size?: number
  className?: string
  images?: Image[]
  [key: string]:
    | string
    | number
    | boolean
    | React.ReactNode
    | Image[]
    | undefined
}

export function CloudOrbit({
  duration = 2,
  children,
  size = 160,
  className,
  images = [],
  ...props
}: CloudOrbitProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const lastTimestamp = React.useRef(0)

  React.useEffect(() => {
    let animationFrameId: number

    const updateFrame = (timestamp: number) => {
      if (lastTimestamp.current === 0) {
        lastTimestamp.current = timestamp
      }

      const elapsedTime = (timestamp - lastTimestamp.current) / 1000
      const currentImageIndex =
        Math.floor(elapsedTime / duration) % images.length

      setCurrentIndex(currentImageIndex)

      animationFrameId = requestAnimationFrame(updateFrame)
    }

    if (images.length > 0) {
      animationFrameId = requestAnimationFrame(updateFrame)
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [duration, images.length])

  return (
    <div
      style={
        {
          "--size": `${size}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative flex h-full w-full items-center justify-center rounded-full select-none",
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {images.length > 0 &&
          images.map(
            (image, index) =>
              index === currentIndex && (
                <motion.img
                  key={image.url}
                  src={image.url}
                  alt={image.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [0.8, 1] }}
                  exit={{ opacity: 0, scale: [1, 0.8] }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 7,
                  }}
                  className={cn(
                    "absolute z-10 rounded-[inherit] border border-gray-100 bg-gradient-to-t from-neutral-100 to-white inset-shadow-sm inset-shadow-black/2 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:inset-shadow-white/7",
                    className
                  )}
                  style={{ width: size, height: size }}
                />
              )
          )}
      </AnimatePresence>
      {children}
    </div>
  )
}

interface OrbitingImageProps {
  speed?: number
  radius?: number
  startAt?: number
  size?: number
  className?: string
  images?: Image[]
  duration?: number
  [key: string]:
    | string
    | number
    | boolean
    | React.ReactNode
    | Image[]
    | undefined
}

export function OrbitingImage({
  speed = 20,
  radius = 100,
  startAt = 0,
  size = 80,
  className,
  images = [],
  duration = 2,
  ...props
}: OrbitingImageProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const lastTimestamp = React.useRef(0)

  React.useEffect(() => {
    let animationFrameId: number

    const updateFrame = (timestamp: number) => {
      if (lastTimestamp.current === 0) {
        lastTimestamp.current = timestamp
      }

      const elapsedTime = (timestamp - lastTimestamp.current) / 1000
      const currentImageIndex =
        Math.floor(elapsedTime / duration) % images.length

      setCurrentIndex(currentImageIndex)

      animationFrameId = requestAnimationFrame(updateFrame)
    }

    if (images.length > 0) {
      animationFrameId = requestAnimationFrame(updateFrame)
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [duration, images.length])

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{
        transform: [
          `rotate(${startAt * 360}deg) translateY(-${radius}px) rotate(-${startAt * 360}deg)`,
          `rotate(${startAt * 360 + 90}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 90}deg)`,
          `rotate(${startAt * 360 + 180}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 180}deg)`,
          `rotate(${startAt * 360 + 270}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 270}deg)`,
          `rotate(${startAt * 360 + 360}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 360}deg)`,
        ],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
      className={cn(
        "absolute z-[5] flex transform-gpu items-center justify-center rounded-full p-[5%]",
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {images.length > 0 &&
          images.map(
            (image, index) =>
              index === currentIndex && (
                <motion.div
                  key={image.url}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    position: "absolute",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [0.8, 1] }}
                  exit={{ opacity: 0, scale: [1, 0.8] }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 7,
                  }}
                  className={cn(
                    "rounded-full border border-gray-100 bg-gradient-to-t from-neutral-100 to-white p-[15%] inset-shadow-sm inset-shadow-black/2 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:inset-shadow-white/7",
                    className
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="flex h-full w-full items-center justify-center rounded-full object-contain"
                  />
                </motion.div>
              )
          )}
      </AnimatePresence>
    </motion.div>
  )
}
