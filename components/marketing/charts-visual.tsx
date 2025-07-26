"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FontBoldIcon,
  FontItalicIcon,
  Link2Icon,
  UnderlineIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

interface ChartProps {
  vibrantColor?: string
  softColor?: string
  gridColor?: string
}

interface LayerProps {
  color: string
  softColor?: string
  hovered?: boolean
}

export function ChartsVisual() {
  const [activeColor, setActiveColor] = useState({
    vibrant: "#5C67C7",
  })

  const colors = [
    { vibrant: "#6C79FF" },
    { vibrant: "#7477F0" },
    { vibrant: "#6E79D6" },
    { vibrant: "#5E6AD2" },
    { vibrant: "#666BE2" },
    { vibrant: "#5C67C7" },
    { vibrant: "#575BC7" },
    { vibrant: "#37466C" },
    { vibrant: "#2A2B51" },
    { vibrant: "#222342" },
  ]

  return (
    <div className={cn("z-1 h-full w-full")}>
      <Link
        href="/docs/components/animated-cards/animated-card-3"
        className="bg-secondary text-muted-foreground border-border absolute top-6 right-6 z-30 flex items-center gap-2 overflow-hidden rounded-full border py-1.5 pr-3 pl-2 text-xs"
      >
        <span
          className="h-2.5 w-2.5 rounded-full transition-colors"
          style={{ backgroundColor: `${activeColor.vibrant}` }}
        ></span>
        <span>Animated Card 3</span>
      </Link>
      <div aria-hidden className="absolute inset-x-0 top-0 z-20 h-[80%]">
        <Chart vibrantColor={activeColor.vibrant} />
      </div>
      <div
        aria-hidden
        className="bg-secondary/90 text-muted-foreground border-border absolute top-6 left-6 z-20 overflow-hidden rounded-lg border text-sm font-light backdrop-blur-sm"
      >
        <div className="border-border border-b px-3 py-2">
          <span className="text-foreground/80">Customize</span>
        </div>
        <div className="border-border flex items-center justify-between gap-2 border-b px-3 py-2">
          <span className="text-foreground/80">Text</span>
          <div className="flex items-center gap-1 [&>svg]:size-3">
            <div className="rounded p-0.5">
              <FontBoldIcon />
            </div>
            <div className="bg-muted rounded p-0.5">
              <Link2Icon />
            </div>
            <div className="rounded p-0.5">
              <FontItalicIcon />
            </div>
            <div className="rounded p-0.5">
              <UnderlineIcon />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-2 p-3">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`h-5 w-5 cursor-pointer rounded transition-all duration-300 ${
                activeColor.vibrant === color.vibrant
                  ? "ring-1 ring-blue-500"
                  : ""
              }`}
              style={{ backgroundColor: color.vibrant }}
              onClick={() => setActiveColor(color)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Chart({
  vibrantColor = "#ffffff",
  softColor = "#ffffff",
}: ChartProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <div
        className="absolute inset-0 z-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            "--color": vibrantColor,
            "--secondary-color": softColor,
          } as React.CSSProperties
        }
      />

      <div className="relative h-full w-full">
        <SvgChart
          color={vibrantColor}
          softColor={softColor}
          hovered={hovered}
        />
        <EllipseGradient color={vibrantColor} />
      </div>
    </>
  )
}

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
      <svg
        width="600"
        height="350"
        viewBox="0 0 600 350"
        fill="none"
        className="opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_197_56)">
          <ellipse cx="300" cy="175" rx="200" ry="75" fill={color} />
        </g>
        <defs>
          <filter
            id="filter0_f_197_56"
            x="0"
            y="0"
            width="600"
            height="350"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_197_56"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

const SvgChart: React.FC<LayerProps> = ({ color, hovered }) => {
  const rectsData = [
    {
      width: 23,
      height: 34,
      y: 172,
      hoverHeight: 34,
      hoverY: 206,
      x: 80,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 34,
      y: 138,
      hoverHeight: 34,
      hoverY: 206,
      x: 110,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 68,
      y: 104,
      hoverHeight: 51,
      hoverY: 189,
      x: 140,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 121,
      hoverHeight: 85,
      hoverY: 155,
      x: 170,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 172,
      hoverHeight: 68,
      hoverY: 172,
      x: 200,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 85,
      y: 172,
      hoverHeight: 34,
      hoverY: 206,
      x: 230,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 85,
      y: 87,
      hoverHeight: 51,
      hoverY: 189,
      x: 260,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 121,
      hoverHeight: 34,
      hoverY: 206,
      x: 290,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 34,
      y: 172,
      hoverHeight: 68,
      hoverY: 172,
      x: 320,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 68,
      y: 104,
      hoverHeight: 102,
      hoverY: 138,
      x: 350,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 172,
      hoverHeight: 119,
      hoverY: 121,
      x: 380,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 85,
      y: 172,
      hoverHeight: 85,
      hoverY: 155,
      x: 410,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 34,
      y: 172,
      hoverHeight: 136,
      hoverY: 104,
      x: 440,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 51,
      y: 121,
      hoverHeight: 153,
      hoverY: 87,
      x: 470,
      fill: color,
      hoverFill: color,
    },
  ]

  return (
    <div
      className={cn(
        "ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute left-[53%] z-[8] flex h-[306px] w-[606px] -translate-x-1/2 scale-[0.6] items-center justify-center text-[#292A35] transition-transform duration-500 md:scale-[0.8] lg:scale-100",
        "rect-shadow top-0 md:top-[-20px] lg:top-[-15px]",
        hovered && "translate-y-6 scale-[0.75] md:scale-[0.95] lg:scale-[1.25]"
      )}
    >
      <svg
        width="606"
        height="306"
        xmlns="http://www.w3.org/2000/svg"
        className=""
      >
        {rectsData.map((rect, index) => (
          <rect
            key={index}
            width={hovered ? 23 : rect.width}
            height={hovered ? rect.hoverHeight : rect.height}
            x={rect.x}
            y={hovered ? rect.hoverY : rect.y}
            fill={hovered ? rect.hoverFill : rect.fill}
            rx="5"
            ry="5"
            className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
          />
        ))}
      </svg>
    </div>
  )
}
