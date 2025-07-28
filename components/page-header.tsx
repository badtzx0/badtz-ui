import { cn } from "@/lib/utils"

function PageHeader({
  className,
  children,
  center = true,
  ...props
}: React.ComponentProps<"section"> & { center?: boolean }) {
  return (
    <section className="border-grid" {...props}>
      <div
        className={cn(
          "container flex flex-col items-start gap-2 !px-0 pt-16 pb-16 text-left md:pt-24 md:pb-24 xl:gap-4",
          center && "items-center text-center",
          className
        )}
      >
        {children}
      </div>
    </section>
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "leading-tighter font-gilroy text-foreground mt-2 inline-block max-w-2xl text-5xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-7xl/[4.75rem] xl:tracking-tighter dark:bg-gradient-to-b dark:from-white/80 dark:via-white dark:to-white/60 dark:bg-clip-text dark:text-transparent",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-muted-foreground mt-4 max-w-2xl text-base text-balance sm:text-lg md:mt-0",
        className
      )}
      {...props}
    />
  )
}

function PageActions({
  className,
  center = true,
  ...props
}: React.ComponentProps<"div"> & { center?: boolean }) {
  return (
    <div
      className={cn(
        "mt-2 flex w-full items-center justify-start gap-2 pt-2 **:data-[slot=button]:shadow-none",
        center && "justify-center",
        className
      )}
      {...props}
    />
  )
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading }
