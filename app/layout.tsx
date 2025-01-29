
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import { ToastProvider } from "@/contexts/ToastProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Esut LMS Portal',
    default: 'Esut LMS Portal',
  },
  description: "Create an Account to Start Learning",
};

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
          {children}
        </AppProvider>
      </body>
    </html>
  );
}