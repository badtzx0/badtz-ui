"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible relative md:-mx-4", className)}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <div className="absolute top-2 right-9 z-10 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-7 rounded-md px-2"
          >
            {isOpened ? "Collapse" : "Expand"}
          </Button>
          <Separator orientation="vertical" className="mx-1.5 !h-4" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        forceMount
        className="relative mt-6 overflow-hidden data-[state=closed]:max-h-64 [&>figure]:mt-0 [&>figure]:md:!mx-0"
      >
        {children}
      </CollapsibleContent>
      <CollapsibleTrigger className="to-background text-muted-foreground group/expand-collapse absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b from-transparent text-sm group-data-[state=open]/collapsible:hidden">
        <div className="bg-background group-hover/expand-collapse:bg-muted/50 flex h-8 items-center justify-center rounded-md border px-3">
          {isOpened ? "Collapse" : "Expand"}
        </div>
      </CollapsibleTrigger>
    </Collapsible>
  )
}
