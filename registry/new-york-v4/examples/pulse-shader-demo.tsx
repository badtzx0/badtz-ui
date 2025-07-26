"use client"

import dynamic from "next/dynamic"

const PulseShaderScene = dynamic(
  () => import("@/registry/new-york-v4/ui/pulse-shader-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-zinc-100 dark:bg-neutral-950">
        {/* Skeleton loader */}
      </div>
    ),
  }
)

export default function PulseShaderDemo() {
  return (
    <div className="h-auto max-h-[400px] w-full overflow-hidden rounded-lg">
      <PulseShaderScene imageSrc="https://cdn.badtz-ui.com/images/shaders/aurora-borealis-image.webp" />
    </div>
  )
}
