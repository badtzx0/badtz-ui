import { Metadata } from "next"

export const createStaticOGMetadata = (
  title: string,
  description: string
): Partial<Metadata> => ({
  title,
  description,
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 628,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 628,
        alt: title,
      },
    ],
  },
})
