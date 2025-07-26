import Image from "next/image"

import { cn } from "@/lib/utils"
import { StarRating } from "@/components/ui/star-rating"

export function Testimonials({
  className,
  imgClassName,
  border,
  src,
  name,
  title,
  text,
}: {
  className?: string
  imgClassName?: string
  border?: boolean
  src: string
  name: string
  title: string
  text: string
}) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-xl flex-col items-center gap-6 px-4 pt-2 pb-14 md:pt-8 md:pb-8",
        className
      )}
    >
      <StarRating rating={5} size={22} />
      <p className="text-muted-foreground text-center">&quot;{text}&quot;</p>
      <div className="flex items-center gap-3">
        <Image
          src={src}
          alt={name}
          width={48}
          height={48}
          className={cn("rounded-full border", imgClassName)}
        />
        <div className="flex flex-col gap-[5px]">
          <h2 className="text-foreground leading-none">{name}</h2>
          <p className="text-muted-foreground text-sm leading-none">{title}</p>
        </div>
      </div>
      {border && (
        <div className="h-px w-full max-w-[360px] border-b border-dashed px-6 pt-6"></div>
      )}
    </div>
  )
}
