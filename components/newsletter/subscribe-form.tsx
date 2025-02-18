"use client";

//@ts-ignore
import confetti from "canvas-confetti";
import { Input } from "@/components/ui/input";
import { Check, Mail } from "lucide-react";
import { useRef, useState } from "react";
import { newsletterSchema } from "@/schema/newsletter";
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { usePlausible } from "next-plausible";

const couponCode = process.env.NEXT_PUBLIC_NEWSLETTER_COUPON || "NEWSLETTER5";

const SuccessToast = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCouponClick = () => {
    navigator.clipboard
      .writeText(couponCode)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div>
      <span className="text-sm">
        Thank you for your interest in my project. As a token of appreciation,
        here is a <strong>$5</strong> discount coupon to use for BadtzUI Pro. 🎁
      </span>
      <button
        aria-label="Copy discount code"
        className="text-xs font-medium font-mono h-7 bg-emerald-500 rounded px-2 py-1 mt-4 text-white flex items-center justify-center cursor-pointer [&_svg]:size-3 [&_svg]:shrink-0 w-[98px]"
        onClick={handleCouponClick}
      >
        {isCopied ? (
          <div className="flex items-center gap-2">
            <Check />
            <span> Copied!</span>
          </div>
        ) : (
          <span>{couponCode}</span>
        )}
      </button>
    </div>
  );
};

export default function NewsletterForm({ className }: { className?: string }) {
  const plausible = usePlausible();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [icon, setIcon] = useState<"mail" | "check">("mail");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const triggerConfetti = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      confetti({
        angle: 90,
        particleCount: 50,
        startVelocity: 15,
        spread: 75,
        scalar: 0.5,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });
      setIcon("check");
      setTimeout(() => setIcon("mail"), 3000);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setIsLoading(true);

    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      toast({
        title: "Invalid email address",
        description:
          result.error.errors[0]?.message || "Please enter a valid email.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      toast({
        title: "Success!",
        description: <SuccessToast />,
      });
      triggerConfetti();
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 md:mt-4 relative">
      <Input
        type="email"
        required
        className={cn("pr-10 h-10 bg-background", className)}
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        ref={buttonRef}
        aria-live="polite"
        aria-busy={isLoading}
        onClick={plausible("Subscribe to Newsletter")}
        className={cn(
          "aspect-square flex-items-center justify-center rounded absolute inset-y-1.5 right-1.5 bg-gradient-to-t from-orange-600 to-orange-500 shadow-[0_0px_8px_rgba(245,_73,_0,_0.7)] text-white flex items-center before:absolute before:inset-0 before:shadow-[0_0px_20px_rgba(245,_73,_0,_0.5)] before:opacity-0 transition-opacity duration-300 hover:before:opacity-100 before:rounded-[inherit] before:pointer-events-none before:transition-opacity before:duration-300 before:will-change-opacity after:inset-0 after:absolute after:shadow-[rgba(255,_255,_255,_0.2)_0px_1px_0px_inset] after:rounded-[inherit] [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
          isLoading && "cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <Icons.spinner className="animate-spin" />
        ) : icon === "mail" ? (
          <Mail aria-hidden />
        ) : (
          <Check aria-hidden />
        )}
        <span className="sr-only">Newsletter Subscribe</span>
      </button>
    </form>
  );
}
