"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Search from "./Search";
import { Genre } from "@/types";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
  genres?: Genre[];
}

export default function Navbar({ genres = [] }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/watch")) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between ${
        isScrolled ? "bg-[#141414] shadow-md" : "bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <div className="flex items-center gap-6 md:gap-10">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#E50914] tracking-tighter cursor-pointer">
            LEGENDSMOVIES
          </h1>
        </Link>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/tv" className="hover:text-white transition">TV Shows</Link>
          <Link href="/movies" className="hover:text-white transition">Movies</Link>
          <Link href="/mylist" className="hover:text-white transition">My List</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Genre Dropdown */}
        <div className="relative hidden sm:block">
          <button 
            onClick={() => setIsGenreOpen(!isGenreOpen)}
            onBlur={() => setTimeout(() => setIsGenreOpen(false), 200)}
            className="flex items-center gap-1 text-sm font-semibold text-white hover:text-neutral-300 transition-colors"
          >
            Genre <ChevronDown className={`w-4 h-4 transition-transform ${isGenreOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isGenreOpen && (
            <div className="absolute top-full right-0 mt-4 w-48 bg-[#141414] border border-neutral-800 rounded-sm shadow-2xl z-50 max-h-96 overflow-y-auto">
              <ul className="py-2">
                {genres.map((genre) => (
                  <li key={genre.id}>
                    <Link 
                      href={`/search?q=${encodeURIComponent(genre.name)}`} 
                      className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search */}
        <Search />
      </div>
    </header>
  );
}
