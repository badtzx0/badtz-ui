"use client"

import dynamic from "next/dynamic"

const MouseWaveScene = dynamic(
  () => import("@/registry/new-york-v4/ui/mouse-wave-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-zinc-100 dark:bg-neutral-950">
        {/* Skeleton loader */}
      </div>
    ),
  }
)

export default function MouseWaveDemo() {
  return (
    <div className="h-auto max-h-[400px] w-full overflow-hidden rounded-lg">
      <MouseWaveScene imageSrc="https://cdn.badtz-ui.com/images/shaders/forest-image.webp" />
    </div>
  )
}
