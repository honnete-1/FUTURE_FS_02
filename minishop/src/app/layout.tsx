import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MiniCommerce",
  description: "A professional e-commerce experience",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "min-h-screen flex flex-col")} suppressHydrationWarning>
        <SessionProvider>
          <Suspense fallback={<div className="h-16 bg-white border-b" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 container mx-auto px-4 py-8" id="products">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
