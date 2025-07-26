import { createStaticOGMetadata } from "@/lib/metadata"

const title = "Production Ready Templates"
const description =
  "Complete website templates built with React. Modern, responsive, and fully customizable. Perfect for startups, agencies, and businesses."

export const metadata = createStaticOGMetadata(title, description)

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container-wrapper max-w-6xl flex-1">
      <div className="container">{children}</div>
    </div>
  )
}
