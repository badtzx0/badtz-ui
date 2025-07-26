import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    id: "item-1",
    question: "What’s the difference between Yearly and Lifetime plans?",
    answer: [
      "Yearly gives you access and updates for one year. Lifetime is a one-time payment.",
      "With Lifetime, you get all future updates and new content forever.",
    ],
  },
  {
    id: "item-2",
    question: "Will I lose access if I don’t renew the Yearly plan?",
    answer: [
      "Yes — access to blocks, templates, and updates ends when your plan expires.",
      "To keep access, you’ll need to renew or upgrade to the Lifetime plan.",
    ],
  },
  {
    id: "item-3",
    question: "Is support included in all plans?",
    answer: [
      "Yes, all plans include support if a block or template isn’t working.",
      "Lifetime and Team plans get priority response time and extra help.",
    ],
  },
  {
    id: "item-4",
    question: "Can I switch from Yearly to Lifetime later?",
    answer: [
      "Yes — you can upgrade anytime and we’ll deduct what you already paid.",
      "Just contact us and we’ll handle the upgrade for you manually.",
    ],
  },
  {
    id: "item-5",
    question: "Is the license valid for commercial projects?",
    answer: [
      "Yes, all plans include a commercial license for your client or business sites.",
      "The Team plan covers multiple licenses and use across larger teams.",
    ],
  },
  {
    id: "item-6",
    question: "Do I get access to future blocks and templates?",
    answer: [
      "Yes — Yearly plans get updates for 1 year, Lifetime gets all future releases.",
      "We’re continuously adding new blocks, templates, and improvements.",
    ],
  },
]

export function PricingFAQ() {
  return (
    <section className="from-background to-secondary/30 dark:to-secondary bg-gradient-to-t from-10% to-90% py-16 md:py-32">
      <div className="container mx-auto flex w-full max-w-5xl flex-col items-center justify-start !px-4 text-center">
        <h2 className="text-foreground leading-tighter font-gilroy max-w-2xl text-5xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-6xl/[4rem] xl:tracking-tighter">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base text-balance sm:text-lg">
          Find answers to common questions about our pricing and features.
        </p>
      </div>
      <div className="container mx-auto mt-14 max-w-2xl !px-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
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
