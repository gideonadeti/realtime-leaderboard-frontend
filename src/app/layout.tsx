import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

import "./globals.css";
import { ThemeProvider } from "./(main)/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real-time Leaderboard",
  description: "Frontend for the real-time leaderboard project",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <SignedIn>
              {children}
              <Toaster richColors />
            </SignedIn>
            <SignedOut>
              <div className="h-screen flex items-center justify-center">
                <SignIn />
              </div>
            </SignedOut>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
