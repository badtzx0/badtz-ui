"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon, TerminalIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { useConfig } from "@/hooks/use-config"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [config, setConfig] = useConfig()
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const packageManager = config.packageManager || "pnpm"
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]

    if (!command) {
      return
    }

    let slug = ""
    if (typeof window !== "undefined") {
      const parts = window.location.pathname.split("/").filter(Boolean)
      slug = parts[parts.length - 1] || ""
      slug = slug.toLowerCase().replace(/[^a-z0-9]/g, "_")
    }
    const goalName = `copied_command_${slug}`.substring(0, 32)

    navigator.clipboard.writeText(command)
    if (typeof window !== "undefined" && window.datafast) {
      window.datafast(goalName)
    }
    setHasCopied(true)
  }, [packageManager, tabs])

  return (
    <div className="max-w-full min-w-0 overflow-x-auto rounded-lg p-1">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          })
        }}
      >
        <div className="flex items-center gap-2 px-3 pb-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <TerminalIcon className="text-code size-3" />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-muted data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
                >
                  {key}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar max-w-full min-w-0 overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent
                key={key}
                value={key}
                className="bg-code border-border/70 mt-0 max-w-full min-w-0 rounded-[0.375rem] border px-4 py-3.5"
              >
                <pre className="scrollbar-none min-w-0 overflow-x-auto">
                  <code
                    className="relative font-mono text-sm leading-none whitespace-pre-wrap"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            data-slot="copy-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="focus-visible:border-ring focus-visible:ring-ring/50 text-muted-foreground/70 hover:text-foreground/70 hover:bg-muted absolute top-2 right-2 z-10 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-70 transition-colors outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={copyCommand}
          >
            <span className="sr-only">Copy</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={hasCopied ? "check" : "copy"}
                data-slot="copy-button-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent>
          {hasCopied ? "Copied" : "Copy to Clipboard"}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
