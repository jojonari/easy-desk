"use client";

import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { SlCalculator } from "react-icons/sl";
import MenuList from "@/components/MenuList";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2381704608967129" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header with centered Logo and Hamburger Button */}
        <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/" className="flex items-center hover:text-gray-400">
              <SlCalculator className="mr-2" /> 새로운 계산기
            </Link>
          </div>

        </header>

        {/* Main content area */}
        <main className="pt-12 flex-grow">
          {children}
        </main>
        <MenuList/>

      </body>
    </html>
  );
}
