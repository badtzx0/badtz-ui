import {
  IconBasketFilled,
  IconBoltFilled,
  IconBriefcaseFilled,
  IconBrightness,
  IconDashboardFilled,
  IconFlask2Filled,
  IconGlobeFilled,
  IconJetpackFilled,
} from "@tabler/icons-react"
import { Code2 } from "lucide-react"

const tagIcons = {
  Saas: IconBriefcaseFilled,
  Startup: IconJetpackFilled,
  Landing: IconGlobeFilled,
  Modern: IconBoltFilled,
  Ecommerce: IconBasketFilled,
  Dashboard: IconDashboardFilled,
  Business: IconBriefcaseFilled,
  "Dark/Light": IconBrightness,
  Glassmorphism: IconFlask2Filled,
}

interface TemplateTagProps {
  tag: string
}

export function TemplateTag({ tag }: TemplateTagProps) {
  const IconComponent = tagIcons[tag as keyof typeof tagIcons] || Code2

  return (
    <div className="bg-secondary flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium [&_svg]:size-3.5">
      <IconComponent size={12} />
      {tag}
    </div>
  )
}

interface TemplateTagsProps {
  tags: string[]
}

export function TemplateTags({ tags }: TemplateTagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <TemplateTag key={tag} tag={tag} />
      ))}
    </div>
  )
}
