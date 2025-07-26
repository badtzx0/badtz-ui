import { SvgLines } from "@/components/ui/svg-lines"
import GithubSectionButton from "@/components/marketing/github-section-button"

export function GithubSection() {
  return (
    <section className="from-background to-secondary/60 bg-gradient-to-t from-10% to-90%">
      <div className="container mx-auto flex w-full max-w-6xl flex-col items-center justify-start !px-4 py-8 text-center md:pt-32 md:pb-16">
        <h2 className="leading-tighter font-gilroy max-w-3xl bg-gradient-to-b from-white/80 via-white to-white/60 bg-clip-text pb-2 text-5xl font-semibold tracking-tight text-pretty text-transparent lg:leading-[1.1] lg:font-semibold xl:text-6xl/[4rem] xl:tracking-tighter">
          Open Source, Built Together
        </h2>
        <div className="relative">
          <p className="text-muted-foreground relative z-5 mt-2 max-w-2xl text-base text-balance sm:text-lg">
            BadtzUI is an open-source project where everyone can contribute.
            Join our community, suggest improvements, and help shape the future
            of this UI library!
          </p>
          <div
            className="pointer-events-none absolute top-[10px] left-[10px] hidden h-[200px] w-[195px] md:block"
            aria-hidden="true"
          >
            <SvgLines
              path="M1 0V79.1111C1 96.7842 15.3269 111.111 33 111.111H162C179.673 111.111 194 125.438 194 143.111V200"
              viewBox="0 0 195 200"
              pathColor="#ffffff40"
            />
          </div>
          <div
            className="pointer-events-none absolute top-[10px] left-[-20px] hidden h-[200px] w-[195px] md:block"
            aria-hidden="true"
          >
            <SvgLines
              path="M1 0V49.1111C1 66.7842 15.3269 81.1111 33 81.1111H162C179.673 81.1111 194 95.438 194 113.111V200"
              viewBox="0 0 195 200"
              delay={0.5}
              pathColor="#ffffff40"
            />
          </div>
          <div
            className="pointer-events-none absolute top-[10px] right-[10px] hidden h-[200px] w-[195px] md:block"
            aria-hidden="true"
          >
            <SvgLines
              path="M194 0V79.1111C194 96.7842 179.673 111.111 162 111.111H33C15.3269 111.111 1 125.438 1 143.111V200"
              viewBox="0 0 195 200"
              delay={1}
              pathColor="#ffffff40"
            />
          </div>
          <div
            className="pointer-events-none absolute top-[10px] right-[-20px] hidden h-[200px] w-[195px] md:block"
            aria-hidden="true"
          >
            <SvgLines
              path="M194 0V49.1111C194 66.7842 179.673 81.1111 162 81.1111H33C15.3269 81.1111 1 95.438 1 113.111V200"
              viewBox="0 0 195 200"
              delay={1.5}
              pathColor="#ffffff40"
            />
          </div>
          {/* Gradient mask overlay */}
          <div
            className="from-background pointer-events-none absolute top-0 right-[-30px] left-[-30px] z-1 hidden h-[50px] bg-gradient-to-b to-transparent md:block"
            aria-hidden="true"
          />
          <div
            className="from-background pointer-events-none absolute top-[160px] right-[-30px] left-[-30px] z-1 hidden h-[50px] bg-gradient-to-t to-transparent md:block"
            aria-hidden="true"
          />
        </div>

        <GithubSectionButton />
      </div>
    </section>
  )
}
