import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NextAuthProvider } from "@/components/providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xsolla Sample",
  description: "Built by Xsolla",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://cdn.xsolla.net/embed/paystation/1.2.9/widget.min.js" />
      <body
        className={cn(
          "min-h-screen bg-secondary antialiased overflow-x-hidden",
          inter.className
        )}
      >
        <NextAuthProvider>
          <main className="flex min-h-screen flex-col">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
