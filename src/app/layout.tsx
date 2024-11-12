import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "New-Rich",
  description: "부자를 계산하자!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header Menu */}
        <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50">
          <nav>
            <ul className="flex space-x-8">
              <li>
                <a href="/" className="hover:text-gray-400">
                  New-Rich
                </a>
              </li>
              <li>
                <a href="/calculator" className="hover:text-gray-400">
                  계산기
                </a>
              </li>
              <li>
                <a href="/retirement" className="hover:text-gray-400">
                  은퇴 계산기
                </a>
              </li>
              <li>
                <a href="/calculator" className="hover:text-gray-400">
                  계산기
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main content */}
        <main className="pt-12 pb-20">{children}</main> {/* pt-12로 간격 설정 */}

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 w-full">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} New-Rich. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
