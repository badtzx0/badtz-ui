import React from "react"
import { Download } from "lucide-react"

export function DownloadStripeShaderButton() {
  const fileUrl = "/downloads/stripe-shader.zip"

  return (
    <a
      href={fileUrl}
      download
      className="bg-muted/70 hover:bg-muted/50 text-foreground mt-4 flex h-8 w-min items-center gap-3 rounded-md border px-2.5 text-sm whitespace-nowrap transition-colors"
    >
      <Download size={14} />
      stripe-gradient.zip
    </a>
  )
}
