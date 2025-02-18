import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import * as React from "react";
import { HeroImage } from "@/components/home/hero/hero-image";
import { HeroBadge } from "@/components/home/hero/hero-badge";
import { PlausibleButton } from "@/components/plausible-button";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": ["WebSite", "SoftwareApplication"],
  name: "BadtzUI",
  url: "https://badtz-ui.com",
  description:
    "An expanding collection of 70+ free UI components. Production-grade animations with Framer Motion. Weekly updates. Open source. React, Tailwind, TypeScript & JavaScript.",
  image: "https://badtz-ui.com/og-image.png",
  sameAs: ["https://github.com/badtz-ui", "https://x.com/badtz_ui"],
  keywords:
    "React components, Tailwind CSS, Framer Motion, UI library, Web animations, Frontend toolkit",
  applicationCategory: "UI Component Library",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/OnlineOnly",
    seller: {
      "@type": "Organization",
      name: "BadtzUI",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
  },
  author: {
    "@type": "Person",
    name: "Badtz",
    url: "https://x.com/badtz_ui",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://badtz-ui.com",
  },
};

export default function Hero() {
  return (
    <section className="w-full h-full pt-10 md:pt-20 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <div className="px-6 lg:px-8 lg:max-w-5xl mx-auto">
        <div className="md:text-center text-left flex flex-col items-start md:items-center justify-center">
          <HeroBadge />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-foreground font-gilroy mt-8 md:mt-10">
            UI Components
            <br />
            for React JS
          </h1>
          <p className="mt-6 text-balance font-light tracking-tight lg:mt-5 sm:mt-3 max-w-[680px] text-muted-foreground text-base md:text-lg">
            Open-source collection of 70+ UI components. Production-grade Framer
            Motion animations. Weekly updates. React, Tailwind, TypeScript &
            JavaScript.
          </p>
          <div className="mt-8 flex gap-3.5">
            <Link
              href="/docs"
              className="h-10 px-5 font-medium text-sm rounded-full bg-foreground text-background hover:bg-foreground/90 flex items-center relative transition-colors duration-300"
            >
              View Docs
            </Link>
            <Link
              target="_blank"
              href="https://pro.badtz-ui.com"
              className="h-10 px-5 font-medium text-sm rounded-full flex items-center relative gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-t from-orange-600 to-orange-500 shadow-[0_0px_16px_rgba(245,_73,_0,_0.7)] text-white  before:absolute before:inset-0 before:shadow-[0_0px_20px_rgba(245,_73,_0,_0.5)] before:opacity-0 transition-opacity duration-300 hover:before:opacity-100 before:rounded-[inherit] before:pointer-events-none before:transition-opacity before:duration-300 before:will-change-opacity after:inset-0 after:absolute after:shadow-[rgba(255,_255,_255,_0.2)_0px_1px_0px_inset] after:rounded-[inherit]"
            >
              <PlausibleButton
                eventName="Clicked on Pro"
                className="flex items-center justify-center gap-2"
              >
                BadtzUI Pro <ExternalLinkIcon />
              </PlausibleButton>
            </Link>
          </div>
        </div>
        <noscript>
          <img
            src="/images/home-hero/badtz-ui-documentation-dark.svg"
            alt="Badtz UI interface in light"
            height={600}
            width={960}
            className="border border-border rounded-xl"
          />
        </noscript>
        <HeroImage />
      </div>
    </section>
  );
}
