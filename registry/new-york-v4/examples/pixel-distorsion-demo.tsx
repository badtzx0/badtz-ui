"use client"

import dynamic from "next/dynamic"

const PixelDistorsionScene = dynamic(
  () => import("@/registry/new-york-v4/ui/pixel-distorsion-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-zinc-100 dark:bg-neutral-950">
        {/* Skeleton loader */}
      </div>
    ),
  }
)

export default function PixelDistorsionDemo() {
  return (
    <div className="h-auto max-h-[400px] w-full overflow-hidden rounded-lg">
      <PixelDistorsionScene imageSrc="https://cdn.badtz-ui.com/images/shaders/medusa-image.webp" />
    </div>
  )
}
