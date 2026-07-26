import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";


export const metadata: Metadata = {
  title: "AI Mock Interview Platform",
  description: "AI powered interview preparation platform",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <ClerkProvider>

      <html lang="en">

        <body className="min-h-screen flex flex-col bg-slate-900 text-white">

          <Navbar />


          <main className="flex-1">

            {children}

          </main>


          <Footer />


        </body>


      </html>


    </ClerkProvider>

  );
}