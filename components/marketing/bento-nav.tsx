"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  text: string
}

interface BentoNavProps {
  className?: string
  options: NavItem[]
}

function useResponsiveItems(options: NavItem[]) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile ? options.slice(0, 3) : options
}

export function BentoNav({ className, options }: BentoNavProps) {
  const [activeTab, setActiveTab] = useState<string>(options[0].name)
  const responsiveOptions = useResponsiveItems(options)

  return (
    <div className="flex flex-col items-center gap-6 text-center md:items-end md:text-right">
      <nav
        className={cn(
          "border-border bg-secondary relative flex w-fit items-center rounded-full border",
          className
        )}
      >
        {responsiveOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => setActiveTab(option.name)}
            className={cn("relative z-[1] px-4 py-2", {
              "z-0": activeTab === option.name,
            })}
          >
            {activeTab === option.name && (
              <motion.div
                layoutId="active-tab"
                className="bg-secondary outline-border absolute inset-0 overflow-hidden rounded-full outline-1"
                transition={{
                  duration: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  velocity: 2,
                }}
              />
            )}
            <span
              className={cn(
                "relative block text-sm tracking-tight transition-colors duration-200",
                activeTab === option.name
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {option.name}
            </span>
          </button>
        ))}
      </nav>
      <AnimatePresence mode="wait">
        <motion.p
          key={activeTab}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground text-base tracking-tight text-balance"
        >
          {options.find((option) => option.name === activeTab)?.text}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
