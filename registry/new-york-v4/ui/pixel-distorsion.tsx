"use client"

import React, { useCallback, useEffect, useRef } from "react"
import { useTexture } from "@react-three/drei"
import { ThreeEvent, useFrame } from "@react-three/fiber"
import * as THREE from "three"

import {
  fragment,
  vertex,
} from "@/registry/new-york-v4/ui/pixel-distorsion-shader"

interface PixelDistorsionProps {
  imageSrc: string
  canvasWidth: number
  canvasHeight: number
  grid?: number
  mouse?: number
  strength?: number
}

export default function PixelDistorsion({
  imageSrc,
  canvasWidth,
  canvasHeight,
  grid = 20,
  mouse = 0.25,
  strength = 0.2,
}: PixelDistorsionProps) {
  const plane = useRef<THREE.Mesh>(null)
  const texture = useTexture(imageSrc)
  const mouseState = useRef({ x: 0.5, y: 0.5, vX: 0, vY: 0 })

  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: new THREE.Vector2(0.5, 0.5) },
    uDataTexture: { value: null as THREE.DataTexture | null },
    resolution: { value: new THREE.Vector4() },
  })

  const generateDataTexture = useCallback(() => {
    const data = new Float32Array(grid * grid * 4)
    for (let i = 0; i < grid * grid; i++) {
      const stride = i * 4
      data[stride] = Math.random()
      data[stride + 1] = Math.random()
      data[stride + 2] = Math.random()
      data[stride + 3] = 1.0
    }
    const dataTexture = new THREE.DataTexture(
      data,
      grid,
      grid,
      THREE.RGBAFormat,
      THREE.FloatType
    )
    dataTexture.needsUpdate = true
    dataTexture.minFilter = THREE.NearestFilter
    dataTexture.magFilter = THREE.NearestFilter
    return dataTexture
  }, [grid])

  useEffect(() => {
    uniforms.current.uDataTexture.value = generateDataTexture()
  }, [generateDataTexture])

  useEffect(() => {
    uniforms.current.resolution.value.set(canvasWidth, canvasHeight, 1, 1)
  }, [canvasWidth, canvasHeight])

  const settings = { grid, mouseInfluence: mouse, strength, relaxation: 0.9 }

  const clamp = (number: number, min: number, max: number) =>
    Math.max(min, Math.min(number, max))

  const updateDataTexture = () => {
    const dataTexture = uniforms.current.uDataTexture?.value
    if (!dataTexture || !dataTexture.image?.data) return

    const data = dataTexture.image.data as Float32Array
    const gridMouseX = mouseState.current.x * settings.grid
    const gridMouseY = (1 - mouseState.current.y) * settings.grid
    const maxDist = settings.grid * settings.mouseInfluence
    const aspect = canvasHeight / canvasWidth

    for (let i = 0; i < data.length; i += 4) {
      data[i] *= settings.relaxation
      data[i + 1] *= settings.relaxation
    }

    for (let i = 0; i < settings.grid; i++) {
      for (let j = 0; j < settings.grid; j++) {
        const distance = (gridMouseX - i) ** 2 / aspect + (gridMouseY - j) ** 2
        const maxDistSq = maxDist ** 2

        if (distance < maxDistSq) {
          const index = 4 * (i + settings.grid * j)
          let power = maxDist / Math.sqrt(distance)
          power = clamp(power, 0, 10)

          data[index] += settings.strength * mouseState.current.vX * power * 100
          data[index + 1] -=
            settings.strength * mouseState.current.vY * power * 100
        }
      }
    }
    mouseState.current.vX *= 0.9
    mouseState.current.vY *= 0.9

    requestAnimationFrame(() => {
      if (dataTexture) dataTexture.needsUpdate = true
    })
  }

  useEffect(() => {
    const dataTexture = generateDataTexture()
    uniforms.current.uDataTexture.value = dataTexture

    return () => {
      dataTexture?.dispose()
      texture?.dispose()
    }
  }, [generateDataTexture, texture])

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const { offsetX, offsetY } = event.nativeEvent
    mouseState.current.vX = offsetX / canvasWidth - mouseState.current.x
    mouseState.current.vY = offsetY / canvasHeight - mouseState.current.y
    mouseState.current.x = offsetX / canvasWidth
    mouseState.current.y = offsetY / canvasHeight
  }

  useFrame((state) => {
    if (plane.current) {
      ;(plane.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        state.clock.elapsedTime
      updateDataTexture()
    }
  })

  return (
    <mesh ref={plane} onPointerMove={handlePointerMove}>
      <planeGeometry args={[canvasWidth, canvasHeight, 45, 45]} />
      <shaderMaterial
        side={THREE.DoubleSide}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}
