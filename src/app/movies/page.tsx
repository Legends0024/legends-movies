import { getTrendingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default async function MoviesPage() {
  const movies = await getTrendingMovies();

  return (
    <main className="w-full min-h-screen pt-24 px-6 md:px-16 pb-20">
      <h1 className="text-3xl font-bold mb-8 text-white">Top Trending Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
