import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlausibleButton } from "@/components/plausible-button";

interface TemplateLinksProps {
  previewLink: string;
  pageLink: string;
}

export function TemplateLinks({ previewLink, pageLink }: TemplateLinksProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full mt-12">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={previewLink}
        className="w-full"
      >
        <PlausibleButton
          eventName="PreviewMappl"
          className="w-full border bg-muted/50 hover:bg-muted/30 rounded-lg transition-colors duration-300 h-9 text-sm font-medium"
        >
          <span>Preview Template</span>
        </PlausibleButton>
      </Link>
      <Link target="_blank" href={pageLink} className="w-full">
        <PlausibleButton
          eventName="ClickedOnProFromMappl"
          className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors duration-300 h-9 text-sm font-medium"
        >
          <span>Get Template</span>
        </PlausibleButton>
      </Link>
    </div>
  );
}
