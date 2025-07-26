import Image from "next/image"

import { cn } from "@/lib/utils"

export function LogoTiles() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-x-4 top-0 mx-auto grid h-[320px] w-[274px] grid-cols-5 grid-rows-6 gap-1 lg:inset-x-12">
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square h-[50px] w-[50px] overflow-hidden rounded transition-transform duration-150 hover:rotate-[15deg]",
              index === 2 ||
                index === 4 ||
                index === 6 ||
                index === 7 ||
                index === 10 ||
                index === 11 ||
                index === 13 ||
                index === 16 ||
                index === 17 ||
                index === 18 ||
                index === 20 ||
                index === 21
                ? "shadow-[0_1.5px_0.5px_2.5px_rgba(0,0,0,0.5),0_0_0.5px_1px_#000,inset_0_2px_1px_1px_rgba(0,0,0,0.25),inset_0_1px_1px_1px_rgba(255,255,255,0.2)]"
                : "",
              index === 2 || index === 14 || index === 15 || index === 21
                ? ""
                : "",
              index === 8 || index === 12 || index === 14 || index === 15
                ? "bg-[#21222550] shadow-[0_1.5px_0.5px_2.5px_rgba(0,0,0,0.5),0_0_0.5px_1px_#000,inset_0_2px_1px_1px_rgba(0,0,0,0.25),inset_0_1px_1px_1px_rgba(255,255,255,0.2)]"
                : "",
              index === 12 &&
                "text-foreground flex flex-col items-center justify-center"
            )}
          >
            {index === 6 && (
              <Image
                src="https://cdn.badtz-ui.com/images/home-bento/logo-split/part-1.svg"
                alt="Part 1"
                width={50}
                height={50}
                className="h-full w-full"
              />
            )}
            {index === 7 && (
              <Image
                src="https://cdn.badtz-ui.com/images/home-bento/logo-split/part-2.svg"
                alt="Part 2"
                width={50}
                height={50}
                className="h-full w-full"
              />
            )}
            {index === 8 && (
              <Image
                src="https://cdn.badtz-ui.com/images/home-bento/logo-split/part-3.svg"
                alt="Part 3"
                width={50}
                height={50}
                className="h-full w-full"
              />
            )}
            {index === 11 && (
              <Image
                src="https://cdn.badtz-ui.com/images/home-bento/logo-split/part-4.svg"
                alt="Part 4"
                width={50}
                height={50}
                className="h-full w-full"
              />
            )}
            {index === 12 && (
              <Image
                src="https://cdn.badtz-ui.com/images/home-bento/logo-split/part-5.svg"
                alt="Part 5"
                width={50}
                height={50}
                className="h-full w-full"
              />
            )}
            {index === 13 && (
              <Image
                src="https://cdn.badtz-ui.com/images/home-bento/logo-split/part-6.svg"
                alt="Part 6"
                width={50}
                height={50}
                className="h-full w-full"
              />
            )}
            {index === 16 && (
              <Image
                src="https://cdn.badtz-ui.com/images/home-bento/logo-split/part-7.svg"
                alt="Part 7"
                width={50}
                height={50}
                className="h-full w-full"
              />
            )}
            {index === 17 && (
              <Image
                src="https://cdn.badtz-ui.com/images/home-bento/logo-split/part-8.svg"
                alt="Part 8"
                width={50}
                height={50}
                className="h-full w-full"
              />
            )}
            {index === 18 && (
              <Image
                src="https://cdn.badtz-ui.com/images/home-bento/logo-split/part-9.svg"
                alt="Part 9"
                width={50}
                height={50}
                className="h-full w-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
