import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import AuthNotifier from "@/components/AuthNotifier"; // 1. Imported here
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Interview Platform",
  description: "Practice interviews with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className="
          min-h-screen
          bg-linear-to-br
          from-slate-950
          via-slate-900
          to-slate-950
          text-white
          "
        >
          {/* 2. Added here right inside body */}
          <AuthNotifier />

          <div className="flex flex-col min-h-screen">
            <Navbar />

            <main
              className="
              flex-1
              px-4
              sm:px-6
              lg:px-8
              "
            >
              {children}
            </main>

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}