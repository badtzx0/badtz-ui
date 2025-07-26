"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function TemplateLiveDemoButton({
  href,
  index,
}: {
  href: string
  index: number
}) {
  return (
    <Link
      href={href}
      target="_blank"
      onClick={() => {
        if (typeof window !== "undefined" && window.datafast) {
          window.datafast("clicked_live_demo")
        }
      }}
    >
      <Button className="h-9 text-[13.5px]" variant="outline">
        <ExternalLink className="h-3.5 w-3.5" />
        Live Demo {index + 1}
      </Button>
    </Link>
  )
}
