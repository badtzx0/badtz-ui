"use client"

import { memo, ReactNode, useEffect, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

interface CSSCustomProperties extends React.CSSProperties {
  "--keycap-height"?: string
}

type KeycapProps = {
  height?: string
  keylightColor?: "default" | "red" | "blue" | "green" | "purple" | "rgb"
  char?: string
  secondaryChar?: string
  className?: string
} & VariantProps<typeof keycapVariants>

const keycapVariants = cva(
  "relative flex flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[5px] bg-gradient-to-b p-2 leading-4 bg-blend-overlay transition-all duration-200 ease-out select-none",
  {
    variants: {
      variant: {
        default: "aspect-square",
        double: "aspect-square",
        tab: "aspect-[1.77] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
        caps: "aspect-[1.85] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
        shift: "aspect-[2.32] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
        command: "aspect-[1.34] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
        space: "aspect-[8.3] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const keylightColors = {
  default: {
    light: "before:shadow-[0px_1px_3px_0px_#00000015]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#ffffff20]",
  },
  red: {
    light: "before:shadow-[0px_1px_3px_0px_#ff000040]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#ff0000]",
  },
  blue: {
    light: "before:shadow-[0px_1px_3px_0px_#0000ff40]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#0000ff]",
  },
  green: {
    light: "before:shadow-[0px_1px_3px_0px_#00ff0040]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#00ff00]",
  },
  purple: {
    light: "before:shadow-[0px_1px_3px_0px_#80008040]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#800080]",
  },
  rgb: {
    light:
      "before:shadow-[0px_1px_3px_0px_var(--rgb-color)] before:transition-[box-shadow] before:duration-300 before:ease-in-out",
    dark: "dark:before:shadow-[0px_2px_5px_0px_var(--rgb-color)] before:transition-[box-shadow] before:duration-300 before:ease-in-out",
  },
}

const rgbColors = [
  "#ff0000",
  "#ff00ff",
  "#0000ff",
  "#00ffff",
  "#00ff00",
  "#ffff00",
]

const RGBAnimation = memo(function RGBAnimation({
  currentColorIndex,
  keylightColor,
}: {
  currentColorIndex: number
  keylightColor: string
}) {
  if (keylightColor !== "rgb") return null

  return (
    <style jsx global>{`
      :root {
        --rgb-color: ${rgbColors[currentColorIndex]};
      }
    `}</style>
  )
})

export const Keycap = memo(function Keycap({
  height = "48px",
  keylightColor = "default",
  char,
  secondaryChar,
  variant,
  className,
}: KeycapProps) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0)

  if (secondaryChar && variant !== "double") {
    console.warn("secondaryChar should only be used with variant 'double'")
    secondaryChar = undefined
  }

  useEffect(() => {
    if (keylightColor !== "rgb") return

    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % rgbColors.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [keylightColor])

  return (
    <>
      <RGBAnimation
        currentColorIndex={currentColorIndex}
        keylightColor={keylightColor}
      />
      <div
        style={
          {
            "--keycap-height": height,
          } as CSSCustomProperties
        }
        className={cn(
          keycapVariants({ variant }),
          "dark:from-secondary dark:to-background/50 gap-0.5 from-white to-neutral-50 text-neutral-800/80 drop-shadow-sm dark:text-[#D8D8D8]",
          "shadow-[0_1.5px_0.5px_2.5px_rgb(163_163_163/0.08),0_0_0.5px_1px_rgb(163_163_163/0.12),inset_0_2px_1px_1px_rgb(163_163_163/0.06),inset_0_1px_1px_1px_rgb(255_255_255/0.6)] dark:shadow-[0_1.5px_0.5px_2.5px_rgba(0,0,0,0.5),0_0_0.5px_1px_#000,inset_0_2px_1px_1px_rgba(0,0,0,0.25),inset_0_1px_1px_1px_rgba(255,255,255,0.2)]",
          "hover:translate-y-px hover:bg-gradient-to-b hover:from-neutral-50/40 hover:to-neutral-100/30 dark:hover:from-[rgba(255,255,255,0.04)] dark:hover:to-[rgba(255,255,255,0.016)]",
          "hover:shadow-[0_1.5px_1px_0px_rgb(163_163_163/0.06),0_0_0.5px_1px_rgb(163_163_163/0.1),inset_0_0.5px_1px_0.5px_rgb(255_255_255/0.5)] dark:hover:shadow-[0_1.5px_1px_0px_rgba(0,0,0,0.2),0_0_0.5px_1px_#000,inset_0_0.5px_1px_0.5px_rgba(255,255,255,0.2)]",
          "before:absolute before:inset-0 before:rounded-[inherit]",
          keylightColors[keylightColor].light,
          keylightColors[keylightColor].dark,
          "h-[var(--keycap-height)]",
          "will-change-transform",
          className
        )}
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          {variant === "double" ? (
            <div className="flex h-full w-full flex-col items-center justify-between p-[15%]">
              <span className="text-[calc(var(--keycap-height)/4)] leading-none font-medium">
                {secondaryChar}
              </span>
              <span className="text-[calc(var(--keycap-height)/3.5)] leading-none font-medium">
                {char}
              </span>
            </div>
          ) : (
            <span className="text-[calc(var(--keycap-height)/2.75)] leading-none font-medium">
              {char}
            </span>
          )}
        </div>
      </div>
    </>
  )
})

type KeyboardProps = {
  children: ReactNode
  className?: string
  gap?: "sm" | "md" | "lg"
}

export function Keyboard({ children, className, gap = "md" }: KeyboardProps) {
  return (
    <div
      className={cn(
        "border-border rounded-[10px] border !bg-white p-2.5 dark:!bg-[#21222550]",
        className
      )}
    >
      <div
        className={cn("relative flex flex-col", {
          "gap-1": gap === "sm",
          "gap-2.5": gap === "md",
          "gap-3": gap === "lg",
        })}
      >
        {children}
      </div>
    </div>
  )
}

type KeyRowProps = {
  children: ReactNode
  className?: string
  gap?: "sm" | "md" | "lg"
}

export function KeyRow({ children, className, gap = "md" }: KeyRowProps) {
  return (
    <div
      className={cn(
        "flex flex-nowrap",
        {
          "gap-1": gap === "sm",
          "gap-2.5": gap === "md",
          "gap-3": gap === "lg",
        },
        className
      )}
    >
      {children}
    </div>
  )
}
