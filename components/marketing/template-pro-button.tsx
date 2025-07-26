"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function TemplateProButton() {
  return (
    <Link
      href="https://pro.badtz-ui.com"
      target="_blank"
      onClick={() => {
        if (typeof window !== "undefined" && window.datafast) {
          window.datafast("clicked_pro_from_templates")
        }
      }}
    >
      <Button variant="gradient" className="w-fit text-[13.5px]">
        Badtz UI Pro <ExternalLink className="h-3.5 w-3.5" />
      </Button>
    </Link>
  )
}
