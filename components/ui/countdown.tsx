"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const baseSaleEndDate = new Date("2024-12-31T23:59:59")

const now = new Date()
const timeSinceBase = now.getTime() - baseSaleEndDate.getTime()
const weeksPassed = Math.max(
  0,
  Math.ceil(timeSinceBase / (7 * 24 * 60 * 60 * 1000))
)
const saleEndDate = new Date(
  baseSaleEndDate.getTime() + weeksPassed * 7 * 24 * 60 * 60 * 1000
)

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

interface CountdownProps {
  className?: string
}

export function Countdown({ className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = saleEndDate.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (timeLeft.isExpired) return null

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="flex flex-col items-center">
        <span className="text-muted-foreground bg-secondary rounded-t-md border border-b-0 border-dashed px-3 py-0.5 text-center text-[13px] shadow-[0_0_24px_#b9e7ec017_inset]">
          Offer ends in:
        </span>
        <div className="divide-border bg-secondary flex items-center divide-x overflow-hidden rounded-md border text-sm tabular-nums">
          <span className="flex h-8 items-center justify-center p-2 px-3 shadow-[0_0_24px_#b9e7ec10_inset]">
            {timeLeft.days}
            <span className="text-muted-foreground">d</span>
          </span>
          <span className="flex h-8 items-center justify-center p-2 shadow-[0_0_24px_#b9e7ec10_inset]">
            {timeLeft.hours.toString().padStart(2, "0")}
            <span className="text-muted-foreground">h</span>
          </span>
          <span className="flex h-8 items-center justify-center p-2 shadow-[0_0_24px_#b9e7ec10_inset]">
            {timeLeft.minutes.toString().padStart(2, "0")}
            <span className="text-muted-foreground">m</span>
          </span>
          <span className="flex h-8 items-center justify-center p-2 shadow-[0_0_24px_#b9e7ec10_inset]">
            {timeLeft.seconds.toString().padStart(2, "0")}
            <span className="text-muted-foreground">s</span>
          </span>
        </div>
      </div>
    </div>
  )
}
