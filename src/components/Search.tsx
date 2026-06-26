"use client";

import { Search as SearchIcon, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, useTransition } from "react";
import { getSearchSuggestions } from "@/app/actions/search";
import { Movie } from "@/types";
import Image from "next/image";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Live Search Suggestions
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        const results = await getSearchSuggestions(query);
        setSuggestions(results);
      });
    }, 300); // 300ms debounce

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Handle Full Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions([]); // Close dropdown on submit
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/");
    }
  };

  const handleIconClick = () => {
    if (isExpanded && query.trim()) {
      handleSearch({ preventDefault: () => {} } as React.FormEvent);
    } else {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSuggestionClick = (movie: Movie) => {
    setSuggestions([]); // Close dropdown
    setQuery(""); // Clear query
    setIsExpanded(false);
    router.push(`/watch/${movie.media_type || "movie"}/${movie.id}`);
  };

  return (
    <div className="relative">
      <form 
        onSubmit={handleSearch} 
        className={`flex items-center transition-all duration-300 ${
          isExpanded ? "border border-neutral-600 bg-black/80 w-64 md:w-80 px-2" : "w-8 border-transparent"
        } rounded-sm overflow-hidden`}
      >
        <button 
          type="button"
          onClick={handleIconClick}
          className="text-white hover:text-red-600 transition-colors py-1.5 z-10"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Titles, people, genres"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => {
            // Delay closing to allow clicks on suggestions
            setTimeout(() => {
              if (!query.trim()) setIsExpanded(false);
              setSuggestions([]);
            }, 200);
          }}
          className={`bg-transparent text-white text-sm outline-none placeholder-neutral-400 transition-all duration-300 ${
            isExpanded ? "w-full ml-2 py-1.5 opacity-100" : "w-0 opacity-0"
          }`}
        />
        {isPending && isExpanded && (
          <Loader2 className="w-4 h-4 text-neutral-400 animate-spin mr-2" />
        )}
      </form>

      {/* Live Suggestions Dropdown */}
      {suggestions.length > 0 && isExpanded && (
        <ul className="absolute top-full right-0 mt-2 w-64 md:w-80 bg-neutral-900 border border-neutral-700 rounded-md shadow-2xl overflow-hidden z-50">
          {suggestions.map((movie) => (
            <li 
              key={movie.id}
              onClick={() => handleSuggestionClick(movie)}
              className="flex items-center gap-3 p-3 hover:bg-neutral-800 cursor-pointer transition-colors border-b border-neutral-800 last:border-b-0"
            >
              {movie.poster_path ? (
                <div className="relative w-10 h-14 flex-none rounded-sm overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title || movie.name || "Poster"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-14 bg-neutral-800 flex-none rounded-sm flex items-center justify-center text-[10px] text-neutral-500 text-center p-1">
                  No Img
                </div>
              )}
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-white text-sm font-medium truncate">
                  {movie.title || movie.name}
                </span>
                <span className="text-neutral-400 text-xs mt-1 capitalize">
                  {movie.media_type === "tv" ? "TV Show" : "Movie"}
                </span>
              </div>
            </li>
          ))}
          <li 
            onClick={(e) => handleSearch(e)}
            className="p-3 text-center text-sm text-red-500 hover:bg-neutral-800 hover:text-white cursor-pointer transition-colors"
          >
            See all results for &quot;{query}&quot;
          </li>
        </ul>
      )}
    </div>
  );
}
