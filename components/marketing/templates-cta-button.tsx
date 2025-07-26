"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"

export function TemplatesCTAButton() {
  return (
    <Button asChild size="lg" variant="gradient" className="rounded-lg px-4">
      <Link
        href="https://pro.badtz-ui.com/docs/templates"
        target="_blank"
        onClick={() => {
          if (typeof window !== "undefined" && window.datafast) {
            window.datafast("clicked_pro_from_templates")
          }
        }}
      >
        Learn More <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </Button>
  )
}
