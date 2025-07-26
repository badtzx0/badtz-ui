import {
  IconBoltFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconClockFilled,
  IconCoinFilled,
  IconJetpackFilled,
  IconLayoutFilled,
  IconLayoutGridFilled,
  IconPaletteFilled,
  IconShieldCheckFilled,
} from "@tabler/icons-react"

const comparisonData = [
  {
    feature: "Design Costs",
    icon: IconCoinFilled,
    withoutBadtz: "Designer: ~$1,500+/landing page",
    withBadtz: "All designs included forever",
  },
  {
    feature: "UI Block Access",
    icon: IconLayoutFilled,
    withoutBadtz: "Build every block from scratch",
    withBadtz: "70+ blocks + future additions",
  },
  {
    feature: "Development Time",
    icon: IconClockFilled,
    withoutBadtz: "~400+ engineering hours",
    withBadtz: "Save 400+ hours instantly",
  },
  {
    feature: "Time to Market",
    icon: IconJetpackFilled,
    withoutBadtz: "Weeks of design & coding",
    withBadtz: "Launch 10x faster",
  },
  {
    feature: "Templates",
    icon: IconLayoutGridFilled,
    withoutBadtz: "Manual design & coding",
    withBadtz: "All current + future templates",
  },
  {
    feature: "Design System",
    icon: IconPaletteFilled,
    withoutBadtz: "Inconsistent UI, technical debt",
    withBadtz: "Future-proof design system",
  },
  {
    feature: "Performance & A11y",
    icon: IconBoltFilled,
    withoutBadtz: "Manual optimization needed",
    withBadtz: "Always up-to-date optimizations",
  },
  {
    feature: "Project Costs",
    icon: IconCoinFilled,
    withoutBadtz: "Higher development costs",
    withBadtz: "Maximum cost reduction",
  },
  {
    feature: "Updates & Support",
    icon: IconShieldCheckFilled,
    withoutBadtz: "Maintain everything yourself",
    withBadtz: "Lifetime updates & support",
  },
]

export function Comparison() {
  return (
    <section className="from-background via-secondary to-background bg-gradient-to-b from-30% pt-8">
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-start !px-4 py-16 text-center md:py-32">
        <h2 className="text-foreground leading-tighter font-gilroy max-w-2xl text-5xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-6xl/[4rem] xl:tracking-tighter">
          Stop wasting $1,500+ per landing page
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base text-balance sm:text-lg">
          While others spend weeks coding and thousands on designers,
          you&apos;ll launch beautiful, high-converting pages in minutes—not
          months.
        </p>

        <div className="mt-14 w-full rounded-lg">
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-4 py-3 font-medium [&_h3]:mb-1">
              <h3 className="text-left">Features</h3>
              <h3 className="text-left">Without Badtz UI</h3>
              <h3 className="text-left">With Badtz UI</h3>
            </div>

            <div className="flex flex-col text-sm">
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 items-center gap-4 border-t border-dashed py-4"
                >
                  <div className="flex items-center gap-2 text-left font-medium">
                    {/*<item.icon size={18} className="text-foreground" />*/}
                    {item.feature}
                  </div>
                  <div className="text-muted-foreground flex items-center justify-start gap-3 text-left">
                    <IconCircleXFilled
                      size={18}
                      className="text-muted-foreground"
                    />
                    {item.withoutBadtz}
                  </div>
                  <div className="flex items-center justify-start gap-3 text-left">
                    <IconCircleCheckFilled size={18} className="text-accent" />
                    {item.withBadtz}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 md:hidden">
            <div className="pb-6">
              <h3 className="mb-4 text-left text-lg font-medium">
                Without Badtz UI
              </h3>
              <div>
                {comparisonData.map((item, index) => (
                  <div
                    key={index}
                    className="border-t border-dashed py-5 last:border-t-0"
                  >
                    <div className="mb-2 flex items-center gap-2 text-left font-medium">
                      {/*<item.icon size={18} className="text-foreground" />*/}
                      {item.feature}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-left text-sm">
                      <IconCircleXFilled
                        size={18}
                        className="text-muted-foreground"
                      />
                      {item.withoutBadtz}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-left text-lg font-medium">
                With Badtz UI
              </h3>
              <div>
                {comparisonData.map((item, index) => (
                  <div
                    key={index}
                    className="border-t border-dashed py-5 last:border-t-0"
                  >
                    <div className="mb-2 flex items-center gap-2 text-left font-medium">
                      {/*<item.icon size={18} className="text-foreground" />*/}
                      {item.feature}
                    </div>
                    <div className="flex items-center gap-2 text-left text-sm">
                      <IconCircleCheckFilled
                        size={18}
                        className="text-accent"
                      />
                      {item.withBadtz}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
