import { ImageTrail } from "@/registry/new-york-v4/ui/image-trail"

const imageUrls = [
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-1.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-2.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-3.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-4.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-5.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-6.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-7.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-8.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-9.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-10.webp",
]

export default function ImageTrailDemo() {
  return (
    <div className="relative h-[390px] w-full overflow-hidden rounded-lg">
      <ImageTrail images={imageUrls} imageHeight={150} imageWidth={150} />
      <h1 className="font-gilroy pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-white to-zinc-400 bg-clip-text py-2 text-center text-4xl text-transparent mix-blend-difference">
        Hover Me
      </h1>
    </div>
  )
}
