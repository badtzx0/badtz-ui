"use client"

import { ExternalLink } from "lucide-react"

import { useDataFast } from "@/lib/datafast-client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function DocsCta({ className }: React.ComponentProps<"div">) {
  const { track } = useDataFast()

  const handleComponentsClick = () => {
    track("clicked_pro_from_docs")
  }

  return (
    <div
      className={cn(
        "group border-[#1111111a] dark:border-[#171717] [box-shadow:0_0_0_1px_#fff] dark:[box-shadow:0_0_0_1px_#17171750] rounded-2xl  relative flex flex-col gap-2  border p-5 text-sm [&_svg]:size-3.5",
        className
      )}
    >
      <Image
        src="https://cdn.reechlist.com/logo.svg"
        alt="Reechlist Logo"
        width={30}
        height={30}
        className="mb-2"
      />
      <div className="text-lg leading-tight font-bold text-balance group-hover:underline bg-linear-to-b from-[#484c4e] to-[#1b2023] dark:from-white dark:to-[#999999] bg-clip-text text-transparent">
        Find <span className="font-instrument-serif italic text-xl leading-none">customers</span> before you even <span className="font-instrument-serif italic text-xl leading-none">launch</span>.
      </div>
      <div className="text-foreground/80">
        Reechlist finds people actively asking for what you're building.
      </div>

      <Button
        size="sm"
        variant="default"
        className="mt-2 rounded-lg flex w-full items-center justify-center !text-[13.5px]  bg-linear-to-b from-[#2487EB] to-[#1D69DE] [text-shadow:0_1px_1px_rgba(32,34,36,0.25)] border border-[#1D69DE] hover:opacity-90 text-white [box-shadow:0px_-12px_16px_0px_rgba(255,255,255,0.06)_inset,0px_4px_16px_0px_rgba(255,255,255,0.16)_inset,0px_0.75px_0.25px_0px_rgba(255,255,255,0.12)_inset,0px_0.25px_0.25px_0px_rgba(255,255,255,0.32)_inset,0px_6px_12px_0px_rgba(0,0,0,0.02),0px_3px_6px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.03),0px_0.5px_0.5px_0px_rgba(0,0,0,0.06),0px_3px_6px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)] text-center"
      >
        Get My Free Scan

      </Button>
      <a
        href="https://reechlist.com"
        target="_blank"
        className="absolute inset-0"
        onClick={handleComponentsClick}
      >
        <span className="sr-only">Get My Free Scan</span>
      </a>
    </div>
  )
}
