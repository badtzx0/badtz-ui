"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function GithubSectionButton() {
  return (
    <Button
      asChild
      size="lg"
      variant="default"
      className="bg-foreground hover:bg-foreground/90 text-background relative z-5 mt-6 rounded-lg px-4"
    >
      <Link
        href="https://github.com/badtzx0/badtz-ui"
        target="_blank"
        onClick={() => {
          if (typeof window !== "undefined" && window.datafast) {
            window.datafast("clicked_github_from_section")
          }
        }}
      >
        <Icons.gitHub /> Star BadtzUI
      </Link>
    </Button>
  )
}
