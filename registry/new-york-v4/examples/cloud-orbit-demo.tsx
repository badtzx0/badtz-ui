import {
  CloudOrbit,
  OrbitingImage,
} from "@/registry/new-york-v4/ui/cloud-orbit"

const orbitingImagesData = [
  {
    speed: 20,
    radius: 119,
    size: 53,
    startAt: 0.15625,
    images: [
      {
        name: "Deepseek Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/deepseek-logo.webp",
      },
      {
        name: "Drizzle ORM Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/drizzle-orm-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 118,
    size: 85,
    startAt: 0.25,
    images: [
      {
        name: "Motion Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/motion-logo.webp",
      },
      {
        name: "Deepseek Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/deepseek-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 130,
    size: 73,
    startAt: 0.4375,
    images: [
      {
        name: "Tailwind Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/tailwindcss-logo.webp",
      },
      {
        name: "Motion Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/motion-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 120,
    size: 49,
    startAt: 0.61,
    images: [
      {
        name: "Edge Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/edge-logo.webp",
      },
      {
        name: "Tailwind Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/tailwindcss-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 136,
    size: 40,
    startAt: 0.65625,
    images: [
      {
        name: "Linear Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/linear-logo.webp",
      },
      {
        name: "Edge Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/edge-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 111,
    size: 87,
    startAt: 0.75,
    images: [
      {
        name: "React Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/react-logo.webp",
      },
      {
        name: "Linear Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/linear-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 124,
    size: 73,
    startAt: 0.9375,
    images: [
      {
        name: "Drizzle ORM Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/drizzle-orm-logo.webp",
      },
      {
        name: "React Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/react-logo.webp",
      },
    ],
  },
]

export default function CloudOrbitDemo() {
  return (
    <CloudOrbit
      duration={3}
      size={160}
      images={[
        {
          name: "Charlie Avatar",
          url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/avatar-1.webp",
        },
        {
          name: "Tommy Avatar",
          url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/avatar-2.webp",
        },
      ]}
    >
      {orbitingImagesData.map((orbit, index) => (
        <OrbitingImage
          key={index}
          speed={orbit.speed}
          radius={orbit.radius}
          size={orbit.size}
          startAt={orbit.startAt}
          images={orbit.images}
          duration={3}
        />
      ))}
    </CloudOrbit>
  )
}
