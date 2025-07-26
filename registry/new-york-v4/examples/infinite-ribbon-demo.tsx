import { InfiniteRibbon } from "@/registry/new-york-v4/ui/infinite-ribbon"

export default function InfiniteRibbonDemo() {
  return (
    <div className="relative flex h-[350px] w-full items-center justify-center overflow-hidden">
      <InfiniteRibbon rotation={5} className="absolute">
        Build fast, responsive, and beautiful interfaces with ready-to-use
        components. Designed for developers who demand the best.
      </InfiniteRibbon>
      <InfiniteRibbon reverse={true} rotation={-5}>
        Build fast, responsive, and beautiful interfaces with ready-to-use
        components. Designed for developers who demand the best.
      </InfiniteRibbon>
    </div>
  )
}
