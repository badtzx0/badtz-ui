import React, { useEffect, useState, useRef, useCallback } from "react";
import PulseShader from "@/registry/components/shaders/pulse-shader";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

interface PulseShaderSceneProps {
  imageSrc: string;
  alt?: string;
  marginFactor?: number;
}

export default function PulseShaderScene({
  imageSrc,
  alt,
  marginFactor = 1.05,
}: PulseShaderSceneProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;

    const parentWidth = containerRef.current.clientWidth;
    setIsMobile(window.innerWidth < 640);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const aspect = img.width / img.height;
      const newHeight = parentWidth / aspect;
      setDimensions({ width: parentWidth, height: newHeight });

      if (!isMobile) {
        const newDistance =
          (newHeight / 2 / Math.tan((45 * Math.PI) / 360)) * marginFactor;
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 0, newDistance);
          cameraRef.current.updateProjectionMatrix();
        }
      }
    };
  }, [imageSrc, marginFactor]);

  useEffect(() => {
    updateDimensions();
    const observer = new ResizeObserver(() =>
      requestAnimationFrame(updateDimensions),
    );
    window.addEventListener("resize", updateDimensions);

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [updateDimensions]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: dimensions.height }}
    >
      {isMobile ? (
        <img
          src={imageSrc}
          alt={alt || "Shader preview"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Canvas
          camera={{
            fov: 45,
            aspect: dimensions.width / dimensions.height,
            near: 0.1,
            far: 1000,
            position: [
              0,
              0,
              dimensions.height / 2 / Math.tan((45 * Math.PI) / 360),
            ],
          }}
          onCreated={({ camera }) => {
            cameraRef.current = camera as THREE.PerspectiveCamera;
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <PulseShader
            imageSrc={imageSrc}
            canvasWidth={dimensions.width}
            canvasHeight={dimensions.height}
          />
        </Canvas>
      )}
    </div>
  );
}
