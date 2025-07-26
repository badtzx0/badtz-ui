"use client"

import { ExternalLink } from "lucide-react"

import { useDataFast } from "@/lib/datafast-client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DocsCta({ className }: React.ComponentProps<"div">) {
  const { track } = useDataFast()

  const handleComponentsClick = () => {
    track("clicked_pro_from_docs")
  }

  return (
    <div
      className={cn(
        "group border-border/70 bg-surface text-surface-foreground relative flex flex-col gap-2 rounded-lg border p-5 text-sm [&_svg]:size-3.5",
        className
      )}
    >
      <div className="text-base leading-tight font-semibold text-balance group-hover:underline">
        Ship Beautiful React apps that convert!
      </div>
      <div className="text-muted-foreground">
        Get BadtzUI Pro and access prebuilt templates & blocks for ReactJS.
      </div>
      <div className="text-muted-foreground">
        Build faster while converting more users to customers.
      </div>
      <Button
        size="sm"
        variant="default"
        className="mt-2 flex w-full items-center justify-between rounded !text-[13.5px] text-white"
      >
        BadtzUI Pro
        <ExternalLink />
      </Button>
      <a
        href="https://pro.badtz-ui.com"
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0"
        onClick={handleComponentsClick}
      >
        <span className="sr-only">Badtz UI</span>
      </a>
    </div>
  )
}
