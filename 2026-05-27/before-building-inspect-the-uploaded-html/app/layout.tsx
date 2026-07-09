import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/marketing/site-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "RSK AI | Ready Set Know",
  description: "Govern AI before risk scales."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="topbar">
            <Link className="brand" href="/">
              <span className="brand-mark">RSK</span>
              <span>Ready Set Know</span>
            </Link>
            <SiteNav />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
