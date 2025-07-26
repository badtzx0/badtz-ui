import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Icons } from "@/components/icons"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

interface LinkType {
  href: string
  label: string
  itemProp?: string
}

interface LinkSectionProps {
  title: string
  links: LinkType[]
}

const CURRENT_YEAR = new Date().getFullYear()

const LinkSection: React.FC<LinkSectionProps> = ({ title, links }) => {
  return (
    <nav
      aria-label={title}
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <div className="flex flex-col md:text-sm">
        <h3 className="text-foreground mb-6 font-medium" itemProp="name">
          {title}
        </h3>
        <ul className="text-muted-foreground space-y-3 text-[13.5px]">
          {links.map(({ href, label }) => {
            const isTracked =
              href === "https://github.com/badtzx0/badtz-ui" ||
              href === "https://pro.badtz-ui.com" ||
              href === "https://x.com/badtz_ui"

            const isSocial =
              href === "https://discord.com/invite/SV2y7vz6Es" ||
              href === "https://x.com/badtz_ui"

            return (
              <li key={href}>
                {isTracked ? (
                  <Link
                    href={href}
                    className="text-sidebar-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {label}
                  </Link>
                ) : (
                  <Link
                    href={href}
                    target={isSocial ? "_blank" : undefined}
                    rel={isSocial ? "noopener noreferrer" : undefined}
                    className="text-sidebar-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

const FOOTER_SECTIONS: { title: string; links: LinkType[] }[] = [
  {
    title: "Products",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/docs/components/3d-wrapper", label: "Components" },
      { href: "/docs/templates", label: "Templates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/docs", label: "Documentation" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "https://discord.com/invite/SV2y7vz6Es", label: "Discord" },
      { href: "https://x.com/badtz_ui", label: "Twitter" },
    ],
  },
  {
    title: "Company",
    links: [{ href: "/", label: "About" }],
  },
]

export function SiteFooter() {
  return (
    <footer
      className="w-full border-t"
      aria-label="Footer"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div
        className="mx-auto max-w-7xl px-6 pt-12 pb-12 lg:px-8"
        itemScope
        itemType="https://schema.org/Organization"
        itemID="#organization"
      >
        <meta itemProp="name" content="BadtzUI" />
        <link itemProp="url" href={baseUrl} />
        <meta itemProp="logo" content={`${baseUrl}/static/badtz-ui-logo.png`} />

        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:gap-20">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="size-5" />
              <span className="font-gilroy text-lg font-bold">
                {siteConfig.name}
              </span>
            </Link>
            <p
              className="text-muted-foreground md:text-sm"
              itemProp="description"
            >
              Built in public by{" "}
              <Link
                target="_blank"
                rel="noreferrer"
                className="font-medium underline-offset-2 hover:underline"
                href="https://x.com/badtz_ui"
                itemProp="founder"
              >
                Badtz
              </Link>
              <br />
            </p>
            <div itemScope itemType="https://schema.org/ContactPoint">
              <meta itemProp="email" content="contact@badtz-ui.com" />
              <meta itemProp="contactType" content="customer service" />
              <meta itemProp="url" content={baseUrl} />
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-8 md:w-auto lg:grid-cols-4">
            {FOOTER_SECTIONS.map((section) => (
              <LinkSection
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>
        <p
          className="text-muted-foreground mt-10 text-xs"
          itemScope
          itemType="https://schema.org/CreativeWork"
        >
          <meta itemProp="copyrightYear" content={CURRENT_YEAR.toString()} />
          <span itemProp="copyrightHolder">© {CURRENT_YEAR} BadtzUI.</span> All
          rights reserved.
        </p>
      </div>
    </footer>
  )
}
