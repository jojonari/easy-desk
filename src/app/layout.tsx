"use client";

import { useState } from "react";
import localFont from "next/font/local";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import Link from "next/link";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Sidebar Menu */}
        <aside
          className={`bg-gray-800 text-white w-64 h-full fixed top-12 left-0 z-40 p-4 transition-transform transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <Sidebar/>
        </aside>

        {/* Header with centered Logo and Hamburger Button */}
        <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
          <div className="text-xl font-bold">
            <span className="mr-2 text-green-500">🖥️</span>
            <Link href="/" className="hover:text-gray-400">
              EasyDesk
            </Link>
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          
        </header>

        {/* Main content and right-side banner area */}
        <div className="flex flex-col md:flex-row">
          {/* Main content area */}
          <main className="ml-0 md:ml-64 mr-0 md:mr-64 pt-12 flex-grow">
            {children}
          </main>

          {/* Right-side banner - Updated for mobile view */}
          <section className="bg-gray-800 text-gray-400 w-full md:w-64 h-auto md:h-full p-4 pb-20 md:pb-4 md:fixed md:top-0 md:right-0 md:z-40">
            <div className="sticky md:top-16 md:block">
              <h2 className="text-lg font-bold">광고</h2>
              <p>광고 영역</p>
            </div>
          </section>
        </div>

        {/* Background overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </body>
    </html>
  );
}
