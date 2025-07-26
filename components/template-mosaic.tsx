import Image from "next/image"

export function TemplateMosaic({ images }: { images: string[] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <Image
        src={images[0]}
        alt="Template Mosaic 1"
        width={440}
        height={340}
        className="h-full rounded-md object-cover"
      />
      <Image
        src={images[1]}
        alt="Template Mosaic 2"
        width={440}
        height={340}
        className="h-full rounded-md object-cover"
      />
      <Image
        src={images[2]}
        alt="Template Mosaic 3"
        width={440}
        height={340}
        className="h-full rounded-md object-cover"
      />
      <Image
        src={images[3]}
        alt="Template Mosaic 4"
        width={440}
        height={340}
        className="h-full rounded-md object-cover"
      />
    </div>
  )
}
