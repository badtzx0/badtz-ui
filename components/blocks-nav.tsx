"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// @ts-expect-error - JSON import for build-generated file
import blockCounts from "@/registry/__block-counts__.json"
import { registryCategories } from "@/registry/registry-categories"

export function BlocksNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn("space-y-8", className)}>
      {Object.entries(registryCategories).map(([sectionKey, section]) => (
        <div key={sectionKey} className="space-y-4">
          <div className="space-y-1">
            <h2 className="font-gilroy text-xl tracking-tight">
              {section.title}
            </h2>
            <p className="text-muted-foreground">{section.description}</p>
          </div>
          <div className="relative">
            <ScrollArea className="max-w-none">
              <div className="grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {section.categories.map((category) => (
                  <BlocksNavLink
                    key={category.slug}
                    category={category}
                    isActive={pathname === `/blocks/${category.slug}`}
                    image={category.image.src}
                    alt={category.image.alt}
                    blockCount={blockCounts[category.slug] || 0}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>
        </div>
      ))}
    </div>
  )
}

function BlocksNavLink({
  category,
  isActive,
  image,
  alt,
  blockCount,
}: {
  category: {
    name: string
    slug: string
    hidden: boolean
    image: {
      src: string
      alt: string
    }
  }
  isActive: boolean
  image: string
  alt: string
  blockCount: number
}) {
  if (category.hidden) {
    return null
  }

  return (
    <>
      <Link
        href={`/blocks/${category.slug}`}
        key={category.slug}
        className="bg-secondary inset-shadow-border/50 dark:inset-shadow-border/10 transform-origin-center hover:border-border relative flex items-center justify-center rounded-md border border-transparent shadow-none inset-shadow-sm transition-all hover:scale-[1.02]"
        data-active={isActive}
      >
        <Image
          src={image}
          alt={alt}
          width={300}
          height={180}
          className="pointer-events-none rounded-md invert dark:opacity-80 dark:invert-0"
          quality={100}
        />
        <div className="from-card absolute inset-0 flex items-end rounded-md bg-gradient-to-t p-3">
          <div>
            <h3 className="mt-auto text-base leading-none font-medium">
              {category.name}
            </h3>
            <span className="text-muted-foreground text-sm">
              {blockCount} components
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}
