"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"

type LogoItem = string | React.ComponentType

export interface LogoCarouselProps {
  logos: LogoItem[][]
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [logos])

  const currentLogos = logos[currentIndex]
  const nextLogos = logos[(currentIndex + 1) % logos.length]

  return (
    <div className="grid w-full place-items-center">
      <div className="relative col-start-1 row-start-1 grid w-full grid-cols-2 flex-nowrap gap-x-4 gap-y-14 lg:flex lg:items-stretch lg:justify-between lg:gap-0">
        <AnimatePresence mode="popLayout">
          {currentLogos.map((logo, index) => (
            <motion.div
              key={`${currentIndex}-${index}`}
              initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(5px)" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 25,
                mass: 0.2,
                delay: 0.13 * index,
                opacity: {
                  delay: index * 0.13,
                },
              }}
              className="will-change-[filter] [&_img]:h-full [&_img]:w-full [&_svg]:h-full [&_svg]:w-full"
            >
              <LogoRenderer logo={logo} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 col-start-1 row-start-1 grid w-full grid-cols-2 gap-4 lg:flex lg:flex-nowrap lg:items-stretch lg:justify-between lg:gap-0"
      >
        {nextLogos.map((logo, index) => (
          <div
            key={`preload-${index}`}
            className="flex h-full flex-1 items-center justify-center"
          >
            <LogoRenderer logo={logo} />
          </div>
        ))}
      </div>
    </div>
  )
}

const LogoRenderer = ({ logo }: { logo: string | React.ElementType }) => {
  if (typeof logo === "string") {
    return (
      <Image
        src={logo}
        className="h-full max-h-[26px] w-full object-contain invert dark:invert-0"
        alt=""
        width={100}
        height={26}
      />
    )
  }

  const LogoComponent = logo
  return <LogoComponent />
}
