import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { createStaticOGMetadata } from "@/lib/metadata"
import { getAllTemplates } from "@/lib/templates"
import { Badge } from "@/components/ui/badge"
import { Announcement } from "@/components/announcement"
import { Icons } from "@/components/icons"
import TemplateLiveDemoButton from "@/components/marketing/template-live-demo-button"
import TemplateProButton from "@/components/marketing/template-pro-button"
import { TemplatesCTAButton } from "@/components/marketing/templates-cta-button"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export const dynamic = "force-static"
export const revalidate = false

const title = "Production Ready Templates"
const description =
  "Complete website templates built with React. Modern, responsive, and fully customizable. Perfect for startups, agencies, and businesses."

export const metadata = createStaticOGMetadata(title, description)

export default async function TemplatesPage() {
  const templates = getAllTemplates()

  return (
    <>
      <PageHeader>
        <Announcement link="/docs/templates">
          Production-Ready from Day One
        </Announcement>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <TemplatesCTAButton />
        </PageActions>
      </PageHeader>
      <div className="flex flex-col gap-16 pt-6 pb-14 md:pt-0 lg:pb-24">
        {templates.map((template) => {
          return (
            <div
              key={template.slug}
              className="grid grid-cols-1 gap-8 rounded-xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-16"
            >
              <div className="relative col-span-2 flex h-full flex-col items-start justify-center">
                <Badge variant="accent">
                  <Icons.check className="h-4 w-4" />
                  Included in BUI Pro
                </Badge>
                <h3 className="font-gilroy mt-6 text-2xl leading-none font-bold">
                  {template.title}
                </h3>
                <span className="text-muted-foreground mt-3">
                  {template.description}
                </span>
                <Link
                  href={`/templates/${template.name}`}
                  className="group/link text-foreground/90 mt-4 flex items-center gap-0.5 text-sm font-medium"
                >
                  View Details{" "}
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <TemplateProButton />
                  {template.actionButtons &&
                    template.actionButtons.map((button, index) => (
                      <TemplateLiveDemoButton
                        href={button}
                        index={index}
                        key={button}
                      />
                    ))}
                </div>
              </div>
              <div className="bg-secondary col-span-3 flex aspect-video items-center justify-center overflow-hidden rounded-lg">
                {template.image ? (
                  <Image
                    src={template.image}
                    alt={template.title}
                    width={540}
                    height={310}
                    className="h-full w-full rounded-lg object-cover"
                    quality={100}
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">Preview</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
