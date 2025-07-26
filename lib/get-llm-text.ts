import type { InferPageType } from "fumadocs-core/source"
import { remarkInclude } from "fumadocs-mdx/config"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkMdx from "remark-mdx"

import { source } from "@/lib/source"

const processor = remark()
  .use(remarkMdx)
  // needed for Fumadocs MDX
  .use(remarkInclude)
  .use(remarkGfm)

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await processor.process({
    // @ts-expect-error - fumadocs types need revision
    path: page.data._file.absolutePath,
    // @ts-expect-error - fumadocs types need revision
    value: page.data.content,
  })

  return `# ${page.data.title}
URL: ${page.url}

${page.data.description}

${processed.value}`
}
