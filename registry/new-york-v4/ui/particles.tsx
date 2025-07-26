"use client"

import { useEffect, useId, useState } from "react"
import {
  initParticlesEngine,
  Particles as TSParticles,
} from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

import { cn } from "@/lib/utils"

type ParticleVariant = "default" | "snow" | "stars"

interface ParticleStyle {
  count?: number
  size?: number
  speed?: number
  opacity?: number
  color?: string
}

interface ParticlesProps {
  className?: string
  variant?: ParticleVariant
  style?: ParticleStyle
  interactive?: boolean
  customOptions?: Record<string, unknown>
}

const variantStyles: Record<
  ParticleVariant,
  ParticleStyle & { options?: Record<string, unknown> }
> = {
  default: {
    count: 200,
    size: 2,
    speed: 1.5,
    opacity: 0.8,
    color: "#FFFFFF",
  },
  snow: {
    count: 300,
    size: 1.2,
    speed: 1,
    opacity: 0.6,
    color: "#FFFFFF",
    options: {
      interactivity: {
        detectOn: "canvas",
        events: {
          onHover: {
            enable: false,
          },
        },
      },
      particles: {
        move: {
          enable: true,
          speed: {
            min: 2,
            max: 3,
          },
          direction: "bottom",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
        shape: {
          type: "circle",
        },
      },
    },
  },
  stars: {
    count: 200,
    size: 1.5,
    speed: 0,
    opacity: 0.8,
    color: "#FFFFFF",
    options: {
      interactivity: {
        detectOn: "canvas",
        events: {
          onHover: {
            enable: false,
          },
        },
      },
      particles: {
        move: {
          enable: false,
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.1,
            opacity: 1,
          },
        },
        shape: {
          type: "star",
        },
        shadow: {
          enable: true,
          color: "#FFFFFF",
          blur: 5,
          offset: {
            x: 0,
            y: 0,
          },
        },
        glow: {
          enable: true,
          color: "#FFFFFF",
          distance: 10,
          size: 2,
        },
      },
    },
  },
}

export function Particles({
  className,
  variant = "default",
  style = {},
  interactive = true,
  customOptions = {},
}: ParticlesProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setIsInitialized(true)
    })
  }, [])

  const id = useId()

  const baseStyle = variantStyles[variant]
  const finalStyle = { ...baseStyle, ...style }

  const defaultOptions = {
    detectRetina: true,
    fpsLimit: 120,
    interactivity: {
      detectOn: "canvas",
      events: {
        onHover: {
          enable:
            variant === "snow" || variant === "stars" ? false : interactive,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 150,
          duration: 1.2,
          factor: 6,
          speed: 0.5,
        },
      },
    },
    particles: {
      number: {
        value: finalStyle.count,
      },
      color: {
        value: finalStyle.color,
      },
      opacity: {
        value: {
          min: (finalStyle.opacity || 0.8) / 5,
          max: finalStyle.opacity || 0.8,
        },
        animation: {
          enable: true,
          sync: false,
          speed: 2,
        },
      },
      size: {
        value: {
          min: (finalStyle.size || 2) / 5,
          max: finalStyle.size || 2,
        },
      },
      move: {
        enable: true,
        speed: {
          min: (finalStyle.speed || 1.5) / 5,
          max: finalStyle.speed || 1.5,
        },
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    background: {
      color: {
        value: "transparent",
      },
    },
  }

  const deepMerge = (target: any, source: any) => {
    const output = { ...target }
    if (source) {
      Object.keys(source).forEach((key) => {
        if (source[key] instanceof Object && key in target) {
          output[key] = deepMerge(target[key], source[key])
        } else {
          output[key] = source[key]
        }
      })
    }
    return output
  }

  const variantOptions = baseStyle.options || {}
  const mergedOptions = deepMerge(defaultOptions, variantOptions)
  const finalOptions = deepMerge(mergedOptions, customOptions)

  return (
    isInitialized && (
      <TSParticles
        id={id}
        options={finalOptions}
        className={cn("absolute inset-0", className)}
      />
    )
  )
}
