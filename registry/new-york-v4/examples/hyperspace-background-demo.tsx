import { HyperspaceBackground } from "@/registry/new-york-v4/ui/hyperspace-background"

export default function HyperspaceBackgroundDemo() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg bg-black">
      <HyperspaceBackground />
      <h1 className="font-gilroy relative z-10 bg-gradient-to-br from-white to-zinc-400 bg-clip-text px-2 text-center text-4xl font-semibold text-transparent mix-blend-difference">
        Ship at the <br />
        speed of light
      </h1>
    </div>
  )
}
