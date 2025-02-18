"use client";
import { cn } from "@/lib/utils";
import { usePlausible } from "next-plausible";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface PlausibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  eventName: string;
  children: ReactNode;
  className?: string;
}

export function PlausibleButton({
  eventName,
  className,
  children,
}: PlausibleButtonProps) {
  const plausible = usePlausible();
  return (
    <button
      onClick={() => {
        plausible(eventName);
      }}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
