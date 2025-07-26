"use client"

import Link from "next/link"
import { ExternalLink, ExternalLinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

interface LiveDemo {
  title: string
  href: string
}

interface TemplatesActionButtonsProps {
  liveDemos?: LiveDemo[]
  templateRole?: string
  templateSlug?: string
}

export function TemplatesActionButtons({
  liveDemos = [],
}: TemplatesActionButtonsProps) {
  return (
    <div className="mb-8 flex flex-row flex-wrap gap-3">
      <Link
        href="https://pro.badtz-ui.com"
        target="_blank"
        onClick={() => {
          if (typeof window !== "undefined" && window.datafast) {
            window.datafast("clicked_pro_from_templates")
          }
        }}
      >
        <Button variant="gradient" className="h-8 w-fit text-[13.5px]">
          BadtzUI Pro <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </Link>

      {liveDemos.map((demo, index) => (
        <Link
          key={index}
          href={demo.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined" && window.datafast) {
              window.datafast("clicked_live_demo")
            }
          }}
        >
          <Button variant="outline" className="h-8 [&_svg]:size-3.5">
            <ExternalLinkIcon />
            {demo.title}
          </Button>
        </Link>
      ))}
    </div>
  )
}
