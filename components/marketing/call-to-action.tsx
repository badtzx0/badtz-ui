import { Meteors } from "@/components/ui/meteors"
import { Particles } from "@/components/ui/particles"
import { Icons } from "@/components/icons"
import { CTAButton } from "@/components/marketing/cta-button"

export function CallToAction() {
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
    <section className="px-4 pt-16 pb-12 md:pt-8 md:pb-24">
      <div className="bg-secondary border-border/60 relative mx-auto mt-6 max-w-4xl rounded-2xl border px-4 pt-20 pb-14 md:mt-14">
        <Logo />
        <div
          className="pointer-events-none absolute inset-0 z-1 h-full bg-[radial-gradient(circle_at_bottom_center,#6d77d580,transparent_75%)] [mask-image:radial-gradient(circle_at_50%_65%,white,transparent)]"
          aria-hidden="true"
        >
          <Particles customOptions={customParticleOptions} className="w-full" />
          <Meteors number={5} />
          <div className="absolute top-[calc(100%-75px)] left-1/2 z-1 flex h-full max-h-[400px] w-full -translate-x-1/2 items-start justify-center overflow-hidden">
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
        </div>

        <div className="relative z-5 mx-auto flex w-full max-w-5xl flex-col items-center justify-start text-center">
          <h2 className="leading-tighter font-gilroy text-gradient-safari max-w-3xl bg-gradient-to-b from-white/80 via-white to-white/60 text-5xl font-semibold tracking-tight text-pretty lg:leading-[1.1] lg:font-semibold xl:text-6xl/[4rem] xl:tracking-tighter">
            Build faster. <br /> Build beautiful.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base text-balance sm:text-lg">
            Everything you need to create high-converting React & Next.js
            websites. Get access to our premium blocks and templates.
          </p>
          <CTAButton />
        </div>
      </div>
    </section>
  )
}

function Logo() {
  return (
    <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-md border border-[#6d77d5] bg-linear-to-b from-[#6d77d5] to-[#626bbf] [&_svg]:size-8">
      <Icons.logo />
      <div className="absolute inset-0.5 rounded-[7px] border border-dashed border-white/50"></div>
    </div>
  )
}
