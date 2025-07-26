"use client"

import type { ReactNode } from "react"
import { cva } from "class-variance-authority"
import Link from "fumadocs-core/link"
import { Info as InfoIcon, Link as LinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Info({ children }: { children: ReactNode }): ReactNode {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="prose prose-no-margin max-h-[400px] max-w-[400px] min-w-[220px] overflow-auto text-sm">
        {children}
      </PopoverContent>
    </Popover>
  )
}

interface ObjectType {
  /**
   * Additional description of the field
   */
  description?: ReactNode
  type: string
  typeDescription?: ReactNode
  /**
   * Optional link to the type
   */
  typeDescriptionLink?: string
  default?: string

  required?: boolean
  deprecated?: boolean
}

const field = cva("inline-flex flex-row items-center gap-1")
const code = cva("rounded-md bg-secondary p-1 text-secondary-foreground", {
  variants: {
    color: {
      primary: "bg-primary/10 text-primary",
      deprecated: "line-through text-primary/50",
    },
  },
})

export function TypeTable({ type }: { type: Record<string, ObjectType> }) {
  return (
    <div className="my-6 hidden w-full overflow-auto md:block">
      <table className="border-border relative w-full border-separate border-spacing-0 overflow-x-auto rounded-lg border text-sm">
        <thead>
          <tr className="bg-code">
            <th className="border-border text-foreground border-r border-b px-4 py-3 text-left font-semibold first:rounded-tl-lg last:rounded-tr-lg last:border-r-0">
              Prop
            </th>
            <th className="border-border text-foreground border-r border-b px-4 py-3 text-left font-semibold last:rounded-tr-lg last:border-r-0">
              Type
            </th>
            <th className="border-border text-foreground border-b px-4 py-3 text-left font-semibold last:rounded-tr-lg">
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(type).map(([key, value], index, array) => (
            <tr key={key} className="even:bg-muted/25">
              <td
                className={cn(
                  "border-border border-r px-4 py-3 align-top",
                  index === array.length - 1
                    ? "first:rounded-bl-lg"
                    : "border-b"
                )}
              >
                <div className={field()}>
                  <code
                    className={cn(
                      "bg-secondary relative rounded border px-[0.3rem] py-[0.1rem] font-mono text-[0.8rem] outline-none"
                    )}
                  >
                    {key}
                    {!value.required && "?"}
                  </code>
                  {value.description ? <Info>{value.description}</Info> : null}
                </div>
              </td>
              <td
                className={cn(
                  "border-border border-r px-4 py-3 align-top",
                  index === array.length - 1 ? "" : "border-b"
                )}
              >
                <div className={field()}>
                  <code className={code()}>{value.type}</code>
                  {value.typeDescription ? (
                    <Info>{value.typeDescription}</Info>
                  ) : null}
                  {value.typeDescriptionLink ? (
                    <Link href={value.typeDescriptionLink}>
                      <LinkIcon className="text-muted-foreground size-4" />
                    </Link>
                  ) : null}
                </div>
              </td>
              <td
                className={cn(
                  "text-muted-foreground px-4 py-3 align-top",
                  index === array.length - 1
                    ? "last:rounded-br-lg"
                    : "border-border border-b"
                )}
              >
                {value.default ? (
                  <code className={code()}>{value.default}</code>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
