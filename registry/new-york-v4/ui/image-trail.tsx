"use client"

import React, { useEffect, useRef } from "react"
import { Expo, gsap, Power1, Quint } from "gsap"

interface ImageTrailProps {
  images: string[]
  imageWidth?: number
  imageHeight?: number
  threshold?: number
  duration?: number
}

export function ImageTrail({
  images = [],
  imageWidth = 200,
  imageHeight = 200,
  threshold = 50,
  duration = 1.6,
}: ImageTrailProps) {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const cacheMousePos = useRef({ x: 0, y: 0 })
  const lastMousePos = useRef({ x: 0, y: 0 })
  const zIndexVal = useRef(1)
  const imgPosition = useRef(0)
  const parentSize = useRef({ width: 0, height: 0 })

  useEffect(() => {
    if (contentRef.current) {
      imagesRef.current = Array.from(contentRef.current.querySelectorAll("img"))
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = contentRef.current?.getBoundingClientRect()
      if (rect) {
        mousePos.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      }
    }

    calcParentSize()
    if (imagesRef.current.length === 0) {
      return
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", calcParentSize)

    requestAnimationFrame(renderImages)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", calcParentSize)
    }
  }, [])

  const calcParentSize = () => {
    const rect = contentRef.current?.getBoundingClientRect()
    if (rect) {
      parentSize.current = { width: rect.width, height: rect.height }
    }
  }

  const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

  const getMouseDistance = () => {
    const dx = mousePos.current.x - lastMousePos.current.x
    const dy = mousePos.current.y - lastMousePos.current.y
    return Math.hypot(dx, dy)
  }

  const renderImages = () => {
    const distance = getMouseDistance()

    cacheMousePos.current.x = lerp(
      cacheMousePos.current.x,
      mousePos.current.x,
      0.1
    )
    cacheMousePos.current.y = lerp(
      cacheMousePos.current.y,
      mousePos.current.y,
      0.1
    )

    if (distance > threshold) {
      showNextImage()
      zIndexVal.current += 1
      imgPosition.current = (imgPosition.current + 1) % imagesRef.current.length
      lastMousePos.current = { ...mousePos.current }
    }

    requestAnimationFrame(renderImages)
  }

  const showNextImage = () => {
    const img = imagesRef.current[imgPosition.current]
    if (!img) return

    const rect = img.getBoundingClientRect()
    gsap.killTweensOf(img)

    gsap
      .timeline()
      .set(img, {
        startAt: { opacity: 0 },
        opacity: 1,
        zIndex: zIndexVal.current,
        x: cacheMousePos.current.x - rect.width / 2,
        y: cacheMousePos.current.y - rect.height / 2,
      })
      .to(img, {
        duration: duration,
        ease: Expo.easeOut,
        x: mousePos.current.x - rect.width / 2,
        y: mousePos.current.y - rect.height / 2,
      })
      .to(
        img,
        {
          duration: 1,
          ease: Power1.easeOut,
          opacity: 0,
        },
        0.4
      )
      .to(
        img,
        {
          duration: 1,
          ease: Quint.easeInOut,
          y: `+=${parentSize.current.height + rect.height / 2}`,
        },
        0.4
      )
  }

  return (
    <div
      style={
        {
          "--image-width": `${imageWidth}px`,
          "--image-height": `${imageHeight}px`,
        } as React.CSSProperties
      }
      className="relative isolate z-0 flex h-full w-full items-center justify-center overflow-hidden"
      ref={contentRef}
    >
      {images.map((url, index) => (
        <img
          key={index}
          className="pointer-events-none absolute top-0 left-0 h-[var(--image-height)] w-[var(--image-width)] object-cover opacity-0 will-change-transform"
          src={url}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  )
}
