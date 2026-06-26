export interface Genre {
  id: number;
  name: string;
}

export interface Episode {
  id: number;
  name: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  overview: string;
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
  episodes?: Episode[];
}

export interface Movie {
  id: number;
  title?: string;
  name?: string; // TV shows use name
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  media_type?: "movie" | "tv";
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  genres?: Genre[];
  number_of_seasons?: number;
  seasons?: Season[];
}

export interface TMDBResponse {
  results: Movie[];
}
