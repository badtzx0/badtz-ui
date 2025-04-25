"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps, useInView } from "framer-motion";
import { useRef } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface FadeUpWordProps
  extends Omit<HTMLMotionProps<HeadingLevel>, "children"> {
  children: string;
  as?: HeadingLevel;
  className?: string;
}

export function FadeUpWord({
  children,
  as = "h2",
  className,
  ...props
}: FadeUpWordProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Component = motion[as];

  return (
    <Component
      ref={ref}
      className={cn(
        "font-semibold text-4xl tracking-tight flex flex-wrap gap-[0.5rem]",
        className
      )}
      {...props}
    >
      {children.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
