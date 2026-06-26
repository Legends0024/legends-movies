"use client";

import { Check, Plus } from "lucide-react";
import { useMyList } from "@/hooks/useMyList";
import { Movie } from "@/types";

export default function BookmarkButton({ movie }: { movie: Movie }) {
  const { isBookmarked, toggleBookmark } = useMyList();
  const saved = isBookmarked(movie.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(movie);
  };

  return (
    <button 
      onClick={handleClick}
      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-40 text-white border border-neutral-600 hover:border-white"
    >
      {saved ? <Check className="w-4 h-4 text-green-500" /> : <Plus className="w-4 h-4" />}
    </button>
  );
}
