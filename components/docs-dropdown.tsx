"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, HeartHandshake } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DocsDropdown() {
  const pathname = usePathname()

  const githubBaseUrl = "https://github.com/badtzx0/badtz-ui/blob/main/content"
  const githubEditUrl = `${githubBaseUrl}${pathname}.mdx`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="group/contribute text-foreground/80 bg-surface hover:text-foreground hover:bg-muted/60 [&_svg]:text-foreground flex h-8 items-center justify-center rounded-md border border-transparent px-2 text-[13.5px] shadow-none transition-colors [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0">
          <HeartHandshake className="group-hover/contribute:animate-handshake size-3.5 opacity-80 transition-colors" />
          <span>Contribute</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 mb-4 w-56 shadow-sm" align="start">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>GitHub</DropdownMenuSubTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                  <Link
                    href={githubEditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Edit this Page
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="https://github.com/badtzx0/badtz-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repo
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem asChild>
            <Link
              href="https://github.com/badtzx0/badtz-ui/discussions/categories/component-suggestions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request a component
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://github.com/badtzx0/badtz-ui/discussions/categories/bug-reports"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report a Bug
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://github.com/badtzx0/badtz-ui/discussions/categories/general"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
