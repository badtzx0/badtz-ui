"use client"

import * as React from "react"
import Link from "next/link"
import { UserRole } from "@/generated/prisma"
import {
  Check,
  ChevronRight,
  Clipboard,
  File,
  Folder,
  Fullscreen,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react"
import { ImperativePanelHandle } from "react-resizable-panels"
import { registryItemFileSchema, registryItemSchema } from "shadcn/registry"
import { z } from "zod"

import { trackEvent } from "@/lib/events"
import { createFileTreeForRegistryItemFiles, FileTree } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { useAccessControl } from "@/hooks/use-access-control"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useThemeConfig } from "@/components/active-theme"
import { getIconForLanguageExtension } from "@/components/icons"
import { ThemeSelector } from "@/components/theme-selector"
import { UnlockButton } from "@/components/unlock-button"

type BlockViewerContext = {
  item: z.infer<typeof registryItemSchema>
  view: "code" | "preview"
  setView: (view: "code" | "preview") => void
  activeFile: string | null
  setActiveFile: (file: string) => void
  resizablePanelRef: React.RefObject<ImperativePanelHandle | null> | null
  tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null
  highlightedFiles:
    | (z.infer<typeof registryItemFileSchema> & {
        highlightedContent: string
      })[]
    | null
  iframeKey?: number
  setIframeKey?: React.Dispatch<React.SetStateAction<number>>
}

const BlockViewerContext = React.createContext<BlockViewerContext | null>(null)

function useBlockViewer() {
  const context = React.useContext(BlockViewerContext)
  if (!context) {
    throw new Error("useBlockViewer must be used within a BlockViewerProvider.")
  }
  return context
}

function BlockViewerProvider({
  item,
  tree,
  highlightedFiles,
  children,
}: Pick<BlockViewerContext, "item" | "tree" | "highlightedFiles"> & {
  children: React.ReactNode
}) {
  const [view, setView] = React.useState<BlockViewerContext["view"]>("preview")
  const [activeFile, setActiveFile] = React.useState<
    BlockViewerContext["activeFile"]
  >(highlightedFiles?.[0].target ?? null)
  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null)
  const [iframeKey, setIframeKey] = React.useState(0)

  return (
    <BlockViewerContext.Provider
      value={{
        item,
        view,
        setView,
        resizablePanelRef,
        activeFile,
        setActiveFile,
        tree,
        highlightedFiles,
        iframeKey,
        setIframeKey,
      }}
    >
      <div
        id={item.name}
        data-view={view}
        className="group/block-view-wrapper flex min-w-0 scroll-mt-24 flex-col items-stretch gap-4 overflow-hidden"
        style={
          {
            "--height": item.meta?.iframeHeight ?? "930px",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </BlockViewerContext.Provider>
  )
}

function BlockViewerToolbar({ name }: { name: string }) {
  const { setView, view, item, resizablePanelRef, setIframeKey } =
    useBlockViewer()
  const { activeTheme } = useThemeConfig()
  const { hasAccess: checkAccess } = useAccessControl()

  const hasAccess = checkAccess([
    UserRole.FULL_ACCESS,
    UserRole.ONE_YEAR_ACCESS,
  ])

  const formatName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="flex w-full items-end gap-2 pl-2 md:pr-6">
      <div className="flex flex-col items-start gap-3">
        <h2 className="font-gilroy text-2xl tracking-tight">
          {formatName(name)}
        </h2>
        {hasAccess ? (
          <Tabs
            value={view}
            onValueChange={(value) => setView(value as "preview" | "code")}
          >
            <TabsList className="grid h-8 grid-cols-2 items-center rounded-md p-1 *:data-[slot=tabs-trigger]:h-6 *:data-[slot=tabs-trigger]:rounded-sm *:data-[slot=tabs-trigger]:px-2 *:data-[slot=tabs-trigger]:text-xs">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </Tabs>
        ) : (
          <UnlockButton />
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <BlockCopyDependenciesButton />
        <div className="hidden h-8 items-center gap-1.5 rounded-md border p-1 shadow-xs lg:block">
          <ToggleGroup
            type="single"
            defaultValue="100"
            onValueChange={(value) => {
              setView("preview")
              if (resizablePanelRef?.current) {
                resizablePanelRef.current.resize(parseInt(value))
              }
            }}
            className="gap-1 *:data-[slot=toggle-group-item]:!size-6 *:data-[slot=toggle-group-item]:!rounded-sm"
          >
            <ToggleGroupItem value="100" title="Desktop">
              <Monitor />
            </ToggleGroupItem>
            <ToggleGroupItem value="60" title="Tablet">
              <Tablet />
            </ToggleGroupItem>
            <ToggleGroupItem value="30" title="Mobile">
              <Smartphone />
            </ToggleGroupItem>
            <Separator orientation="vertical" className="!h-4" />
            <Button
              size="icon"
              variant="ghost"
              className="size-6 rounded-sm p-0"
              asChild
              title="Open in New Tab"
            >
              <Link
                href={`/view/${item.name}?theme=${activeTheme}`}
                target="_blank"
              >
                <span className="sr-only">Open in New Tab</span>
                <Fullscreen />
              </Link>
            </Button>
            <Separator orientation="vertical" className="!h-4" />
            <Button
              size="icon"
              variant="ghost"
              className="size-6 rounded-sm p-0"
              title="Refresh Preview"
              onClick={() => {
                if (setIframeKey) {
                  setIframeKey((k) => k + 1)
                }
              }}
            >
              <RotateCw />
              <span className="sr-only">Refresh Preview</span>
            </Button>
          </ToggleGroup>
        </div>
        <ThemeSelector />
      </div>
    </div>
  )
}

function BlockViewerIframe({ className }: { className?: string }) {
  const { item, iframeKey } = useBlockViewer()
  const { activeTheme } = useThemeConfig()
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const [initialTheme] = React.useState(activeTheme)

  const iframeUrl = `/view/${item.name}?theme=${initialTheme}`

  React.useEffect(() => {
    const iframe = iframeRef.current
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "THEME_CHANGE", theme: activeTheme },
        "*"
      )
    }
  }, [activeTheme])

  return (
    <iframe
      ref={iframeRef}
      key={`${iframeKey}-${item.name}`}
      src={iframeUrl}
      height={item.meta?.iframeHeight ?? 930}
      loading="lazy"
      onLoad={() => {
        const iframe = iframeRef.current
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            { type: "THEME_CHANGE", theme: activeTheme },
            "*"
          )
        }
      }}
      className={cn(
        "bg-background no-scrollbar relative z-20 w-full",
        className
      )}
    />
  )
}

function BlockViewerView() {
  const { resizablePanelRef } = useBlockViewer()

  return (
    <div className="flex h-(--height) group-data-[view=code]/block-view-wrapper:hidden">
      <div className="relative grid w-full gap-4">
        <div className="absolute inset-0 right-4 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"></div>
        <ResizablePanelGroup
          direction="horizontal"
          className="after:bg-surface/50 relative z-10 after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-xl"
        >
          <ResizablePanel
            ref={resizablePanelRef}
            className="bg-background relative aspect-[4/2.5] overflow-hidden rounded-lg border md:aspect-auto md:rounded-xl"
            defaultSize={100}
            minSize={30}
          >
            <BlockViewerIframe />
          </ResizablePanel>
          <ResizableHandle className="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:translate-x-[-1px] after:-translate-y-1/2 after:rounded-full after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

// Truncate displayed content for very large files while keeping copy functionality intact
function getTruncatedContent(
  highlightedContent: string,
  originalContent: string
) {
  const MAX_DISPLAY_CHARS = 50000 // ~50KB limit for display

  if (originalContent.length <= MAX_DISPLAY_CHARS) {
    return highlightedContent
  }

  // Find a good truncation point (end of a line) near the limit
  const truncateAt = highlightedContent.lastIndexOf("\n", MAX_DISPLAY_CHARS)
  const truncatedHTML = highlightedContent.substring(
    0,
    truncateAt > 0 ? truncateAt : MAX_DISPLAY_CHARS
  )

  // Add truncation notice
  const notice = `\n<div class="border-t mt-4 pt-4 text-muted-foreground text-sm italic">
    // ... content truncated for display (${(originalContent.length / 1024).toFixed(1)}KB total)<br/>
    // Click the copy button above to get the complete file
  </div>`

  return truncatedHTML + notice
}

function BlockViewerCode() {
  const { activeFile, highlightedFiles } = useBlockViewer()
  const { hasAccess: checkAccess } = useAccessControl()

  const hasAccess = checkAccess([
    UserRole.FULL_ACCESS,
    UserRole.ONE_YEAR_ACCESS,
  ])

  const file = React.useMemo(() => {
    return highlightedFiles?.find((file) => file.target === activeFile)
  }, [highlightedFiles, activeFile])

  if (!file || !hasAccess) {
    return null
  }

  const language = file.path.split(".").pop() ?? "tsx"

  return (
    <div className="bg-code text-code-foreground mr-[14px] flex min-h-[700px] overflow-hidden rounded-xl border group-data-[view=preview]/block-view-wrapper:hidden md:h-(--height)">
      <div className="w-72">
        <BlockViewerFileTree />
      </div>
      <figure
        data-rehype-pretty-code-figure=""
        className="!mx-0 mt-0 flex min-w-0 flex-1 flex-col rounded-xl border-none"
      >
        <figcaption
          className="text-code-foreground [&_svg]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {file.target?.replace(/\\/g, "/").split("/")[0] +
            "/" +
            file.target?.replace(/\\/g, "/").split("/").pop()}
          <div className="ml-auto flex items-center gap-2">
            <BlockCopyCodeButton />
          </div>
        </figcaption>
        <div
          key={file?.path}
          dangerouslySetInnerHTML={{
            __html: getTruncatedContent(
              file?.highlightedContent ?? "",
              file?.content ?? ""
            ),
          }}
          className="no-scrollbar overflow-y-auto"
        />
      </figure>
    </div>
  )
}

export function BlockViewerFileTree() {
  const { tree } = useBlockViewer()

  if (!tree) {
    return null
  }

  return (
    <SidebarProvider className="flex !min-h-full flex-col border-r">
      <Sidebar collapsible="none" className="w-full flex-1">
        <SidebarGroupLabel className="text-muted-foreground h-12 rounded-none border-b px-4 text-sm">
          Files
        </SidebarGroupLabel>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="text-foreground translate-x-0 gap-1.5">
              {tree.map((file, index) => (
                <Tree key={index} item={file} index={1} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  )
}

function Tree({ item, index }: { item: FileTree; index: number }) {
  const { activeFile, setActiveFile } = useBlockViewer()

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          className="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none pl-(--index) whitespace-nowrap"
          data-index={index}
          style={
            {
              "--index": `${index * (index === 2 ? 1.2 : 1.3)}rem`,
            } as React.CSSProperties
          }
        >
          <ChevronRight className="invisible" />
          <File className="h-4 w-4" />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none pl-(--index) whitespace-nowrap"
            style={
              {
                "--index": `${index * (index === 1 ? 1 : 1.2)}rem`,
              } as React.CSSProperties
            }
          >
            <ChevronRight className="transition-transform" />
            <Folder />
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full translate-x-0 border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree key={key} item={subItem} index={index + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

function BlockCopyCodeButton() {
  const { activeFile, item } = useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const file = React.useMemo(() => {
    return item.files?.find((file) => file.target === activeFile)
  }, [activeFile, item.files])

  const content = file?.content

  if (!content) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 rounded-md"
      onClick={() => {
        copyToClipboard(content)
        trackEvent({
          name: "copy_block_code",
          properties: {
            name: item.name,
            file: file.path,
          },
        })
      }}
    >
      {isCopied ? <Check /> : <Clipboard />}
    </Button>
  )
}

function BlockCopyDependenciesButton() {
  const { item } = useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const { hasAccess: checkAccess } = useAccessControl()

  const hasAccess = checkAccess([
    UserRole.FULL_ACCESS,
    UserRole.ONE_YEAR_ACCESS,
  ])

  const npmCommand = React.useMemo(() => {
    const dependencies = item.dependencies || []
    if (dependencies.length === 0) {
      return null
    }
    return `npm install ${dependencies.join(" ")}`
  }, [item.dependencies])

  if (!npmCommand || !hasAccess) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="!bg-background !border-input hidden rounded-sm p-0 sm:flex"
      title="Copy Dependencies"
      onClick={() => {
        copyToClipboard(npmCommand)
        trackEvent({
          name: "copy_npm_command",
          properties: {
            name: item.name,
          },
        })
      }}
    >
      {isCopied ? <Check /> : <Terminal />}
      <span>Copy Dependencies</span>
    </Button>
  )
}

function BlockViewer({
  item,
  tree,
  highlightedFiles,
  ...props
}: Pick<BlockViewerContext, "item" | "tree" | "highlightedFiles"> & {
  children: React.ReactNode
}) {
  return (
    <BlockViewerProvider
      item={item}
      tree={tree}
      highlightedFiles={highlightedFiles}
      {...props}
    >
      <BlockViewerToolbar name={item.name} />
      <BlockViewerView />
      <BlockViewerCode />
    </BlockViewerProvider>
  )
}

export { BlockViewer }
