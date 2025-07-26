"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TriangleDownIcon } from "@radix-ui/react-icons"
import { CircleArrowUp } from "lucide-react"

import { getCategoryIcon } from "@/lib/category-icons"
import { getColors } from "@/lib/colors"
import { siteConfig } from "@/lib/config"
import type { source } from "@/lib/source"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { BookmarkCollapsible } from "@/components/bookmark-collapsible"
import { CommandMenu } from "@/components/command-menu"
import { DocsDropdown } from "@/components/docs-dropdown"
import { GithubButton } from "@/components/github-button"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { SocialButton } from "@/components/social-button"

export function DocsSidebar({
  tree,
  children,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  tree: typeof source.pageTree
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const colors = getColors()
  const pageTree = tree

  return (
    <div className="bg-sidebar flex h-[100dvh] w-screen overflow-x-hidden pr-2.5 pl-2.5 lg:pl-0">
      <Sidebar
        className="sticky z-30 hidden h-[100dvh] !border-transparent bg-transparent lg:flex"
        collapsible="none"
        {...props}
      >
        <SidebarContent className="no-scrollbar px-1">
          <Link
            href="/"
            className="flex items-center px-4 pt-4 group-data-[collapsible=icon]:px-3"
          >
            <Icons.logo className="text-foreground size-5" />
            <span className="font-gilroy text-foreground ml-2 text-lg font-bold group-data-[collapsible=icon]:hidden">
              {siteConfig.name}
            </span>
            <span className="bg-muted text-foreground mt-1.5 rounded px-1 py-0.5 text-[10px] leading-none group-data-[collapsible=icon]:hidden">
              Beta
            </span>
          </Link>
          <div className="shrink-0" />
          <ScrollArea className="relative flex-1 overflow-auto">
            <div className="to-sidebar pointer-events-none absolute inset-x-0 bottom-0 z-20 h-6 bg-gradient-to-b from-transparent" />
            <SidebarGroup>
              <SidebarMenu>
                <BookmarkCollapsible />
                {tree.children.map((item) => {
                  const IconComponent = getCategoryIcon(item.name as string)
                  return (
                    <Collapsible
                      key={item.$id}
                      asChild
                      defaultOpen={true}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.name as string}
                            className="text-foreground !rounded-md !text-[13.5px] transition-colors duration-200"
                          >
                            <IconComponent className="!text-muted-foreground mb-[3px] h-3.5 w-3.5" />
                            <span className="whitespace-nowrap transition-opacity duration-200">
                              {item.name}
                            </span>
                            <TriangleDownIcon className="transition-transform group-data-[state=closed]/collapsible:-rotate-[90deg] group-data-[state=open]/collapsible:rotate-[0deg]" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="border-l-0 px-0 pb-5">
                            {item.type === "folder" &&
                              item.children.map((subItem) => {
                                return (
                                  subItem.type === "page" && (
                                    <SidebarMenuSubItem key={subItem.url}>
                                      <SidebarMenuSubButton
                                        asChild
                                        isActive={subItem.url === pathname}
                                        className="text-muted-foreground hover:text-foreground !rounded-md text-[13.5px] transition-colors duration-200"
                                      >
                                        <Link href={subItem.url}>
                                          <span className="whitespace-nowrap transition-opacity duration-200">
                                            {subItem.name}
                                          </span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  )
                                )
                              })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          </ScrollArea>
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            <Link
              href="https://pro.badtz-ui.com/"
              target="_blank"
              className="border-sidebar-border/70 hover:bg-sidebar-accent group/pro-plan text-foreground flex h-7 w-min cursor-pointer items-center rounded-full border pr-3 pl-1.5 text-xs whitespace-nowrap"
            >
              <CircleArrowUp className="mr-2 size-3.5 transition-colors duration-200" />
              Pro plan
            </Link>

            <div className="flex items-center justify-between">
              <div className="flex justify-center gap-0.5">
                <SocialButton
                  className="[&_svg]:size-3.5"
                  srOnly="GitHub Link"
                  src="https://github.com/badtzx0/badtz-ui"
                >
                  <Icons.gitHub />
                </SocialButton>
                <SocialButton
                  className="[&_svg]:size-3"
                  srOnly="Twitter Link"
                  src="https://x.com/badtz_ui"
                >
                  <Icons.twitter />
                </SocialButton>
                <SocialButton
                  srOnly="Discord Link"
                  src="https://discord.gg/SV2y7vz6Es"
                  className="[&_svg]:size-4"
                >
                  <Icons.discord />
                </SocialButton>
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
      <div className="flex max-h-[100dvh] flex-1 flex-col">
        <div className="flex h-15 w-full items-center justify-between py-2 lg:h-11.5 lg:justify-end">
          <div className="flex items-center">
            <MobileNav
              tree={pageTree}
              items={siteConfig.navItems}
              className="flex lg:hidden"
            />
          </div>
          {/*
          <SidebarTrigger className="pointer-events-auto" />
          */}
          <div className="flex items-center">
            <GithubButton />
            <Separator orientation="vertical" className="mx-2 !h-[20px]" />
            <ModeSwitcher />
            <Separator orientation="vertical" className="mr-3 ml-2 !h-[20px]" />
            <div>
              <CommandMenu
                tree={tree}
                colors={colors}
                className="pointer-events-auto"
              />
            </div>
            <div className="hidden items-center lg:flex">
              <Separator
                orientation="vertical"
                className="mr-2 ml-3 !h-[20px]"
              />
              <DocsDropdown />
            </div>
          </div>
        </div>
        <div className="bg-background border-border mb-2 flex-1 overflow-auto rounded-lg border">
          {children}
        </div>
      </div>
    </div>
  )
}
