"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { GOAL_NAMES, useDataFast } from "@/lib/datafast-client"
import { Button } from "@/components/ui/button"

export function HeroButtons() {
  const { track } = useDataFast()

  const handlePricingClick = () => {
    track(GOAL_NAMES.PRICING_CLICKED_HERO)
  }

  const handleBrowseBlocksClick = () => {
    track("clicked_pro_from_hero")
  }

  return (
    <>
      <Button
        asChild
        size="lg"
        variant="default"
        className="bg-foreground hover:bg-foreground/90 text-background rounded-lg px-4"
      >
        <Link href="/docs" onClick={handlePricingClick}>
          Get Started
        </Link>
      </Button>
      <Button asChild size="lg" variant="hero" className="rounded-lg px-4">
        <Link
          href="https://pro.badtz-ui.com"
          target="_blank"
          className="group flex items-center text-sm"
          onClick={handleBrowseBlocksClick}
        >
          Badtz UI Pro
          <ExternalLink strokeWidth={1.5} className="size-3.5" />
        </Link>
      </Button>
    </>
  )
}
