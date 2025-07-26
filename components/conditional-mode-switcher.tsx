"use client"

import { usePathname } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { ModeSwitcher } from "@/components/mode-switcher"

export function ConditionalModeSwitcher() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  if (isHomePage) {
    return null
  }

  return (
    <>
      <Separator orientation="vertical" className="ml-1 !h-[20px]" />
      <ModeSwitcher />
    </>
  )
}
