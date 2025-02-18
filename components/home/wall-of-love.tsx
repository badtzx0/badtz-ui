"use client";

import { ClientTweetCard } from "@/components/home/wall-of-love/client-tweet-card";
import { VerticalScroll } from "@/components/home/wall-of-love/vertical-scroll";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const tweetGroups = [
  {
    ids: ["1891051538816066009", "1891051153024004500"],
    duration: 45,
  },
  {
    ids: ["1876146827361472661", "1891051153024004500", "1891050876774621546"],
    duration: 30,
  },
  {
    ids: ["1891050876774621546", "1891051538816066009"],
    duration: 40,
  },
];

export default function HomeBento() {
  return (
    <section aria-label="Wall of Love" className="w-full h-full py-16 sm:py-28">
      <div className="px-6 lg:px-8 max-w-[400px] md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col items-center justify-center md:items-start">
        <h2
          id="wall-of-love-heading"
          className="text-4xl sm:text-5xl font-semibold tracking-tighter text-foreground text-balance max-w-[605px] font-gilroy text-center md:text-left"
        >
          Wall of Love
        </h2>

        <p className="mt-4 lg:mt-6 text-balance tracking-tight text-muted-foreground text-base md:text-lg font-light text-center max-w-prose md:text-left">
          Discover what our community is saying about their experience with
          BadtzUI. Join the conversation and share your thoughts!
        </p>
        <Link
          href="https://twitter.com/intent/tweet?text=Sharing%20the%20love%20for%20BadtzUI!%20%F0%9F%8C%9F%0ACheck%20it%20out%3A%20https%3A%2F%2Fbadtz-ui.com"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-4 text-sm rounded-lg bg-foreground text-background hover:bg-foreground/90 flex items-center relative transition-colors duration-300 mt-6 [&_svg]:size-3 gap-2"
          aria-label="Share your experience on Twitter"
        >
          <Icons.twitter />
          <span className="sr-only">Twitter</span>
          Share
        </Link>
        <div
          role="feed"
          aria-busy="false"
          className={cn(
            "mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[65dvh] overflow-hidden relative w-full",
            "before:absolute before:top-[-2px] before:inset-x-0 before:h-[150px] before:bg-gradient-to-t from-transparent to-background before:z-[20] before:pointer-events-none",
            "after:absolute after:bottom-[-2px] after:inset-x-0 after:h-[150px] after:bg-gradient-to-b after:z-[20] after:pointer-events-none"
          )}
        >
          {tweetGroups.map((group, index) => (
            <VerticalScroll
              key={`scroll-${index}`}
              style={{
                ["--duration" as any]: `${group.duration}s`,
              }}
              className={`[--duration:${group.duration}s]`}
              aria-label={`Tweet carousel group ${index + 1}`}
            >
              {group.ids.map((id) => (
                <ClientTweetCard
                  key={id}
                  id={id}
                  aria-posinset={index + 1}
                  aria-setsize={group.ids.length}
                />
              ))}
            </VerticalScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
