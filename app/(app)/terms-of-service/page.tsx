import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BadtzUI • Terms of Service",
  description:
    "An expanding collection of 70+ free UI components. Production-grade animations with Framer Motion. Daily updates. Open source. React, Tailwind, TypeScript & JavaScript.",
  metadataBase: new URL("https://badtz-ui.com"),
  openGraph: {
    title: "BadtzUI - Terms of Service",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BadtzUI - Privacy Policy",
    description:
      "Build beautiful landing pages with 70+ free UI components. Professional animations, modern design system. Open source React components with Tailwind CSS, Motion & TypeScript.",
    images: [{ url: "/twitter-image.jpg", width: 1200, height: 675 }],
    site: "@badtz_ui",
  },
}

export default function PrivacyPolicy() {
  return (
    <>
      <main className="mx-auto max-w-3xl">
        <div className="px-4 py-16">
          <h1 className="font-gilroy text-2xl">Terms of Service for BadtzUI</h1>

          <pre className="text-muted-foreground font-sans text-sm leading-relaxed whitespace-pre-wrap">
            {`
1. Terms of Service

Last updated on February 25, 2025

These Terms of Service ("Terms") govern your access to and use of the BadtzUI website ("Website") operated by Badtz ("we", "us", or "our"). By accessing or using the Website, you agree to be bound by these Terms.

1.1 Use of the Website

- The BadtzUI website is provided free of charge to users for informational and educational purposes.
- You agree not to use the Website for any unlawful purpose or any activity that could harm the Website or its users.
- No account creation is required to access the content.

1.2 Intellectual Property

- The code and components provided under BadtzUI are licensed under the MIT License with an additional clause prohibiting the resale of unmodified or minimally modified versions.
- You are free to use, modify, and distribute the code, provided you respect the terms of the MIT License.

1.3 Limitation of Liability

- Badtz provides the Website and its content "as is" without warranties of any kind.
- We are not responsible for any damages, losses, or issues that may arise from using the Website or the code provided.
- You use the Website and any code or resources at your own risk.

1.4 External Links

- The Website may contain links to third-party websites (e.g., Twitter: https://x.com/badtz_ui, Discord: https://discord.com/invite/SV).
- We are not responsible for the content, policies, or practices of any external sites.

1.5 Modifications to the Terms

- We reserve the right to update or modify these Terms at any time.
- Changes will be posted on this page with an updated revision date.
- Continued use of the Website after any modifications constitutes your acceptance of the revised Terms.

1.6 Governing Law

- These Terms are governed by and construed in accordance with the laws applicable in your jurisdiction.

1.7 Contact

If you have any questions about these Terms, please contact us:
- Email: contact@badtz-ui.com
- Twitter: https://x.com/badtz_ui

Thank you for using BadtzUI.
            `}
          </pre>
        </div>
      </main>
    </>
  )
}
