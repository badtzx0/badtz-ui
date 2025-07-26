"use client"

import React from "react"

export interface GradientBadgeProps {
  variant?: "lime" | "miami" | "oslo"
  children: React.ReactNode
}

export function GradientBadge(props: GradientBadgeProps) {
  const { variant = "lime", children } = props

  const variants = {
    lime: {
      background: `linear-gradient(
        135deg,
        rgba(70, 182, 188, 0.04) 0%,
        rgba(109, 199, 174, 0.04) 50%,
        rgba(200, 241, 188, 0.04) 100%
      )`,
      boxShadow: "0 -4px 12px rgb(70 182 188 / 12%) inset",
      borderBackground: `linear-gradient(
        135deg,
        rgba(70, 182, 188, 0.2) 0%,
        rgba(109, 199, 174, 0.2) 50%,
        rgba(200, 241, 188, 0.2) 100%
      )`,
      textBackground: `linear-gradient(
        135deg,
        #46b6bc 0%,
        #6dc7ae 50%,
        #c8f1bc 100%
      )`,
    },
    miami: {
      background: `linear-gradient(
        135deg,
        rgba(202, 183, 255, 0.04) 0%,
        rgba(255, 155, 197, 0.04) 50%,
        rgba(255, 202, 149, 0.04) 100%
      )`,
      boxShadow: "0 -4px 12px rgb(212 158 255 / 12%) inset",
      borderBackground: `linear-gradient(
        135deg,
        rgba(202, 183, 255, 0.2) 0%,
        rgba(255, 155, 197, 0.2) 50%,
        rgba(255, 202, 149, 0.2) 100%
      )`,
      textBackground: `linear-gradient(
        135deg,
        #cab7ff 0%,
        #ff9bc5 50%,
        #ffca95 100%
      )`,
    },
    oslo: {
      background: `linear-gradient(
        135deg,
        rgba(36, 135, 235, 0.04) 0%,
        rgba(134, 112, 219, 0.04) 50%,
        rgba(36, 135, 235, 0.04) 100%
      )`,
      boxShadow: "0 -4px 12px rgb(36 135 235 / 12%) inset",
      borderBackground: `linear-gradient(
        135deg,
        rgba(36, 135, 235, 0.2) 0%,
        rgba(134, 112, 219, 0.2) 50%,
        rgba(36, 135, 235, 0.2) 100%
      )`,
      textBackground: `linear-gradient(
        135deg,
        #2487EB 0%,
        oklch(58.5% 0.233 277.117) 50%,
        #2487EB 100%
      )`,
    },
  }

  const currentVariant = variants[variant]

  return (
    <div className="gradient-badge relative inline-block rounded-full px-3.5 py-1 text-sm font-normal">
      <div className="gradient-text">{children}</div>

      <style jsx>{`
        .gradient-badge {
          background: ${currentVariant.background};
          box-shadow: ${currentVariant.boxShadow};
        }

        .gradient-badge::before {
          content: "";
          background: ${currentVariant.borderBackground};
          background-size: 200% 200%;
          animation: borderGradientAnimation 5s ease infinite;
          border-radius: inherit;
          position: absolute;
          inset: 0;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          padding: 1px;
          pointer-events: none;
        }

        .gradient-text {
          background-image: ${currentVariant.textBackground};
          background-size: 200% 200%;
          animation: gradientAnimation 5s ease infinite;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes borderGradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}
