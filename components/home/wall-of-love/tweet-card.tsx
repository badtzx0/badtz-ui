/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react";
import { Icons } from "@/components/icons";
import {
  enrichTweet,
  type EnrichedTweet,
  type TweetProps,
  type TwitterComponents,
} from "react-tweet";
import { getTweet, type Tweet } from "react-tweet/api";
import { cn } from "@/lib/utils";
import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

interface TwitterIconProps {
  className?: string;
  [key: string]: unknown;
}

const Verified = ({ className, ...props }: TwitterIconProps) => (
  <svg
    aria-label="Verified Account"
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <g fill="currentColor">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
    </g>
  </svg>
);

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("rounded-md bg-secondary", className)} {...props} />
  );
};

export const TweetSkeleton = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: unknown;
}) => (
  <div
    className={cn(
      "flex size-full max-h-max min-w-72 flex-col gap-2 rounded-xl border p-4",
      className
    )}
    {...props}
  >
    <div className="flex flex-row gap-2">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-full" />
    </div>
    <Skeleton className="h-20 w-full" />
  </div>
);

export const TweetNotFound = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: unknown;
}) => (
  <div
    className={cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-lg border p-4",
      className
    )}
    {...props}
  >
    <h3>Tweet not found</h3>
  </div>
);

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex flex-row justify-between tracking-tight">
    <Link
      href={tweet.user.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center"
    >
      <div className="flex items-center space-x-2">
        <img
          title={`Profile picture of ${tweet.user.name}`}
          alt={tweet.user.screen_name}
          height={36}
          width={36}
          src={tweet.user.profile_image_url_https}
          className="overflow-hidden rounded-full border border-transparent"
        />

        <div>
          <div className="flex items-center whitespace-nowrap font-semibold text-sm">
            {truncate(tweet.user.name, 20)}
            {tweet.user.verified ||
              (tweet.user.is_blue_verified && (
                <Verified className="ml-1 inline size-4 text-blue-500" />
              ))}
          </div>
          <div className="flex items-center space-x-1">
            <div className="text-xs text-muted-foreground transition-all duration-75">
              @{truncate(tweet.user.screen_name, 16)}
            </div>
          </div>
        </div>
      </div>
    </Link>
    <Link href={tweet.url} target="_blank" rel="noreferrer" className="py-1">
      <span className="sr-only">Link to tweet</span>
      <Icons.twitter className="size-3 items-start transition-all ease-in-out hover:scale-110" />
    </Link>
  </div>
);

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="break-words leading-normal tracking-tighter">
    {tweet.entities.map((entity, idx) => {
      switch (entity.type) {
        case "url":
        case "symbol":
        case "hashtag":
        case "mention":
          return (
            <Link
              key={idx}
              href={entity.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-normal text-muted-foreground"
            >
              <span>{entity.text}</span>
            </Link>
          );
        case "text":
          return (
            <span
              key={idx}
              className="text-sm font-normal"
              dangerouslySetInnerHTML={{ __html: entity.text }}
            />
          );
      }
    })}
  </div>
);

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex flex-1 items-center justify-center">
    {tweet.video && (
      <video
        poster={tweet.video.poster}
        autoPlay
        loop
        muted
        playsInline
        className="rounded-xl border shadow-sm"
      >
        <source src={tweet.video.variants[0].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
    {tweet.photos && (
      <div className="relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto">
        <div className="shrink-0 snap-center sm:w-2" />
        {tweet.photos.map((photo) => (
          <img
            key={photo.url}
            src={photo.url}
            title={"Photo by " + tweet.user.name}
            alt={tweet.text}
            className="h-64 w-5/6 shrink-0 snap-center snap-always rounded-xl border object-cover shadow-sm"
          />
        ))}
        <div className="shrink-0 snap-center sm:w-2" />
      </div>
    )}
    {!tweet.video &&
      !tweet.photos &&
      // @ts-ignore
      tweet?.card?.binding_values?.thumbnail_image_large?.image_value.url && (
        <img
          // @ts-ignore
          src={tweet.card.binding_values.thumbnail_image_large.image_value.url}
          className="h-64 rounded-xl border object-cover shadow-sm"
          alt={tweet.text}
        />
      )}
  </div>
);

export const WOLTweet = ({
  tweet,
  components,
  className,
  ...props
}: {
  tweet: Tweet;
  components?: TwitterComponents;
  className?: string;
}) => {
  const enrichedTweet = enrichTweet(tweet);
  return (
    <div
      role="group"
      aria-label="Tweet Card"
      className={cn(
        "relative flex w-full h-auto bg-background dark:bg-secondary shadow-sm max-w-lg flex-col gap-2 overflow-hidden rounded-xl border p-4 backdrop-blur-md",
        className
      )}
      {...props}
    >
      <TweetHeader tweet={enrichedTweet} />
      <TweetBody tweet={enrichedTweet} />
      <TweetMedia tweet={enrichedTweet} />
      <div className="flex gap-1 mt-2">
        <Link
          href={`https://twitter.com/intent/like?tweet_id=${tweet.id_str}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-pink-600 py-0.5 px-1.5 rounded-md bg-transparent hover:bg-pink-500/20 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heart fill="currentColor" size={14} /> {tweet.favorite_count}
          <span className="sr-only">Tweet Like Count</span>
        </Link>
        <Link
          href={`https://twitter.com/intent/post?in_reply_to=${tweet.id_str}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-500 py-0.5 px-1.5 rounded-md bg-transparent hover:bg-blue-500/20 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageSquare fill="currentColor" size={14} />
          <span className="sr-only">Tweet Reply Count</span>
          {tweet.conversation_count}
        </Link>
      </div>
    </div>
  );
};

/**
 * TweetCard (Server Side Only)
 */
export const TweetCard = async ({
  id,
  components,
  fallback = <TweetSkeleton />,
  onError,
  ...props
}: TweetProps & {
  className?: string;
}) => {
  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          onError(err);
        } else {
          console.error(err);
        }
      })
    : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound {...props} />;
  }

  return (
    <Suspense fallback={fallback}>
      <WOLTweet tweet={tweet} {...props} />
    </Suspense>
  );
};
