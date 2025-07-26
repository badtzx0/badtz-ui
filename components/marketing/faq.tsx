import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    id: "item-1",
    question:
      "What are UI components and how can they enhance my landing page?",
    answer: [
      "UI components are pre-built, reusable interface elements designed to create stunning landing pages quickly. Our library offers a comprehensive collection of modern, customizable components that help developers and designers build professional-looking websites with minimal effort. ",
      "From hero sections to feature cards, we provide everything you need for a high-converting landing page.",
    ],
  },
  {
    id: "item-2",
    question: "Is this UI component library free and open source?",
    answer: [
      "Yes! Our entire UI component library is completely free and open source under the MIT license. You can use, modify, and distribute our components for both personal and commercial projects without any costs.",
      "We believe in giving back to the developer community while maintaining high-quality standards in our components.",
    ],
  },
  {
    id: "item-3",
    question: "How customizable are these landing page UI components?",
    answer: [
      "Our UI components are highly customizable through Tailwind CSS classes and design tokens. You can easily modify colors, typography, spacing, and animations to match your brand identity.",
      "Each component is built with flexibility in mind, allowing you to create unique designs while maintaining consistency across your landing page.",
    ],
  },
  {
    id: "item-4",
    question: "Are these UI components optimized for performance and SEO?",
    answer: [
      "Absolutely! Our components are built with performance in mind, using React Server Components when possible and implementing best practices for web vitals.",
      "They're lightweight, accessible, and SEO-friendly by default. We ensure semantic HTML structure and proper meta tags support to help your landing page rank better in search engines.",
    ],
  },
  {
    id: "item-5",
    question: "How do I get started with these landing page UI components?",
    answer: [
      "Getting started is simple! You have two convenient options: either use our CLI to add components directly to your project, or simply copy and paste the component code you need from our documentation. Each component comes with clear instructions and can be easily customized using Tailwind CSS classes.",
      "Our components are designed to work seamlessly with Next.js and React, making implementation straightforward for developers of all skill levels.",
    ],
  },
]

export function FAQ() {
  return (
    <section className="from-background via-secondary/60 to-background bg-gradient-to-b from-20% py-16 md:py-32">
      <div className="container mx-auto flex w-full max-w-6xl flex-col items-center justify-start !px-4 text-center">
        <h2 className="leading-tighter font-gilroy max-w-2xl bg-gradient-to-b from-white/80 via-white to-white/60 bg-clip-text pb-2 text-5xl font-semibold tracking-tight text-pretty text-transparent lg:leading-[1.1] lg:font-semibold xl:text-6xl/[4rem] xl:tracking-tighter">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base text-balance sm:text-lg">
          Find answers to common questions about our pricing and features.
        </p>
      </div>
      <div className="container mx-auto mt-10 max-w-3xl !px-4 md:mt-14">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="bg-secondary/60 p-1.5"
            >
              <AccordionTrigger className="px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground flex flex-col gap-4 px-2 py-4 text-balance">
                {faq.answer.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
