"use client"

import Link from "next/link"

import { GOAL_NAMES, useDataFast } from "@/lib/datafast-client"
import { Button } from "@/components/ui/button"

export function BlocksCTAButton() {
  const { track } = useDataFast()

  const handleBlocksCTAClick = () => {
    track(GOAL_NAMES.PRICING_CLICKED_CTA)
  }

  return (
    <Button asChild size="lg" variant="gradient" className="rounded-lg px-4">
      <Link href="/pricing" onClick={handleBlocksCTAClick}>
        Get Full Access
      </Link>
    </Button>
  )
}
