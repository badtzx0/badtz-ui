import { InfiniteRibbon } from "@/registry/new-york-v4/ui/infinite-ribbon"

export default function InfiniteRibbonDemoBis() {
  return (
    <div className="flex h-[350px] w-full flex-col items-center justify-center gap-10 overflow-hidden">
      <InfiniteRibbon>
        Build fast, responsive, and beautiful interfaces with ready-to-use
        components. Designed for developers who demand the best.
      </InfiniteRibbon>
      <InfiniteRibbon reverse={true}>
        Build fast, responsive, and beautiful interfaces with ready-to-use
        components. Designed for developers who demand the best.
      </InfiniteRibbon>
    </div>
  )
}
