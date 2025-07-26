"use client"

import { useEffect, useState } from "react"
import { BellRing } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"
import {
  CursorCard,
  CursorCardsContainer,
} from "@/registry/new-york-v4/ui/cursor-cards"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

export default function CursorCardDemo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      <CursorCardsContainer className="flex gap-6">
        <CursorCard
          borderColor={theme === "dark" ? "#262626" : "#e5e5e5"}
          className="h-auto w-[300px] rounded-xl p-6 shadow-md"
        >
          <div className="flex flex-col">
            <h3 className="text-foreground">Notifications</h3>
            <p className="text-muted-foreground mt-0.5 text-sm">
              You have 3 unread messages.
            </p>
            <div className="mt-10 flex items-center space-x-4 rounded-md border bg-neutral-50 p-4 dark:bg-neutral-950">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm leading-none font-medium">
                  Push Notifications
                </p>
                <p className="text-muted-foreground text-sm">
                  Send notifications to device.
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CursorCard>
        <CursorCard
          borderColor={theme === "dark" ? "#262626" : "#e5e5e5"}
          className="h-auto w-[300px] rounded-xl p-6 shadow-md"
        >
          <div className="flex h-full flex-col justify-between">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-500" />
                <div className="space-y-1">
                  <p className="text-sm leading-none font-medium">
                    {notification.title}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CursorCard>
      </CursorCardsContainer>
    </div>
  )
}
