"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { ImageSplit } from "@/registry/new-york-v4/ui/image-split"

export default function ImageSplitDemo() {
  const { theme } = useTheme()
  const [borderOpacity, setBorderOpacity] = useState(0.3)
  const [borderColor, setBorderColor] = useState("#FFFFFF")
  const [imageSrc, setImageSrc] = useState("/images/doc-dark.webp")

  useEffect(() => {
    setBorderColor(theme === "dark" ? "#FFFFFF" : "#000000")
    setBorderOpacity(theme === "dark" ? 0.2 : 0.1)
    setImageSrc(
      theme === "dark" ? "/images/doc-dark.webp" : "/images/doc-light.webp"
    )
  }, [theme])

  return (
    <div className="relative h-full max-h-[450px] w-full overflow-y-auto">
      <div className="absolute inset-x-0 top-0 flex h-[450px] items-center justify-center gap-2">
        <span className="font-gilroy text-foreground text-3xl">
          Scroll to reveal
        </span>
      </div>
      <div className="px-6 pt-[450px] pb-6 sm:px-8 sm:pb-8">
        <ImageSplit
          src={imageSrc}
          className="rounded"
          borderColor={borderColor}
          initialBorderOpacity={borderOpacity}
          sections={9}
        />
      </div>
    </div>
  )
}
