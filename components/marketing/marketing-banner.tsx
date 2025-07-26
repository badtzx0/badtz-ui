"use client"

import { useState } from "react"
import Link from "next/link"
import { XIcon } from "lucide-react"

import { useDataFast } from "@/lib/datafast-client"
import { Button } from "@/components/ui/button"

export function MarketingBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const { track } = useDataFast()

  // Hide banner if user manually closed it
  if (!isVisible) {
    return null
  }

  const handleBannerClick = () => {
    track("clicked_pro_from_banner")
  }

  return (
    <Link
      href="https://pro.badtz-ui.com"
      target="_blank"
      onClick={handleBannerClick}
    >
      <div className="text-foreground accent-shadow border-primary/20 cursor-pointer border-b py-1.5">
        <div className="relative mx-auto flex max-w-7xl items-center gap-x-2 px-4">
          <div className="flex gap-3 md:items-center">
            <div
              className="border-primary/40 accent-shadow flex size-7 shrink-0 items-center justify-center rounded-full border pt-px pl-0.5 text-[13px] max-md:mt-0.5"
              aria-hidden="true"
            >
              🎉
            </div>
            <div className="flex-col gap-3">
              <div className="mt-1.5 flex flex-col items-start gap-1 md:mt-0 md:flex-row md:items-center">
                <p className="text-sm font-medium">Get BadtzUI Pro!</p>
                <p className="text-foreground/80 mb-1 text-sm sm:mb-0">
                  Access prebuilt templates & blocks for ReactJS. Build faster
                  while converting more users to customers.
                </p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="group pointer-events-auto absolute top-0.5 right-1 -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent md:top-1 md:right-0"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsVisible(false)
            }}
            aria-label="Close banner"
          >
            <XIcon
              size={16}
              className="opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </Link>
  )
}
