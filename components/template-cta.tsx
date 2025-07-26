import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function TemplateCta() {
  return (
    <section className="pt-8 md:pt-12">
      <div className="dark:bg-secondary bg-secondary/30 relative mx-auto max-w-4xl rounded-2xl border p-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-start text-center">
          <Logo />
          <h2 className="text-foreground leading-tighter font-gilroy mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:tracking-tighter">
            Build faster. Convert better.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base text-balance">
            Everything you need to create high-converting React & Next.js
            websites. Get access to our premium blocks and templates.
          </p>
          <Button
            asChild
            size="lg"
            variant="default"
            className="bg-foreground hover:bg-foreground/90 text-background mt-8 h-9 rounded-lg px-4"
          >
            <Link href="https://pro.badtz-ui.com" target="_blank">
              BadtzUI Pro <ExternalLink />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function Logo() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-md border border-[#6d77d5] bg-linear-to-b from-[#6d77d5] to-[#626bbf] [&_svg]:size-6">
      <Icons.logo />
      <div className="absolute inset-0.5 rounded-[7px] border border-dashed border-white/50"></div>
    </div>
  )
}
