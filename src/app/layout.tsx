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
        {/* 구글 에드센스 사이트인증 */}
        <meta name="google-adsense-account" content="ca-pub-2381704608967129" />
        {/* 네이버 서치마스터 */}
        <meta name="naver-site-verification" content="a648ad0c8431af02feb7b2cb2d0bb83055da0058" />
        {/* 구글 광고 */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2381704608967129" crossOrigin="anonymous"></script>
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
