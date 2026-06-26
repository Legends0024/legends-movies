"use server";

import { searchMovies } from "@/lib/tmdb";
import { Movie } from "@/types";

export async function getSearchSuggestions(query: string): Promise<Movie[]> {
  if (!query || query.trim().length === 0) return [];
  try {
    // Only fetch top 5 results for the dropdown suggestion box
    const results = await searchMovies(query);
    return results.slice(0, 5);
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
    return [];
  }
}
