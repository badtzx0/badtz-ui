import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        announcement:
          "bg-muted/50 border border-dashed font-normal rounded-full h-min h-6 px-3 text-muted-foreground hover:text-foreground",
        accent:
          "h-6 gap-1.5 py-0 pr-2.5 pl-1.5 [&>svg]:size-4 text-primary border-dashed rounded-full [background-color:color-mix(in_oklch,var(--primary)_20%,transparent)] [border-color:color-mix(in_oklch,var(--primary)_40%,transparent)]",
        gradient:
          "bg-linear-to-b dark:from-[#2487EB] dark:to-[#1D69DE] from-[#FBBF24] to-[#F59E0B] border border-[#FBBF24] dark:border-[#1D69DE] dark:hover:from-[#2487EB]/90 dark:hover:to-[#1D69DE]/90 hover:from-[#FBBF24]/90 hover:to-[#F59E0B]/90 font-normal rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
