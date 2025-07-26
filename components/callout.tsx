import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function Callout({
  title,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Alert>) {
  return (
    <Alert
      className={cn(
        "bg-surface text-surface-foreground border-l-primary mt-6 flex w-auto items-center gap-3 border-l-2 md:-mx-4",
        className
      )}
      {...props}
    >
      <div className="bg-primary text-primary-foreground flex h-4 w-4 items-center justify-center rounded-full text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 9h.01" />
          <path d="M11 12h1v4h1" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription className="text-card-foreground/80">
          {children}
        </AlertDescription>
      </div>
    </Alert>
  )
}
