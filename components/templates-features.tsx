import { Icons } from "@/components/icons"

const descriptions = ["Time saved", "Money saved", "Pages", "Components"]
const defaultTitles = ["4", "8", "12", "16"]
const icons = [Icons.clock, Icons.dollar, Icons.page, Icons.component]

interface TemplatesFeaturesProps {
  titles?: string[]
}

export function TemplatesFeatures({
  titles = defaultTitles,
}: TemplatesFeaturesProps) {
  return (
    <div className="flex flex-col gap-4 border-t pt-4 pb-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {titles.map((title, index) => (
          <Feature
            key={index}
            title={title}
            description={descriptions[index]}
            icon={icons[index]}
          />
        ))}
      </div>
    </div>
  )
}

interface FeatureProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

function Feature({ title, description, icon: Icon }: FeatureProps) {
  return (
    <div className="flex flex-col items-center pt-4 text-center">
      <Icon className="h-5 w-5" />
      <h3 className="mt-3 text-[15px] font-semibold">{title}</h3>
      <p className="text-muted-foreground text-[15px] leading-none">
        {description}
      </p>
    </div>
  )
}
