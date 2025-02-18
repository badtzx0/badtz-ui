"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { usePlausible } from "next-plausible";
import Link from "next/link";

export function GithubButton() {
  const plausible = usePlausible();
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/badtzx0/badtz-ui"
        );
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    }

    fetchStars();
  }, []);

  return (
    <Link href="https://github.com/badtzx0/badtz-ui" target="_blank">
      <Button
        aria-label="GitHub Button"
        className="h-8 px-3 rounded-full bg-gradient-to-t dark:from-muted dark:to-muted from-secondary to-background text-foreground flex items-center relative after:inset-0 after:absolute dark:after:shadow-[rgba(255,_255,_255,_0.2)_0px_1px_0px_inset] after:shadow-[rgba(0,_0,_0,_0.05)_0px_1px_0px_inset] after:rounded-[inherit] group/github [&_svg]:size-4 [&_svg]:shrink-0"
        onClick={() => plausible("Clicked on GitHub Button")}
      >
        <GitHubLogoIcon className="h-5 w-5" />
        <span className="lg:block hidden">GitHub</span>
        <Separator
          orientation="vertical"
          className="dark:bg-white/20 bg-black/10 h-5 mx-0.5"
        />
        <span className="font-mono text-sm">
          {stars !== null ? stars.toLocaleString() : "_"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-[1px] group-hover/github:rotate-180 transition-transform duration-300"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
        <span className="sr-only">Github Link</span>
      </Button>
    </Link>
  );
}
