import { Registry } from "shadcn/registry"

export const templates: Registry["items"] = [
  {
    name: "template-02",
    type: "registry:page",
    description:
      "A customizable template that lets you pick and assemble your preferred components. Built with Next.js, TypeScript, Motion and Shadcn UI, it offers flexible theming and rapid deployment capabilities. Ideal for startups or SaaS.",
    files: [
      {
        path: "content/templates/template-02.mdx",
        type: "registry:page",
        target: "content/templates/template-02.mdx",
      },
    ],
    categories: ["dashboard"],
    meta: {
      title: "Modular Glassmorphism Template",
      preview: "https://example.com/templates/ecommerce-dashboard",
      tags: [
        "Saas",
        "Startup",
        "Landing",
        "Modern",
        "Buisness",
        "Glassmorphism",
      ],
      image: "https://cdn.badtz-ui.com/pro/templates/template-02.webp",
      role: "TEMPLATE_2",
    },
  },
  {
    name: "template-01",
    type: "registry:page",
    description:
      "Modern SaaS startup landing page with hero section, features, pricing, and testimonials",
    files: [
      {
        path: "content/templates/template-01.mdx",
        type: "registry:page",
        target: "content/templates/template-01.mdx",
      },
    ],
    categories: ["landing-page"],
    meta: {
      title: "SaaS Startup Landing",
      preview: "https://example.com/templates/saas-startup",
      tags: ["saas", "startup", "landing", "modern"],
      image: "https://cdn.badtz-ui.com/pro/templates/template-01.webp",
      role: "TEMPLATE_1",
    },
  },
]
