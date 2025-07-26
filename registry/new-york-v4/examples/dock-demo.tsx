import { Dock, DockIcon } from "@/registry/new-york-v4/ui/dock"

export default function DockDemo() {
  const dockItems = [
    {
      src: "https://cdn.badtz-ui.com/images/components/dock/tailwindcss-logo.webp",
      name: "TailwindCSS",
      href: "#tailwindcss",
    },
    {
      src: "https://cdn.badtz-ui.com/images/components/dock/edge-logo.webp",
      name: "Edge",
      href: "#linear",
    },
    {
      src: "https://cdn.badtz-ui.com/images/components/dock/motion-logo.webp",
      name: "Motion",
      href: "#motion",
    },
    {
      src: "https://cdn.badtz-ui.com/images/components/dock/react-logo.webp",
      name: "React",
      href: "#react",
    },
    {
      src: "https://cdn.badtz-ui.com/images/components/dock/linear-logo.webp",
      name: "Linear",
      href: "#linear",
    },
    {
      src: "https://cdn.badtz-ui.com/images/components/dock/drizzle-orm-logo.webp",
      name: "Drizzle ORM",
      href: "#drizzle-orm",
    },
    {
      src: "https://cdn.badtz-ui.com/images/components/dock/deepseek-logo.webp",
      name: "Deepseek",
      href: "#linear",
    },
  ]

  return (
    <Dock>
      {dockItems.map((item, index) => (
        <DockIcon
          key={index}
          src={item.src}
          name={item.name}
          href={item.href}
        />
      ))}
    </Dock>
  )
}
