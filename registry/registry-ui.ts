import { type Registry } from "shadcn/registry"

export const ui: Registry["items"] = [
  {
    name: "cursor-cards",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/cursor-cards.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "animated-keyboard",
    type: "registry:ui",
    dependencies: [
      "clsx",
      "tailwind-merge",
      "framer-motion",
      "class-variance-authority",
    ],
    files: [
      {
        path: "ui/animated-keyboard.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "flipping-card",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/flipping-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "animated-list",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/animated-list.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "particles",
    type: "registry:ui",
    dependencies: [
      "clsx",
      "tailwind-merge",
      "@tsparticles/react",
      "@tsparticles/slim",
    ],
    files: [
      {
        path: "ui/particles.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "marquee",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/marquee.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      theme: {
        "animate-marquee-left":
          "marquee-left var(--duration, 30s) linear infinite",
        "animate-marquee-right":
          "marquee-right var(--duration, 30s) linear infinite",
      },
    },
    css: {
      "@keyframes marquee-left": {
        from: {
          transform: "translateX(0)",
        },
        to: {
          transform: "translateX(calc(-100% - var(--gap)))",
        },
      },
      "@keyframes marquee-right": {
        from: {
          transform: "translateX(calc(-100% - var(--gap)))",
        },
        to: {
          transform: "translateX(0)",
        },
      },
    },
  },
  {
    name: "social-proof-avatars",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/social-proof-avatars.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "border-beam",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/border-beam.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "cloud-orbit",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/cloud-orbit.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dock",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/dock.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "expandable-card",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/expandable-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "image-split",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/image-split.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "image-trail",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "gsap"],
    files: [
      {
        path: "ui/image-trail.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "infinite-ribbon",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/infinite-ribbon.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      theme: {
        "animate-infinite-ribbon":
          "infinite-ribbon var(--ribbon-duration) linear infinite",
        "animate-infinite-ribbon-reverse":
          "infinite-ribbon-reverse var(--ribbon-duration) linear infinite",
      },
    },
    css: {
      "@keyframes infinite-ribbon": {
        "0%": {
          transform: "translateX(0)",
        },
        "100%": {
          transform: "translateX(-100%)",
        },
      },
      "@keyframes infinite-ribbon-reverse": {
        "0%": {
          transform: "translateX(-100%)",
        },
        "100%": {
          transform: "translateX(0)",
        },
      },
    },
  },
  {
    name: "3d-wrapper",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/3d-wrapper.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "pixel-distorsion",
    type: "registry:ui",
    dependencies: [
      "clsx",
      "tailwind-merge",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
    ],
    files: [
      {
        path: "ui/pixel-distorsion.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/pixel-distorsion-scene.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/pixel-distorsion-shader.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "pulse-shader",
    type: "registry:ui",
    dependencies: [
      "clsx",
      "tailwind-merge",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
    ],
    files: [
      {
        path: "ui/pulse-shader.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/pulse-shader-scene.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/pulse-shader-shader.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "mouse-wave",
    type: "registry:ui",
    dependencies: [
      "clsx",
      "tailwind-merge",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
    ],
    files: [
      {
        path: "ui/mouse-wave.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/mouse-wave-scene.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/mouse-wave-shader.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "animated-card-1",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/animated-card.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/visual-1.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "animated-card-2",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/animated-card.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/visual-2.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "animated-card-3",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/animated-card.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/visual-3.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "stripe-animated-gradient",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/stripe-animated-gradient.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/stripe-shader.js",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "hyperspace-background",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/hyperspace-background.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "blur-reveal",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/blur-reveal.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "fade-up-word",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/fade-up-word.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "stagger-blur-effect",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/stagger-blur-effect.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "glowing-button",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/glowing-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "swipe-button",
    type: "registry:ui",
    registryDependencies: ["button"],
    dependencies: [
      "clsx",
      "tailwind-merge",
      "canvas-confetti",
      "@types/canvas-confetti",
    ],
    files: [
      {
        path: "ui/swipe-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "gradient-slide-button",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/gradient-slide-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "star-button",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/star-button.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      theme: {
        "animate-star-btn":
          "star-btn calc(var(--duration) * 1s) linear infinite",
      },
    },
    css: {
      "@keyframes star-btn": {
        "0%": {
          "offset-distance": "0%",
        },
        "100%": {
          "offset-distance": "100%",
        },
      },
    },
  },
  {
    name: "confetti-button",
    type: "registry:ui",
    dependencies: [
      "clsx",
      "tailwind-merge",
      "canvas-confetti",
      "@types/canvas-confetti",
    ],
    files: [
      {
        path: "ui/confetti-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "shuffle-button",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/shuffle-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "stagger-button",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/stagger-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "like-button",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge", "motion"],
    files: [
      {
        path: "ui/like-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
  },
]
