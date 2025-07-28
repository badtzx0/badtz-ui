"use client"

import { cn } from "@/lib/utils"

export interface ShinyButtonProps {
  children?: React.ReactNode
  className?: string
}

export function ShinyButton({ children, className }: ShinyButtonProps) {
  return (
    <div
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-full px-4",
        className
      )}
      style={{
        boxShadow: "inset 0 0 0 1px rgba(120,118,197,.24)",
        background:
          "radial-gradient(31.2% 40.91% at 50% 151.14%,rgba(120,118,197,.08) 0,rgba(120,118,197,0) 100%),rgba(120,118,197,.06)",
        backdropFilter: "blur(4px)",
        isolation: "isolate",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-1000 ease-out hover:opacity-[0.125]"
        style={{
          background:
            "radial-gradient(farthest-side at 50% 100%, rgba(120,118,197,0.8), transparent)",
          mixBlendMode: "hard-light",
        }}
      />

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-full"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="absolute top-0 left-0 h-full w-full"
          style={{
            mask: `url("data:image/svg+xml,%3Csvg width='28' height='24' viewBox='0 0 28 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.0534 15.732C13.8444 15.283 14.2848 14.8489 14.7326 15.051C14.8296 15.0959 14.9043 15.1707 14.949 15.268C15.1506 15.717 14.7177 16.1511 14.2698 15.949C14.1728 15.9041 14.0982 15.8293 14.0534 15.732Z' fill='black'/%3E%3Cpath d='M18.8001 13.5093C19.0016 13.0603 18.5687 12.6263 18.1209 12.8283C18.0239 12.8732 17.9492 12.9481 17.9045 13.0453C17.6955 13.4944 18.1358 13.9284 18.5837 13.7264C18.6807 13.6815 18.7553 13.6066 18.8001 13.5093Z' fill='black'/%3E%3Cpath d='M0.949043 2.732C1.15057 2.28297 0.717663 1.84891 0.269836 2.05097C0.172806 2.09587 0.098162 2.17071 0.0533793 2.268C-0.155607 2.71703 0.284759 3.15109 0.732587 2.94903C0.829616 2.90413 0.90426 2.82929 0.949043 2.732Z' fill='black'/%3E%3Cpath d='M26.9489 7.732C27.151 7.28297 26.7169 6.84891 26.2679 7.05097C26.1706 7.09587 26.0958 7.17071 26.0508 7.268C25.8488 7.71703 26.2828 8.15109 26.7319 7.94903C26.8292 7.90413 26.904 7.82929 26.9489 7.732Z' fill='black'/%3E%3Cpath d='M13.0534 5.732C12.8444 5.28297 13.2848 4.84891 13.7326 5.05097C13.8296 5.09587 13.9043 5.17071 13.949 5.268C14.1506 5.71703 13.7177 6.15109 13.2698 5.94903C13.1728 5.90413 13.0982 5.82929 13.0534 5.732Z' fill='black'/%3E%3Cpath d='M10.0534 17.732C9.84439 17.283 10.2848 16.8489 10.7326 17.051C10.8296 17.0959 10.9043 17.1707 10.949 17.268C11.1506 17.717 10.7177 18.1511 10.2698 17.949C10.1728 17.9041 10.0982 17.8293 10.0534 17.732Z' fill='black'/%3E%3Cpath d='M15.0534 21.732C14.8444 21.283 15.2848 20.8489 15.7326 21.051C15.8296 21.0959 15.9043 21.1707 15.949 21.268C16.1506 21.717 15.7177 22.1511 15.2698 21.949C15.1728 21.9041 15.0982 21.8293 15.0534 21.732Z' fill='black'/%3E%3C/svg%3E%0A")`,
            maskRepeat: "repeat",
            maskSize: "auto",
          }}
        >
          <div
            className="absolute top-0 left-0 h-full w-full"
            style={{
              animation: "shiny-rotate-2 4s linear infinite",
              backgroundImage:
                "conic-gradient(from 0 at 50% 50%,#ffffff80,#fff0 60deg,#fff0 310deg,#ffffff80 360deg)",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          mask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 aspect-square w-full"
          style={{
            background:
              "conic-gradient(from 5deg at 50% 50%,transparent 280deg,rgba(120,118,197,1) 1turn,transparent 361deg)",
            transform: "translate(-50%, -50%)",
            animation: "shiny-rotate 4s linear infinite",
          }}
        />
      </div>
      <div className="from-foreground via-foreground to-primary/50 text-gradient-safari relative z-10 flex h-8 items-center bg-gradient-to-b text-sm font-normal">
        {children}
      </div>
    </div>
  )
}
