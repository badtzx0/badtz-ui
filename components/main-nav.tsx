"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { href: string; label: string }[]
}) {
  const pathname = usePathname()

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      {items.map((item) => {
        const isAffiliate = item.label === "Affiliate"

        if (isAffiliate) {
          return (
            <Button
              key={item.href}
              variant="nav"
              size="sm"
              className="cursor-not-allowed opacity-50"
              disabled
            >
              <span
                className={cn(pathname === item.href && "!text-foreground")}
              >
                {item.label}
              </span>
            </Button>
          )
        }

        return (
          <Button key={item.href} variant="nav" asChild size="sm">
            <Link
              href={item.href}
              className={cn(pathname === item.href && "!text-foreground")}
            >
              {item.label}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
