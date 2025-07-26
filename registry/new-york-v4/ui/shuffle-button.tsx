"use client"

import React, { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

function shuffleChar(char: string): string {
  const characters = "abcdefghijklmnopqrstuvwxyz"
  return char === " "
    ? " "
    : characters[Math.floor(Math.random() * characters.length)]
}

interface ShuffleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  className?: string
  duration?: number
}

export function ShuffleButton({
  children,
  className,
  duration = 1,
  ...props
}: ShuffleButtonProps) {
  const [shuffledText, setShuffledText] = useState<string>(children)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const intervals = useRef<NodeJS.Timeout[]>([])
  const timeouts = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    const textArray = children.split("")
    const numberOfCharacters = textArray.filter((char) => char !== " ").length
    const ABC = (duration * 500) / numberOfCharacters

    if (isHovering) {
      textArray.forEach((char, index) => {
        if (char !== " ") {
          const intervalId = setInterval(() => {
            textArray[index] = shuffleChar(char)
            setShuffledText(textArray.join(""))
          }, 25)
          intervals.current.push(intervalId)

          const timeoutId = setTimeout(
            () => {
              clearInterval(intervalId)
              textArray[index] = children[index]
              setShuffledText(textArray.join(""))
            },
            ABC * (index + 1)
          )
          timeouts.current.push(timeoutId)
        }
      })
    } else {
      textArray.forEach((char, index) => {
        if (char !== " ") {
          const intervalId = setInterval(() => {
            textArray[numberOfCharacters - 1 - index] = shuffleChar(char)
            setShuffledText(textArray.join(""))
          }, 25)
          intervals.current.push(intervalId)

          const timeoutId = setTimeout(
            () => {
              clearInterval(intervalId)
              textArray[numberOfCharacters - 1 - index] =
                children[numberOfCharacters - 1 - index]
              setShuffledText(textArray.join(""))
            },
            ABC * (index + 1)
          )
          timeouts.current.push(timeoutId)
        }
      })
    }

    return () => {
      intervals.current.forEach(clearInterval)
      timeouts.current.forEach(clearTimeout)
      intervals.current = []
      timeouts.current = []
    }
  }, [isHovering, children, duration])

  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-neutral-100 px-4 py-2 font-mono text-sm font-medium whitespace-nowrap text-black transition-colors disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-900 dark:text-white [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {shuffledText}
    </button>
  )
}
