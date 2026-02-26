"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

type ButtonState = "idle" | "loading" | "success"

interface StatusButtonProps {
  idle?: string
  success?: string
  onSuccess?: () => void
  onAction?: () => Promise<void>
  disabled?: boolean
  className?: string
  variant?: "default" | "outline" | "ghost"
  buttonClassName?: string
}

export function StatusButton({
  idle = "Send me a login link",
  success = "Login link sent!",
  onSuccess,
  onAction,
  disabled = false,
  className,
  variant = "default",
  buttonClassName = "",
}: StatusButtonProps) {
  const [buttonState, setButtonState] = useState<ButtonState>("idle")

  const buttonCopy: Record<ButtonState, string | React.JSX.Element> = {
    idle,
    loading: <Spinner size={16} color="rgba(255, 255, 255, 1)" />,
    success,
  }

  return (
    <div className={cn("", className)}>
      <Button
        variant={variant}
        className={cn("overflow-hidden", buttonClassName || "w-full")}
        disabled={buttonState === "loading" || disabled}
        onClick={async () => {
          if (buttonState === "success") return

          setButtonState("loading")

          if (onAction) {
            try {
              await onAction()
              setButtonState("success")
              onSuccess?.()
              setTimeout(() => {
                setButtonState("idle")
              }, 3500)
            } catch {
              setButtonState("idle")
            }
          } else {
            setTimeout(() => {
              setButtonState("success")
              onSuccess?.()
            }, 1750)

            setTimeout(() => {
              setButtonState("idle")
            }, 3500)
          }
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            key={buttonState}
          >
            {buttonCopy[buttonState]}
          </motion.span>
        </AnimatePresence>
      </Button>
    </div>
  )
}
