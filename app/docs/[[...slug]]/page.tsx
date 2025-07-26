import Link from "next/link"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react"
import { findNeighbour } from "fumadocs-core/server"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { createStaticOGMetadata } from "@/lib/metadata"
import { source } from "@/lib/source"
import { absoluteUrl } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookmarkButton } from "@/components/bookmark-button"
import { DocsCta } from "@/components/docs-cta"
import { DocsTableOfContents } from "@/components/docs-toc"
import { LLMCopyButton, ViewOptions } from "@/components/page-actions"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const doc = page.data

  if (!doc.title || !doc.description) {
    notFound()
  }

  return {
    ...createStaticOGMetadata(doc.title, doc.description),
    openGraph: {
      ...createStaticOGMetadata(doc.title, doc.description).openGraph,
      type: "article",
      url: absoluteUrl(page.url),
    },
    twitter: {
      ...createStaticOGMetadata(doc.title, doc.description).twitter,
      creator: "@badtz-ui",
    },
  }
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    notFound()
  }

  const doc = page.data
  // @ts-expect-error - revisit fumadocs types.
  const MDX = doc.body
  const neighbours = await findNeighbour(source.pageTree, page.url)

  // @ts-expect-error - revisit fumadocs types.
  const links = doc.links

  const owner = "badtzx0"
  const repo = "badtz-ui"

  return (
    <div
      data-slot="docs"
      className="mb-8 flex min-h-[calc(100dvh-56px)] items-stretch text-[1.05rem] sm:text-[15px] xl:w-full [&_h2]:mt-10"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <h1 className="font-gilroy scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                  {doc.title}
                </h1>
                <div className="flex items-center gap-2 pt-1.5">
                  {neighbours.previous && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link href={neighbours.previous.url}>
                        <IconArrowLeft />
                        <span className="sr-only">Previous</span>
                      </Link>
                    </Button>
                  )}
                  {neighbours.next && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link href={neighbours.next.url}>
                        <span className="sr-only">Next</span>
                        <IconArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              {doc.description && (
                <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                  {doc.description}
                </p>
              )}

              <div className="flex flex-row items-center gap-2 border-b pt-4 pb-6">
                <LLMCopyButton
                  markdownUrl={`/llms.mdx${page.url.replace("/docs", "")}`}
                />
                <ViewOptions
                  markdownUrl={`/llms.mdx${page.url.replace("/docs", "")}`}
                  githubUrl={`https://github.com/${owner}/${repo}/blob/main/content/docs/${page.path}`}
                />
                <BookmarkButton
                  className="ml-auto justify-self-end"
                  title={doc.title || "Documentation"}
                  href={page.url}
                />
              </div>
            </div>
            {links ? (
              <div className="flex items-center space-x-2 pt-4">
                {links?.doc && (
                  <Badge asChild variant="secondary">
                    <Link href={links.doc} target="_blank" rel="noreferrer">
                      Docs <IconArrowUpRight />
                    </Link>
                  </Badge>
                )}
                {links?.api && (
                  <Badge asChild variant="secondary">
                    <Link href={links.api} target="_blank" rel="noreferrer">
                      API Reference <IconArrowUpRight />
                    </Link>
                  </Badge>
                )}
              </div>
            ) : null}
          </div>
          <div className="w-full *:data-[slot=alert]:first:mt-0">
            <MDX components={mdxComponents} />
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-4 py-8 md:px-0">
          {neighbours.previous ? (
            <Link
              href={neighbours.previous.url}
              className="hover:bg-sidebar flex w-min flex-col items-start gap-2 rounded-md border px-3 py-2 transition-colors duration-200 md:w-1/2 md:px-3 md:py-3 md:text-left"
            >
              <div className="text-muted-foreground -ml-1 flex flex-row items-center gap-1 text-sm md:gap-0">
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </div>
              <span className="hidden font-medium md:block">
                {neighbours.previous.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {neighbours.next ? (
            <Link
              href={neighbours.next.url}
              className="hover:bg-sidebar flex w-min flex-col items-end gap-2 rounded-md border px-3 py-2 transition-colors duration-200 md:w-1/2 md:px-3 md:py-3 md:text-right"
            >
              <div className="text-muted-foreground -mr-1 flex flex-row items-center gap-1 text-sm md:gap-0">
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </div>
              <span className="hidden font-medium md:block">
                {neighbours.next.name}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className="sticky top-[calc(var(--header-height)+1px)] right-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] w-auto flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="flex max-w-60 flex-1 flex-col justify-start gap-12">
          <DocsCta />
          {/* @ts-expect-error - revisit fumadocs types. */}
          {doc.toc?.length ? (
            <ScrollArea className="h-[calc(100svh-var(--header-height)-var(--footer-height)-244px)]">
              {/* @ts-expect-error - revisit fumadocs types. */}
              <DocsTableOfContents toc={doc.toc} />
              <div className="h-12" />
            </ScrollArea>
          ) : null}
        </div>
      </div>
    </div>
  )
}
