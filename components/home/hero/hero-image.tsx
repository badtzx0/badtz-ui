"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ImageSplit } from "./image-split";
import { useBreakpoint } from "@/hooks/use-brakpoints";

export function HeroImage() {
  const breakpoint = useBreakpoint();
  const { theme } = useTheme();

  const [imageSrc, setImageSrc] = useState(
    "/images/home-hero/badtz-ui-documentation-dark.svg"
  );

  useEffect(() => {
    setImageSrc(
      theme === "dark"
        ? "/images/home-hero/badtz-ui-documentation-dark.svg"
        : "/images/home-hero/badtz-ui-documentation-light.svg"
    );
  }, [theme]);

  return (
    <div className="mt-16 md:mt-24 relative h-[300px] sm:h-[400px] md:h-[600px] before:inset-x-[-200px] before:pointer-events-none before:inset-y-0 before:absolute before:z-20 before:bg-background before:[mask-image:radial-gradient(ellipse_100%_60%_at_40%_20%,transparent_50%,#000_100%)]">
      {breakpoint === "large" ? (
        <ImageSplit
          src={imageSrc}
          className="rounded-xl"
          enableBorder={false}
          sections={9}
          viewportThreshold={0}
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 lg:left-0  md:left-10 md:h-[600px] md:w-[960px] h-[400px] w-[760px] pointer-events-none bg-background dark:bg-secondary"
          )}
        >
          <Image
            src={imageSrc}
            alt="Badtz UI interface in dark mode"
            fill
            quality={50}
            priority
            className="border border-border rounded-xl overflow-hidden object-contain object-left"
          />
        </div>
      )}
    </div>
  );
}
