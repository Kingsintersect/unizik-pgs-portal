
"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import { ToastProvider } from "@/contexts/ToastProvider";
import { SessionProvider } from "next-auth/react";


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: {
//     template: '%s | Unizik Post Graduaate Studies',
//     default: 'Unizik Post Graduaate Studies',
//   },
//   description: "Login to your portal to Start Learning",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  bg-[#fcece6]`}>
        <AppProvider>
          <ToastProvider />
          <SessionProvider>{children}</SessionProvider>
        </AppProvider>
      </body>
    </html>
  );
}