"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { BorderBeam } from "@/registry/new-york-v4/ui/border-beam"

export default function BorderBeamDemo() {
  const { theme } = useTheme()
  const [lightColor, setLightColor] = useState("#FAFAFA")

  useEffect(() => {
    setLightColor(theme === "dark" ? "#FAFAFA" : "#FF2056")
  }, [theme])

  return (
    <div className="relative overflow-hidden rounded-lg shadow-sm">
      <BorderBeam lightColor={lightColor} lightWidth={350} duration={8} />
      <div className="h-full w-full max-w-72 space-y-2 px-6 py-4">
        <h3 className="font-gilroy text-2xl">Border Beam</h3>
        <p className="text-sm">
          This card showcases a dynamic border beam effect, adding a subtle,
          animated glow around the edges.
        </p>
      </div>
    </div>
  )
}
