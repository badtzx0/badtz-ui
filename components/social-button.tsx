import Link from "next/link"

import { cn } from "@/lib/utils"

interface SocialButtonProps {
  src: string
  className?: string
  children: React.ReactNode
  srOnly: string
  onClick?: () => void
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  src,
  className = "",
  srOnly,
  children,
  onClick,
}) => {
  return (
    <Link
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "hover:bg-sidebar-accent text-foreground flex h-7 w-7 items-center justify-center rounded-md bg-transparent transition-colors [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
        className
      )}
    >
      <button onClick={onClick}>
        {children}
        <span className="sr-only">{srOnly}</span>
      </button>
    </Link>
  )
}
