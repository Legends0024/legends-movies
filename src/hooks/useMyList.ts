"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/types";

export function useMyList() {
  const [myList, setMyList] = useState<Movie[]>([]);

  useEffect(() => {
    // Load list from local storage on mount
    const saved = localStorage.getItem("myList");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMyList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse my list from local storage", e);
      }
    }
  }, []);

  const toggleBookmark = (movie: Movie) => {
    setMyList((prev) => {
      const isSaved = prev.some((m) => m.id === movie.id);
      const newList = isSaved 
        ? prev.filter((m) => m.id !== movie.id) 
        : [...prev, movie];
      
      localStorage.setItem("myList", JSON.stringify(newList));
      return newList;
    });
  };

  const isBookmarked = (id: number) => {
    return myList.some((m) => m.id === id);
  };

  return { myList, toggleBookmark, isBookmarked };
}
