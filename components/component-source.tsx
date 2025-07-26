import fs from "node:fs/promises"
import path from "node:path"
import * as React from "react"

import { highlightCode } from "@/lib/highlight-code"
import { getRegistryItem } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import { CopyButton } from "@/components/copy-button"
import { getIconForLanguageExtension } from "@/components/icons"

export async function ComponentSource({
  name,
  src,
  title,
  language,
  fileName,
  collapsible = true,
  className,
}: React.ComponentProps<"div"> & {
  name?: string
  src?: string
  title?: string
  language?: string
  fileName?: string
  collapsible?: boolean
}) {
  if (!name && !src) {
    return null
  }

  let code: string | undefined

  if (name) {
    const item = await getRegistryItem(name)
    if (fileName) {
      // Find the specific file by name
      const targetFile = item?.files?.find(
        (file: { path?: string; content?: string } | string) => {
          if (typeof file === "string") {
            return (
              file.endsWith(`${fileName}.tsx`) ||
              file.endsWith(`${fileName}.ts`)
            )
          }
          return (
            file.path?.endsWith(`${fileName}.tsx`) ||
            file.path?.endsWith(`${fileName}.ts`)
          )
        }
      )
      code = targetFile?.content
    } else {
      code = item?.files?.[0]?.content
    }
  }

  if (src) {
    const file = await fs.readFile(path.join(process.cwd(), src), "utf-8")
    code = file
  }

  if (!code) {
    return null
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx"
  const highlightedCode = await highlightCode(code, lang)

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode
          code={code}
          highlightedCode={highlightedCode}
          language={lang}
          title={title}
        />
      </div>
    )
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        language={lang}
        title={title}
      />
    </CodeCollapsibleWrapper>
  )
}

function ComponentCode({
  code,
  highlightedCode,
  language,
  title,
}: {
  code: string
  highlightedCode: string
  language: string
  title: string | undefined
}) {
  return (
    <figure
      data-rehype-pretty-code-figure=""
      className="border-border bg-background rounded-lg border p-1"
    >
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <CopyButton value={code} className="top-1 right-1.5" title={title} />
      <div
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className={cn(
          "border-border/70 bg-code rounded-[0.375rem] border [.component-preview-code_&]:max-h-97.5",
          "[.component-preview-code_&]:after:border-border [.component-preview-code_&]:after:bg-background [.component-preview-code_&]:after:pointer-events-none [.component-preview-code_&]:after:absolute [.component-preview-code_&]:after:top-1 [.component-preview-code_&]:after:right-1 [.component-preview-code_&]:after:z-1 [.component-preview-code_&]:after:block [.component-preview-code_&]:after:size-8 [.component-preview-code_&]:after:rounded-bl-lg [.component-preview-code_&]:after:border-b [.component-preview-code_&]:after:border-l [.component-preview-code_&]:after:content-['']"
        )}
      />
    </figure>
  )
}
