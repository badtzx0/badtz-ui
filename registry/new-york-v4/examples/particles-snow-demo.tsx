import { Particles } from "@/registry/new-york-v4/ui/particles"

export default function ParticlesDemoSnow() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-md bg-neutral-950">
      <Particles variant="snow" />
      <span className="font-gilroy pointer-events-none bg-gradient-to-br from-white to-zinc-400 bg-clip-text py-2 text-4xl text-transparent">
        Snow
      </span>
    </div>
  )
}
