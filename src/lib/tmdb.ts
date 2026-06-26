import { Movie, TMDBResponse, Season } from "@/types";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.tmdb.org/3";

export async function fetchTMDB<T>(endpoint: string): Promise<T | null> {
  if (!TMDB_API_KEY) {
    console.warn("NEXT_PUBLIC_TMDB_API_KEY is missing. Please add it to your .env.local file.");
    return null;
  }

  const url = `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${TMDB_API_KEY}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`TMDB API Error: ${res.status}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch from TMDB", error);
    return null;
  }
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse>("/trending/movie/week");
  return data?.results || [];
}

export async function getTrendingTvShows(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse>("/trending/tv/week");
  return data?.results || [];
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  const data = await fetchTMDB<TMDBResponse>(`/search/multi?query=${encodeURIComponent(query)}&include_adult=false`);
  return data?.results.filter(item => item.media_type === "movie" || item.media_type === "tv") || [];
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  return await fetchTMDB<Movie>(`/movie/${id}`);
}

export async function getTvShowDetails(id: string): Promise<Movie | null> {
  return await fetchTMDB<Movie>(`/tv/${id}`);
}

export async function getMediaByProvider(providerId: number, region = "IN", type: "movie" | "tv" = "movie"): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse>(
    `/discover/${type}?with_watch_providers=${providerId}&watch_region=${region}&sort_by=popularity.desc`
  );
  return data?.results || [];
}


export async function getTvSeasonDetails(tvId: string | number, seasonNumber: string | number): Promise<Season | null> {
  return await fetchTMDB<Season>(`/tv/${tvId}/season/${seasonNumber}`);
}

export async function getGenres(type: "movie" | "tv" = "movie"): Promise<{id: number, name: string}[]> {
  const data = await fetchTMDB<{genres: {id: number, name: string}[]}>(`/genre/${type}/list`);
  return data?.genres || [];
}
