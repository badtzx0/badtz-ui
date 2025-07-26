import Link from "next/link"

import { ShinyButton } from "@/components/ui/shiny-button"

export function Announcement({
  children,
  link,
}: {
  children: React.ReactNode
  link?: string
}) {
  return (
    <Link
      href={link ?? ""}
      className="after:bg-primary/5 relative rounded-full after:absolute after:inset-0 after:z-1 after:rounded-full"
    >
      <ShinyButton className="relative z-5 px-5 text-sm">
        {children}
      </ShinyButton>
    </Link>
  )
}
