import Image from "next/image";
import Link from "next/link";
import { allChangelogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { formatDate } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BadtzUI • Changelog",
  description:
    "Welcome to our changelog, where we discuss the latest updates on our project and components, keeping you informed about new features and improvements...",
  openGraph: {
    title: "BadtzUI - Modern React Components",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function ChangelogPage() {
  const changelogs = allChangelogs
    .filter((changelog) => changelog.published)
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  return (
    <div className="w-full h-full pb-16 sm:pb-28 pt-10 md:pt-20">
      <div className="px-6 lg:px-8 lg:max-w-5xl mx-auto">
        <div className="flex flex-col items-start border-b border-border pb-6">
          <div className="flex w-full justify-between gap-4 items-end">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-foreground text-balance max-w-[605px] font-gilroy">
              Changelog
            </h1>
            <Link
              href="https://x.com/badtz_ui"
              target="_blank"
              className="flex [&_svg]:size-3 items-center gap-2 rounded-lg px-2 md:px-3 h-8 md:h-10 text-sm border bg-secondary hover:border-foreground/10 transition-colors duration-300 whitespace-nowrap shrink-0"
            >
              <Icons.twitter />
              <span className="hidden md:block font-light">
                Follow for updates
              </span>
            </Link>
          </div>
          <p className="mt-4 text-balance max-w-[550px] md:max-w-[700px] tracking-tight lg:mt-6 sm:mt-3 text-muted-foreground text-base md:text-lg font-light">
            Welcome to our changelog, where we discuss the latest updates on our
            project and components, keeping you informed about new features and
            improvements...
          </p>
        </div>

        <hr className="my-3 border-none" />
        {changelogs?.length ? (
          <div className="grid sm:grid-cols-1 max-w-[760px]">
            {changelogs.map((changelog, index) => (
              <div key={changelog._id}>
                <div className="flex items-start h-full relative">
                  <div className="h-full w-[200px] md:flex hidden">
                    <div className="flex w-full pb-4 md:w-[125px] md:pb-0">
                      {changelog.date && (
                        <div className="h-full">
                          <p className="text-sm font-medium text-muted-foreground hidden md:block mt-2 sticky top-20">
                            {formatDate(changelog.date)}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="relative hidden md:flex md:w-[75px]">
                      <div className="sticky left-0 top-20 mt-3.5 h-1.5 w-1.5 rounded-full bg-muted-foreground z-[5]"></div>
                      <div className="absolute left-0.5 top-0.5 h-full w-0.5 bg-border"></div>
                    </div>
                  </div>

                  <article className="group relative flex flex-col pb-10">
                    {changelog.date && (
                      <p className="text-sm text-muted-foreground md:hidden block mb-2">
                        {formatDate(changelog.date)}
                      </p>
                    )}
                    {changelog.image && (
                      <Image
                        src={changelog.image}
                        alt={changelog.title}
                        width={760}
                        height={400}
                        className="rounded-md border bg-background border-border transition-colors aspect-[190/100] object-cover mb-6"
                        priority={index <= 1}
                      />
                    )}
                    <h2 className="text-3xl text-foreground font-gilroy ">
                      {changelog.title}
                    </h2>
                    {changelog.description && (
                      <p className="text-muted-foreground mt-2 text-balance">
                        {changelog.description.length > 140
                          ? `${changelog.description.slice(0, 140)}...`
                          : changelog.description}
                      </p>
                    )}

                    <div className="flex items-center space-x-1.5 text-sm mt-4">
                      <Image
                        src="/images/badtz-avatar-small.webp"
                        alt="Twitter Logo"
                        width={20}
                        height={20}
                        className="rounded-full bg-secondary shrink-0 h-5 w-5 invert dark:invert-[0]"
                      />
                      <p className="font-light text-sm text-thin text-muted-foreground">
                        Badtz
                      </p>
                    </div>

                    <Link href={changelog.slug} className="absolute inset-0">
                      <span className="sr-only">View Changelog</span>
                    </Link>
                  </article>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No changelogs published.</p>
        )}
      </div>
    </div>
  );
}
