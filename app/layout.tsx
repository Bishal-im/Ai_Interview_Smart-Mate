import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-Sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartMate",
  description: "An AI-Powered Platform for preparing for Mock Interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.variable} ${monaSans.variable} antialiased pattern`}
      >
        {children}

        <Toaster />
      </body>
    </html>
  );
}
