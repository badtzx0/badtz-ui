import Image from "next/image"

import { Meteors } from "@/components/ui/meteors"
import { Particles } from "@/components/ui/particles"

export function HeroImage() {
  const particlesColor = "#8b5cf6"

  const customParticleOptions = {
    particles: {
      opacity: 0.8,
      quantity: 800,
      size: {
        value: {
          min: 0.5,
          max: 0.8,
        },
      },
      move: {
        quantity: 800,
        enable: true,
        speed: {
          min: 0.1,
          max: 0.1,
        },
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
      },
      shadow: {
        enable: true,
        color: particlesColor,
        blur: 5,
        offset: {
          x: 0,
          y: 0,
        },
      },
      glow: {
        enable: true,
        color: particlesColor,
        distance: 10,
        size: 2,
      },
    },
    interactivity: {
      detectOn: "canvas",
      events: {
        onHover: {
          enable: false,
        },
      },
    },
  }

  return (
    <div className="flex h-auto w-full items-center justify-center">
      <div className="relative max-w-[1000px]">
        <div
          className="bg-background pointer-events-none absolute inset-0 z-10 [mask-image:radial-gradient(ellipse_100%_75%_at_50%_20%,transparent_50%,#000_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 -top-[300px] z-[1] h-[450px] bg-[radial-gradient(circle_at_bottom_center,#6d77d5,transparent_75%)] [mask-image:radial-gradient(circle_at_50%_65%,white,transparent)] md:h-[600px]"
          aria-hidden="true"
        >
          <Particles customOptions={customParticleOptions} className="w-full" />
          <Meteors number={5} />
        </div>
        <div className="absolute -top-[25px] left-1/2 z-5 flex h-full max-h-[450px] w-full -translate-x-1/2 items-start justify-center overflow-hidden md:-top-[45px] md:max-h-[400px]">
          <div>
            <svg
              width="2576"
              height="496"
              viewBox="0 0 2576 496"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1288 0C1783.57 0 2235.28 187.751 2575.89 496H0.105469C340.72 187.751 792.433 0 1288 0Z"
                fill="url(#paint0_linear_493_203)"
                stroke="#7876c540"
                strokeWidth="1"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_493_203"
                  x1="1288"
                  y1="-53"
                  x2="1288"
                  y2="537.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#111113" />
                  <stop offset="1" stopColor="#0A0A0A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="px-4 md:px-0">
          <Image
            src="https://cdn.badtz-ui.com/images/new-bui-hero.webp"
            alt="Hero Image"
            width={1152}
            height={720}
            className="pointer-events-none relative z-5 rounded-t-xl border"
            priority
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}
