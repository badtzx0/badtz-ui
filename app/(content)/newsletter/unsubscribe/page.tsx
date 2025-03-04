"use client";

import UnsubscribeForm from "@/components/newsletter/unsubscribe-form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-between w-full">
      <Header />
      <main className="px-6 lg:px-8 pb-36 pt-28 w-full">
        <UnsubscribeForm token={token} />
      </main>
      <Footer />
    </div>
  );
}
