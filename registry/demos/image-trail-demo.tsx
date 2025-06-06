import { ImageTrail } from "@/registry/components/image-trail";

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
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-11.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-12.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-13.webp",
  "https://cdn.badtz-ui.com/images/components/image-trail/image-trail-14.webp",
];

export default function ImageTrailDemo() {
  return (
    <div className="w-full h-[390px] rounded-lg overflow-hidden relative">
      <ImageTrail images={imageUrls} imageHeight={150} imageWidth={150} />
      <h1 className="font-gilroy text-4xl absolute z-10 text-center inset-0 flex items-center justify-center pointer-events-none mix-blend-difference bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent py-2">
        Hover Me
      </h1>
    </div>
  );
}
