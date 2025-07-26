import { BlurReveal } from "@/registry/new-york-v4/ui/blur-reveal"

export default function BlurRevealDemo() {
  return (
    <div className="flex max-w-lg flex-col space-y-2">
      <span className="font-gilroy text-3xl font-semibold">
        <BlurReveal delay={0}>This&nbsp;</BlurReveal>
        <BlurReveal delay={0.1}>is&nbsp;</BlurReveal>
        <BlurReveal delay={0.2}>a&nbsp;</BlurReveal>
        <BlurReveal delay={0.3}>Title&nbsp;</BlurReveal>
      </span>
      <BlurReveal delay={0.4} className="text-muted-foreground font-light">
        And this is the amazing text that just can't wait
        <br /> to reveal itself! Watch it come to life with a blur.
      </BlurReveal>
      <BlurReveal delay={0.5}>
        <button className="bg-muted mt-1.5 inline-flex h-8 items-center justify-center rounded-md px-4 py-2 text-xs">
          Discover
        </button>
      </BlurReveal>
    </div>
  )
}
