import { templates } from "@/.source"
import { loader } from "fumadocs-core/source"

export const templatesSource = loader({
  baseUrl: "/templates",
  source: templates.toFumadocsSource(),
})
