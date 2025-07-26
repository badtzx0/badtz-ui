"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { toast } from "sonner"

import { siteConfig } from "@/lib/config"
import { useGitHubStarPrompt } from "@/hooks/use-github-star-prompt"
import { Button } from "@/components/ui/button"

export function GitHubStarPrompt() {
  const { shouldShow, dismiss, dismissForever, setToastActive, isToastActive } =
    useGitHubStarPrompt()

  useEffect(() => {
    if (shouldShow && !isToastActive) {
      setToastActive(true)

      let showConfirmation = false

      const updateToastContent = () => {
        return (
          <div className="bg-sidebar relative flex w-full max-w-[240px] items-center justify-between rounded-lg border p-3 pt-4 shadow-sm">
            {!showConfirmation ? (
              <div className="flex flex-col gap-4">
                <div
                  className="flex flex-1 cursor-pointer items-center gap-3"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.datafast) {
                      window.datafast("clicked_pro_popup")
                    }
                    window.open(siteConfig.links.github, "_blank")
                    toast.dismiss(toastId)
                    dismiss()
                  }}
                >
                  <div className="flex-1">
                    <p className="text-popover-foreground text-sm font-medium">
                      You like Badtz UI?
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Consider leaving a star! It’s free and means a lot to me.
                      ❤️
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (typeof window !== "undefined" && window.datafast) {
                        window.datafast("clicked_pro_popup")
                      }
                      window.open(siteConfig.links.github, "_blank")
                      toast.dismiss(toastId)
                      dismiss()
                    }}
                    className="group h-8 w-full items-center justify-start px-2 text-xs leading-none hover:text-amber-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1 group-hover:fill-amber-500 group-hover:stroke-amber-500"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                    Star
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    showConfirmation = true
                    toast.custom(updateToastContent, {
                      id: toastId,
                      duration: Infinity,
                      position: "bottom-right",
                    })
                  }}
                  className="absolute top-2 right-2 h-4 w-4 px-2"
                  title="Close"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <p className="text-popover-foreground text-sm font-medium">
                    Are you sure?
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    This will permanently hide this message. You won&apos;t see
                    it again.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      toast.dismiss(toastId)
                      dismissForever()
                    }}
                    className="group h-8 w-full items-center justify-start px-2 text-xs leading-none"
                  >
                    Yes, hide forever
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    showConfirmation = false
                    toast.custom(updateToastContent, {
                      id: toastId,
                      duration: Infinity,
                      position: "bottom-right",
                    })
                  }}
                  className="absolute top-2 right-2 h-4 w-4 px-2"
                  title="Keep it"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )
      }

      const toastId = toast.custom(updateToastContent, {
        duration: Infinity,
        position: "bottom-right",
        onDismiss: () => setToastActive(false),
      })
    }
  }, [shouldShow, dismiss, dismissForever, isToastActive, setToastActive])

  return null
}
