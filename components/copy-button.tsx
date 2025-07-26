"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { useDataFast } from "@/lib/datafast-client"
import { Event, trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value)
  if (event) {
    trackEvent(event)
  }
}

export function CopyButton({
  value,
  className,
  event,
  title,
}: Omit<
  React.ComponentProps<typeof Button>,
  "onDrag" | "onDragStart" | "onDragEnd"
> & {
  value: string
  src?: string
  event?: Event["name"]
  title?: string
}) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const { track } = useDataFast()

  React.useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false)
      }, 2000)
    }
  }, [hasCopied])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          data-slot="copy-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "bg-code copy-button focus-visible:border-ring focus-visible:ring-ring/50 text-muted-foreground/70 hover:text-foreground/70 hover:bg-muted absolute top-1 right-1 z-25 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-70 transition-colors outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            className
          )}
          onClick={() => {
            copyToClipboardWithMeta(
              value,
              event
                ? {
                    name: event,
                    properties: {
                      code: value,
                    },
                  }
                : undefined
            )

            let goalName = "copied"
            if (title) {
              let cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "_")
              if (cleanTitle.startsWith("components_ui_")) {
                cleanTitle = cleanTitle.replace(/^components_ui_/, "source_")
              }
              goalName = `copied_${cleanTitle}`
            } else {
              let slug = ""
              if (typeof window !== "undefined") {
                const parts = window.location.pathname
                  .split("/")
                  .filter(Boolean)
                slug = parts[parts.length - 1] || ""
                slug = slug.toLowerCase().replace(/[^a-z0-9]/g, "_")
              }
              if (slug) {
                goalName = `copied_${slug}`
              }
            }
            goalName = goalName.substring(0, 32)
            track(goalName)

            setHasCopied(true)
          }}
        >
          <span className="sr-only">Copy</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={hasCopied ? "check" : "copy"}
              data-slot="copy-button-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipContent>
    </Tooltip>
  )
}
