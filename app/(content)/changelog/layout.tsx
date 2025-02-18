import Header from "@/components/header";
import Footer from "@/components/footer";
import { ReactNode } from "react";

interface ChangelogLayoutProps {
  children: ReactNode;
}

export default function ChangelogLayout({ children }: ChangelogLayoutProps) {
  return (
    <div>
      <Header />
      <div className="container w-full flex justify-center">{children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
