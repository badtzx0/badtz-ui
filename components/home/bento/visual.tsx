"use client";

import "@/styles/bento.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useBreakpoint } from "@/hooks/use-brakpoints";
import { useTheme } from "next-themes";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import Image from "next/image";
import {
  FontBoldIcon,
  FontItalicIcon,
  Link2Icon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Part1,
  Part2,
  Part3,
  Part4,
  Part5,
  Part6,
  Part7,
  Part8,
  Part9,
} from "@/components/home/bento/split-logo";

interface SpotlightProps {
  rotate?: string;
  scale?: string;
  duration?: string;
  left?: string;
  height?: string;
  width?: string;
  top?: string;
  opacity?: number;
  color?: string;
  className?: string;
}

interface ChartProps {
  vibrantColor?: string;
  softColor?: string;
  gridColor?: string;
}

interface LayerProps {
  color: string;
  softColor?: string;
  hovered?: boolean;
}

const STACK_LOGO_WIDTH = 48;
const GAP = 24;
const SCROLL_DISTANCE = STACK_LOGO_WIDTH + GAP;
const SCROLL_DURATION = 0.7;

const stackLogos = [
  {
    src: "/images/home-bento/logos/shadcnui-logo-dark.webp",
    lightSrc: "/images/home-bento/logos/shadcnui-logo-light.webp",
    alt: "ShadcnUI Logo",
  },
  {
    src: "/images/home-bento/logos/tailwind-logo.webp",
    alt: "TailwindCSS Logo",
  },
  {
    src: "/images/home-bento/logos/typescript-logo.webp",
    alt: "Typescript Logo",
  },
  {
    src: "/images/home-bento/logos/javascript-logo.webp",
    alt: "Javascript Logo",
  },
  { src: "/images/home-bento/logos/nextjs-logo.webp", alt: "NextJS Logo" },
  {
    src: "/images/home-bento/logos/react-logo-dark.webp",
    lightSrc: "/images/home-bento/logos/react-logo-light.webp",
    alt: "React Logo",
  },
  { src: "/images/home-bento/logos/motion-logo.webp", alt: "Motion Logo" },
];

const duplicatedLogos = [...stackLogos, ...stackLogos];

function hexToRgb(hex: string): string {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}

export function Cell1Visual() {
  const cell1Ref = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const [imageSrc, setImageSrc] = useState(
    "/images/home-bento/cell-elipse-dark.webp"
  );

  useEffect(() => {
    setImageSrc(
      theme === "dark"
        ? "/images/home-bento/cell-elipse-dark.webp"
        : "/images/home-bento/cell-elipse-light.webp"
    );
  }, [theme]);

  return (
    <div className="relative h-full w-full cell1-bg" ref={cell1Ref}>
      <Image
        src={imageSrc}
        alt="Elipse Dark"
        width={240}
        height={240}
        quality={100}
        loading="lazy"
        className="absolute z-10 right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/4 md:translate-y-1/4 lg:translate-y-[20%]"
      />
      <ScrollingIcons
        className="absolute inset-x-0 bottom-1/2 -translate-y-1/4 md:-translate-y-1/3 lg:-translate-y-1/4 z-20"
        containerRef={cell1Ref}
      />
    </div>
  );
}

export function Cell2Visual() {
  const { theme } = useTheme();
  const [spotlightColor, setSpotlightColor] = useState("#b4adcc");
  const [imageSrc, setImageSrc] = useState(
    "/images/home-bento/keyboard-dark-x3.webp"
  );

  useEffect(() => {
    setImageSrc(
      theme === "dark"
        ? "/images/home-bento/keyboard-dark-x3.webp"
        : "/images/home-bento/keyboard-light-x3.webp"
    );
    setSpotlightColor(theme === "dark" ? "#f2fcff" : "#b4adcc");
  }, [theme]);

  return (
    <div
      className="relative overflow-hidden h-full w-full cell2-bg"
      style={{ clipPath: "inset(0 round 12px)" }}
    >
      <div className="absolute z-10 right-0 top-1/2 -translate-y-1/4 md:-translate-y-1/2 lg:pl-0 pl-12">
        <Image
          src={imageSrc}
          alt="Dark Keyboard"
          width={448}
          height={180}
          quality={100}
          loading="lazy"
        />
      </div>
      <Spotlight
        rotate="25deg"
        scale="1"
        duration="4s"
        top="-475px"
        left="100%"
        width="300px"
        height="900px"
        color={spotlightColor}
      />
      <Spotlight
        rotate="45deg"
        scale="1"
        duration="6s"
        top="-475px"
        left="100%"
        width="300px"
        height="900px"
        color={spotlightColor}
      />
    </div>
  );
}

export function Cell3Visual() {
  const [activeColor, setActiveColor] = useState({
    vibrant: "#ff6900",
  });

  const colors = [
    { vibrant: "#fb2c36" },
    { vibrant: "#f54900" },
    { vibrant: "#fe9a00" },
    { vibrant: "#00c950" },
    { vibrant: "#00bc7d" },
    { vibrant: "#155dfc" },
    { vibrant: "#7008e7" },
    { vibrant: "#8200db" },
    { vibrant: "#e60076" },
    { vibrant: "#ec003f" },
  ];

  return (
    <div className="h-full w-full cell3-bg">
      <Link
        href="/docs/components/animated-cards/animated-card-3"
        className="absolute z-30 top-6 right-6 bg-[#FAFAFC] dark:bg-muted text-xs pl-2 pr-3 py-1 rounded-full flex items-center gap-2 border border-secondary-border"
      >
        <span
          className="h-2.5 w-2.5 rounded-full transition-colors"
          style={{ backgroundColor: `${activeColor.vibrant}` }}
        ></span>
        <span>Animated Card 3</span>
      </Link>
      <div aria-hidden className="absolute inset-x-0 top-0 h-[80%] z-20">
        <Chart vibrantColor={activeColor.vibrant} />
      </div>
      <div
        aria-hidden
        className="absolute z-20 top-6 left-6 rounded-lg bg-secondary/80 backdrop-blur-sm border border-secondary-border/70 text-sm text-muted-foreground font-light"
      >
        <div className="py-2 px-3  border-b border-secondary-border/70">
          <span className="text-foreground">Customize</span>
        </div>
        <div className="flex justify-between items-center px-3 py-2 gap-2 border-b border-secondary-border/70">
          <span className="text-foreground">Text</span>
          <div className="flex items-center [&>svg]:size-3 gap-1">
            <div className="p-0.5 rounded">
              <FontBoldIcon />
            </div>
            <div className="bg-muted p-0.5 rounded">
              <Link2Icon />
            </div>
            <div className="p-0.5 rounded">
              <FontItalicIcon />
            </div>
            <div className="p-0.5 rounded">
              <UnderlineIcon />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 p-3 gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`h-5 w-5 rounded cursor-pointer transition-all duration-300 ${
                activeColor.vibrant === color.vibrant
                  ? "ring-1 ring-blue-500"
                  : ""
              }`}
              style={{ backgroundColor: color.vibrant }}
              onClick={() => setActiveColor(color)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Cell4Visual() {
  return (
    <div className="relative h-full w-full cell4-bg overflow-x-auto">
      <span className="absolute top-6 left-6 text-xs py-1 px-3 z-10 bg-gradient-to-b from-orange-500 to-orange-600 border border-orange-500 rounded-full font-medium shadow-[0_0px_100px_rgba(245,_73,_0,_0.9)] before:shadow-[0_0px_20px_rgba(245,_73,_0,_0.9)] before:inset-0 before:absolute before:z-[-1] before:rounded-[inherit] opacity-100 transition-opacity duration-300 group-hover:opacity-0 text-white">
        Beta
      </span>
      <div className="absolute inset-x-6 lg:inset-x-12 top-6 grid grid-cols-5 grid-rows-6 gap-1 w-[274px] h-[320px] mx-auto">
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-[50px] w-[50px] aspect-square transition-transform duration-150 rounded hover:rotate-[15deg] overflow-hidden",
              index === 2 ||
                index === 4 ||
                index === 6 ||
                index === 7 ||
                index === 10 ||
                index === 11 ||
                index === 13 ||
                index === 16 ||
                index === 17 ||
                index === 18 ||
                index === 20 ||
                index === 21
                ? "border border-border dark:border-secondary-border/50 bg-background/50 dark:bg-transparent backdrop-blur-lg"
                : "",
              index === 8 || index === 14 || index === 15
                ? "shadow-sm shadow-muted dark:secondary-border/50"
                : "",
              index === 8 || index === 12 || index === 14 || index === 15
                ? "border border-border dark:border-secondary-border/50 bg-background dark:bg-[#21222550] backdrop-blur-lg"
                : "",
              index === 12 &&
                "flex flex-col items-center justify-center text-foreground"
            )}
          >
            {index === 6 && <Part1 />}
            {index === 7 && <Part2 />}
            {index === 8 && <Part3 />}
            {index === 11 && <Part4 />}
            {index === 12 && <Part5 />}
            {index === 13 && <Part6 />}
            {index === 16 && <Part7 />}
            {index === 17 && <Part8 />}
            {index === 18 && <Part9 />}
          </div>
        ))}
      </div>
    </div>
  );
}

const ScrollingIcons: React.FC<{
  className?: string;
  containerRef: React.RefObject<HTMLDivElement>;
}> = ({ className, containerRef }) => {
  const { theme } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerWidth) return;

    let isMounted = true;
    const totalWidth = duplicatedLogos.length * SCROLL_DISTANCE;

    const startAnimation = async () => {
      while (isMounted) {
        await controls.start({
          x: [x.get(), x.get() - SCROLL_DISTANCE],
          transition: { duration: SCROLL_DURATION, ease: "easeInOut" },
        });

        if (x.get() <= -totalWidth / 2) {
          await controls.set({ x: 0 });
        }
      }
    };

    startAnimation();

    return () => {
      isMounted = false;
      controls.stop();
    };
  }, [containerWidth, controls, x]);

  return (
    <div
      className={cn(
        "relative w-full h-[80px] flex items-center overflow-hidden",
        className
      )}
      ref={containerRef}
    >
      <motion.div
        className="flex items-center"
        style={{ x }}
        animate={controls}
      >
        {duplicatedLogos.map((logo, index) => {
          const positionX = index * SCROLL_DISTANCE;
          const centerPosition = containerWidth / 2;

          const logoX = useTransform(
            x,
            (value) => positionX + value - centerPosition
          );

          const scale = useTransform(
            logoX,
            [
              -SCROLL_DISTANCE * 1.5,
              -SCROLL_DISTANCE * 0.5,
              0,
              SCROLL_DISTANCE * 0.5,
              SCROLL_DISTANCE * 1.5,
            ],
            [1, 1.2, 1.7, 1.2, 1]
          );

          return (
            <motion.div
              key={index}
              className="bg-background dark:bg-secondary border border-background dark:border-secondary-border flex-shrink-0 rounded-full dark:shadow-[0_0px_20px_rgba(34,_35,_38,_0.07)_inset] shadow-[0_0px_20px_rgba(233,_233,_241,_1)_inset] flex items-center justify-center relative p-2"
              style={{
                width: STACK_LOGO_WIDTH,
                height: STACK_LOGO_WIDTH,
                marginRight: GAP,
                scale,
              }}
            >
              <Image
                src={
                  theme === "light" && logo.lightSrc ? logo.lightSrc : logo.src
                }
                alt={logo.alt}
                width={STACK_LOGO_WIDTH}
                height={STACK_LOGO_WIDTH}
                quality={100}
                className="pointer-events-none"
                loading="lazy"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

function Chart({
  vibrantColor = "#ffffff",
  softColor = "#ffffff",
}: ChartProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="inset-0 absolute z-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            "--color": vibrantColor,
            "--secondary-color": softColor,
          } as React.CSSProperties
        }
      />

      <div className="w-full h-full relative">
        <SvgChart
          color={vibrantColor}
          softColor={softColor}
          hovered={hovered}
        />
        <EllipseGradient color={vibrantColor} />
      </div>
    </>
  );
}

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="w-full h-full z-[5] absolute inset-0 flex items-center justify-center">
      <svg
        width="600"
        height="350"
        viewBox="0 0 600 350"
        fill="none"
        className="opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_197_56)">
          <ellipse cx="300" cy="175" rx="200" ry="75" fill={color} />
        </g>
        <defs>
          <filter
            id="filter0_f_197_56"
            x="0"
            y="0"
            width="600"
            height="350"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_197_56"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

const SvgChart: React.FC<LayerProps> = ({ color, hovered }) => {
  const rectsData = [
    {
      width: 23,
      height: 34,
      y: 172,
      hoverHeight: 34,
      hoverY: 206,
      x: 80,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 34,
      y: 138,
      hoverHeight: 34,
      hoverY: 206,
      x: 110,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 68,
      y: 104,
      hoverHeight: 51,
      hoverY: 189,
      x: 140,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 121,
      hoverHeight: 85,
      hoverY: 155,
      x: 170,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 172,
      hoverHeight: 68,
      hoverY: 172,
      x: 200,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 85,
      y: 172,
      hoverHeight: 34,
      hoverY: 206,
      x: 230,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 85,
      y: 87,
      hoverHeight: 51,
      hoverY: 189,
      x: 260,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 121,
      hoverHeight: 34,
      hoverY: 206,
      x: 290,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 34,
      y: 172,
      hoverHeight: 68,
      hoverY: 172,
      x: 320,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 68,
      y: 104,
      hoverHeight: 102,
      hoverY: 138,
      x: 350,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 172,
      hoverHeight: 119,
      hoverY: 121,
      x: 380,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 85,
      y: 172,
      hoverHeight: 85,
      hoverY: 155,
      x: 410,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 34,
      y: 172,
      hoverHeight: 136,
      hoverY: 104,
      x: 440,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 51,
      y: 121,
      hoverHeight: 153,
      hoverY: 87,
      x: 470,
      fill: color,
      hoverFill: color,
    },
  ];

  return (
    <div
      className={cn(
        "w-[606px] h-[306px] absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.6, 0.6, 0, 1)] z-[8] dark:text-neutral-800 text-[#FAFAFC] scale-[0.6] md:scale-[0.8] lg:scale-100",
        "top-[30px] md:top-[-15px] lg:top-0",
        hovered && "scale-[0.75] md:scale-[0.95] lg:scale-[1.25] translate-y-6 "
      )}
    >
      <svg
        width="606"
        height="306"
        xmlns="http://www.w3.org/2000/svg"
        className=""
      >
        {rectsData.map((rect, index) => (
          <rect
            key={index}
            width={hovered ? 23 : rect.width}
            height={hovered ? rect.hoverHeight : rect.height}
            x={rect.x}
            y={hovered ? rect.hoverY : rect.y}
            fill={hovered ? rect.hoverFill : rect.fill}
            rx="3"
            ry="3"
            className="transition-all duration-500 ease-[cubic-bezier(0.6, 0.6, 0, 1)]"
          />
        ))}
      </svg>
    </div>
  );
};

const Spotlight: React.FC<SpotlightProps> = ({
  rotate = "0deg",
  scale = "1.02",
  duration = "8s",
  left = "0",
  top = "0",
  height = "700px",
  width = "200px",
  opacity = 0.1,
  color = "#f54900",
  className,
}) => {
  const rgbColor = hexToRgb(color);
  const accentCore = `rgba(${rgbColor}, 0.8)`;
  const accentGlow = `rgba(${rgbColor}, 0.6)`;
  const accentFringe = `rgba(${rgbColor}, 0.3)`;

  return (
    <div
      className={cn("animate-spotlight", className)}
      aria-hidden
      style={
        {
          "--rotate": rotate,
          "--scale": scale,
          "--duration": duration,
          position: "absolute",
          zIndex: 10,
          top: top,
          left: left,
          width: width,
          height: height,
          backgroundImage: `
          conic-gradient(
            from 0deg at 50% 50%,
            transparent 165deg,
            ${accentFringe} 170deg,
            ${accentGlow} 175deg,
            ${accentCore} 180deg,
            ${accentGlow} 185deg,
            ${accentFringe} 190deg,
            transparent 195deg
          ),
          conic-gradient(
            from 0deg at 50% 50%,
            transparent 165deg,
            rgba(255,255,255,0.15) 170deg,
            ${accentCore} 175deg,
            rgba(255,255,255,0.6) 180deg,
            ${accentCore} 185deg,
            rgba(255,255,255,0.15) 190deg,
            transparent 195deg
          )`,
          opacity: opacity,
          filter: "blur(20px)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          transformOrigin: "50% 50%",
          mixBlendMode: "plus-lighter",
        } as React.CSSProperties
      }
    ></div>
  );
};
