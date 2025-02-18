"use client";
import { Icons } from "@/components/icons";
import { SocialButton } from "@/components/ui/social-button";

import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LargeLogo, Logo } from "@/components/logo";
import { GithubButton } from "@/components/github-button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { HomeSearchbar } from "@/components/home/home-searchbar";

interface Link {
  href: string;
  label: string;
  external?: boolean;
}

const links: Link[] = [
  {
    href: "/docs",
    label: "Components",
  },
  {
    href: "/changelog",
    label: "Changelog",
  },
  {
    href: "https://pro.badtz-ui.com",
    label: "Templates",
    external: true,
  },
];

interface MobileLinkProps {
  href: string;
  label: string;
  className?: string;
  [x: string]: any;
}

function MobileLink({
  href,
  label,
  className,
  ...props
}: MobileLinkProps): JSX.Element {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
      }}
      className={cn(
        "text-base w-min whitespace-nowrap text-foreground font-light",
        className
      )}
      {...props}
    >
      {label}
    </Link>
  );
}

export default function Header(): JSX.Element {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full py-4">
      <div aria-hidden className="absolute inset-0 gradient-blur z-20">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="max-w-5xl mx-auto px-5 lg:px-7">
        <div className="flex h-14 items-center pl-4 pr-3 w-full justify-between dark:border-secondary-border/70 border-secondary-border backdrop-blur-md bg-background/70 border rounded-2xl z-50 relative">
          {/*Large screen Nav*/}
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <LargeLogo />
            </Link>
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-4 text-sm xl:gap-5"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": `${link.label} (opens in new tab)`,
                  })}
                  className={cn(
                    "transition-colors text-muted-foreground hover:text-foreground font-normal",
                    pathname?.startsWith(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/*Mobile nav*/}
          <div className="md:hidden flex gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open main menu"
                  aria-controls="mobile-navigation"
                  className="flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-menu"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                  <span className="sr-only">Toggle Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="border-zinc-200 dark:border-zinc-800 z-50 pt-3 max-w-72 bg-white dark:bg-black"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Use the options below to navigate the application.
                  </SheetDescription>
                </SheetHeader>
                <div>
                  <Link
                    href="/"
                    rel="prefetch"
                    className="mr-4 flex items-center gap-2 lg:mr-6 text-foreground"
                  >
                    <Logo />
                    <span className="font-bold pt-0.5 font-gilroy">
                      BadtzUI
                    </span>
                  </Link>
                  <nav
                    aria-label="Mobile navigation"
                    className="flex flex-col space-y-3 mt-8"
                  >
                    {links.map((item) => (
                      <MobileLink
                        key={item.href}
                        href={item.href}
                        label={item.label}
                      />
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <Logo />
          </div>

          <div className="flex items-center gap-3 text-sm font-light">
            <div className="flex items-center gap-0.5">
              <HomeSearchbar />
              <ModeToggle />
              <SocialButton
                srOnly="Discord Link"
                src="https://discord.gg/SV2y7vz6Es"
                className="[&_svg]:size-4"
              >
                <Icons.discord />
              </SocialButton>
              <SocialButton srOnly="Twitter Link" src="https://x.com/badtz_ui">
                <Icons.twitter />
              </SocialButton>
            </div>
            <GithubButton />
          </div>
        </div>
      </div>
    </header>
  );
}
