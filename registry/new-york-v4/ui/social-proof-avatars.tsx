import * as React from "react"

import { cn } from "@/lib/utils"

interface Avatar {
  src: string
  alt: string
}

interface SocialProofAvatarsProps extends React.HTMLAttributes<HTMLDivElement> {
  extraCount?: number
  avatars: Avatar[]
  className?: string
  stars?: boolean
  children?: React.ReactNode
}

export function SocialProofAvatars({
  extraCount,
  avatars,
  className,
  children,
  stars = true,
  ...props
}: SocialProofAvatarsProps) {
  return (
    <div className="group/avatar flex flex-col items-center justify-center gap-2">
      <div className="justy-start flex -space-x-4 select-none" {...props}>
        {avatars.map((image, i) => (
          <div
            aria-hidden
            className={cn(
              "relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-4 border-white bg-neutral-100 shadow-sm dark:border-neutral-900 dark:bg-neutral-950",
              className
            )}
            key={i}
          >
            <img
              src={image.src}
              alt={image.alt || ""}
              width={50}
              height={50}
              style={{ transitionDelay: `${i * 60}ms` }}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover/avatar:scale-[110%] group-hover/avatar:rotate-[-10deg]"
            />
          </div>
        ))}
        {extraCount && (
          <div className="z-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-neutral-100 shadow-sm dark:border-neutral-900 dark:bg-neutral-950">
            <span className="text-sm font-medium text-black dark:text-white">
              +{extraCount}
            </span>
          </div>
        )}
      </div>
      {children}
      {stars && (
        <div className="mt-0.5 flex items-center gap-1 text-amber-500 [&_svg]:size-[18px]">
          <span className="sr-only">5 stars</span>
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
          ))}
        </div>
      )}
    </div>
  )
}
