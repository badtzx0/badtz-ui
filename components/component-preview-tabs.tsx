"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  replayable = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  replayable?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState("preview")
  const [key, setKey] = React.useState(0)

  const handleReplay = () => {
    setKey((prev) => prev + 1)
  }

  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs
        className="relative mr-auto w-full"
        value={tab}
        onValueChange={setTab}
      >
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList className="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
              <TabsTrigger
                value="preview"
                className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
              >
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="data-[tab=code]:border-code relative rounded-lg border md:-mx-4"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible"
        >
          {replayable && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-3 right-3 z-10 h-7 w-7 rounded-md [&_svg]:!size-3.5"
              onClick={handleReplay}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          <div
            data-align={align}
            className={cn(
              "preview flex h-[400px] w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
            )}
            key={key}
          >
            {component}
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="component-preview-code absolute inset-0 hidden overflow-hidden rounded-[inherit] data-[active=true]:block **:[figure]:!m-0 **:[pre]:h-[400px]"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
