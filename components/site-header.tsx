import Link from "next/link"

import { getColors } from "@/lib/colors"
import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"
import { Separator } from "@/components/ui/separator"
import { CommandMenu } from "@/components/command-menu"
import { ConditionalModeSwitcher } from "@/components/conditional-mode-switcher"
import { GithubButton } from "@/components/github-button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { SocialButton } from "@/components/social-button"

export function SiteHeader() {
  const colors = getColors()
  const pageTree = source.pageTree

  return (
    <header className="bg-background/70 border-border/70 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container-wrapper 3xl:fixed:px-0 max-w-7xl px-6">
        <div className="flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <MobileNav
            tree={pageTree}
            items={siteConfig.navItems}
            className="flex lg:hidden"
          />
          <Link href="/" className="mr-4 hidden items-center gap-2 lg:flex">
            <Icons.logo className="size-5" />
            <span className="font-gilroy text-lg font-bold">
              {siteConfig.name}
            </span>
            <span className="bg-muted mt-2 -ml-0.5 rounded px-1 py-0.5 text-[10px] leading-none">
              Beta
            </span>
          </Link>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <GithubButton />
            <Separator orientation="vertical" className="mr-1 !h-[20px]" />
            <div className="w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu tree={pageTree} colors={colors} />
            </div>
            <Separator
              orientation="vertical"
              className="ml-1 hidden !h-[20px] md:block"
            />
            <SocialButton
              className="hidden md:flex [&_svg]:size-3"
              srOnly="Twitter Link"
              src="https://x.com/badtz_ui"
            >
              <Icons.twitter />
            </SocialButton>
            <SocialButton
              srOnly="Discord Link"
              src="https://discord.gg/SV2y7vz6Es"
              className="hidden md:flex [&_svg]:size-4"
            >
              <Icons.discord />
            </SocialButton>
            <ConditionalModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
