import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "../app/globals.css";

// 🟣 Clerk imports
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Viewer",
  description: "A simple recipe viewer app with delicious recipes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen flex flex-col">
            <header className="bg-purple-300 shadow-sm py-4">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                  <Link href="/" className="text-2xl font-bold">
                    Recipe Viewer
                  </Link>

                  <nav>
                    <ul className="flex space-x-6 items-center">
                      <li>
                        <Link href="/about" className="text-white hover:text-purple-950">
                          About
                        </Link>
                      </li>
                      <SignedOut>
                        <li>
                          <SignInButton>
                            <button className="text-white hover:text-purple-950">Sign In</button>
                          </SignInButton>
                        </li>
                        <li>
                          <SignUpButton>
                            <button className="text-white hover:text-purple-950">Sign Up</button>
                          </SignUpButton>
                        </li>
                      </SignedOut>
                      <SignedIn>
                        <li>
                          <UserButton afterSignOutUrl="/" />
                        </li>
                      </SignedIn>
                    </ul>
                  </nav>
                </div>
              </div>
            </header>

            <main className="flex-grow">{children}</main>

            <footer className="bg-gray-100 py-4 mt-8">
              <div className="container mx-auto px-4 text-center">
                <p>© {new Date().getFullYear()} Recipe Viewer. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
