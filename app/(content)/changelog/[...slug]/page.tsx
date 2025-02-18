import { notFound } from "next/navigation";
import {
  allAuthors,
  allChangelogs,
  type Changelog,
} from "@/.contentlayer/generated";
import { Mdx } from "@/components/docs/mdx-components/mdx-components";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { DashboardTableOfContents } from "@/components/docs/article-toc";
import DocsCta from "@/components/docs/doc-cta";
import { Icons } from "@/components/icons";
import { toc } from "mdast-util-toc";
import { getTableOfContents } from "@/lib/toc";

interface Params {
  slug?: string[];
}

type Author = {
  _id: string;
  slug: string;
  title: string;
  avatar: string;
  twitter: string;
};

async function getChangelogFromParams(
  params: Params
): Promise<Changelog | undefined> {
  const slug = params?.slug?.join("/");
  return allChangelogs.find((changelog) => changelog.slugAsParams === slug);
}

export async function generateMetadata({ params }: { params: Params }) {
  const changelog = await getChangelogFromParams(params);
  if (!changelog) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;
  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", changelog.title);
  ogUrl.searchParams.set("type", "Changelog");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: `BadtzUI • ${changelog.title}`,
    description: changelog.description,
    authors: changelog.authors.map((author) => ({ name: author })),
    openGraph: {
      title: `BadtzUI • ${changelog.title}`,
      description: changelog.description,
      type: "article",
      url: absoluteUrl(changelog.slugAsParams),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: changelog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `BadtzUI • ${changelog.title}`,
      description: changelog.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams() {
  return allChangelogs.map((changelog) => ({
    slug: changelog.slugAsParams.split("/"),
  }));
}

export default async function ChangelogPage({ params }: { params: Params }) {
  const changelog = await getChangelogFromParams(params);
  if (!changelog) {
    notFound();
  }
  const toc = await getTableOfContents(changelog.body.raw);
  const authors = changelog.authors.map((author) => {
    const cleanedAuthor = author.trim();
    return allAuthors.find(({ slug }) => slug === `/authors/${cleanedAuthor}`);
  }) as Author[];

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(changelog.slugAsParams),
    },
    headline: changelog.title,
    description: changelog.description,
    image: absoluteUrl(`/images/blog/${changelog.image}` || "/og-image.png"),
    datePublished: new Date(changelog.date).toISOString(),
    dateModified: new Date(changelog.date).toISOString(),
    author: changelog.authors.map((author) => ({
      "@type": "Person",
      name: author.trim(),
      url: absoluteUrl(`/blog/authors/${author.trim()}`),
    })),
    publisher: {
      "@type": "Organization",
      name: "BadtzUI",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    articleSection: "Blog",
    //keywords: changelog.tags,
    url: absoluteUrl(changelog.slugAsParams),
  };

  return (
    <div className="w-full h-full pb-16 sm:pb-28">
      <div className="px-6 lg:px-8 lg:max-w-5xl mx-auto pt-10 md:pt-20 relative lg:gap-10 xl:grid xl:grid-cols-[1fr_240px]">
        <div>
          <Link
            href="/changelog"
            className="flex [&_svg]:size-3 text-foreground items-center gap-2 rounded-lg pl-3 pr-4 h-9 text-sm border bg-secondary hover:border-foreground/10 transition-colors duration-300 whitespace-nowrap shrink-0 w-min"
          >
            <ChevronLeft />
            Back
          </Link>
          <article className="w-full mt-8 [&_p]:text-foreground">
            <div className="flex flex-col  items-start">
              {changelog.date && (
                <time
                  dateTime={changelog.date}
                  className="block text-sm text-muted-foreground"
                >
                  Published on {formatDate(changelog.date)}
                </time>
              )}
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-foreground text-balance max-w-[605px] font-gilroy mt-2">
                {changelog.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-balance mt-6">
              {changelog.description}
            </p>
            {changelog.image && (
              <Image
                src={changelog.image}
                alt={changelog.title}
                width={760}
                height={400}
                className="bg-secondary border border-border rounded-lg aspect-video object-cover w-full mb-6 mt-10"
                priority
              />
            )}
            <hr className="my-6 border-0" />
            <Mdx code={changelog.body.code} />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLdArticle),
              }}
            />
          </article>
          {authors?.length ? (
            <div className="mt-1 flex space-y-4">
              {authors.map((author) =>
                author ? (
                  <div className="w-full bg-secondary/20 border rounded-xl p-5 mt-12 flex text-left flex-col md:flex-row gap-6 items-start">
                    <Image
                      src={author.avatar}
                      alt={author.title}
                      width={90}
                      height={90}
                      className="aspect-square object-cover bg-secondary border-border border rounded-full shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-semibold mt-2">
                        Article written by{" "}
                        <Link
                          href="/blog/authors/badtz"
                          className="text-blue-500 hover:underline"
                          title={`View all articles by ${author.title}`}
                        >
                          {author.title}
                        </Link>
                      </h3>
                      <h4 className="mt-1">Founder of BadtzUI</h4>
                      <p className="text-muted-foreground text-pretty font-light mt-3">
                        Badtz is the <strong>Founder of BadtzUI</strong>. Badtz
                        focuses on crafting
                        <strong>
                          high-quality, accessible, and customizable UI
                          components
                        </strong>
                        to help developers build beautiful applications with
                        ease.
                      </p>
                      <div className="flex items-center space-x-2 mt-5">
                        <Link
                          key={author._id}
                          href={`https://twitter.com/${author.twitter}`}
                          target="_blank"
                          title={`View ${author.title}'s Twitter profile`}
                          className="flex [&_svg]:size-3.5 items-center gap-2 rounded-lg px-2 aspect-square justify-center h-10 text-sm border bg-secondary hover:border-foreground/10 transition-colors duration-300 whitespace-nowrap shrink-0 w-min"
                        >
                          <Icons.twitter />
                        </Link>
                        <Link
                          href="https://github.com/badtzx0"
                          target="_blank"
                          title={`View ${author.title}'s Github profile`}
                          className="flex [&_svg]:size-4 items-center gap-2 rounded-lg px-2 aspect-square justify-center h-10 text-sm border bg-secondary hover:border-foreground/10 transition-colors duration-300 whitespace-nowrap shrink-0 w-min"
                        >
                          <Icons.gitHub />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : null}
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              href="/changelog"
              className="flex [&_svg]:size-3 text-foreground items-center gap-2 rounded-lg pl-3 pr-4 h-9 text-sm border bg-secondary hover:border-foreground/10 transition-colors duration-300 whitespace-nowrap shrink-0 w-min mr-auto"
            >
              <ChevronLeft />
              See all articles
            </Link>
          </div>
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
            <DocsCta className="border-border dark:border-border" />
            <div className="h-full overflow-auto pb-10 pt-8">
              {toc && <DashboardTableOfContents toc={toc} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
