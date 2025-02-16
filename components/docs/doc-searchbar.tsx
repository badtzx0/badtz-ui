"use client";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";
import { File, Monitor } from "lucide-react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useRef } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface DocsSearchbarProps {
  className?: string;
}

export function DocsSearchbar(props: DocsSearchbarProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setTheme } = useTheme();

  const handleButtonClick = () => {
    setOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="sr-only">logo</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="dark:bg-muted bg-sidebar-accent text-foreground dark:text-muted-foreground border dark:hover:text-foreground pr-1 h-9 dark:border-sidebar-border border-sidebar-border/50 dark:hover:border-foreground/10 hover:border-foreground/10 transition-colors duration-300"
              >
                <button
                  className={cn("")}
                  onClick={handleButtonClick}
                  {...props}
                >
                  <Search size={14} />
                  <span className="flex justify-between w-full items-center text-sm">
                    Search docs{" "}
                    <kbd className="pointer-events-none h-6 select-none items-center rounded border border-sidebar-border dark:bg-secondary bg-muted/50 px-1.5 font-mono text-[10px] font-medium flex">
                      <span className="text-[8px] mr-0.5">⌘</span>K
                    </kbd>
                  </span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle>Command search</DialogTitle>
        </VisuallyHidden>
        <CommandInput
          ref={inputRef}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {docsConfig.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items
                .filter((navItem) => navItem.label !== "soon")
                .map((navItem) => (
                  <CommandItem
                    key={navItem.href}
                    value={navItem.title}
                    onSelect={() => {
                      runCommand(() => router.push(navItem.href));
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <File className="h-3 w-3" />
                    </div>
                    {navItem.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-3 w-3" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-3 w-3" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Monitor className="mr-2 h-3 w-3" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
