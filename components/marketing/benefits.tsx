import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { BentoNav } from "@/components/marketing/bento-nav"
import { ChartsVisual } from "@/components/marketing/charts-visual"
import { CpuVisual } from "@/components/marketing/cpu-visual"
import { LogoTiles } from "@/components/marketing/logo-tiles"
import { MacbookKeyboard } from "@/components/marketing/mac-keyboard"

const bentoData = [
  {
    title: "Lightning-Fast React Components.",
    description:
      "Production-optimized. Fits any stack - from fresh Next.js apps to legacy React.",
    component: (
      <div className="h-[380px] w-full md:h-full">
        {" "}
        <CpuVisual />
      </div>
    ),
  },
  {
    title: "Copy. Paste. Ship.",
    description:
      "Build React apps faster: integrate components via CLI or code snippets. No setup headaches - just plug-and-play components.",
    component: (
      <div className="mb-6 flex h-auto w-full items-center justify-start pt-10 pl-10">
        <MacbookKeyboard className="origin-top-left" />
      </div>
    ),
  },
  {
    title: "Your Design, Your Rules.",
    description:
      "Tailwind-first components with customizable animations. Style every state and breakpoint to match your brand identity.",
    component: (
      <div className="flex h-[380px] w-full items-center justify-start md:h-full">
        <ChartsVisual />
      </div>
    ),
  },
  {
    title: "Scale with BadtzUI Pro.",
    description:
      "Ready-to-use blocks and templates for your apps, SaaS, AI tools...",
    component: (
      <div className="mb-6 flex h-auto w-full items-center justify-start">
        <Link
          href="https://pro.badtz-ui.com"
          target="_blank"
          className="group/pro absolute top-6 left-6 z-10 flex items-center gap-0.5 rounded-full border border-[#6d77d5] bg-gradient-to-b from-[#6d77d5] to-[#5c67c7] py-1 pr-2 pl-3 text-xs font-medium text-white shadow-[0_0px_100px_rgba(109,_119,_213,_0.5)]"
        >
          Explore{" "}
          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/pro:translate-x-0.5 group-hover/pro:-translate-y-0.5" />
        </Link>
        <LogoTiles />
      </div>
    ),
  },
]

const navOptions = [
  {
    name: "Overview",
    text: "Build React interfaces faster with production-ready UI components. Perfectly integrated with Next.js. Custom Tailwind styling, zero-config setup.",
  },
  {
    name: "Components",
    text: "Access a comprehensive library of pre-built components. From buttons to complex layouts, everything you need to build beautiful interfaces.",
  },
  {
    name: "Benefits",
    text: "Save countless hours of development with our pre-designed components. Focus on your core features while we handle the UI building blocks.",
  },
  {
    name: "Integration",
    text: "Seamlessly integrate our components into your existing projects. Works with any React setup, from fresh Next.js apps to legacy codebases.",
  },
]

export function Benefits() {
  return (
    <section className="from-background via-secondary/60 to-background bg-gradient-to-b from-20%">
      <div className="container mx-auto flex w-full max-w-5xl flex-col items-center justify-start !px-4 py-16 text-center md:items-start md:py-32 md:text-left">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="flex w-full md:w-1/2 md:items-end">
            <h2 className="leading-tighter font-gilroy max-w-2xl bg-gradient-to-b from-white/80 via-white to-white/60 bg-clip-text text-5xl font-semibold tracking-tight text-pretty text-transparent lg:leading-[1.1] lg:font-semibold xl:text-6xl/[4rem] xl:tracking-tighter">
              Highlight your website in a second
            </h2>
          </div>
          <div className="flex w-full items-end justify-end md:w-1/2">
            <BentoNav className="mt-6 md:mt-0" options={navOptions} />
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col gap-4 md:mt-14">
          <div className="flex flex-col gap-4 md:h-[380px] md:flex-row">
            <div className="h-[380px] md:h-full md:w-[45%]">
              <BentoCell {...bentoData[0]} />
            </div>
            <div className="h-[380px] md:h-full md:max-w-[55%]">
              <BentoCell {...bentoData[1]} />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:h-[380px] md:flex-row">
            <div className="md:w-[55%]">
              <BentoCell {...bentoData[2]} />
            </div>
            <div className="h-[390px] md:h-full md:w-[45%]">
              <BentoCell {...bentoData[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BentoCell({
  title,
  description,
  component,
}: {
  title: string
  description: string
  component: React.ReactNode
}) {
  const cellClasses =
    "h-full w-full border border-border bg-secondary/50 rounded-2xl overflow-hidden relative large-accent-shadow"

  return (
    <div className={cn(cellClasses)}>
      <div className="h-full p-7 text-left">
        <div className="bg-secondary/50 border-border absolute right-1.5 bottom-1.5 left-1.5 z-5 rounded-lg border p-4 backdrop-blur-sm">
          <span className="inline">
            <span className="font-medium">{title} </span>
            <span className="text-muted-foreground text-base">
              {description}
            </span>
          </span>
        </div>
        {component}
      </div>
    </div>
  )
}
