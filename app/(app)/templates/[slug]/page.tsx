import Link from "next/link"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"

import { createStaticOGMetadata } from "@/lib/metadata"
import { getAllTemplates } from "@/lib/templates"
import { templatesSource } from "@/lib/templates-source"
import { absoluteUrl } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { TemplateTags } from "@/components/templates-tag"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  const templates = getAllTemplates()
  return templates.map((template) => ({
    slug: template.slug,
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = templatesSource.getPage([params.slug])

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
export default async function TemplatePage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = templatesSource.getPage([params.slug])

  if (!page) {
    notFound()
  }
  const doc = page.data
  const MDX = doc.body

  return (
    <div className="mx-auto flex max-w-4xl flex-col py-6 md:py-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/templates">Templates</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{doc.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex w-full min-w-0 flex-1 flex-col gap-6 py-6 lg:py-8">
        <div className="flex flex-col gap-4">
          <h1 className="font-gilroy scroll-m-20 text-3xl font-semibold tracking-tight">
            {doc.title}
          </h1>
          <TemplateTags tags={doc.tags || []} />
          {doc.description && (
            <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
              {doc.description}
            </p>
          )}
        </div>

        {MDX ? (
          <div className="prose prose-neutral dark:prose-invert w-full max-w-none flex-1">
            <MDX components={mdxComponents} />
          </div>
        ) : (
          <div className="text-muted-foreground">
            Template content not available
          </div>
        )}
      </div>
    </div>
  )
}
