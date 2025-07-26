import { createStaticOGMetadata } from "@/lib/metadata"
import { Announcement } from "@/components/announcement"
import { Benefits } from "@/components/marketing/benefits"
import { CallToAction } from "@/components/marketing/call-to-action"
import { FAQ } from "@/components/marketing/faq"
import { GithubSection } from "@/components/marketing/github-section"
import { HeroBadge } from "@/components/marketing/hero-badge"
import { HeroButtons } from "@/components/marketing/hero-buttons"
import {
  MotionIcon,
  NextIcon,
  ReactIcon,
  ShadcnIcon,
  TailwindIcon,
  TypeScriptIcon,
} from "@/components/marketing/hero-icons"
import { HeroImage } from "@/components/marketing/hero-image"
import { Testimonials } from "@/components/marketing/testimonials"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

const title = "UI library for React developers."
const description =
  "An open-source React UI library with production-ready animations. Weekly updates. Built with React, Tailwind, TypeScript & JavaScript."

export const dynamic = "force-static"
export const revalidate = false

export const metadata = createStaticOGMetadata(title, description)

const tags = [
  { name: "React", icon: <ReactIcon /> },
  { name: "NextJS", icon: <NextIcon /> },
  { name: "TailwindCSS", icon: <TailwindIcon /> },
  { name: "Shadcn UI", icon: <ShadcnIcon /> },
  { name: "Motion", icon: <MotionIcon /> },
  { name: "TypeScript", icon: <TypeScriptIcon /> },
]

export default function IndexPage() {
  return (
    <div className="relative flex flex-col overflow-hidden">
      <PageHeader className="px-4 pb-12 md:pb-16">
        <Announcement link="/docs/changelog">
          100% Free & Open Source
        </Announcement>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions className="relative z-5">
          <HeroButtons />
        </PageActions>
        <div className="mt-5 flex max-w-md flex-wrap items-center justify-center gap-2">
          {tags.map((tag) => (
            <HeroBadge key={tag.name} icon={tag.icon}>
              {tag.name}
            </HeroBadge>
          ))}
        </div>
      </PageHeader>
      <HeroImage />
      <Benefits />
      <GithubSection />
      <Testimonials
        src="https://cdn.badtz-ui.com/pro/leander-pp.webp"
        name="Leander"
        title="Graphic Designer"
        border
        imgClassName="invert-0 dark:invert h-11 w-11"
        text="This UI library really made my workflow efficient. It's thoughtfully designed, refreshingly unique, and still gives me the freedom to be creative without getting in the way. Makes building interfaces feel less like work and more like play."
      />
      <FAQ />
      <CallToAction />
    </div>
  )
}
