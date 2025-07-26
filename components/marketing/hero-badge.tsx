import { cn } from "@/lib/utils"

export function HeroBadge({
  children,
  icon,
  className,
  iconClassName,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  className?: string
  iconClassName?: string
}) {
  return (
    <div
      className={cn(
        "border-border bg-secondary/70 text-foreground relative z-10 flex h-7.5 items-center gap-2 rounded-full border border-dashed pr-4 pl-2 font-mono text-[13.5px] shadow-xs backdrop-blur-sm",
        className
      )}
    >
      <div className={cn("", iconClassName)}>{icon}</div>
      {children}
    </div>
  )
}
