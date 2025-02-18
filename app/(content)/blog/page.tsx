/* TODO: blog is OK- but can hit harder -> needs:
-stronger internal linking (w related articles)
-breadcrumbs
-topic clusters -> auto tags +++
-pagination (next/prev + ?numbered pages)
-json-ld for each
ask j if needed
priority-2
*/

import Image from "next/image";
import Link from "next/link";
import { allPosts } from "@/.contentlayer/generated";
import { compareDesc } from "date-fns";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import { Icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "BadtzUI • Blog",
  description:
    "Welcome to our blog, where we share tips on enhancing yourwebsite's aesthetics, improving your landing page, and much more...",
  openGraph: {
    title: "BadtzUI - Modern React Components",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  const jsonLdBlog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "BadtzUI Blog",
    description:
      "A blog where we share tips on enhancing website aesthetics, improving landing pages, and more...",
    publisher: {
      "@type": "Organization",
      name: "BadtzUI",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    url: "https://badtz-ui.com/blog",
  };

  const jsonLdPosts = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blog Posts",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://badtz-ui.com/blog/${post.slugAsParams}`,
    })),
  };

  return (
    <div className="w-full h-full pb-16 sm:pb-28 pt-10 md:pt-20">
      <div className="px-6 lg:px-8 lg:max-w-5xl mx-auto">
        <div className="flex flex-col items-start border-b border-border pb-6">
          <div className="flex w-full justify-between gap-4 items-end">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-foreground text-balance max-w-[605px] font-gilroy">
              Blog
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
            Welcome to our blog, where we share tips on enhancing your website's
            aesthetics, improving your landing page, and much more...
          </p>
        </div>

        <hr className="my-3 border-none" />
        {posts?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
            {posts.map((post, index) => (
              <Link href={post.slug}>
                <article
                  key={post._id}
                  className="flex flex-col w-full p-2 rounded-xl transition-colors duration-200 group/article"
                >
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={760}
                      height={400}
                      className="aspect-video object-cover bg-secondary border-border border rounded-lg"
                      priority={index <= 1}
                      quality={100}
                    />
                  )}
                  <div className="pt-2.5 p-1">
                    <h2 className="group-hover/article:text-foreground text-lg mt-2 font-medium text-foreground/70 transition-colors duration-300">
                      {post.title}
                    </h2>
                    {post.date && (
                      <p className="text-xs text-muted-foreground mt-1.5">
                        {formatDate(post.date)}
                      </p>
                    )}
                    {post.description && (
                      <p className="mt-3 text-sm text-muted-foreground text-prose font-light">
                        {post.description.length > 140
                          ? `${post.description.slice(0, 140)}...`
                          : post.description}
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
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p>No posts published.</p>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPosts) }}
      />
    </div>
  );
}
