"use client"

import Image from "next/image"

import { BorderBeam } from "@/components/ui/border-beam"

export function CpuVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="cpu-shadow mb-[135px] flex aspect-square w-[170px] items-center justify-center overflow-hidden rounded-[2rem] md:mb-[80px] md:w-[150px]">
        <BorderBeam lightColor="#7876c5" lightWidth={200} duration={2} />

        <div className="accent-shadow absolute aspect-square w-[145px] overflow-hidden rounded-[1.5rem] md:w-[130px]">
          <BorderBeam lightColor="#7876c5" lightWidth={150} duration={3} />

          <Image
            src="https://cdn.badtz-ui.com//images/home-bento/badtz-cpu.webp"
            alt="CPU"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain opacity-90"
          />
        </div>
      </div>
    </div>
  )
}
