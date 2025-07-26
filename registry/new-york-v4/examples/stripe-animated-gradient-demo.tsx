import { AnimatedGradient } from "@/registry/new-york-v4/ui/stripe-animated-gradient"

export function AnimatedGradientDemo() {
  return (
    <div className="relative flex h-[450px] max-h-[400px] w-full items-center justify-center overflow-hidden rounded-md">
      <AnimatedGradient
        color1="#a960ee"
        color2="#ff333d"
        color3="#90e0ff"
        color4="#ffcb57"
      />
      <h1 className="font-gilroy pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-2 text-center text-4xl font-semibold text-black">
        Stripe Animated
        <br />
        Gradient
      </h1>
    </div>
  )
}
