import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const customFont = localFont({
  src: "../public/font/ITCAvantGardeStd-Demi.ttf",
  variable: "--font-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FinSight Dashboard",
  description: "Dark-themed finance dashboard built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className={`${customFont.variable} font-sans`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
