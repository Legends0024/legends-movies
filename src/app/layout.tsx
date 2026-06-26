import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LegendsMovies | TMDB Upgrade",
  description: "Dynamic Next.js 15 movie streaming app with TMDB data.",
};

import { getGenres } from "@/lib/tmdb";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const genres = await getGenres("movie");

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-neutral-950 text-white flex flex-col">
        <Navbar genres={genres} />
        {children}
      </body>
    </html>
  );
}
