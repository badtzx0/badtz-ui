import { templatesSource } from "./templates-source"

export interface Template {
  name: string
  title: string
  description?: string
  tags?: string[]
  role?: "TEMPLATE_1" | "TEMPLATE_2"
  zipFile?: string
  actionButtons?: string[]
  image?: string
  slug: string
  url: string
}

export function getAllTemplates(): Template[] {
  const pages = templatesSource.getPages()

  return pages.map((page) => ({
    name: page.slugs[0] || "index",
    title: page.data.title || "Untitled",
    description: page.data.description,
    tags: page.data.tags,
    role: page.data.role,
    zipFile: page.data.zipFile,
    actionButtons: page.data.actionButtons,
    slug: page.slugs[0] || "index",
    image: page.data.image,
    url: page.url,
  }))
}

export function getTemplate(slug: string) {
  return templatesSource.getPage([slug])
}
