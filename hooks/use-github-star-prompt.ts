"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const STORAGE_KEY = "github-star-prompt-dismissed"
const DELAY_MS = 5000

export function useGitHubStarPrompt() {
  const [shouldShow, setShouldShow] = useState(false)
  const [isToastActive, setIsToastActive] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    if (!pathname.startsWith("/docs")) {
      setShouldShow(false)
      return
    }

    if (!isDesktop) {
      setShouldShow(false)
      return
    }

    const isDismissed = localStorage.getItem(STORAGE_KEY)
    if (isDismissed === "true") {
      setShouldShow(false)
      return
    }

    if (isToastActive) {
      return
    }

    const timer = setTimeout(() => {
      setShouldShow(true)
    }, DELAY_MS)

    return () => clearTimeout(timer)
  }, [pathname, isToastActive, isDesktop])

  const dismiss = () => {
    setShouldShow(false)
    setIsToastActive(false)
  }

  const dismissForever = () => {
    localStorage.setItem(STORAGE_KEY, "true")
    setShouldShow(false)
    setIsToastActive(false)
  }

  const setToastActive = (active: boolean) => {
    setIsToastActive(active)
  }

  return {
    shouldShow,
    dismiss,
    dismissForever,
    setToastActive,
    isToastActive,
  }
}
