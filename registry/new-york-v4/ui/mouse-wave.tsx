"use client"

import React, { useEffect, useRef } from "react"
import { useTexture } from "@react-three/drei"
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import gsap from "gsap"
import * as THREE from "three"

import { fragment, vertex } from "@/registry/new-york-v4/ui/mouse-wave-shader"

//import { useControls } from "leva";

interface MouseWaveProps {
  imageSrc: string
  canvasWidth: number
  canvasHeight: number
}

export default function MouseWave({
  imageSrc,
  canvasWidth,
  canvasHeight,
}: MouseWaveProps) {
  const plane = useRef<THREE.Mesh>(null)
  const texture = useTexture(imageSrc)
  const { raycaster, camera } = useThree()

  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: new THREE.Vector2(0.5, 0.5) },
    uHoverState: { value: 0 },
  })

  //If you ever want to experiment, you can install Leva and use the controls; otherwise, feel free to remove this.
  /*
  const controls = useControls("Shader Controls", {
    uTime: { value: 0, min: 0, max: 10, step: 0.1 },
    uHoverState: { value: 0, min: 0, max: 10, step: 0.01 },
  });
 
  useFrame(() => {
    uniforms.current.uTime.value = controls.uTime;
    uniforms.current.uHoverState.value = controls.uHoverState;
  });
  */

  useFrame((state) => {
    if (plane.current) {
      const material = plane.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.aspect = canvasWidth / canvasHeight
      camera.updateProjectionMatrix()
    }
  }, [canvasWidth, canvasHeight, camera])

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!plane.current) return

    const pointer = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    )

    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObject(plane.current!)

    if (intersects.length > 0) {
      const obj = intersects[0].object as THREE.Mesh
      const uv = intersects[0].uv

      if (uv) {
        ;(obj.material as THREE.ShaderMaterial).uniforms.uHover.value.set(
          uv.x,
          uv.y
        )
      }
    }
  }

  const handlePointerEnter = () => {
    gsap.to(uniforms.current.uHoverState, {
      duration: 1,
      value: 1,
    })
  }

  const handlePointerLeave = () => {
    gsap.to(uniforms.current.uHoverState, {
      duration: 1,
      value: 0,
    })
  }

  return (
    <mesh
      ref={plane}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      position={[0, 0, 0]}
    >
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
