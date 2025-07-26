import type { Metadata } from "next"
import localFont from "next/font/local"
import Script from "next/script"

import { META_THEME_COLORS, siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LayoutProvider } from "@/hooks/use-layout"
import { Toaster } from "@/components/ui/sonner"
import { ActiveThemeProvider } from "@/components/active-theme"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeController } from "@/components/theme-controller"

import "@/styles/globals.css"

const Gilroy = localFont({
  variable: "--font-gilroy",
  display: "swap",
  src: [
    {
      path: "../fonts/gilroy-semibold.woff",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../fonts/gilroy-bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Components",
    "Blocks",
    "Templates",
  ],
  authors: [
    {
      name: "Badtz",
      url: "https://badtz-ui.com",
    },
  ],
  creator: "Badtz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL!,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`],
    creator: "@badtz_ui",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />

        <Script
          defer
          data-website-id="687e053db3e2eeb18a627f44"
          data-domain="badtz-ui.com"
          src="/js/script.js"
          strategy="afterInteractive"
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn(
          "text-foreground group/body bg-background overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          Gilroy.variable,
          fontVariables
        )}
      >
        <ThemeController>
          <LayoutProvider>
            <ActiveThemeProvider>
              {children}
              <TailwindIndicator />
              <Toaster position="top-center" />
            </ActiveThemeProvider>
          </LayoutProvider>
        </ThemeController>
      </body>
    </html>
  )
}
