import { Marquee } from "@/registry/new-york-v4/ui/marquee"

const items = [
  {
    name: "Emma Wilson",
    title: "Product Designer, TechCorp",
    image:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-2.webp",
    body: "This design system has transformed our workflow. The components are intuitive and well-documented.",
  },
  {
    name: "Lucas Chen",
    title: "Frontend Developer, WebFlow",
    image:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-1.webp",
    body: "The components are well-structured and customizable. They've significantly reduced our development time.",
  },
  {
    name: "Sophia Martinez",
    title: "UI/UX Lead, DesignHub",
    image:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-5.webp",
    body: "Every component feels polished and professional. It's become our go-to resource for all projects.",
  },
  {
    name: "Oliver Thompson",
    title: "Creative Director, StudioX",
    image:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-4.webp",
    body: "This design system brings consistency and efficiency to our creative process. Beautiful and functional.",
  },
]

function TestimonialCard({ item }: { item: (typeof items)[number] }) {
  return (
    <div className="relative flex h-full w-[20rem] flex-col items-start justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900">
      <div className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
        {item.body}
      </div>
      <div className="mt-auto flex items-center gap-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-medium text-neutral-950 dark:text-neutral-50">
            {item.name}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {item.title}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MarqueeDemo() {
  return (
    <div className="relative max-w-[700px] overflow-hidden">
      <div className="from-background absolute inset-y-0 left-0 z-10 w-30 bg-gradient-to-r to-transparent" />
      <div className="from-background absolute inset-y-0 right-0 z-10 w-30 bg-gradient-to-l to-transparent" />
      <Marquee className="py-2" direction="left">
        {[...items, ...items].map((item, index) => (
          <TestimonialCard key={index} item={item} />
        ))}
      </Marquee>
      <Marquee className="py-2" direction="right">
        {[...items, ...items].map((item, index) => (
          <TestimonialCard key={index} item={item} />
        ))}
      </Marquee>
    </div>
  )
}
