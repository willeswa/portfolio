import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Godfrey Willies Wanjala",
  description: "Senior Software Engineer.",
};

import MotionProvider from "@/components/MotionProvider";
import NoiseOverlay from "@/components/NoiseOverlay";
import ThemeToggle from "@/components/ThemeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeToggle />
        <MotionProvider>
             <NoiseOverlay />
             {children}
        </MotionProvider>
      </body>
    </html>
  );
}
