"use client"

import confetti from "canvas-confetti"

import { SwipeButton } from "@/registry/new-york-v4/ui/swipe-button"

export default function SwipeButtonDemo() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <div>
      <SwipeButton onSwipeComplete={triggerConfetti} />
    </div>
  )
}
