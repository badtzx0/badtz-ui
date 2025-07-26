"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TriangleDownIcon } from "@radix-ui/react-icons"
import { Bookmark } from "lucide-react"

import { useBookmarks } from "@/hooks/use-bookmarks"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function BookmarkCollapsible() {
  const pathname = usePathname()
  const { bookmarks, isLoaded } = useBookmarks()

  if (!isLoaded || !bookmarks || bookmarks.length === 0) {
    return null
  }

  return (
    <Collapsible asChild defaultOpen={true} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip="Bookmarks"
            className="text-foreground !rounded-md !text-[13.5px] transition-colors duration-200"
          >
            <Bookmark className="!text-muted-foreground mb-[3px] h-3.5 w-3.5" />
            <span className="whitespace-nowrap transition-opacity duration-200">
              Bookmarks
            </span>
            <TriangleDownIcon className="transition-transform group-data-[state=closed]/collapsible:-rotate-[90deg] group-data-[state=open]/collapsible:rotate-[0deg]" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="border-l-0 px-0 pb-5">
            {bookmarks.map((bookmark) => {
              if (!bookmark.href || !bookmark.title) return null

              return (
                <SidebarMenuSubItem key={`bookmark-${bookmark.href}`}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={bookmark.href === pathname}
                    className="text-muted-foreground hover:text-foreground !rounded-md text-[13.5px] transition-colors duration-200"
                  >
                    <Link href={bookmark.href}>
                      <span className="whitespace-nowrap transition-opacity duration-200">
                        {bookmark.title}
                      </span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
