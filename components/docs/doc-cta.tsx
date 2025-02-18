import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { PlausibleButton } from "@/components/plausible-button";

export default function DocsCta({ className }: { className?: string }) {
  return (
    <Link
      href="https://pro.badtz-ui.com"
      target="_blank"
      className={cn(
        "border border-sidebar-border dark:border-border bg-background rounded-lg flex max-w-[240px] group/cta",
        className
      )}
    >
      <PlausibleButton
        eventName="Clicked on Pro From Doc"
        className="flex flex-col items-start justify-start text-left p-4 "
      >
        <h3 className="text-base/[22px] tracking-tight text-balance font-semibold">
          Build stunning websites even faster.
        </h3>
        <p className="text-sm font-light text-muted-foreground mt-3 mb-6">
          Get BadtzUI Pro and access over 70+ prebuilt templates, blocks, and
          sections for React.
        </p>
        <span className="h-8 flex items-center text-xs w-full justify-center whitespace-nowrap rounded-md font-medium px-3 bg-gradient-to-t from-orange-600 to-orange-500 shadow-[0_0px_8px_rgba(245,_73,_0,_0.7)] text-white relative before:absolute before:inset-0 before:shadow-[0_0px_20px_rgba(245,_73,_0,_0.5)] before:opacity-0 transition-opacity duration-300 group-hover/cta:before:opacity-100 before:rounded-[inherit] before:pointer-events-none before:transition-opacity before:duration-300 before:will-change-opacity after:inset-0 after:absolute after:shadow-[rgba(255,_255,_255,_0.2)_0px_1px_0px_inset] after:rounded-[inherit] [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0 gap-2">
          Get BadtzUI Pro <ExternalLinkIcon aria-hidden="true" />
        </span>
      </PlausibleButton>
    </Link>
  );
}
